import { v } from "convex/values";
import { action, internalMutation } from "./_generated/server";
import { api, internal } from "./_generated/api";

// Action to handle Twitter source creation (profile or tweet)
export const ingestTwitterSource = action({
  args: {
    url: v.string(),
    ownerEmail: v.string(),
    projectId: v.optional(v.id("projects")),
  },
  handler: async (ctx, args) => {
    // Detect Twitter URL type
    const tweetPattern = /^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)\/(\w+)\/status\/(\d+)/;
    const profilePattern = /^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)\/(@?\w+)\/?$/;
    
    const tweetMatch = args.url.match(tweetPattern);
    const profileMatch = args.url.match(profilePattern);
    
    if (!tweetMatch && !profileMatch) {
      throw new Error("Invalid Twitter/X URL. Please provide a profile URL or tweet URL.");
    }

    try {
      if (tweetMatch) {
        // Handle individual tweet
        const tweetResult = await ctx.runAction(internal.twitter.fetchTweetInternal, {
          url: args.url,
          trim: false,
        });

        if (!tweetResult.success || !tweetResult.data) {
          throw new Error("Failed to fetch tweet");
        }

        const { data } = tweetResult;

        // Create source with tweet data
        const sourceId = await ctx.runMutation(internal.twitterSource.createTwitterTweetSourceInternal, {
          ownerEmail: args.ownerEmail,
          projectId: args.projectId,
          url: args.url,
          tweetData: data.tweet,
          authorData: data.author,
        });

        return sourceId;
      } else if (profileMatch) {
        // Handle user profile
        const handle = profileMatch[4].replace('@', '');
        
        const tweetsResult = await ctx.runAction(internal.twitter.fetchUserTweetsInternal, {
          handle: handle,
          trim: false,
        });

        if (!tweetsResult.success || !tweetsResult.data) {
          throw new Error("Failed to fetch user tweets");
        }

        const { data } = tweetsResult;

        // Create source with user tweets data
        const sourceId = await ctx.runMutation(internal.twitterSource.createTwitterProfileSourceInternal, {
          ownerEmail: args.ownerEmail,
          projectId: args.projectId,
          url: args.url,
          handle: handle,
          userData: data.user,
          tweets: data.tweets,
        });

        return sourceId;
      }
    } catch (error) {
      console.error("Error ingesting Twitter source:", error);
      
      // Fall back to regular URL source if Twitter fetch fails
      const sourceId = await ctx.runMutation(api.sources.ingestSource, {
        type: "url",
        url: args.url,
        ownerEmail: args.ownerEmail,
        projectId: args.projectId,
        metadata: {
          title: "Twitter/X",
          error: error instanceof Error ? error.message : "Failed to fetch Twitter data",
        },
      });

      return sourceId;
    }
  },
});

// Internal mutation to create Twitter profile source
export const createTwitterProfileSourceInternal = internalMutation({
  args: {
    ownerEmail: v.string(),
    projectId: v.optional(v.id("projects")),
    url: v.string(),
    handle: v.string(),
    userData: v.union(v.null(), v.object({
      handle: v.string(),
      name: v.string(),
      description: v.string(),
      followers: v.number(),
      verified: v.boolean(),
      profileImage: v.string(),
    })),
    tweets: v.array(v.object({
      id: v.string(),
      text: v.string(),
      created_at: v.string(),
      stats: v.object({
        likes: v.number(),
        retweets: v.number(),
        replies: v.number(),
        quotes: v.number(),
        bookmarks: v.number(),
        views: v.optional(v.number()),
      }),
      entities: v.optional(v.object({
        hashtags: v.optional(v.array(v.object({ text: v.string() }))),
        urls: v.optional(v.array(v.object({ display_url: v.string(), expanded_url: v.string() }))),
        user_mentions: v.optional(v.array(v.object({ screen_name: v.string() }))),
      })),
    })),
  },
  handler: async (ctx, args) => {
    // Combine all tweets into a writing sample
    const writingSample = args.tweets
      .map(tweet => tweet.text)
      .join("\n\n---\n\n");
    
    // Calculate engagement stats
    const totalEngagement = args.tweets.reduce((sum, tweet) => 
      sum + tweet.stats.likes + tweet.stats.retweets + tweet.stats.replies + tweet.stats.quotes, 0
    );
    const avgEngagement = Math.round(totalEngagement / args.tweets.length);

    const sourceId = await ctx.db.insert("sources", {
      ownerEmail: args.ownerEmail,
      projectId: args.projectId,
      type: "url" as const,
      url: args.url,
      content: writingSample, // Store combined tweets as content
      metadata: {
        title: `Twitter Profile: @${args.handle}`,
        description: `${args.tweets.length} popular tweets from @${args.handle}`,
        twitterType: "profile",
        twitterHandle: args.handle,
        twitterUserData: args.userData || undefined,
        twitterTweets: args.tweets,
      },
      createdAt: Date.now(),
    });

    // Log the action
    await ctx.db.insert("auditLog", {
      entityId: sourceId,
      entityType: "source",
      action: "created_twitter_profile",
      actor: args.ownerEmail,
      timestamp: Date.now(),
      metadata: {
        handle: args.handle,
        tweetCount: args.tweets.length,
        avgEngagement,
      },
    });

    return sourceId;
  },
});

// Internal mutation to create Twitter tweet source
export const createTwitterTweetSourceInternal = internalMutation({
  args: {
    ownerEmail: v.string(),
    projectId: v.optional(v.id("projects")),
    url: v.string(),
    tweetData: v.object({
      id: v.string(),
      text: v.string(),
      created_at: v.string(),
      url: v.string(),
      stats: v.object({
        likes: v.number(),
        retweets: v.number(),
        replies: v.number(),
        quotes: v.number(),
        bookmarks: v.number(),
        views: v.optional(v.number()),
      }),
      entities: v.optional(v.object({
        hashtags: v.optional(v.array(v.object({ text: v.string() }))),
        urls: v.optional(v.array(v.object({ display_url: v.string(), expanded_url: v.string() }))),
        user_mentions: v.optional(v.array(v.object({ screen_name: v.string() }))),
      })),
    }),
    authorData: v.object({
      handle: v.string(),
      name: v.string(),
      description: v.string(),
      followers: v.number(),
      verified: v.boolean(),
      profileImage: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const sourceId = await ctx.db.insert("sources", {
      ownerEmail: args.ownerEmail,
      projectId: args.projectId,
      type: "url" as const,
      url: args.url,
      content: args.tweetData.text, // Store tweet text as content
      metadata: {
        title: `Tweet by @${args.authorData.handle}`,
        description: `Tweet with ${args.tweetData.stats.likes} likes, ${args.tweetData.stats.retweets} retweets`,
        twitterType: "tweet",
        twitterHandle: args.authorData.handle,
        twitterTweetId: args.tweetData.id,
        twitterUserData: args.authorData,
        twitterTweetData: args.tweetData,
      },
      createdAt: Date.now(),
    });

    // Log the action
    await ctx.db.insert("auditLog", {
      entityId: sourceId,
      entityType: "source",
      action: "created_twitter_tweet",
      actor: args.ownerEmail,
      timestamp: Date.now(),
      metadata: {
        handle: args.authorData.handle,
        tweetId: args.tweetData.id,
        engagement: args.tweetData.stats.likes + args.tweetData.stats.retweets,
      },
    });

    return sourceId;
  },
});