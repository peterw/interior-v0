import { internalMutation, internalAction, internalQuery } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";

// Clean up data older than 30 days
export const cleanupOldData = internalAction({
  handler: async (ctx) => {
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);

    // Get old sources
    const oldSources = await ctx.runQuery(internal.cleanup.getOldSources, {
      before: thirtyDaysAgo,
    });

    // Delete each old source and its associated data
    for (const source of oldSources) {
      // Get jobs for this source
      const jobs = await ctx.runQuery(internal.cleanup.getJobsBySource, {
        sourceId: source._id,
      });

      // Delete assets for each job
      for (const job of jobs) {
        await ctx.runMutation(internal.assets.deleteAssetsByJob, {
          jobId: job._id,
        });
        
        // Delete the job
        await ctx.runMutation(internal.cleanup.deleteJob, {
          jobId: job._id,
        });
      }

      // Delete the source
      await ctx.runMutation(internal.cleanup.deleteSource, {
        sourceId: source._id,
      });
    }

    // Clean up old audit logs
    await ctx.runMutation(internal.cleanup.deleteOldAuditLogs, {
      before: thirtyDaysAgo,
    });
  },
});

// Query helpers for cleanup
export const getOldSources = internalQuery({
  args: { before: v.number() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("sources")
      .withIndex("by_created")
      .filter((q) => q.lt(q.field("createdAt"), args.before))
      .collect();
  },
});

export const getJobsBySource = internalQuery({
  args: { sourceId: v.id("sources") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("jobs")
      .withIndex("by_source", (q) => q.eq("sourceId", args.sourceId))
      .collect();
  },
});

export const deleteJob = internalMutation({
  args: { jobId: v.id("jobs") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.jobId);
  },
});

export const deleteSource = internalMutation({
  args: { sourceId: v.id("sources") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.sourceId);
  },
});

export const deleteOldAuditLogs = internalMutation({
  args: { before: v.number() },
  handler: async (ctx, args) => {
    const oldLogs = await ctx.db
      .query("auditLog")
      .withIndex("by_timestamp")
      .filter((q) => q.lt(q.field("timestamp"), args.before))
      .collect();

    for (const log of oldLogs) {
      await ctx.db.delete(log._id);
    }
  },
});