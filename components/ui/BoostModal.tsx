"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have a utility for classnames

interface BoostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (details: { purchase_type: "localboost" | "superboost" }) => void; // Updated function signature
  showLocalBoostTab?: boolean; // Optional prop to control whether to show LocalBoost tab
}

export function BoostModal({ isOpen, onClose, onConfirm, showLocalBoostTab = true }: BoostModalProps) {
  const [planType, setPlanType] = useState<"localboost" | "superboost">("superboost"); // Default to 'superboost'

  // Use DialogPortal to ensure the modal renders outside the main DOM tree
  // Use DialogOverlay for the grayed-out background effect
  // DialogContent holds the modal itself. We customize its size and styling.
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPortal>
        <DialogOverlay className="bg-black/10 backdrop-blur-sm" />
        <DialogContent
          className="max-w-4xl w-full p-0 overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-0 shadow-xl rounded-lg border-none"
          onInteractOutside={onClose} // Close on clicking outside
        >
          {/* Left Side - Image */}
          <div className="relative h-64 md:h-full w-full">
            <Image
              src={planType === "localboost" ? "/images/regular-boost.png" : "/images/super-boost.png"}
              alt="Boost illustration"
              layout="fill"
              objectFit="cover"
              className="rounded-l-lg"
            />
          </div>

          {/* Right Side - Content */}
          <div className="flex flex-col bg-gray-900 text-white p-8 rounded-r-lg relative">
            {/* Close button (Re-added and styled) */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>

            {showLocalBoostTab ? (
              <Tabs
                value={planType} // Use planType directly
                onValueChange={(value) => setPlanType(value as "localboost" | "superboost")}
                className="mb-6 self-start"
              >
                <TabsList className="grid grid-cols-2 bg-gray-800 p-1 rounded-md border border-gray-700">
                  <TabsTrigger
                    value="superboost" // Set value to 'superboost'
                    className={cn(
                      "px-4 py-1.5 text-sm rounded-sm text-gray-400 data-[state=active]:bg-gray-700 data-[state=active]:text-white data-[state=active]:shadow-none",
                      planType === "superboost" && "ring-1 ring-gray-600" // Check against 'superboost'
                    )}
                  >
                    SuperBoost - <span className="text-purple-500 ml-1"> 4X Stronger</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="localboost" // Set value to 'localboost'
                    className={cn(
                      "px-4 py-1.5 text-sm rounded-sm text-gray-400 data-[state=active]:bg-gray-700 data-[state=active]:text-white data-[state=active]:shadow-none",
                       planType === "localboost" && "ring-1 ring-gray-600" // Check against 'localboost'
                    )}
                  >
                    Local Boost
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            ) : (
              <div className="mb-6 self-start px-4 py-2 bg-purple-100 text-purple-800 font-medium rounded-md flex items-center">
                SuperBoost - <span className="text-purple-500 ml-1"> 4X Stronger</span>
              </div>
            )}

            <h2 className="text-2xl font-semibold mb-2 pr-10">
              Upgrade to <span className={planType === "localboost" ? "text-blue-500" : "text-purple-500"}>{planType === "localboost" ? "LocalBoost" : "SuperBoost"}</span>
            </h2>
            <p className="text-gray-400 mb-6">
              {planType === "localboost"
                ? "Extra citations without PBNs."
                : "More powerful than Local Boost."}
            </p>

            {planType === "localboost" ? (
              <ul className="space-y-3 text-sm mb-8 text-gray-300">
                {[ // Local Boost Features
                  "0 PBN citations",
                  "300 3rd party citations",
                  "Boost existing citations with our indexing service",
                  "Submissions go live within 48-72 hours",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="space-y-3 text-sm mb-8 text-gray-300">
                {[ // Super Boost Features
                  "⁠⁠200 PBN citations (High DA, 90%+ indexation rate, default unlinked)",
                  "300 3rd party citations",
                  "Boost existing citations with our indexing service",
                  "Submissions go live within 48-72 hours",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}

            <Button
              size="lg"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base py-3"
              onClick={() => {
                // Directly use planType for purchase_type
                onConfirm({ purchase_type: planType });
                onClose(); // Close the modal after confirmation
              }}
            >
              Get {planType === "localboost" ? "LocalBoost Now!" : "SuperBoost Now!"}
            </Button>

            <p className="text-center text-sm text-gray-400 mt-4">
                Satisfaction Guaranteed · 24/7 Customer Support
            </p>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}      