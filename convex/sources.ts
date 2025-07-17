import { v } from "convex/values";
import { mutation, query, internalQuery } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// Create a new source (URL or file)
export const ingestSource = mutation({
  args: {
    type: v.union(v.literal("url"), v.literal("file"), v.literal("text")),
    url: v.optional(v.string()),
    fileStorageId: v.optional(v.string()),
    content: v.optional(v.string()),
    ownerEmail: v.string(),
    projectId: v.optional(v.id("projects")),
    metadata: v.optional(v.object({
      title: v.optional(v.string()),
      description: v.optional(v.string()),
      duration: v.optional(v.number()),
      fileSize: v.optional(v.number()),
      mimeType: v.optional(v.string()),
      fromTemplate: v.optional(v.boolean()),
    })),
  },
  handler: async (ctx, args) => {
    // Validate input
    if (args.type === "url" && !args.url) {
      throw new Error("URL is required for URL type sources");
    }
    if (args.type === "file" && !args.fileStorageId) {
      throw new Error("File storage ID is required for file type sources");
    }
    if (args.type === "text" && !args.content) {
      throw new Error("Content is required for text type sources");
    }

    // Create the source
    const sourceId = await ctx.db.insert("sources", {
      ownerEmail: args.ownerEmail,
      projectId: args.projectId,
      type: args.type,
      url: args.url,
      fileRef: args.fileStorageId,
      content: args.content,
      metadata: args.metadata,
      createdAt: Date.now(),
    });

    // Log the action
    await ctx.db.insert("auditLog", {
      entityId: sourceId,
      entityType: "source",
      action: "created",
      actor: args.ownerEmail,
      timestamp: Date.now(),
    });

    return sourceId;
  },
});

// Get sources for a user
export const getSourcesByOwner = query({
  args: { ownerEmail: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("sources")
      .withIndex("by_owner", (q) => q.eq("ownerEmail", args.ownerEmail))
      .order("desc")
      .collect();
  },
});

// Get a single source
export const getSource = query({
  args: { sourceId: v.id("sources") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.sourceId);
  },
});

// Internal query for getting a source (used by job processor)
export const getSourceInternal = internalQuery({
  args: { sourceId: v.id("sources") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.sourceId);
  },
});

// Delete a source (soft delete by updating status)
export const deleteSource = mutation({
  args: { 
    sourceId: v.id("sources"),
    ownerEmail: v.string(),
  },
  handler: async (ctx, args) => {
    const source = await ctx.db.get(args.sourceId);
    if (!source) {
      throw new Error("Source not found");
    }
    if (source.ownerEmail !== args.ownerEmail) {
      throw new Error("Unauthorized: You don't own this source");
    }

    // Delete the source
    await ctx.db.delete(args.sourceId);

    // Log the action
    await ctx.db.insert("auditLog", {
      entityId: args.sourceId,
      entityType: "source",
      action: "deleted",
      actor: args.ownerEmail,
      timestamp: Date.now(),
    });

    return { success: true };
  },
});