import { v } from "convex/values";
import { action, internalAction, mutation, query } from "./_generated/server";
import { internal } from "./_generated/api";
import { fal } from "@fal-ai/client";

// Configure FAL.AI client
if (process.env.FAL_API_KEY) {
  fal.config({
    credentials: process.env.FAL_API_KEY,
  });
}

// Style definitions with proper prompts
const INTERIOR_STYLES = {
  "modern-minimalist": {
    name: "Modern Minimalist",
    prompt: "modern minimalist interior design, clean lines, neutral colors, minimal furniture, open space, natural light, white walls, wooden accents, simplicity",
    negativePrompt: "cluttered, busy, ornate, dark, heavy furniture",
  },
  "cozy-scandinavian": {
    name: "Cozy Scandinavian",
    prompt: "scandinavian interior design, hygge, cozy atmosphere, light wood, white and gray tones, soft textiles, warm lighting, minimal decor, natural materials",
    negativePrompt: "dark colors, heavy curtains, cluttered, industrial",
  },
  "luxury-modern": {
    name: "Luxury Modern",
    prompt: "luxury modern interior, high-end materials, marble, gold accents, designer furniture, sophisticated lighting, elegant decor, spacious, premium finishes",
    negativePrompt: "cheap materials, cluttered, small space, outdated",
  },
  "rustic-farmhouse": {
    name: "Rustic Farmhouse",
    prompt: "rustic farmhouse interior, reclaimed wood, vintage decor, warm colors, exposed beams, cozy textiles, antique furniture, country charm, natural textures",
    negativePrompt: "modern, minimalist, industrial, cold colors",
  },
  "industrial-chic": {
    name: "Industrial Chic",
    prompt: "industrial chic interior, exposed brick, metal fixtures, concrete floors, edison bulbs, vintage furniture, urban loft style, raw materials, open ceiling",
    negativePrompt: "traditional, ornate, carpeted, pastel colors",
  },
  "bohemian-eclectic": {
    name: "Bohemian Eclectic",
    prompt: "bohemian eclectic interior, colorful textiles, mixed patterns, plants, vintage rugs, artistic decor, layered textures, warm earth tones, creative space",
    negativePrompt: "minimalist, monochrome, stark, empty",
  },
  "classic-traditional": {
    name: "Classic Traditional",
    prompt: "classic traditional interior, elegant furniture, rich wood tones, formal decor, crown molding, upholstered chairs, refined details, timeless design",
    negativePrompt: "modern, industrial, minimalist, casual",
  },
  "coastal-beach": {
    name: "Coastal Beach",
    prompt: "coastal beach house interior, light blue and white, natural textures, driftwood, nautical decor, bright airy space, ocean inspired, relaxed atmosphere",
    negativePrompt: "dark colors, heavy furniture, urban, industrial",
  },
  "mid-century-modern": {
    name: "Mid-Century Modern",
    prompt: "mid-century modern interior, retro furniture, wood paneling, geometric patterns, warm colors, vintage lighting, clean lines, 1950s-60s style",
    negativePrompt: "ornate, traditional, cluttered, contemporary",
  },
  "zen-japanese": {
    name: "Zen Japanese",
    prompt: "zen japanese interior, minimalist, natural materials, low furniture, paper screens, bamboo, neutral colors, peaceful atmosphere, clean aesthetic",
    negativePrompt: "cluttered, bright colors, western furniture, busy patterns",
  },
};

