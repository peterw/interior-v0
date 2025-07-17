import { v } from "convex/values";
import { mutation, query, internalMutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// Create a new asset (internal use by job processor)
export const createAsset = internalMutation({
  args: {
    jobId: v.id("jobs"),
    format: v.string(),
    content: v.string(),
    fileRef: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const assetId = await ctx.db.insert("assets", {
      jobId: args.jobId,
      format: args.format,
      content: args.content,
      fileRef: args.fileRef,
      size: new Blob([args.content]).size,
      createdAt: Date.now(),
    });

    return assetId;
  },
});

// Get assets for a job
export const getAssetsByJob = query({
  args: { jobId: v.id("jobs") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("assets")
      .withIndex("by_job", (q) => q.eq("jobId", args.jobId))
      .collect();
  },
});

// Get a single asset
export const getAsset = query({
  args: { assetId: v.id("assets") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.assetId);
  },
});

// Get assets for a user (via their jobs)
export const getAssetsByOwner = query({
  args: { ownerEmail: v.string() },
  handler: async (ctx, args) => {
    // First get all jobs for the user
    const jobs = await ctx.db
      .query("jobs")
      .withIndex("by_owner", (q) => q.eq("ownerEmail", args.ownerEmail))
      .collect();

    const jobIds = jobs.map(job => job._id);

    // Then get all assets for those jobs
    const allAssets = [];
    for (const jobId of jobIds) {
      const assets = await ctx.db
        .query("assets")
        .withIndex("by_job", (q) => q.eq("jobId", jobId))
        .collect();
      allAssets.push(...assets);
    }

    return allAssets;
  },
});

// Delete assets for a job (internal use)
export const deleteAssetsByJob = internalMutation({
  args: { jobId: v.id("jobs") },
  handler: async (ctx, args) => {
    const assets = await ctx.db
      .query("assets")
      .withIndex("by_job", (q) => q.eq("jobId", args.jobId))
      .collect();

    for (const asset of assets) {
      await ctx.db.delete(asset._id);
    }

    return { deletedCount: assets.length };
  },
});