import { action, internalAction } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

export interface TranscriptSegment {
  text: string;
  startMs: string;
  endMs: string;
  startTimeText: string;
}

export interface YouTubeTranscriptResponse {
  videoId: string;
  type: "video" | "short";
  url: string;
  transcript: TranscriptSegment[];
  transcript_only_text: string;
}

// Internal action for use within Convex functions
export const fetchYouTubeTranscriptInternal = internalAction({
  args: {
    url: v.string(),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.SCRAPECREATORS_API_KEY;
    
    if (!apiKey) {
      throw new Error(
        "YouTube transcript API key not configured. Please add SCRAPECREATORS_API_KEY to your Convex environment variables."
      );
    }

    // Validate YouTube URL
    const youtubeUrlPattern = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|shorts\/)|youtu\.be\/)[\w-]+/;
    if (!youtubeUrlPattern.test(args.url)) {
      throw new Error("Invalid YouTube URL format");
    }

    try {
      const response = await fetch(
        `https://api.scrapecreators.com/v1/youtube/video/transcript?url=${encodeURIComponent(args.url)}`,
        {
          method: "GET",
          headers: {
            "x-api-key": apiKey,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("YouTube transcript API error:", response.status, errorText);
        
        if (response.status === 401) {
          throw new Error("Invalid API key for YouTube transcript service");
        } else if (response.status === 404) {
          throw new Error("Video not found or transcript not available");
        } else if (response.status === 429) {
          throw new Error("Rate limit exceeded. Please try again later");
        } else {
          throw new Error(`Failed to fetch transcript: ${response.status} - ${errorText}`);
        }
      }

      const data: YouTubeTranscriptResponse = await response.json();
      
      // Validate response structure
      if (!data.transcript || !Array.isArray(data.transcript)) {
        throw new Error("Invalid response format from transcript API");
      }

      return {
        success: true,
        data: {
          videoId: data.videoId,
          type: data.type,
          url: data.url,
          transcript: data.transcript,
          transcriptText: data.transcript_only_text,
        },
      };
    } catch (error) {
      console.error("Error fetching YouTube transcript:", error);
      
      // Re-throw if it's already a known error
      if (error instanceof Error) {
        throw error;
      }
      
      // Otherwise, throw a generic error
      throw new Error("Failed to fetch YouTube transcript. Please try again.");
    }
  },
});

// Public action for direct client use (if needed)
export const fetchYouTubeTranscript = action({
  args: {
    url: v.string(),
  },
  handler: async (ctx, args) => {
    return ctx.runAction(internal.youtube.fetchYouTubeTranscriptInternal, args);
  },
});