// Mutation to create a new generation
export const createGeneration = mutation({
  args: {
    originalImageUrl: v.string(),
    styleId: v.string(),
    customStyleId: v.optional(v.id("interiorCustomStyles")),
    maskDataUrl: v.optional(v.string()),
    maskedAreaPrompt: v.optional(v.string()),
    quality: v.union(v.literal("preview"), v.literal("final")),
    projectId: v.optional(v.id("interiorProjects")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    const userId = identity.email || identity.subject;
    
    // Get style prompt
    let prompt = "";
    let negativePrompt = "";
    
    if (args.customStyleId) {
      const customStyle = await ctx.db.get(args.customStyleId);
      if (!customStyle || customStyle.userId !== userId) {
        throw new Error("Custom style not found");
      }
      prompt = customStyle.prompt;
    } else if (INTERIOR_STYLES[args.styleId as keyof typeof INTERIOR_STYLES]) {
      const style = INTERIOR_STYLES[args.styleId as keyof typeof INTERIOR_STYLES];
      prompt = style.prompt;
      negativePrompt = style.negativePrompt;
    } else {
      throw new Error("Invalid style ID");
    }
    
    // Add masked area prompt if provided
    if (args.maskedAreaPrompt) {
      prompt = `${prompt}, ${args.maskedAreaPrompt}`;
    }
    
    // Calculate credits based on quality
    const creditsUsed = args.quality === "final" ? 4 : 2;
    
    // Create generation record
    const generationId = await ctx.db.insert("interiorGenerations", {
      userId,
      projectId: args.projectId,
      originalImageUrl: args.originalImageUrl,
      styleId: args.styleId,
      customStyleId: args.customStyleId,
      prompt,
      negativePrompt,
      maskDataUrl: args.maskDataUrl,
      maskedAreaPrompt: args.maskedAreaPrompt,
      status: "pending",
      quality: args.quality,
      creditsUsed,
      createdAt: Date.now(),
    });
    
    // Schedule the generation action
    await ctx.scheduler.runAfter(0, internal.interior.processGeneration, {
      generationId,
    });
    
    return generationId;
  },
});

// Internal action to process generation with FAL.AI
export const processGeneration = internalAction({
  args: {
    generationId: v.id("interiorGenerations"),
  },
  handler: async (ctx, args) => {
    const generation = await ctx.runQuery(internal.interior.getGenerationById, {
      generationId: args.generationId,
    });
    
    if (!generation) {
      throw new Error("Generation not found");
    }
    
    // Update status to processing
    await ctx.runMutation(internal.interior.updateGenerationStatus, {
      generationId: args.generationId,
      status: "processing",
    });
    
    try {
      const startTime = Date.now();
      
      // Determine the model and settings based on quality
      const model = generation.quality === "final" 
        ? "fal-ai/flux/dev"
        : "fal-ai/flux/schnell";
      
      const imageSize = generation.quality === "final"
        ? { width: 1024, height: 1024 }
        : { width: 512, height: 512 };
      
      // Prepare the request
      let result;
      
      if (generation.maskDataUrl) {
        // Use inpainting model for masked areas
        result = await fal.run("fal-ai/stable-diffusion-v3-medium/inpainting", {
          image_url: generation.originalImageUrl,
          mask_url: generation.maskDataUrl,
          prompt: generation.prompt,
          negative_prompt: generation.negativePrompt,
          image_size: imageSize,
          num_inference_steps: generation.quality === "final" ? 28 : 4,
          guidance_scale: 7.5,
          strength: 0.85,
        } as any);
      } else {
        // Use image-to-image transformation
        result = await fal.run(model, {
          image_url: generation.originalImageUrl,
          prompt: generation.prompt,
          negative_prompt: generation.negativePrompt,
          image_size: imageSize,
          num_inference_steps: generation.quality === "final" ? 28 : 4,
          guidance_scale: 3.5,
          num_images: 1,
          enable_safety_checker: true,
        } as any);
      }
      
      const generationTime = Date.now() - startTime;
      
      // Get the generated image URL
      const generatedImageUrl = (result as any).images?.[0]?.url || (result as any).image?.url;
      
      if (!generatedImageUrl) {
        throw new Error("No image generated");
      }
      
      // Store the image in Convex storage for persistence
      const response = await fetch(generatedImageUrl);
      const blob = await response.blob();
      const storageId = await ctx.storage.store(blob);
      
      // Update generation with results
      await ctx.runMutation(internal.interior.updateGenerationResult, {
        generationId: args.generationId,
        generatedImageUrl,
        generatedImageStorageId: storageId,
        generationTime,
        falJobId: (result as any).request_id,
        status: "completed",
      });
      
      // Add to history
      await ctx.runMutation(internal.interior.addToHistory, {
        generationId: args.generationId,
        thumbnailUrl: generatedImageUrl,
      });
      
    } catch (error) {
      console.error("Generation failed:", error);
      
      // Update generation with error
      await ctx.runMutation(internal.interior.updateGenerationStatus, {
        generationId: args.generationId,
        status: "failed",
        error: error instanceof Error ? error.message : "Generation failed",
      });
    }
  },
});

// Internal query to get generation by ID
export const getGenerationById = query({
  args: { generationId: v.id("interiorGenerations") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.generationId);
  },
});

