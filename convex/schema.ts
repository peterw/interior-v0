import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  sources: defineTable({
    ownerEmail: v.string(), // User email from Django auth
    projectId: v.optional(v.id("projects")), // Optional project association
    type: v.union(v.literal("url"), v.literal("file"), v.literal("text")),
    url: v.optional(v.string()),
    fileRef: v.optional(v.string()),
    content: v.optional(v.string()), // For text-based sources
    metadata: v.optional(v.object({
      title: v.optional(v.string()),
      description: v.optional(v.string()),
      duration: v.optional(v.number()),
      fileSize: v.optional(v.number()),
      mimeType: v.optional(v.string()),
      fromTemplate: v.optional(v.boolean()), // Track if source is from template
      youtubeVideoId: v.optional(v.string()),
      youtubeVideoType: v.optional(v.union(v.literal("video"), v.literal("short"))),
      transcript: v.optional(v.array(v.object({
        text: v.string(),
        startMs: v.string(),
        endMs: v.string(),
        startTimeText: v.string(),
      }))),
      transcriptText: v.optional(v.string()),
      error: v.optional(v.string()), // For storing any errors during processing
      // Twitter-specific fields
      twitterType: v.optional(v.union(v.literal("profile"), v.literal("tweet"))),
      twitterHandle: v.optional(v.string()),
      twitterTweetId: v.optional(v.string()),
      twitterUserData: v.optional(v.object({
        handle: v.string(),
        name: v.string(),
        description: v.string(),
        followers: v.number(),
        verified: v.boolean(),
        profileImage: v.string(),
      })),
      twitterTweets: v.optional(v.array(v.object({
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
      }))),
      twitterTweetData: v.optional(v.object({
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
      })),
    })),
    createdAt: v.number(),
  })
    .index("by_owner", ["ownerEmail"])
    .index("by_created", ["createdAt"])
    .index("by_project", ["projectId"]),

  jobs: defineTable({
    sourceId: v.id("sources"),
    ownerEmail: v.string(),
    projectId: v.optional(v.id("projects")), // Optional project association
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
    status: v.union(
      v.literal("queued"),
      v.literal("processing"),
      v.literal("done"),
      v.literal("failed")
    ),
    log: v.array(v.object({
      timestamp: v.number(),
      message: v.string(),
      level: v.union(v.literal("info"), v.literal("warning"), v.literal("error")),
    })),
    error: v.optional(v.string()),
    retryCount: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_source", ["sourceId"])
    .index("by_owner", ["ownerEmail"])
    .index("by_status", ["status"])
    .index("by_created", ["createdAt"])
    .index("by_project", ["projectId"]),

  assets: defineTable({
    jobId: v.id("jobs"),
    format: v.string(),
    content: v.string(),
    fileRef: v.optional(v.string()),
    size: v.number(),
    createdAt: v.number(),
  })
    .index("by_job", ["jobId"])
    .index("by_created", ["createdAt"]),

  auditLog: defineTable({
    entityId: v.string(),
    entityType: v.string(),
    action: v.string(),
    actor: v.string(),
    timestamp: v.number(),
    metadata: v.optional(v.any()),
  })
    .index("by_entity", ["entityId", "entityType"])
    .index("by_timestamp", ["timestamp"]),

  projects: defineTable({
    ownerEmail: v.string(),
    name: v.string(),
    description: v.optional(v.string()),
    isActive: v.boolean(),
    settings: v.optional(v.object({
      defaultModel: v.optional(v.union(
        v.literal("gpt-4"),
        v.literal("claude-4-sonnet")
      )),
      defaultFormats: v.optional(v.array(v.string())),
      color: v.optional(v.string()),
      icon: v.optional(v.string()),
    })),
    stats: v.optional(v.object({
      totalGenerations: v.number(),
      totalSources: v.number(),
      lastActivityAt: v.number(),
    })),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_owner", ["ownerEmail"])
    .index("by_created", ["createdAt"]),

  brandTones: defineTable({
    ownerEmail: v.string(),
    projectId: v.id("projects"),
    tone: v.string(),
    examples: v.optional(v.array(v.string())),
    files: v.optional(v.array(v.object({
      fileId: v.string(), // Convex storage ID
      fileName: v.string(),
      fileSize: v.number(),
      mimeType: v.string(),
      uploadedAt: v.number(),
    }))),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_owner", ["ownerEmail"])
    .index("by_project", ["projectId"])
    .index("by_owner_project", ["ownerEmail", "projectId"]),

  chatMessages: defineTable({
    assetId: v.id("assets"),
    userMessage: v.string(),
    aiResponse: v.string(),
    model: v.string(),
    timestamp: v.number(),
  })
    .index("by_asset", ["assetId"]),

  assetVersions: defineTable({
    assetId: v.id("assets"),
    content: v.string(),
    timestamp: v.number(),
  })
    .index("by_asset", ["assetId"]),

  templates: defineTable({
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
    isPublic: v.boolean(),
    usageCount: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_owner", ["ownerEmail"])
    .index("by_project", ["projectId"])
    .index("by_format", ["format"])
    .index("by_public", ["isPublic"])
    .index("by_created", ["createdAt"]),

  // Interior AI Projects
  interiorProjects: defineTable({
    userId: v.string(),
    name: v.string(),
    description: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    status: v.union(v.literal("active"), v.literal("archived")),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_status", ["userId", "status"]),

  // Interior AI Generations
  interiorGenerations: defineTable({
    userId: v.string(),
    projectId: v.optional(v.id("interiorProjects")),
    originalImageUrl: v.string(),
    originalImageStorageId: v.optional(v.id("_storage")),
    styleId: v.string(), // predefined style ID or custom style ID
    customStyleId: v.optional(v.id("interiorCustomStyles")),
    prompt: v.string(),
    negativePrompt: v.optional(v.string()),
    maskDataUrl: v.optional(v.string()),
    maskStorageId: v.optional(v.id("_storage")),
    maskedAreaPrompt: v.optional(v.string()),
    generatedImageUrl: v.optional(v.string()),
    generatedImageStorageId: v.optional(v.id("_storage")),
    falJobId: v.optional(v.string()),
    status: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("completed"),
      v.literal("failed")
    ),
    error: v.optional(v.string()),
    quality: v.union(v.literal("preview"), v.literal("final")),
    creditsUsed: v.number(),
    generationTime: v.optional(v.number()), // in milliseconds
    metadata: v.optional(v.any()),
    createdAt: v.number(),
    completedAt: v.optional(v.number()),
  })
    .index("by_user", ["userId"])
    .index("by_project", ["projectId"])
    .index("by_user_status", ["userId", "status"])
    .index("by_fal_job", ["falJobId"]),

  // Custom Interior Styles
  interiorCustomStyles: defineTable({
    userId: v.string(),
    name: v.string(),
    description: v.optional(v.string()),
    referenceImages: v.array(
      v.object({
        url: v.string(),
        storageId: v.optional(v.id("_storage")),
        mask: v.optional(v.string()), // mask data URL for specific areas
      })
    ),
    extractedCharacteristics: v.optional(
      v.object({
        colors: v.array(v.string()),
        materials: v.array(v.string()),
        furniture: v.array(v.string()),
        lighting: v.string(),
        atmosphere: v.string(),
        designElements: v.array(v.string()),
      })
    ),
    prompt: v.string(), // generated prompt based on analysis
    isPublic: v.boolean(),
    usageCount: v.number(),
    tags: v.array(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_public", ["isPublic"])
    .index("by_usage", ["usageCount"])
    .searchIndex("search_styles", {
      searchField: "name",
      filterFields: ["isPublic", "tags"],
    }),

  // Mask Templates
  interiorMaskTemplates: defineTable({
    userId: v.optional(v.string()), // optional for system templates
    name: v.string(),
    category: v.string(), // e.g., "furniture", "walls", "floors"
    maskDataUrl: v.string(),
    maskStorageId: v.optional(v.id("_storage")),
    thumbnailUrl: v.optional(v.string()),
    isSystem: v.boolean(),
    usageCount: v.number(),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_category", ["category"])
    .index("by_system", ["isSystem"]),

  // Generation History (for quick access)
  interiorHistory: defineTable({
    userId: v.string(),
    generationId: v.id("interiorGenerations"),
    projectId: v.optional(v.id("interiorProjects")),
    thumbnailUrl: v.string(),
    style: v.string(),
    createdAt: v.number(),
  })
    .index("by_user_recent", ["userId", "createdAt"])
    .index("by_project", ["projectId"]),

  // Shared Interior Designs
  interiorShares: defineTable({
    generationId: v.id("interiorGenerations"),
    shareId: v.string(), // unique share ID
    userId: v.string(), // owner
    expiresAt: v.optional(v.number()),
    viewCount: v.number(),
    password: v.optional(v.string()),
    allowDownload: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_share_id", ["shareId"])
    .index("by_user", ["userId"])
    .index("by_generation", ["generationId"]),

  // Style Discovery Marketplace
  interiorStyleMarketplace: defineTable({
    styleId: v.id("interiorCustomStyles"),
    userId: v.string(), // creator
    featured: v.boolean(),
    price: v.optional(v.number()), // for premium styles in future
    downloads: v.number(),
    rating: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_featured", ["featured"])
    .index("by_downloads", ["downloads"])
    .index("by_creator", ["userId"]),

  // Facebook Ads Video Generation
  fbAdsTemplates: defineTable({
    ownerEmail: v.string(),
    name: v.string(),
    description: v.optional(v.string()),
    category: v.union(
      v.literal("ecommerce"),
      v.literal("saas"),
      v.literal("local"),
      v.literal("app"),
      v.literal("service"),
      v.literal("other")
    ),
    // Video composition settings
    duration: v.number(), // in seconds (15-30)
    aspectRatio: v.union(v.literal("9:16"), v.literal("1:1"), v.literal("16:9")),
    fps: v.number(), // default 30
    // Scene structure
    scenes: v.array(v.object({
      type: v.union(v.literal("hook"), v.literal("body"), v.literal("cta")),
      duration: v.number(),
      layers: v.array(v.object({
        type: v.union(v.literal("background"), v.literal("media"), v.literal("text"), v.literal("audio")),
        config: v.any(), // Scene-specific configuration
      })),
    })),
    // ROAS optimization settings
    roasMode: v.boolean(),
    hooks: v.array(v.string()), // Different hook variations
    ctas: v.array(v.string()), // Different CTA variations
    // Animation presets
    animationStyle: v.union(v.literal("high-roas"), v.literal("smooth"), v.literal("custom")),
    transitions: v.array(v.object({
      type: v.union(v.literal("fade"), v.literal("slide"), v.literal("zoom")),
      duration: v.number(),
      easing: v.string(),
    })),
    // Metadata
    tags: v.array(v.string()),
    isPublic: v.boolean(),
    usageCount: v.number(),
    performanceMetrics: v.optional(v.object({
      avgCtr: v.optional(v.number()),
      avgConversionRate: v.optional(v.number()),
      avgRoas: v.optional(v.number()),
    })),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_owner", ["ownerEmail"])
    .index("by_category", ["category"])
    .index("by_public", ["isPublic"])
    .index("by_usage", ["usageCount"]),

  fbAdsProjects: defineTable({
    ownerEmail: v.string(),
    name: v.string(),
    description: v.optional(v.string()),
    // Product details
    productName: v.string(),
    productDescription: v.string(),
    hooks: v.array(v.string()), // Auto-split from description
    benefits: v.array(v.string()),
    cta: v.string(), // e.g., "Buy Now"
    // Brand settings
    brandColors: v.object({
      primary: v.string(),
      secondary: v.string(),
      text: v.string(),
      background: v.string(),
    }),
    brandFonts: v.object({
      heading: v.string(),
      body: v.string(),
    }),
    logoUrl: v.optional(v.string()),
    logoStorageId: v.optional(v.id("_storage")),
    // Media assets
    media: v.array(v.object({
      type: v.union(v.literal("image"), v.literal("video"), v.literal("ugc")),
      url: v.string(),
      storageId: v.optional(v.id("_storage")),
      thumbnailUrl: v.optional(v.string()),
      duration: v.optional(v.number()), // for videos
      metadata: v.optional(v.any()),
    })),
    // Generation settings
    defaultDuration: v.number(), // 15-30s
    defaultAspectRatio: v.union(v.literal("9:16"), v.literal("1:1"), v.literal("16:9")),
    roasMode: v.boolean(),
    variationCount: v.number(), // default 10
    // Stats
    totalGenerations: v.number(),
    lastGeneratedAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_owner", ["ownerEmail"])
    .index("by_created", ["createdAt"]),

  fbAdsGenerations: defineTable({
    ownerEmail: v.string(),
    projectId: v.id("fbAdsProjects"),
    templateId: v.optional(v.id("fbAdsTemplates")),
    // Generation settings
    variations: v.array(v.object({
      id: v.string(),
      name: v.string(), // e.g., "Var1_HookQuestion"
      type: v.union(v.literal("hook"), v.literal("cta"), v.literal("media")),
      config: v.any(), // Variation-specific config
      videoUrl: v.optional(v.string()),
      videoStorageId: v.optional(v.id("_storage")),
      thumbnailUrl: v.optional(v.string()),
      metadata: v.optional(v.object({
        fileSize: v.number(),
        duration: v.number(),
        dimensions: v.object({
          width: v.number(),
          height: v.number(),
        }),
      })),
      status: v.union(
        v.literal("pending"),
        v.literal("rendering"),
        v.literal("completed"),
        v.literal("failed")
      ),
      error: v.optional(v.string()),
      renderTime: v.optional(v.number()), // in ms
    })),
    // Render settings
    renderMode: v.union(v.literal("preview"), v.literal("final")),
    totalVariations: v.number(),
    completedVariations: v.number(),
    // Overall status
    status: v.union(
      v.literal("pending"),
      v.literal("rendering"),
      v.literal("completed"),
      v.literal("failed"),
      v.literal("cancelled")
    ),
    error: v.optional(v.string()),
    // Export
    exportUrl: v.optional(v.string()), // ZIP file URL
    exportStorageId: v.optional(v.id("_storage")),
    // Tracking
    pixelIds: v.optional(v.array(v.string())), // Facebook pixel IDs
    // Timing
    startedAt: v.optional(v.number()),
    completedAt: v.optional(v.number()),
    createdAt: v.number(),
  })
    .index("by_owner", ["ownerEmail"])
    .index("by_project", ["projectId"])
    .index("by_status", ["status"])
    .index("by_created", ["createdAt"]),

  fbAdsPresets: defineTable({
    ownerEmail: v.string(),
    name: v.string(),
    type: v.union(
      v.literal("animation"),
      v.literal("transition"),
      v.literal("text-style"),
      v.literal("scene"),
      v.literal("full-template")
    ),
    category: v.optional(v.string()),
    config: v.any(), // Preset configuration JSON
    tags: v.array(v.string()),
    isPublic: v.boolean(),
    usageCount: v.number(),
    performance: v.optional(v.object({
      conversions: v.number(),
      impressions: v.number(),
      ctr: v.number(),
      roas: v.number(),
    })),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_owner", ["ownerEmail"])
    .index("by_type", ["type"])
    .index("by_public", ["isPublic"])
    .index("by_usage", ["usageCount"])
    .searchIndex("search_presets", {
      searchField: "name",
      filterFields: ["type", "isPublic", "tags"],
    }),

  fbAdsAnalytics: defineTable({
    generationId: v.id("fbAdsGenerations"),
    variationId: v.string(),
    // Facebook metrics (when available)
    impressions: v.optional(v.number()),
    clicks: v.optional(v.number()),
    conversions: v.optional(v.number()),
    spend: v.optional(v.number()),
    revenue: v.optional(v.number()),
    ctr: v.optional(v.number()),
    cpc: v.optional(v.number()),
    roas: v.optional(v.number()),
    // Engagement metrics
    views: v.optional(v.number()),
    completionRate: v.optional(v.number()),
    // A/B test results
    isWinner: v.optional(v.boolean()),
    notes: v.optional(v.string()),
    updatedAt: v.number(),
  })
    .index("by_generation", ["generationId"])
    .index("by_variation", ["variationId"])
    .index("by_performance", ["roas"]),
});