"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export function useUser() {
  // Mock user data for now - replace with actual user authentication
  const user = {
    id: "user-1",
    email: "user@example.com",
    name: "Test User",
  };

  return { user };
}