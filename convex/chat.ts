import { v } from "convex/values";
import { mutation, query, action } from "./_generated/server";
import { api } from "./_generated/api";
import { Doc } from "./_generated/dataModel";
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

// Chat with an asset to create variations
export const chatWithAsset = action({
  args: {
    assetId: v.id("assets"),
    message: v.string(),
    model: v.union(
      v.literal("gpt-4o"),
      v.literal("gpt-4o-mini"),
      v.literal("gpt-4-turbo"),
      v.literal("gpt-4"),
      v.literal("gpt-3.5-turbo"),
      v.literal("o1-preview"),
      v.literal("o1-mini"),
      v.literal("o3"),
      v.literal("o3-mini")
    ),
    brandTone: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<{ response: string }> => {
    // Get the asset from database
    const asset: Doc<"assets"> | null = await ctx.runQuery(api.chat.getAsset, { assetId: args.assetId });
    if (!asset) {
      throw new Error("Asset not found");
    }

    const systemPrompt: string = `You are a marketing copy expert. The user has generated the following ${asset.format} content:

${asset.content}

${args.brandTone ? `Brand Tone Guidelines: ${args.brandTone}` : ''}

Help them improve it based on their request. Provide specific, actionable suggestions and variations.`;

    try {
      const { text }: { text: string } = await generateText({
        model: openai(args.model),
        system: systemPrompt,
        prompt: args.message,
        maxTokens: 1000,
        temperature: 0.7,
      });

      // Store the chat message using mutation
      await ctx.runMutation(api.chat.storeChatMessage, {
        assetId: args.assetId,
        userMessage: args.message,
        aiResponse: text,
        model: args.model,
        timestamp: Date.now(),
      });

      return { response: text };
    } catch (error: any) {
      console.error("Chat error:", error);
      throw new Error(`Failed to generate response: ${error.message}`);
    }
  },
});

// Internal query to get an asset
export const getAsset = query({
  args: { assetId: v.id("assets") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.assetId);
  },
});

// Internal mutation to store chat message
export const storeChatMessage = mutation({
  args: {
    assetId: v.id("assets"),
    userMessage: v.string(),
    aiResponse: v.string(),
    model: v.string(),
    timestamp: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("chatMessages", args);
  },
});

// Get chat history for an asset
export const getChatHistory = query({
  args: { assetId: v.id("assets") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("chatMessages")
      .withIndex("by_asset", (q) => q.eq("assetId", args.assetId))
      .order("desc")
      .collect();
  },
});

// Update asset content after chat suggestions
export const updateAssetContent = mutation({
  args: {
    assetId: v.id("assets"),
    newContent: v.string(),
  },
  handler: async (ctx, args) => {
    const asset = await ctx.db.get(args.assetId);
    if (!asset) {
      throw new Error("Asset not found");
    }

    // Store the old version
    await ctx.db.insert("assetVersions", {
      assetId: args.assetId,
      content: asset.content,
      timestamp: Date.now(),
    });

    // Update the asset
    await ctx.db.patch(args.assetId, {
      content: args.newContent,
      size: new Blob([args.newContent]).size,
    });

    return { success: true };
  },
});