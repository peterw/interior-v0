import { v } from "convex/values";
import { mutation, query, action } from "./_generated/server";
import { api } from "./_generated/api";
import { Doc } from "./_generated/dataModel";

// Queries
export const listProjects = query({
  args: { ownerEmail: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("fbAdsProjects")
      .withIndex("by_owner", (q) => q.eq("ownerEmail", args.ownerEmail))
      .order("desc")
      .collect();
  },
});

export const getProject = query({
  args: { projectId: v.id("fbAdsProjects") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.projectId);
  },
});

export const listTemplates = query({
  args: { ownerEmail: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("fbAdsTemplates")
      .withIndex("by_owner", (q) => q.eq("ownerEmail", args.ownerEmail))
      .order("desc")
      .collect();
  },
});

export const listPublicTemplates = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("fbAdsTemplates")
      .withIndex("by_public", (q) => q.eq("isPublic", true))
      .order("desc")
      .take(50);
  },
});

export const listGenerations = query({
  args: { ownerEmail: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("fbAdsGenerations")
      .withIndex("by_owner", (q) => q.eq("ownerEmail", args.ownerEmail))
      .order("desc")
      .collect();
  },
});

export const getGeneration = query({
  args: { generationId: v.id("fbAdsGenerations") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.generationId);
  },
});

export const listPresets = query({
  args: { ownerEmail: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("fbAdsPresets")
      .withIndex("by_owner", (q) => q.eq("ownerEmail", args.ownerEmail))
      .order("desc")
      .collect();
  },
});

