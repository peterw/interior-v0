"use client";

import { useState } from "react";
import { FolderOpen, Plus, Calendar, Grid, List, Search, Filter, Download } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface Project {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  designCount: number;
  status: "active" | "archived";
  thumbnail: string;
}

// Mock data for demonstration
const mockProjects: Project[] = [
  {
    id: "1",
    name: "Living Room Renovation",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    designCount: 12,
    status: "active",
    thumbnail: "https://images.unsplash.com/photo-1565183997392-2f6f122e5912?w=400&h=300&fit=crop"
  },
  {
    id: "2", 
    name: "Master Bedroom Redesign",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-18",
    designCount: 8,
    status: "active",
    thumbnail: "https://images.unsplash.com/photo-1505577058444-a3dab90d4253?w=400&h=300&fit=crop"
  },
  {
    id: "3",
    name: "Kitchen Modernization",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-12",
    designCount: 15,
    status: "archived",
    thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop"
  }
];

export default function InteriorProjectsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "archived">("all");

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || project.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-black flex items-center justify-center">
                <FolderOpen className="h-6 w-6 text-white" />
              </div>
              Projects
            </h1>
            <p className="text-gray-600 mt-2">
              Organize and manage your interior design transformations
            </p>
          </div>
          <Link href="/interior">
            <Button className="bg-black hover:bg-gray-900 text-white shadow-md">
              <Plus className="h-4 w-4 mr-2" />
              New Design
            </Button>
          </Link>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6 border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Tabs value={filter} onValueChange={(value: any) => setFilter(value)} className="w-auto">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="archived">Archived</TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projects Display */}
        {filteredProjects.length === 0 ? (
          <Card className="border-0 shadow-sm">
            <CardContent className="py-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FolderOpen className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery ? "Try adjusting your search criteria" : "Start by creating your first design project"}
              </p>
              <Link href="/interior">
                <Button className="bg-black hover:bg-gray-900 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Design
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="border-0 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer group">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img
                    src={project.thumbnail}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Badge
                    variant={project.status === "active" ? "default" : "secondary"}
                    className="absolute top-3 right-3"
                  >
                    {project.status}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">{project.name}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(project.updatedAt).toLocaleDateString()}
                    </span>
                    <span className="font-medium">{project.designCount} designs</span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Project
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={project.thumbnail}
                      alt={project.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{project.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Last updated {new Date(project.updatedAt).toLocaleDateString()} • {project.designCount} designs
                          </p>
                        </div>
                        <Badge
                          variant={project.status === "active" ? "default" : "secondary"}
                        >
                          {project.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}