import { mutation } from "./_generated/server";

// This mutation will force Convex to create the tables
export const initializeTables = mutation({
  handler: async (ctx) => {
    // Try to create a dummy source to initialize the tables
    const sourceId = await ctx.db.insert("sources", {
      ownerEmail: "init@example.com",
      type: "url",
      url: "https://example.com",
      createdAt: Date.now(),
    });

    // Create a dummy job
    const jobId = await ctx.db.insert("jobs", {
      sourceId,
      ownerEmail: "init@example.com",
      formats: ["facebook_ad"],
      status: "queued",
      log: [{
        timestamp: Date.now(),
        message: "Initialization",
        level: "info",
      }],
      retryCount: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    // Create a dummy asset
    await ctx.db.insert("assets", {
      jobId,
      format: "facebook_ad",
      content: "Initialization content",
      size: 100,
      createdAt: Date.now(),
    });

    // Create an audit log entry
    await ctx.db.insert("auditLog", {
      entityId: sourceId,
      entityType: "source",
      action: "initialized",
      actor: "system",
      timestamp: Date.now(),
    });

    // Clean up - delete the dummy data
    await ctx.db.delete(sourceId);

    return { message: "Tables initialized successfully" };
  },
});