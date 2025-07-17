"use client";

import React, { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import Image from "next/image";
import { Trash2, Edit, Globe, Lock, Star, Plus, Search, Filter } from "lucide-react";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";

interface StyleLibraryProps {
  onSelectStyle?: (styleId: string) => void;
}

export function StyleLibrary({ onSelectStyle }: StyleLibraryProps) {
  const userStyles = useQuery(api.interior.getUserCustomStyles, {});
  const publicStyles = useQuery(api.interior.getPublicStyles, {});
  const deleteStyle = useMutation(api.interior.deleteCustomStyle);
  const updateStyle = useMutation(api.interior.updateCustomStyle);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [editingStyle, setEditingStyle] = useState<Doc<"interiorCustomStyles"> | null>(null);
  const [deleteConfirmStyle, setDeleteConfirmStyle] = useState<Id<"interiorCustomStyles"> | null>(null);
  
  // Extract all unique tags
  const allTags = Array.from(new Set([
    ...(userStyles?.flatMap((s: Doc<"interiorCustomStyles">) => s.tags) || []),
    ...(publicStyles?.flatMap((s: Doc<"interiorCustomStyles">) => s.tags) || [])
  ]));
  
  const filterStyles = (styles: Doc<"interiorCustomStyles">[]) => {
    return styles.filter(style => {
      const matchesSearch = searchQuery === "" || 
        style.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        style.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTags = selectedTags.length === 0 ||
        selectedTags.some(tag => style.tags.includes(tag));
      
      return matchesSearch && matchesTags;
    });
  };
  
  const handleDelete = async (styleId: Id<"interiorCustomStyles">) => {
    try {
      await deleteStyle({ styleId });
      toast.success("Style deleted successfully");
      setDeleteConfirmStyle(null);
    } catch (error) {
      toast.error("Failed to delete style");
    }
  };
  
  const handleUpdate = async () => {
    if (!editingStyle) return;
    
    try {
      await updateStyle({
        styleId: editingStyle._id,
        name: editingStyle.name,
        description: editingStyle.description,
        isPublic: editingStyle.isPublic,
        tags: editingStyle.tags,
      });
      toast.success("Style updated successfully");
      setEditingStyle(null);
    } catch (error) {
      toast.error("Failed to update style");
    }
  };
  
  const StyleCard = ({ style, isOwner }: { style: Doc<"interiorCustomStyles">, isOwner: boolean }) => (
    <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{style.name}</CardTitle>
            <CardDescription className="mt-1 line-clamp-2">
              {style.description || "Custom interior design style"}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            {style.isPublic ? (
              <Globe className="w-4 h-4 text-gray-500" />
            ) : (
              <Lock className="w-4 h-4 text-gray-500" />
            )}
            {style.usageCount > 0 && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-gray-500">{style.usageCount}</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {style.referenceImages.slice(0, 3).map((img, idx) => (
            <div key={idx} className="relative aspect-square rounded overflow-hidden">
              <Image
                src={img.url}
                alt={`Reference ${idx + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
        
        {style.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {style.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        {style.extractedCharacteristics && (
          <div className="text-xs text-gray-500 space-y-1 mb-4">
            <p><strong>Colors:</strong> {style.extractedCharacteristics.colors.slice(0, 3).join(", ")}</p>
            <p><strong>Materials:</strong> {style.extractedCharacteristics.materials.slice(0, 3).join(", ")}</p>
          </div>
        )}
        
        <div className="flex gap-2">
          <Button
            size="sm"
            className="flex-1"
            onClick={() => onSelectStyle?.(style._id)}
          >
            Use Style
          </Button>
          {isOwner && (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingStyle(style);
                }}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteConfirmStyle(style._id);
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
  
  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search styles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          {allTags.map(tag => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => {
                setSelectedTags(prev =>
                  prev.includes(tag)
                    ? prev.filter(t => t !== tag)
                    : [...prev, tag]
                );
              }}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      
      {/* Style Tabs */}
      <Tabs defaultValue="my-styles" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="my-styles">My Styles</TabsTrigger>
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
        </TabsList>
        
        <TabsContent value="my-styles" className="mt-6">
          <ScrollArea className="h-[600px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filterStyles(userStyles || []).map(style => (
                <StyleCard key={style._id} style={style} isOwner={true} />
              ))}
            </div>
            {userStyles?.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No custom styles yet.</p>
                <Button className="mt-4" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Style
                </Button>
              </div>
            )}
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="marketplace" className="mt-6">
          <ScrollArea className="h-[600px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filterStyles(publicStyles || []).map(style => (
                <StyleCard key={style._id} style={style} isOwner={false} />
              ))}
            </div>
            {publicStyles?.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No public styles available yet.</p>
              </div>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>
      
      {/* Edit Dialog */}
      <Dialog open={!!editingStyle} onOpenChange={(open) => !open && setEditingStyle(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Style</DialogTitle>
            <DialogDescription>
              Update your custom style details
            </DialogDescription>
          </DialogHeader>
          
          {editingStyle && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={editingStyle.name}
                  onChange={(e) => setEditingStyle({
                    ...editingStyle,
                    name: e.target.value
                  })}
                />
              </div>
              
              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingStyle.description || ""}
                  onChange={(e) => setEditingStyle({
                    ...editingStyle,
                    description: e.target.value
                  })}
                  rows={3}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="edit-public">Make Public</Label>
                <div className="flex items-center gap-2">
                  {editingStyle.isPublic ? <Globe className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingStyle({
                      ...editingStyle,
                      isPublic: !editingStyle.isPublic
                    })}
                  >
                    {editingStyle.isPublic ? "Public" : "Private"}
                  </Button>
                </div>
              </div>
              
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setEditingStyle(null)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdate}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirmStyle} onOpenChange={(open) => !open && setDeleteConfirmStyle(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Style</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this style? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setDeleteConfirmStyle(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteConfirmStyle && handleDelete(deleteConfirmStyle)}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}