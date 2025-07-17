"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null;

function ConvexTokenProvider({ children }: { children: ReactNode }) {
  // Skip Convex provider if URL is not configured (during build)
  if (!convex) {
    return <>{children}</>;
  }

  // Convex is used without authentication - auth is handled by Django
  return (
    <ConvexProvider client={convex}>
      {children}
    </ConvexProvider>
  );
}

export { ConvexTokenProvider };