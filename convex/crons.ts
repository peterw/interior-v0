import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// Process queued jobs every 2 minutes
crons.interval(
  "process jobs",
  { minutes: 2 },
  internal.processor.processJobs
);

// Clean up old data every day at 3 AM
crons.daily(
  "cleanup old data",
  { hourUTC: 3, minuteUTC: 0 },
  internal.cleanup.cleanupOldData
);

export default crons;