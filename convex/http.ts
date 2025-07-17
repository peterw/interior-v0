import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";
import { Doc } from "./_generated/dataModel";

const http = httpRouter();

// Webhook endpoint for external integrations
http.route({
  path: "/api/ingest",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    // Add CORS headers
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    // Handle OPTIONS request
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    try {
      // Parse request body
      const body = await request.json();
      const { url, formats, userEmail } = body;

      // Validate required fields
      if (!url || !formats || !Array.isArray(formats) || formats.length === 0) {
        return new Response(
          JSON.stringify({ error: "Missing required fields: url and formats[]" }),
          {
            status: 400,
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
            },
          }
        );
      }

      // Require userEmail for tracking
      if (!userEmail) {
        return new Response(
          JSON.stringify({ error: "Missing required field: userEmail" }),
          {
            status: 400,
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
            },
          }
        );
      }

      // Create source
      const sourceId = await ctx.runMutation(api.sources.ingestSource, {
        type: "url",
        url,
        ownerEmail: userEmail,
        metadata: {
          title: `Webhook import: ${new URL(url).hostname}`,
        },
      });

      // Create job
      const jobId = await ctx.runMutation(api.jobs.createJob, {
        sourceId,
        ownerEmail: userEmail,
        formats: formats.filter((f: string) => 
          ["facebook_ad", "swipe_file", "cold_email", "tweet_thread", "youtube_script"].includes(f)
        ),
      });

      return new Response(
        JSON.stringify({ 
          sourceId,
          jobId,
          status: "queued",
          message: "Job created successfully",
        }),
        {
          status: 200,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error: any) {
      console.error("Webhook error:", error);
      return new Response(
        JSON.stringify({ error: error.message }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }
  }),
});

// Status check endpoint
http.route({
  path: "/api/status",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    const url = new URL(request.url);
    const jobId = url.searchParams.get("jobId");
    
    if (!jobId) {
      return new Response(
        JSON.stringify({ error: "jobId parameter required" }),
        { status: 400 }
      );
    }
    
    try {
      const job = await ctx.runQuery(api.jobs.getJob, {
        jobId: jobId as any,
      });

      if (!job) {
        return new Response(
          JSON.stringify({ error: "Job not found" }),
          { status: 404 }
        );
      }

      const assets = job.status === "done" 
        ? await ctx.runQuery(api.assets.getAssetsByJob, { jobId: job._id })
        : [];

      return new Response(
        JSON.stringify({
          jobId: job._id,
          status: job.status,
          formats: job.formats,
          createdAt: job.createdAt,
          updatedAt: job.updatedAt,
          assets: assets.map((a: Doc<"assets">) => ({
            id: a._id,
            format: a.format,
            size: a.size,
          })),
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error: any) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500 }
      );
    }
  }),
});

export default http;