import { action, internalAction } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

// Types for Twitter API responses
export interface TwitterUser {
  __typename: string;
  rest_id: string;
  legacy: {
    name: string;
    screen_name: string;
    description: string;
    followers_count: number;
    created_at: string;
    profile_image_url_https: string;
    verified: boolean;
  };
  is_blue_verified: boolean;
}

export interface Tweet {
  __typename: string;
  rest_id: string;
  legacy: {
    full_text: string;
    created_at: string;
    favorite_count: number;
    retweet_count: number;
    reply_count: number;
    quote_count: number;
    bookmark_count: number;
    user_id_str: string;
    id_str: string;
    entities?: {
      hashtags: Array<{ text: string }>;
      urls: Array<{ display_url: string; expanded_url: string }>;
      user_mentions: Array<{ screen_name: string }>;
    };
  };
  views?: {
    count: string;
  };
}

export interface UserTweetsResponse {
  tweets: Array<{
    __typename: string;
    rest_id: string;
    core?: {
      user_results?: {
        result?: TwitterUser;
      };
    };
    legacy: Tweet["legacy"];
    views?: Tweet["views"];
  }>;
}

export interface TweetResponse extends Tweet {
  core: {
    user_results: {
      result: TwitterUser;
    };
  };
}

// Internal action for fetching user tweets
export const fetchUserTweetsInternal = internalAction({
  args: {
    handle: v.string(),
    trim: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.SCRAPECREATORS_API_KEY;
    
    if (!apiKey) {
      throw new Error(
        "Twitter API key not configured. Please add SCRAPECREATORS_API_KEY to your Convex environment variables."
      );
    }

    // Clean up handle (remove @ if present)
    const cleanHandle = args.handle.replace(/^@/, "");

    try {
      const url = new URL("https://api.scrapecreators.com/v1/twitter/user-tweets");
      url.searchParams.append("handle", cleanHandle);
      if (args.trim) {
        url.searchParams.append("trim", "true");
      }

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Twitter user tweets API error:", response.status, errorText);
        
        if (response.status === 401) {
          throw new Error("Invalid API key for Twitter service");
        } else if (response.status === 404) {
          throw new Error("Twitter user not found");
        } else if (response.status === 429) {
          throw new Error("Rate limit exceeded. Please try again later");
        } else {
          throw new Error(`Failed to fetch tweets: ${response.status} - ${errorText}`);
        }
      }

      const data: UserTweetsResponse = await response.json();
      
      // Extract and format tweets for easier processing
      const tweets = data.tweets.map(tweet => ({
        id: tweet.rest_id,
        text: tweet.legacy.full_text,
        created_at: tweet.legacy.created_at,
        stats: {
          likes: tweet.legacy.favorite_count,
          retweets: tweet.legacy.retweet_count,
          replies: tweet.legacy.reply_count,
          quotes: tweet.legacy.quote_count,
          bookmarks: tweet.legacy.bookmark_count,
          views: tweet.views?.count ? parseInt(tweet.views.count) : undefined,
        },
        entities: tweet.legacy.entities,
      }));

      // Extract user info from the first tweet that has it
      const userInfo = data.tweets.find(t => t.core?.user_results?.result)?.core?.user_results?.result;

      return {
        success: true,
        data: {
          user: userInfo ? {
            handle: userInfo.legacy.screen_name,
            name: userInfo.legacy.name,
            description: userInfo.legacy.description,
            followers: userInfo.legacy.followers_count,
            verified: userInfo.is_blue_verified || userInfo.legacy.verified,
            profileImage: userInfo.legacy.profile_image_url_https,
          } : null,
          tweets,
          tweetCount: tweets.length,
        },
      };
    } catch (error) {
      console.error("Error fetching user tweets:", error);
      
      if (error instanceof Error) {
        throw error;
      }
      
      throw new Error("Failed to fetch Twitter user tweets. Please try again.");
    }
  },
});

// Internal action for fetching a single tweet
export const fetchTweetInternal = internalAction({
  args: {
    url: v.string(),
    trim: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.SCRAPECREATORS_API_KEY;
    
    if (!apiKey) {
      throw new Error(
        "Twitter API key not configured. Please add SCRAPECREATORS_API_KEY to your Convex environment variables."
      );
    }

    // Validate Twitter URL
    const twitterUrlPattern = /^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)\/\w+\/status\/\d+/;
    if (!twitterUrlPattern.test(args.url)) {
      throw new Error("Invalid Twitter/X URL format");
    }

    try {
      const apiUrl = new URL("https://api.scrapecreators.com/v1/twitter/tweet");
      apiUrl.searchParams.append("url", args.url);
      if (args.trim) {
        apiUrl.searchParams.append("trim", "true");
      }

      const response = await fetch(apiUrl.toString(), {
        method: "GET",
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Twitter tweet API error:", response.status, errorText);
        
        if (response.status === 401) {
          throw new Error("Invalid API key for Twitter service");
        } else if (response.status === 404) {
          throw new Error("Tweet not found or has been deleted");
        } else if (response.status === 429) {
          throw new Error("Rate limit exceeded. Please try again later");
        } else {
          throw new Error(`Failed to fetch tweet: ${response.status} - ${errorText}`);
        }
      }

      const data: TweetResponse = await response.json();
      
      return {
        success: true,
        data: {
          tweet: {
            id: data.rest_id,
            text: data.legacy.full_text,
            created_at: data.legacy.created_at,
            url: args.url,
            stats: {
              likes: data.legacy.favorite_count,
              retweets: data.legacy.retweet_count,
              replies: data.legacy.reply_count,
              quotes: data.legacy.quote_count,
              bookmarks: data.legacy.bookmark_count,
              views: data.views?.count ? parseInt(data.views.count) : undefined,
            },
            entities: data.legacy.entities,
          },
          author: {
            handle: data.core.user_results.result.legacy.screen_name,
            name: data.core.user_results.result.legacy.name,
            description: data.core.user_results.result.legacy.description,
            followers: data.core.user_results.result.legacy.followers_count,
            verified: data.core.user_results.result.is_blue_verified || 
                     data.core.user_results.result.legacy.verified,
            profileImage: data.core.user_results.result.legacy.profile_image_url_https,
          },
        },
      };
    } catch (error) {
      console.error("Error fetching tweet:", error);
      
      if (error instanceof Error) {
        throw error;
      }
      
      throw new Error("Failed to fetch tweet. Please try again.");
    }
  },
});

// Public actions for direct client use
// @ts-ignore - Circular reference with internal action
export const fetchUserTweets = action({
  args: {
    handle: v.string(),
    trim: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    return ctx.runAction(internal.twitter.fetchUserTweetsInternal, args);
  },
});

// @ts-ignore - Circular reference with internal action
export const fetchTweet = action({
  args: {
    url: v.string(),
    trim: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    return ctx.runAction(internal.twitter.fetchTweetInternal, args);
  },
});