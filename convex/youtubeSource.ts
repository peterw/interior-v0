import { v } from "convex/values";
import { mutation, action, internalMutation } from "./_generated/server";
import { api, internal } from "./_generated/api";

// Action to handle YouTube source creation with transcript fetching
// @ts-ignore - Circular reference with internal action
export const ingestYouTubeSource = action({
  args: {
    url: v.string(),
    ownerEmail: v.string(),
    projectId: v.optional(v.id("projects")),
  },
  handler: async (ctx, args) => {
    // Check if this is a YouTube URL
    const youtubeUrlPattern = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|shorts\/)|youtu\.be\/)[\w-]+/;
    if (!youtubeUrlPattern.test(args.url)) {
      throw new Error("Not a valid YouTube URL");
    }

    try {
      // Fetch the transcript
      const transcriptResult = await ctx.runAction(internal.youtube.fetchYouTubeTranscriptInternal, {
        url: args.url,
      });

      if (!transcriptResult.success || !transcriptResult.data) {
        throw new Error("Failed to fetch YouTube transcript");
      }

      const { data } = transcriptResult;

      // Create the source with transcript data using the internal mutation
      const sourceId = await ctx.runMutation(internal.youtubeSource.createYouTubeSourceInternal, {
        ownerEmail: args.ownerEmail,
        projectId: args.projectId,
        url: args.url,
        videoId: data.videoId,
        videoType: data.type,
        transcript: data.transcript,
        transcriptText: data.transcriptText,
      });

      return sourceId;
    } catch (error) {
      console.error("Error ingesting YouTube source:", error);
      
      // Fall back to regular URL source if transcript fetch fails
      // @ts-ignore - sourceId type inference
      const sourceId = await ctx.runMutation(api.sources.ingestSource, {
        type: "url",
        url: args.url,
        ownerEmail: args.ownerEmail,
        projectId: args.projectId,
        metadata: {
          title: new URL(args.url).hostname,
          error: error instanceof Error ? error.message : "Failed to fetch transcript",
        },
      });

      return sourceId;
    }
  },
});

// Internal mutation to create YouTube source with transcript data
export const createYouTubeSourceInternal = internalMutation({
  args: {
    ownerEmail: v.string(),
    projectId: v.optional(v.id("projects")),
    url: v.string(),
    videoId: v.string(),
    videoType: v.union(v.literal("video"), v.literal("short")),
    transcript: v.array(v.object({
      text: v.string(),
      startMs: v.string(),
      endMs: v.string(),
      startTimeText: v.string(),
    })),
    transcriptText: v.string(),
  },
  handler: async (ctx, args) => {
    // Create the source with transcript data
    const sourceId = await ctx.db.insert("sources", {
      ownerEmail: args.ownerEmail,
      projectId: args.projectId,
      type: "url" as const,
      url: args.url,
      content: args.transcriptText, // Store transcript as content for easy access
      metadata: {
        title: `YouTube ${args.videoType === 'short' ? 'Short' : 'Video'} - ${args.videoId}`,
        youtubeVideoId: args.videoId,
        youtubeVideoType: args.videoType,
        transcript: args.transcript,
        transcriptText: args.transcriptText,
      },
      createdAt: Date.now(),
    });

    // Log the action
    await ctx.db.insert("auditLog", {
      entityId: sourceId,
      entityType: "source",
      action: "created_with_transcript",
      actor: args.ownerEmail,
      timestamp: Date.now(),
      metadata: {
        videoId: args.videoId,
        transcriptLength: args.transcript.length,
      },
    });

    return sourceId;
  },
});