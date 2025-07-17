"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles } from "lucide-react";
import { CustomStyleUpload } from "../components/CustomStyleUpload";
import { StyleLibrary } from "../components/StyleLibrary";
import { useRouter } from "next/navigation";

export default function StylesPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const router = useRouter();
  
  const handleStyleCreated = (styleId: string) => {
    setShowCreateModal(false);
    // Redirect to the main interior page with the new style selected
    router.push(`/interior?styleId=${styleId}`);
  };
  
  const handleSelectStyle = (styleId: string) => {
    // Redirect to the main interior page with the selected style
    router.push(`/interior?styleId=${styleId}`);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold">Style Library</h1>
            <p className="text-gray-600 mt-2">
              Manage your custom interior design styles and explore community creations
            </p>
          </div>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Create New Style
          </Button>
        </div>
      </div>
      
      <StyleLibrary onSelectStyle={handleSelectStyle} />
      
      <CustomStyleUpload
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onStyleCreated={handleStyleCreated}
      />
    </div>
  );
}