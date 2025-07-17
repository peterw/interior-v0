/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as assets from "../assets.js";
import type * as brandTone from "../brandTone.js";
import type * as chat from "../chat.js";
import type * as cleanup from "../cleanup.js";
import type * as crons from "../crons.js";
import type * as http from "../http.js";
import type * as init from "../init.js";
import type * as jobs from "../jobs.js";
import type * as processor from "../processor.js";
import type * as projects from "../projects.js";
import type * as sources from "../sources.js";
import type * as templates from "../templates.js";
import type * as twitter from "../twitter.js";
import type * as twitterSource from "../twitterSource.js";
import type * as youtube from "../youtube.js";
import type * as youtubeSource from "../youtubeSource.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  assets: typeof assets;
  brandTone: typeof brandTone;
  chat: typeof chat;
  cleanup: typeof cleanup;
  crons: typeof crons;
  http: typeof http;
  init: typeof init;
  jobs: typeof jobs;
  processor: typeof processor;
  projects: typeof projects;
  sources: typeof sources;
  templates: typeof templates;
  twitter: typeof twitter;
  twitterSource: typeof twitterSource;
  youtube: typeof youtube;
  youtubeSource: typeof youtubeSource;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
