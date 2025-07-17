"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function CreditDisplay() {
  const { user } = useAuth();
  const router = useRouter();
  const creditBalance = user?.subscription?.credit_balance || 0;

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg border border-gray-100 flex items-center gap-2 text-sm text-gray-700">
      <Sparkles className="h-4 w-4 text-gray-900" />
      <span className="font-medium">{creditBalance} {creditBalance === 1 ? 'credit' : 'credits'}</span>
      {creditBalance === 0 && (
        <button
          onClick={() => router.push('/upgrade')}
          className="ml-2 text-black font-medium hover:text-gray-700 transition-colors duration-200"
        >
          Get more
        </button>
      )}
    </div>
  );
}