// Internal mutation to update generation status
export const updateGenerationStatus = mutation({
  args: {
    generationId: v.id("interiorGenerations"),
    status: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("completed"),
      v.literal("failed")
    ),
    error: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.generationId, {
      status: args.status,
      error: args.error,
    });
  },
});

// Internal mutation to update generation result
export const updateGenerationResult = mutation({
  args: {
    generationId: v.id("interiorGenerations"),
    generatedImageUrl: v.string(),
    generatedImageStorageId: v.id("_storage"),
    generationTime: v.number(),
    falJobId: v.optional(v.string()),
    status: v.literal("completed"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.generationId, {
      generatedImageUrl: args.generatedImageUrl,
      generatedImageStorageId: args.generatedImageStorageId,
      generationTime: args.generationTime,
      falJobId: args.falJobId,
      status: args.status,
      completedAt: Date.now(),
    });
  },
});

// Internal mutation to add to history
export const addToHistory = mutation({
  args: {
    generationId: v.id("interiorGenerations"),
    thumbnailUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const generation = await ctx.db.get(args.generationId);
    if (!generation) return;
    
    await ctx.db.insert("interiorHistory", {
      userId: generation.userId,
      generationId: args.generationId,
      projectId: generation.projectId,
      thumbnailUrl: args.thumbnailUrl,
      style: generation.styleId,
      createdAt: Date.now(),
    });
  },
});

// Query to get user's generations
export const getUserGenerations = query({
  args: {
    projectId: v.optional(v.id("interiorProjects")),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    const userId = identity.email || identity.subject;
    const limit = args.limit || 50;
    
    let query = ctx.db
      .query("interiorGenerations")
      .withIndex("by_user", (q) => q.eq("userId", userId));
    
    if (args.projectId) {
      query = ctx.db
        .query("interiorGenerations")
        .withIndex("by_project", (q) => q.eq("projectId", args.projectId));
    }
    
    return await query
      .order("desc")
      .take(limit);
  },
});

// Query to get generation history
export const getGenerationHistory = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    const userId = identity.email || identity.subject;
    const limit = args.limit || 20;
    
    const history = await ctx.db
      .query("interiorHistory")
      .withIndex("by_user_recent", (q) => q.eq("userId", userId))
      .order("desc")
      .take(limit);
    
    // Fetch full generation details
    const historyWithDetails = await Promise.all(
      history.map(async (item) => {
        const generation = await ctx.db.get(item.generationId);
        return {
          ...item,
          generation,
        };
      })
    );
    
    return historyWithDetails;
  },
});

// Query to get public styles
export const getPublicStyles = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit || 50;
    
    return await ctx.db
      .query("interiorCustomStyles")
      .withIndex("by_public", (q) => q.eq("isPublic", true))
      .order("desc")
      .take(limit);
  },
});

// Mutation to create custom style
export const createCustomStyle = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    referenceImages: v.array(
      v.object({
        url: v.string(),
        mask: v.optional(v.string()),
      })
    ),
    isPublic: v.boolean(),
    tags: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    const userId = identity.email || identity.subject;
    
    // TODO: Analyze reference images to extract characteristics
    // For now, create a basic prompt
    const prompt = `custom interior design style inspired by reference images, ${args.name} style`;
    
    const styleId = await ctx.db.insert("interiorCustomStyles", {
      userId,
      name: args.name,
      description: args.description,
      referenceImages: args.referenceImages,
      prompt,
      isPublic: args.isPublic,
      usageCount: 0,
      tags: args.tags,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    
    return styleId;
  },
});

