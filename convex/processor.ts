import { action, internalAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { Id, Doc } from "./_generated/dataModel";
import { v } from "convex/values";

// Job processor that runs on a schedule
export const processJobs = internalAction({
  handler: async (ctx) => {
    // Get queued jobs
    const queuedJobs = await ctx.runQuery(internal.jobs.getQueuedJobs);
    
    // Process each job
    for (const job of queuedJobs) {
      try {
        // Update status to processing
        await ctx.runMutation(internal.jobs.updateJobStatus, {
          jobId: job._id,
          status: "processing",
          logEntry: {
            timestamp: Date.now(),
            message: "Starting job processing",
            level: "info",
          },
        });

        // Get the source
        const source = await ctx.runQuery(internal.sources.getSourceInternal, {
          sourceId: job.sourceId,
        });

        if (!source) {
          throw new Error("Source not found");
        }

        // Get the user's brand tone
        const brandTone = await ctx.runQuery(internal.brandTone.getBrandToneInternal, {
          ownerEmail: job.ownerEmail,
        });

        // Process each format with variations
        for (const format of job.formats) {
          const variationCount = job.variationCount || 1;
          
          for (let i = 0; i < variationCount; i++) {
            await ctx.runMutation(internal.jobs.updateJobStatus, {
              jobId: job._id,
              status: "processing",
              logEntry: {
                timestamp: Date.now(),
                message: `Generating ${format} (variation ${i + 1}/${variationCount})`,
                level: "info",
              },
            });

            // Generate content based on format
            const content = await generateContent(source, format, brandTone, job.model || "gpt-4", i);

            // Save the asset
            await ctx.runMutation(internal.assets.createAsset, {
              jobId: job._id,
              format,
              content,
            });
          }
        }

        // Mark job as done
        await ctx.runMutation(internal.jobs.updateJobStatus, {
          jobId: job._id,
          status: "done",
          logEntry: {
            timestamp: Date.now(),
            message: "Job completed successfully",
            level: "info",
          },
        });

      } catch (error: any) {
        console.error("Job processing error:", error);

        // Check retry count
        if (job.retryCount < 2) {
          // Retry the job
          await ctx.runMutation(internal.jobs.incrementRetryCount, {
            jobId: job._id,
          });
          await ctx.runMutation(internal.jobs.updateJobStatus, {
            jobId: job._id,
            status: "queued",
            error: error.message,
            logEntry: {
              timestamp: Date.now(),
              message: `Error: ${error.message}. Retrying (attempt ${job.retryCount + 2}/3)`,
              level: "warning",
            },
          });
        } else {
          // Mark as failed
          await ctx.runMutation(internal.jobs.updateJobStatus, {
            jobId: job._id,
            status: "failed",
            error: error.message,
            logEntry: {
              timestamp: Date.now(),
              message: `Job failed after 3 attempts: ${error.message}`,
              level: "error",
            },
          });
        }
      }
    }
  },
});

import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';

// Content generation function using AI SDK
async function generateContent(
  source: any, 
  format: string, 
  brandTone?: any, 
  model: "gpt-4" | "claude-4-sonnet" = "gpt-4",
  variationIndex: number = 0
): Promise<string> {
  const openAIKey = process.env.OPENAI_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  
  if (model === "gpt-4" && !openAIKey) {
    console.error("OpenAI API key not configured");
    throw new Error("OpenAI API not configured");
  }
  
  if (model === "claude-4-sonnet" && !anthropicKey) {
    console.error("Anthropic API key not configured");
    throw new Error("Anthropic API not configured");
  }

  // Prepare context from source
  let context;
  let styleContext = "";
  
  if (source.type === "text" && source.content) {
    context = `Content: ${source.content}`;
  } else if (source.url) {
    // Check if we have YouTube transcript data
    if (source.metadata?.transcriptText) {
      context = `YouTube ${source.metadata.youtubeVideoType || 'Video'} Transcript:\n\n${source.metadata.transcriptText}\n\nVideo URL: ${source.url}\nVideo ID: ${source.metadata.youtubeVideoId || 'N/A'}`;
    } 
    // Check if we have Twitter data
    else if (source.metadata?.twitterType === "profile" && source.metadata?.twitterTweets) {
      const tweets = source.metadata.twitterTweets;
      const topTweets = tweets
        .sort((a: any, b: any) => (b.stats.likes + b.stats.retweets) - (a.stats.likes + a.stats.retweets))
        .slice(0, 10)
        .map((t: any) => t.text)
        .join("\n\n---\n\n");
      
      context = `Twitter Profile Writing Style Analysis\n\nHandle: @${source.metadata.twitterHandle}\nFollowers: ${source.metadata.twitterUserData?.followers || 'N/A'}\n\nTop ${Math.min(10, tweets.length)} Most Engaging Tweets:\n\n${topTweets}`;
      styleContext = `\n\nIMPORTANT: Analyze and mimic the writing style, tone, vocabulary, and patterns from these tweets. Match their voice, humor, formality level, and typical content structure.`;
    }
    else if (source.metadata?.twitterType === "tweet" && source.metadata?.twitterTweetData) {
      const tweet = source.metadata.twitterTweetData;
      const author = source.metadata.twitterUserData;
      
      context = `Twitter Tweet to Create Variations From:\n\nOriginal Tweet:\n${tweet.text}\n\nEngagement: ${tweet.stats.likes} likes, ${tweet.stats.retweets} retweets\nAuthor: @${author?.handle || source.metadata.twitterHandle} (${author?.followers || 0} followers)`;
      styleContext = `\n\nIMPORTANT: Create variations of this tweet that maintain the core message but experiment with different angles, hooks, or presentation styles. Keep the same tone and voice.`;
    }
    else {
      context = `Content from URL: ${source.url}\nTitle: ${source.metadata?.title || 'N/A'}\nDescription: ${source.metadata?.description || 'N/A'}`;
    }
  } else {
    context = `Uploaded content: ${source.metadata?.title || 'User uploaded content'}`;
  }

  // Add brand tone to context if available
  const brandToneContext = brandTone 
    ? `\n\nBrand Tone: ${brandTone.tone}${brandTone.examples?.length ? '\n\nExample phrases:\n' + brandTone.examples.join('\n') : ''}`
    : '';

  // Add variation instruction
  const variationContext = variationIndex > 0 
    ? `\n\nIMPORTANT: Create variation #${variationIndex + 1} - make this version different from previous ones in style, angle, or approach while maintaining the core message.`
    : '';

  const prompts: Record<string, string> = {
    facebook_ad: `Create a high-converting Facebook ad based on the following content. Include an attention-grabbing headline, 3 key benefits with emoji checkmarks, and a strong call-to-action. Keep it under 150 words.${brandToneContext}${styleContext}${variationContext}\n\n${context}`,
    
    linkedin_post: `Write a professional LinkedIn post based on the following content. Start with a hook, share insights or a story, and end with a thought-provoking question. Keep it under 200 words.${brandToneContext}${styleContext}${variationContext}\n\n${context}`,
    
    tweet_thread: `Create an engaging Twitter/X thread (5-7 tweets) based on the following content. Start with a hook, provide valuable insights, and end with a conclusion. Number each tweet.${brandToneContext}${styleContext}${variationContext}\n\n${context}`,
    
    instagram_caption: `Write an Instagram caption based on the following content. Include an engaging hook, story or value, clear CTA, and 10-15 relevant hashtags. Keep main caption under 125 words.${brandToneContext}${styleContext}${variationContext}\n\n${context}`,
    
    cold_email: `Write a personalized cold outreach email based on the following content. Keep it under 100 words, include a specific observation, clear value proposition, and soft call-to-action.${brandToneContext}${styleContext}${variationContext}\n\n${context}`,
    
    newsletter: `Write a newsletter section based on the following content. Include a compelling subject line, engaging intro, main content with subheadings, and clear next steps. Keep it under 300 words.${brandToneContext}${styleContext}${variationContext}\n\n${context}`,
    
    youtube_script: `Write a 3-minute YouTube video script based on the following content. Include timestamps, a strong hook, main content sections, and clear CTA. Format with [TIMESTAMP] markers.${brandToneContext}${styleContext}${variationContext}\n\n${context}`,
    
    blog_post: `Write a blog post outline based on the following content. Include SEO-friendly title, meta description, introduction, 3-5 main sections with subheadings, and conclusion with CTA.${brandToneContext}${styleContext}${variationContext}\n\n${context}`,
    
    swipe_file: `Create 5 powerful copywriting bullets/hooks based on the following content. Each bullet should highlight a benefit or create curiosity. Format as a bulleted list.${brandToneContext}${styleContext}${variationContext}\n\n${context}`,
    
    value_prop: `Create 3 clear value propositions based on the following content. Each should follow the format: "We help [target audience] achieve [outcome] through [method]". Include a one-sentence version and expanded 2-3 sentence version for each.${brandToneContext}${styleContext}${variationContext}\n\n${context}`,
  };

  try {
    const selectedModel = model === "claude-4-sonnet" 
      ? anthropic('claude-3-5-sonnet-20241022')
      : openai('gpt-4-turbo-preview');

    const { text } = await generateText({
      model: selectedModel,
      prompt: prompts[format] || `Generate marketing content in ${format} format based on: ${context}`,
      maxTokens: 1000,
      temperature: 0.7 + (variationIndex * 0.1), // Slightly increase temperature for variations
    });

    return text;
  } catch (error) {
    console.error(`Failed to generate ${format} content with ${model}:`, error);
    throw new Error(`AI generation failed for ${format} using ${model}`);
  }
}