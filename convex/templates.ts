import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create a new template
export const createTemplate = mutation({
  args: {
    ownerEmail: v.string(),
    projectId: v.optional(v.id("projects")),
    name: v.string(),
    description: v.optional(v.string()),
    format: v.union(
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
    ),
    content: v.string(),
    tags: v.optional(v.array(v.string())),
    isPublic: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const templateId = await ctx.db.insert("templates", {
      ownerEmail: args.ownerEmail,
      projectId: args.projectId,
      name: args.name,
      description: args.description,
      format: args.format,
      content: args.content,
      tags: args.tags || [],
      isPublic: args.isPublic || false,
      usageCount: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return templateId;
  },
});

// Get templates by owner
export const getTemplatesByOwner = query({
  args: { 
    ownerEmail: v.string(),
    format: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db
      .query("templates")
      .withIndex("by_owner", (q) => q.eq("ownerEmail", args.ownerEmail));

    const templates = await query.order("desc").collect();

    // Filter by format if provided
    if (args.format) {
      return templates.filter(t => t.format === args.format);
    }

    return templates;
  },
});

// Get a single template
export const getTemplate = query({
  args: { templateId: v.id("templates") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.templateId);
  },
});

// Track template usage
export const trackTemplateUsage = mutation({
  args: { templateId: v.id("templates") },
  handler: async (ctx, args) => {
    const template = await ctx.db.get(args.templateId);
    if (template) {
      await ctx.db.patch(args.templateId, {
        usageCount: (template.usageCount || 0) + 1,
      });
    }
  },
});

// Get public templates
export const getPublicTemplates = query({
  args: { 
    format: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db
      .query("templates")
      .withIndex("by_public", (q) => q.eq("isPublic", true));

    let templates = await query.order("desc").collect();

    // Filter by format if provided
    if (args.format) {
      templates = templates.filter(t => t.format === args.format);
    }

    // Sort by usage count and limit
    templates.sort((a, b) => b.usageCount - a.usageCount);
    
    if (args.limit) {
      return templates.slice(0, args.limit);
    }

    return templates;
  },
});

// Update template
export const updateTemplate = mutation({
  args: {
    templateId: v.id("templates"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    content: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    isPublic: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { templateId, ...updates } = args;
    
    await ctx.db.patch(templateId, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

// Delete template
export const deleteTemplate = mutation({
  args: {
    templateId: v.id("templates"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.templateId);
  },
});

// Increment usage count
export const incrementUsageCount = mutation({
  args: {
    templateId: v.id("templates"),
  },
  handler: async (ctx, args) => {
    const template = await ctx.db.get(args.templateId);
    if (!template) return;

    await ctx.db.patch(args.templateId, {
      usageCount: template.usageCount + 1,
      updatedAt: Date.now(),
    });
  },
});

// Get templates by format
export const getTemplatesByFormat = query({
  args: {
    format: v.union(
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
    ),
    ownerEmail: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Get user's templates
    let userTemplates: any[] = [];
    if (args.ownerEmail) {
      const ownerEmail = args.ownerEmail;
      const query = ctx.db
        .query("templates")
        .withIndex("by_owner", (q) => q.eq("ownerEmail", ownerEmail));
      const allUserTemplates = await query.collect();
      userTemplates = allUserTemplates.filter(t => t.format === args.format);
    }

    // Get public templates
    const publicQuery = ctx.db
      .query("templates")
      .withIndex("by_public", (q) => q.eq("isPublic", true));
    const allPublicTemplates = await publicQuery.collect();
    const publicTemplates = allPublicTemplates.filter(t => t.format === args.format);

    // Combine and deduplicate
    const combined = [...userTemplates];
    const userTemplateIds = new Set(userTemplates.map(t => t._id));
    
    for (const template of publicTemplates) {
      if (!userTemplateIds.has(template._id)) {
        combined.push(template);
      }
    }

    // Sort by usage count
    combined.sort((a, b) => b.usageCount - a.usageCount);

    return combined;
  },
});