// Action for preview generation (wrapper for public access)
export const generatePreview = action({
  args: {
    originalImageUrl: v.string(),
    styleId: v.string(),
    customStyleId: v.optional(v.id("interiorCustomStyles")),
    maskDataUrl: v.optional(v.string()),
    maskedAreaPrompt: v.optional(v.string()),
    projectId: v.optional(v.id("interiorProjects")),
  },
  handler: async (ctx, args) => {
    const generationId = await ctx.runMutation(internal.interior.createGeneration, {
      ...args,
      quality: "preview",
    });
    
    // Poll for completion
    let generation;
    let attempts = 0;
    const maxAttempts = 60; // 60 seconds timeout
    
    while (attempts < maxAttempts) {
      generation = await ctx.runQuery(internal.interior.getGenerationById, {
        generationId,
      });
      
      if (generation?.status === "completed" || generation?.status === "failed") {
        break;
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      attempts++;
    }
    
    if (!generation || generation.status !== "completed") {
      throw new Error("Generation failed or timed out");
    }
    
    return {
      id: generationId,
      imageUrl: generation.generatedImageUrl,
      prompt: generation.prompt,
    };
  },
});

// Action for final generation (wrapper for public access)
export const generateFinal = action({
  args: {
    originalImageUrl: v.string(),
    styleId: v.string(),
    customStyleId: v.optional(v.id("interiorCustomStyles")),
    maskDataUrl: v.optional(v.string()),
    maskedAreaPrompt: v.optional(v.string()),
    projectId: v.optional(v.id("interiorProjects")),
  },
  handler: async (ctx, args) => {
    const generationId = await ctx.runMutation(internal.interior.createGeneration, {
      ...args,
      quality: "final",
    });
    
    // For final generation, return immediately and let client poll
    return {
      id: generationId,
      status: "processing",
    };
  },
});

// Query to get generation status
export const getGenerationStatus = query({
  args: {
    generationId: v.id("interiorGenerations"),
  },
  handler: async (ctx, args) => {
    const generation = await ctx.db.get(args.generationId);
    
    if (!generation) {
      throw new Error("Generation not found");
    }
    
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    const userId = identity.email || identity.subject;
    
    if (generation.userId !== userId) {
      throw new Error("Unauthorized");
    }
    
    return {
      id: args.generationId,
      status: generation.status,
      imageUrl: generation.generatedImageUrl,
      error: generation.error,
      generationTime: generation.generationTime,
    };
  },
});

// Query to get shared generation
export const getSharedGeneration = query({
  args: {
    shareId: v.string(),
  },
  handler: async (ctx, args) => {
    const share = await ctx.db
      .query("interiorShares")
      .withIndex("by_share_id", (q) => q.eq("shareId", args.shareId))
      .first();
    
    if (!share) {
      return null;
    }
    
    // Check if share has expired
    if (share.expiresAt && share.expiresAt < Date.now()) {
      return null;
    }
    
    // Get the generation
    const generation = await ctx.db.get(share.generationId);
    if (!generation) {
      return null;
    }
    
    return {
      id: share.shareId,
      originalImage: generation.originalImageUrl,
      style: generation.styleId,
      images: generation.generatedImageUrl ? [generation.generatedImageUrl] : [],
      generatedAt: new Date(generation.createdAt).toISOString(),
      prompt: generation.prompt,
    };
  },
});

// Mutation to create a share
export const createShare = mutation({
  args: {
    generationId: v.id("interiorGenerations"),
    expiresIn: v.optional(v.number()), // hours
    password: v.optional(v.string()),
    allowDownload: v.boolean(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    const userId = identity.email || identity.subject;
    
    // Verify ownership
    const generation = await ctx.db.get(args.generationId);
    if (!generation || generation.userId !== userId) {
      throw new Error("Generation not found or unauthorized");
    }
    
    const shareId = Math.random().toString(36).substring(2, 15);
    const expiresAt = args.expiresIn 
      ? Date.now() + (args.expiresIn * 60 * 60 * 1000)
      : undefined;
    
    await ctx.db.insert("interiorShares", {
      generationId: args.generationId,
      shareId,
      userId,
      expiresAt,
      viewCount: 0,
      password: args.password,
      allowDownload: args.allowDownload,
      createdAt: Date.now(),
    });
    
    return shareId;
  },
});