// Mutations
export const createProject = mutation({
  args: {
    ownerEmail: v.string(),
    name: v.string(),
    description: v.optional(v.string()),
    productName: v.string(),
    productDescription: v.string(),
    hooks: v.array(v.string()),
    benefits: v.array(v.string()),
    cta: v.string(),
    brandColors: v.object({
      primary: v.string(),
      secondary: v.string(),
      text: v.string(),
      background: v.string(),
    }),
    brandFonts: v.object({
      heading: v.string(),
      body: v.string(),
    }),
    logoUrl: v.optional(v.string()),
    logoStorageId: v.optional(v.id("_storage")),
    media: v.array(v.object({
      type: v.union(v.literal("image"), v.literal("video"), v.literal("ugc")),
      url: v.string(),
      storageId: v.optional(v.id("_storage")),
      thumbnailUrl: v.optional(v.string()),
      duration: v.optional(v.number()),
      metadata: v.optional(v.any()),
    })),
    defaultDuration: v.number(),
    defaultAspectRatio: v.union(v.literal("9:16"), v.literal("1:1"), v.literal("16:9")),
    roasMode: v.boolean(),
    variationCount: v.number(),
  },
  handler: async (ctx, args) => {
    const projectId = await ctx.db.insert("fbAdsProjects", {
      ...args,
      totalGenerations: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return projectId;
  },
});

export const updateProject = mutation({
  args: {
    projectId: v.id("fbAdsProjects"),
    ...{
      name: v.optional(v.string()),
      description: v.optional(v.string()),
      productName: v.optional(v.string()),
      productDescription: v.optional(v.string()),
      hooks: v.optional(v.array(v.string())),
      benefits: v.optional(v.array(v.string())),
      cta: v.optional(v.string()),
      brandColors: v.optional(v.object({
        primary: v.string(),
        secondary: v.string(),
        text: v.string(),
        background: v.string(),
      })),
      brandFonts: v.optional(v.object({
        heading: v.string(),
        body: v.string(),
      })),
      logoUrl: v.optional(v.string()),
      logoStorageId: v.optional(v.id("_storage")),
      media: v.optional(v.array(v.object({
        type: v.union(v.literal("image"), v.literal("video"), v.literal("ugc")),
        url: v.string(),
        storageId: v.optional(v.id("_storage")),
        thumbnailUrl: v.optional(v.string()),
        duration: v.optional(v.number()),
        metadata: v.optional(v.any()),
      }))),
      defaultDuration: v.optional(v.number()),
      defaultAspectRatio: v.optional(v.union(v.literal("9:16"), v.literal("1:1"), v.literal("16:9"))),
      roasMode: v.optional(v.boolean()),
      variationCount: v.optional(v.number()),
    }
  },
  handler: async (ctx, args) => {
    const { projectId, ...updates } = args;
    await ctx.db.patch(projectId, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

export const deleteProject = mutation({
  args: { projectId: v.id("fbAdsProjects") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.projectId);
  },
});

export const createGeneration = mutation({
  args: {
    ownerEmail: v.string(),
    projectId: v.id("fbAdsProjects"),
    templateId: v.optional(v.id("fbAdsTemplates")),
    variations: v.array(v.object({
      id: v.string(),
      name: v.string(),
      type: v.union(v.literal("hook"), v.literal("cta"), v.literal("media")),
      config: v.any(),
      videoUrl: v.optional(v.string()),
      videoStorageId: v.optional(v.id("_storage")),
      thumbnailUrl: v.optional(v.string()),
      metadata: v.optional(v.object({
        fileSize: v.number(),
        duration: v.number(),
        dimensions: v.object({
          width: v.number(),
          height: v.number(),
        }),
      })),
      status: v.union(
        v.literal("pending"),
        v.literal("rendering"),
        v.literal("completed"),
        v.literal("failed")
      ),
      error: v.optional(v.string()),
      renderTime: v.optional(v.number()),
    })),
    renderMode: v.union(v.literal("preview"), v.literal("final")),
    totalVariations: v.number(),
  },
  handler: async (ctx, args) => {
    const generationId = await ctx.db.insert("fbAdsGenerations", {
      ...args,
      completedVariations: 0,
      status: "pending",
      createdAt: Date.now(),
    });

    // Update project stats
    const project = await ctx.db.get(args.projectId);
    if (project) {
      await ctx.db.patch(args.projectId, {
        totalGenerations: project.totalGenerations + 1,
        lastGeneratedAt: Date.now(),
        updatedAt: Date.now(),
      });
    }

    return generationId;
  },
});

export const updateGenerationStatus = mutation({
  args: {
    generationId: v.id("fbAdsGenerations"),
    status: v.union(
      v.literal("pending"),
      v.literal("rendering"),
      v.literal("completed"),
      v.literal("failed"),
      v.literal("cancelled")
    ),
    completedVariations: v.optional(v.number()),
    error: v.optional(v.string()),
    exportUrl: v.optional(v.string()),
    exportStorageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const { generationId, ...updates } = args;
    const updateData: any = { ...updates };
    
    if (args.status === "completed") {
      updateData.completedAt = Date.now();
    }
    
    await ctx.db.patch(generationId, updateData);
  },
});

export const cancelGeneration = mutation({
  args: { generationId: v.id("fbAdsGenerations") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.generationId, {
      status: "cancelled",
    });
  },
});

export const savePreset = mutation({
  args: {
    ownerEmail: v.string(),
    name: v.string(),
    type: v.union(
      v.literal("animation"),
      v.literal("transition"),
      v.literal("text-style"),
      v.literal("scene"),
      v.literal("full-template")
    ),
    category: v.optional(v.string()),
    config: v.any(),
    tags: v.array(v.string()),
    isPublic: v.boolean(),
  },
  handler: async (ctx, args) => {
    const presetId = await ctx.db.insert("fbAdsPresets", {
      ...args,
      usageCount: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return presetId;
  },
});

export const deletePreset = mutation({
  args: { presetId: v.id("fbAdsPresets") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.presetId);
  },
});

export const uploadFile = mutation({
  handler: async (ctx) => {
    // Return upload URL for Convex storage
    return await ctx.storage.generateUploadUrl();
  },
});

// Actions for video rendering (using Remotion)
export const renderVideoVariations = action({
  args: {
    generationId: v.id("fbAdsGenerations"),
    projectId: v.id("fbAdsProjects"),
  },
  handler: async (ctx, args) => {
    // Get generation and project data
    const generation = await ctx.runQuery(api.fbAds.getGeneration, {
      generationId: args.generationId,
    });
    const project = await ctx.runQuery(api.fbAds.getProject, {
      projectId: args.projectId,
    });

    if (!generation || !project) {
      throw new Error("Generation or project not found");
    }

    // Update status to rendering
    await ctx.runMutation(api.fbAds.updateGenerationStatus, {
      generationId: args.generationId,
      status: "rendering",
    });

    try {
      // TODO: Implement actual Remotion rendering
      // For now, simulate rendering process
      const renderedVariations = generation.variations.map((variation: any) => ({
        ...variation,
        status: "completed" as const,
        videoUrl: `/rendered/${variation.id}.mp4`,
        thumbnailUrl: `/thumbnails/${variation.id}.jpg`,
        metadata: {
          fileSize: 2500000,
          duration: project.defaultDuration,
          dimensions: {
            width: project.defaultAspectRatio === "9:16" ? 1080 : 1080,
            height: project.defaultAspectRatio === "9:16" ? 1920 : 1080,
          },
        },
        renderTime: 5000, // 5 seconds
      }));

      // Update generation with completed variations
      await ctx.runMutation(api.fbAds.updateGenerationStatus, {
        generationId: args.generationId,
        status: "completed",
        completedVariations: renderedVariations.length,
        exportUrl: `/exports/generation-${args.generationId}.zip`,
      });

      return { success: true, variations: renderedVariations };
    } catch (error: any) {
      await ctx.runMutation(api.fbAds.updateGenerationStatus, {
        generationId: args.generationId,
        status: "failed",
        error: error.message,
      });
      throw error;
    }
  },
});