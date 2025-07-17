import { v } from "convex/values";
import { mutation, query, internalMutation, internalQuery } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// Create a new job
export const createJob = mutation({
  args: {
    sourceId: v.id("sources"),
    ownerEmail: v.string(),
    projectId: v.optional(v.id("projects")),
    formats: v.array(v.union(
      v.literal("facebook_ad"),
      v.literal("linkedin_post"),
      v.literal("tweet_thread"),
      v.literal("instagram_caption"),
      v.literal("cold_email"),
      v.literal("newsletter"),
      v.literal("youtube_script"),
      v.literal("blog_post"),
      v.literal("swipe_file"),
      v.literal("value_prop")
    )),
    model: v.optional(v.union(
      v.literal("gpt-4"),
      v.literal("claude-4-sonnet")
    )),
    variationCount: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // Verify the source exists and belongs to the user
    const source = await ctx.db.get(args.sourceId);
    if (!source) {
      throw new Error("Source not found");
    }
    if (source.ownerEmail !== args.ownerEmail) {
      throw new Error("Unauthorized: You don't own this source");
    }

    // Create the job
    const jobId = await ctx.db.insert("jobs", {
      sourceId: args.sourceId,
      ownerEmail: args.ownerEmail,
      projectId: args.projectId || source.projectId, // Use provided projectId or inherit from source
      formats: args.formats,
      model: args.model || "gpt-4",
      variationCount: args.variationCount || 1,
      status: "queued",
      log: [{
        timestamp: Date.now(),
        message: "Job created and queued for processing",
        level: "info",
      }],
      retryCount: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    // Log the action
    await ctx.db.insert("auditLog", {
      entityId: jobId,
      entityType: "job",
      action: "created",
      actor: args.ownerEmail,
      timestamp: Date.now(),
    });

    return jobId;
  },
});

// Get jobs for a user with source data
export const getJobsByOwner = query({
  args: { ownerEmail: v.string() },
  handler: async (ctx, args) => {
    const jobs = await ctx.db
      .query("jobs")
      .withIndex("by_owner", (q) => q.eq("ownerEmail", args.ownerEmail))
      .order("desc")
      .collect();
    
    // Add source data to each job
    const jobsWithSource = await Promise.all(
      jobs.map(async (job) => {
        const source = await ctx.db.get(job.sourceId);
        return {
          ...job,
          source,
        };
      })
    );
    
    return jobsWithSource;
  },
});

// Get a single job with real-time updates and source data
export const getJob = query({
  args: { jobId: v.id("jobs") },
  handler: async (ctx, args) => {
    const job = await ctx.db.get(args.jobId);
    if (!job) return null;
    
    const source = await ctx.db.get(job.sourceId);
    return {
      ...job,
      source,
    };
  },
});

// Get jobs by status (for worker processing)
export const getQueuedJobs = internalQuery({
  handler: async (ctx) => {
    return await ctx.db
      .query("jobs")
      .withIndex("by_status", (q) => q.eq("status", "queued"))
      .order("asc")
      .take(10); // Process up to 10 jobs at a time
  },
});

// Update job status (internal use only)
export const updateJobStatus = internalMutation({
  args: {
    jobId: v.id("jobs"),
    status: v.union(
      v.literal("queued"),
      v.literal("processing"),
      v.literal("done"),
      v.literal("failed")
    ),
    error: v.optional(v.string()),
    logEntry: v.optional(v.object({
      timestamp: v.number(),
      message: v.string(),
      level: v.union(v.literal("info"), v.literal("warning"), v.literal("error")),
    })),
  },
  handler: async (ctx, args) => {
    const job = await ctx.db.get(args.jobId);
    if (!job) {
      throw new Error("Job not found");
    }

    const updates: any = {
      status: args.status,
      updatedAt: Date.now(),
    };

    if (args.error) {
      updates.error = args.error;
    }

    if (args.logEntry) {
      updates.log = [...job.log, args.logEntry];
    }

    await ctx.db.patch(args.jobId, updates);

    // Log the action
    await ctx.db.insert("auditLog", {
      entityId: args.jobId,
      entityType: "job",
      action: `status_changed_to_${args.status}`,
      actor: "system",
      timestamp: Date.now(),
      metadata: { error: args.error },
    });
  },
});

// Increment retry count
export const incrementRetryCount = internalMutation({
  args: { jobId: v.id("jobs") },
  handler: async (ctx, args) => {
    const job = await ctx.db.get(args.jobId);
    if (!job) return;

    await ctx.db.patch(args.jobId, {
      retryCount: job.retryCount + 1,
      updatedAt: Date.now(),
    });
  },
});