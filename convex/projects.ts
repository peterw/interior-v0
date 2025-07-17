import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create a new project
export const createProject = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    ownerEmail: v.string(),
  },
  handler: async (ctx, args) => {
    const projectId = await ctx.db.insert("projects", {
      ownerEmail: args.ownerEmail,
      name: args.name,
      description: args.description,
      isActive: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return projectId;
  },
});

// Get all projects for a user
export const getUserProjects = query({
  args: { ownerEmail: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("projects")
      .withIndex("by_owner", (q) => q.eq("ownerEmail", args.ownerEmail))
      .order("desc")
      .collect();
  },
});

// Get a single project
export const getProject = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.projectId);
  },
});

// Update a project
export const updateProject = mutation({
  args: {
    projectId: v.id("projects"),
    updates: v.object({
      name: v.optional(v.string()),
      description: v.optional(v.string()),
      isActive: v.optional(v.boolean()),
      settings: v.optional(v.object({
        defaultModel: v.optional(v.union(
          v.literal("gpt-4"),
          v.literal("claude-4-sonnet")
        )),
        defaultFormats: v.optional(v.array(v.string())),
        color: v.optional(v.string()),
        icon: v.optional(v.string()),
      })),
    }),
  },
  handler: async (ctx, args) => {
    const { projectId, updates } = args;
    await ctx.db.patch(projectId, {
      ...updates,
      updatedAt: Date.now(),
    });
    return { success: true };
  },
});

// Delete a project (soft delete by marking inactive)
export const deleteProject = mutation({
  args: { 
    projectId: v.id("projects"),
    ownerEmail: v.string(),
  },
  handler: async (ctx, args) => {
    // Verify ownership
    const project = await ctx.db.get(args.projectId);
    if (!project || project.ownerEmail !== args.ownerEmail) {
      throw new Error("Unauthorized");
    }
    
    await ctx.db.patch(args.projectId, {
      isActive: false,
      updatedAt: Date.now(),
    });
    return { success: true };
  },
});

// Update project stats
export const updateProjectStats = mutation({
  args: {
    projectId: v.id("projects"),
    field: v.union(v.literal("totalGenerations"), v.literal("totalSources")),
    increment: v.number(),
  },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.projectId);
    if (!project) {
      throw new Error("Project not found");
    }

    const currentStats = project.stats || {
      totalGenerations: 0,
      totalSources: 0,
      lastActivityAt: Date.now(),
    };

    const updatedStats = {
      ...currentStats,
      [args.field]: (currentStats[args.field] || 0) + args.increment,
      lastActivityAt: Date.now(),
    };

    await ctx.db.patch(args.projectId, {
      stats: updatedStats,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

// Get sources by project
export const getProjectSources = query({
  args: {
    projectId: v.id("projects"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const query = ctx.db
      .query("sources")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .order("desc");
    
    if (args.limit) {
      return await query.take(args.limit);
    }
    return await query.collect();
  },
});

// Get jobs by project
export const getProjectJobs = query({
  args: {
    projectId: v.id("projects"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const query = ctx.db
      .query("jobs")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .order("desc");
    
    if (args.limit) {
      return await query.take(args.limit);
    }
    return await query.collect();
  },
});