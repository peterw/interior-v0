import { v } from "convex/values";
import { mutation, query, internalQuery, action } from "./_generated/server";
import { api } from "./_generated/api";

// Generate upload URL for brand tone files
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

// Save or update brand tone for a project
export const saveBrandTone = mutation({
  args: {
    ownerEmail: v.string(),
    projectId: v.id("projects"),
    tone: v.string(),
    examples: v.optional(v.array(v.string())),
    files: v.optional(v.array(v.object({
      fileId: v.string(),
      fileName: v.string(),
      fileSize: v.number(),
      mimeType: v.string(),
      uploadedAt: v.number(),
    }))),
  },
  handler: async (ctx, args) => {
    // Check if brand tone already exists for this project
    const existing = await ctx.db
      .query("brandTones")
      .withIndex("by_owner_project", (q) => 
        q.eq("ownerEmail", args.ownerEmail).eq("projectId", args.projectId)
      )
      .first();

    if (existing) {
      // Update existing
      await ctx.db.patch(existing._id, {
        tone: args.tone,
        examples: args.examples,
        files: args.files,
        updatedAt: Date.now(),
      });
      return existing._id;
    } else {
      // Create new
      return await ctx.db.insert("brandTones", {
        ownerEmail: args.ownerEmail,
        projectId: args.projectId,
        tone: args.tone,
        examples: args.examples,
        files: args.files,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    }
  },
});

// Get brand tone for a specific project
export const getBrandTone = query({
  args: { 
    ownerEmail: v.string(),
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("brandTones")
      .withIndex("by_owner_project", (q) => 
        q.eq("ownerEmail", args.ownerEmail).eq("projectId", args.projectId)
      )
      .first();
  },
});

// Get all brand tones for a user across all projects
export const getUserBrandTones = query({
  args: { ownerEmail: v.string() },
  handler: async (ctx, args) => {
    const brandTones = await ctx.db
      .query("brandTones")
      .withIndex("by_owner", (q) => q.eq("ownerEmail", args.ownerEmail))
      .collect();
    
    // Fetch project details for each brand tone
    const brandTonesWithProjects = await Promise.all(
      brandTones.map(async (tone) => {
        const project = await ctx.db.get(tone.projectId);
        return {
          ...tone,
          project,
        };
      })
    );
    
    return brandTonesWithProjects;
  },
});

// Get brand tones by project
export const getProjectBrandTones = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("brandTones")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .collect();
  },
});

// Delete a file from brand tone
export const deleteFileFromBrandTone = mutation({
  args: {
    brandToneId: v.id("brandTones"),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const brandTone = await ctx.db.get(args.brandToneId);
    if (!brandTone) {
      throw new Error("Brand tone not found");
    }

    // Remove the file from storage
    await ctx.storage.delete(args.fileId);

    // Update brand tone to remove file reference
    const updatedFiles = brandTone.files?.filter(f => f.fileId !== args.fileId) || [];
    await ctx.db.patch(args.brandToneId, {
      files: updatedFiles,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

// Internal query for brand tone (for use in actions)
export const getBrandToneInternal = internalQuery({
  args: { 
    ownerEmail: v.string(),
    projectId: v.optional(v.id("projects")),
  },
  handler: async (ctx, args) => {
    if (args.projectId) {
      const projectId = args.projectId; // Create a const to help TypeScript
      return await ctx.db
        .query("brandTones")
        .withIndex("by_owner_project", (q) => 
          q.eq("ownerEmail", args.ownerEmail).eq("projectId", projectId)
        )
        .first();
    } else {
      // Return the most recent brand tone if no project specified
      return await ctx.db
        .query("brandTones")
        .withIndex("by_owner", (q) => q.eq("ownerEmail", args.ownerEmail))
        .order("desc")
        .first();
    }
  },
});

// Process uploaded file to extract text content
export const processUploadedFile = action({
  args: {
    fileId: v.string(),
    fileName: v.string(),
    mimeType: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      // Get the file URL from storage
      const fileUrl = await ctx.storage.getUrl(args.fileId);
      if (!fileUrl) {
        throw new Error("File not found in storage");
      }

      // For now, we'll just return the file info
      // In a real implementation, you'd extract text from PDFs, docs, etc.
      return {
        fileId: args.fileId,
        fileName: args.fileName,
        mimeType: args.mimeType,
        content: "File uploaded successfully. Content extraction will be implemented based on file type.",
      };
    } catch (error: any) {
      console.error("Error processing file:", error);
      throw new Error(`Failed to process file: ${error.message}`);
    }
  },
});