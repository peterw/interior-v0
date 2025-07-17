"use client";

import "./canvas-chat.css";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { 
  Send, 
  Download, 
  Save, 
  Share2, 
  ZoomIn, 
  ZoomOut,
  Maximize2,
  Menu,
  RefreshCw,
  Loader2,
  AlertCircle,
  Brush,
  X,
  RotateCcw,
  Check,
  Sparkles,
  User,
  Bot,
  Clock,
  Layers,
  Eye,
  EyeOff,
  ChevronRight,
  ArrowUp,
  Wand2,
  Copy,
  CheckCircle2,
  Lightbulb,
  ArrowRight
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCanvasChatEnhancements } from "./logic/useCanvasChatEnhancements";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useHotkeys } from "react-hotkeys-hook";

interface PromptResult {
  id: string;
  prompt: string;
  resultImage: string;
  timestamp: Date;
  style?: string;
  room?: string;
  status?: 'generating' | 'completed' | 'error';
  quality?: string;
}

// Mock data for demonstration
const mockHistory: PromptResult[] = [
  {
    id: "1",
    prompt: "Make this a modern minimalist living room with neutral tones",
    resultImage: "https://images.unsplash.com/photo-1565183997392-2f6f122e5912?w=1200&h=800&fit=crop",
    timestamp: new Date("2024-01-20T10:30:00"),
    style: "Modern Minimalist",
    room: "Living Room",
    status: 'completed',
    quality: 'Max Quality'
  },
  {
    id: "2", 
    prompt: "Add warm lighting and cozy atmosphere with soft textures",
    resultImage: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1200&h=800&fit=crop",
    timestamp: new Date("2024-01-20T10:32:00"),
    style: "Cozy Modern",
    room: "Living Room",
    status: 'completed',
    quality: 'Max Quality'
  },
  {
    id: "3",
    prompt: "Include plants and natural elements for a biophilic design",
    resultImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=800&fit=crop",
    timestamp: new Date("2024-01-20T10:35:00"),
    style: "Biophilic Modern",
    room: "Living Room",
    status: 'completed',
    quality: 'Max Quality'
  }
];

const quickIdeas = [
  { text: "Add plants", icon: "🌿" },
  { text: "Scandinavian style", icon: "🏔️" },
  { text: "Brighter lighting", icon: "💡" },
  { text: "More cozy", icon: "🛋️" }
];

export default function CanvasChatPage() {
  const [history, setHistory] = useState<PromptResult[]>(mockHistory);
  const [activeResult, setActiveResult] = useState<PromptResult>(mockHistory[mockHistory.length - 1]);
  const [inputPrompt, setInputPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [viewMode, setViewMode] = useState<'original' | 'transformed'>('transformed');
  const [showComparison, setShowComparison] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [beforeImage] = useState("https://images.unsplash.com/photo-1486304873000-235643847519?w=1200&h=800&fit=crop");
  const [showPaintModal, setShowPaintModal] = useState(false);
  const [brushSize, setBrushSize] = useState(20);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedHistoryId, setSelectedHistoryId] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Use the enhanced features hook
  const {
    draftPrompt,
    setDraftPrompt,
    clearDraft,
    currentProgress,
    startProgress,
    contextualSuggestions,
    generateContextualSuggestions,
    copyPrompt,
    copiedPrompt,
    successAnimation,
    imageLoadingStates,
    handleImageLoad,
    navigationIndex,
    navigateHistory,
    handleDoubleClickZoom
  } = useCanvasChatEnhancements();
  
  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);
  
  // Update draft when input changes
  useEffect(() => {
    setDraftPrompt(inputPrompt);
  }, [inputPrompt, setDraftPrompt]);
  
  // Generate contextual suggestions when active result changes
  useEffect(() => {
    if (activeResult) {
      generateContextualSuggestions(activeResult.prompt, activeResult.style);
    }
  }, [activeResult, generateContextualSuggestions]);
  
  // Keyboard navigation for history
  useHotkeys('ArrowUp', () => {
    navigateHistory('up', history.length);
  }, [history]);
  
  useHotkeys('ArrowDown', () => {
    navigateHistory('down', history.length);
  }, [history]);
  
  // Set active result when navigating with keyboard
  useEffect(() => {
    if (navigationIndex >= 0 && navigationIndex < history.length) {
      setActiveResult(history[navigationIndex]);
      setSelectedHistoryId(history[navigationIndex].id);
    }
  }, [navigationIndex, history]);

  const handleSubmitPrompt = async () => {
    if (!inputPrompt.trim() || isProcessing) return;

    // Start the progress animation
    startProgress();
    
    // Add generating state immediately
    const newResult: PromptResult = {
      id: Date.now().toString(),
      prompt: inputPrompt,
      resultImage: "",
      timestamp: new Date(),
      style: "Processing...",
      room: activeResult.room || "Living Room",
      status: 'generating',
      quality: 'Max Quality'
    };
    
    setHistory([...history, newResult]);
    setActiveResult(newResult);
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const updatedResult = {
        ...newResult,
        resultImage: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?w=1200&h=800&fit=crop`,
        style: "Custom Design",
        status: 'completed' as const
      };
      
      setHistory(prev => prev.map(item => 
        item.id === newResult.id ? updatedResult : item
      ));
      setActiveResult(updatedResult);
      setInputPrompt("");
      clearDraft();
      setIsProcessing(false);
    }, 3000);
  };

  const handleQuickIdea = (idea: string) => {
    setInputPrompt(idea);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    }).format(date);
  };

  // Paint functionality
  useEffect(() => {
    if (showPaintModal && canvasRef.current && imageRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      // Set canvas size to match image
      canvas.width = imageRef.current.width;
      canvas.height = imageRef.current.height;
      
      // Clear canvas
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, [showPaintModal]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);

    ctx.globalAlpha = 0.5;
    ctx.fillStyle = '#3B82F6';
    ctx.beginPath();
    ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
    ctx.fill();
  };

  const resetCanvas = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const LeftPanelContent = () => (
    <div className="h-full flex flex-col glass-panel">
      {/* Header */}
      <div className="px-6 py-5 glass-header flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Wand2 className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Living Room Redesign</h1>
            </div>
            <p className="text-sm text-gray-500 ml-10">Interior Design Project</p>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="glass-button text-gray-600 hover:text-gray-900"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share project</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Chat Timeline */}
      <div className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar">
        <div className="space-y-8">
          {history.map((item, index) => (
            <div 
              key={item.id} 
              className="timeline-group"
              onClick={() => {
                setActiveResult(item);
                setSelectedHistoryId(item.id);
              }}
            >
              {/* Prompt-Result Pair */}
              <div className={cn(
                "prompt-result-pair",
                selectedHistoryId === item.id && "selected"
              )}>
                {/* User Prompt */}
                <div className="prompt-card glass-card group">
                  <div className="flex items-start gap-3">
                    <div className="avatar-wrapper user-avatar">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-xs font-medium text-gray-600">You</p>
                        <span className="text-xs text-gray-400">•</span>
                        <p className="text-xs text-gray-400">
                          {formatDate(item.timestamp)}
                        </p>
                      </div>
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm text-gray-800 leading-relaxed flex-1">{item.prompt}</p>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  copyPrompt(item.prompt);
                                }}
                              >
                                {copiedPrompt === item.prompt ? (
                                  <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                                ) : (
                                  <Copy className="h-3.5 w-3.5" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{copiedPrompt === item.prompt ? 'Copied!' : 'Copy prompt'}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Connection Line */}
                <div className="connection-line" />
            
                {/* AI Result */}
                {item.status === 'generating' ? (
                  <div className="result-card glass-card generating">
                    <div className="flex items-start gap-3">
                      <div className="avatar-wrapper ai-avatar animating">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <p className="text-xs font-medium text-gray-600">AI Designer</p>
                          <span className="text-xs text-gray-400">•</span>
                          <p className="text-xs text-gray-400">Generating...</p>
                        </div>
                        {currentProgress ? (
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                              <p className="text-sm font-medium text-gray-700">
                                {currentProgress.label}
                              </p>
                            </div>
                            <Progress 
                              value={
                                currentProgress.step === 'analyzing' ? 25 :
                                currentProgress.step === 'generating' ? 50 :
                                currentProgress.step === 'refining' ? 75 : 95
                              } 
                              className="h-2"
                            />
                          </div>
                        ) : (
                          <div>
                            <div className="generating-animation">
                              <div className="pulse-dot" />
                              <div className="pulse-dot" style={{ animationDelay: '0.2s' }} />
                              <div className="pulse-dot" style={{ animationDelay: '0.4s' }} />
                            </div>
                            <p className="text-xs text-gray-500 mt-2">Creating your design...</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : item.status === 'error' ? (
                  <div className="result-card glass-card error">
                    <div className="flex items-start gap-3">
                      <div className="avatar-wrapper ai-avatar error">
                        <AlertCircle className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700 mb-2">Generation failed</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="glass-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Retry logic here
                          }}
                        >
                          <RefreshCw className="h-3 w-3 mr-2" />
                          Retry
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="result-card glass-card with-image">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="avatar-wrapper ai-avatar">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-xs font-medium text-gray-600">AI Designer</p>
                          <span className="text-xs text-gray-400">•</span>
                          <p className="text-xs text-gray-400">{item.style}</p>
                        </div>
                      </div>
                    </div>
                    <div className="relative rounded-lg overflow-hidden image-preview">
                      <div className={cn(
                        "absolute inset-0 bg-gray-200 animate-pulse transition-opacity duration-300",
                        imageLoadingStates[item.id] && "opacity-0"
                      )} />
                      <Image
                        src={item.resultImage}
                        alt={`Result ${index + 1}`}
                        width={400}
                        height={250}
                        className={cn(
                          "w-full h-auto object-cover transition-all duration-700",
                          !imageLoadingStates[item.id] && "blur-sm scale-105",
                          imageLoadingStates[item.id] && "blur-0 scale-100"
                        )}
                        onLoad={() => handleImageLoad(item.id)}
                      />
                      <div className="image-overlay">
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="glass-button-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveResult(item);
                            }}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button 
                            size="sm" 
                            className="glass-button-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              setInputPrompt(`Branch from: ${item.prompt}`);
                            }}
                          >
                            <Layers className="w-4 h-4 mr-1" />
                            Branch
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-xs text-gray-500">{item.room} • {item.quality}</p>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div ref={chatEndRef} />
      </div>

      {/* Input Section */}
      <div className="glass-footer mt-auto flex-shrink-0">
        {/* Dynamic Contextual Suggestions */}
        <div className="quick-ideas-section-compact">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Lightbulb className="w-3 h-3" />
              <span>Suggestions:</span>
            </div>
            {contextualSuggestions.length > 0 ? (
              contextualSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className={cn(
                    "quick-idea-pill-compact group",
                    "hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200"
                  )}
                  onClick={() => handleQuickIdea(suggestion.text)}
                >
                  <span className="text-xs flex items-center gap-1">
                    <span>{suggestion.icon}</span>
                    <span>{suggestion.text}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                </button>
              ))
            ) : (
              quickIdeas.map((idea, index) => (
                <button
                  key={index}
                  className="quick-idea-pill-compact"
                  onClick={() => handleQuickIdea(idea.text)}
                >
                  <span className="text-xs">{idea.text}</span>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Prompt Input - Simplified */}
        <div className="input-container-compact">
          <div className="relative flex items-center">
            <Input
              ref={inputRef}
              placeholder="Describe the change you want... (Press / to focus)"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSubmitPrompt()}
              className="input-compact pr-12"
              disabled={isProcessing}
              data-prompt-input
            />
            <Button 
              onClick={handleSubmitPrompt}
              disabled={!inputPrompt.trim() || isProcessing}
              size="icon"
              className={cn(
                "absolute right-1 h-8 w-8 rounded-lg transition-all",
                isProcessing
                  ? "bg-gray-400 text-white"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white",
                successAnimation && "animate-success-pulse"
              )}
              data-submit-button
            >
              {isProcessing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ArrowUp className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen overflow-hidden bg-gray-50">
      {/* Three Panel Layout */}
      <div className="flex h-full">
        {/* Left Panel - Chat + History (Mobile Sheet) */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              className="fixed top-4 left-4 z-30 bg-white shadow-md text-gray-700 hover:bg-gray-100"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:w-96 p-0">
            <LeftPanelContent />
          </SheetContent>
        </Sheet>

        {/* Left Panel - Desktop */}
        <div className="hidden md:flex w-[400px] border-r flex-col border-gray-200">
          <LeftPanelContent />
        </div>

        {/* Center Panel - Main Preview */}
        <div className="flex-1 flex flex-col overflow-hidden preview-panel">
          {/* Main Preview Header */}
          <div className="glass-header px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-6">
              {/* View Mode Toggle */}
              <div className="view-toggle-group">
                <button
                  className={cn(
                    "view-toggle",
                    viewMode === 'original' && "active"
                  )}
                  onClick={() => setViewMode('original')}
                >
                  <EyeOff className="w-4 h-4 mr-2" />
                  Original
                </button>
                <button
                  className={cn(
                    "view-toggle",
                    viewMode === 'transformed' && "active"
                  )}
                  onClick={() => setViewMode('transformed')}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Transformed
                </button>
              </div>
              
              {/* Comparison Toggle */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(
                        "glass-button",
                        showComparison && "glass-button-active"
                      )}
                      onClick={() => setShowComparison(!showComparison)}
                    >
                      <Layers className="w-4 h-4 mr-2" />
                      Compare
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Toggle before/after comparison</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* Zoom Controls */}
              <div className="hidden lg:flex items-center zoom-controls">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => setZoom(Math.max(50, zoom - 10))}
                        className="zoom-button"
                      >
                        <ZoomOut className="h-4 w-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Zoom out</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <span className="zoom-value">{zoom}%</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => setZoom(Math.min(200, zoom + 10))}
                        className="zoom-button"
                      >
                        <ZoomIn className="h-4 w-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Zoom in</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <div className="zoom-separator" />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => setZoom(100)}
                        className="zoom-button"
                      >
                        <Maximize2 className="h-4 w-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Reset zoom</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline"
                      size="sm"
                      className="glass-button"
                      disabled={!activeResult.resultImage || activeResult.status === 'generating'}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Save to project</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      size="sm"
                      className="glass-button-primary"
                      disabled={!activeResult.resultImage || activeResult.status === 'generating'}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Download image</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Main Preview Content */}
          <div className="flex-1 relative overflow-hidden flex items-center justify-center p-8 preview-area">
            {/* Success Animation Overlay */}
            {successAnimation && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-50">
                <div className="success-animation">
                  <CheckCircle2 className="w-20 h-20 text-green-500" />
                </div>
              </div>
            )}
            {activeResult.resultImage ? (
              <>
                {showComparison ? (
                  // Comparison View
                  <div className="comparison-container" style={{ transform: `scale(${zoom / 100})` }}>
                    <div className="comparison-panel">
                      <div className="comparison-label">Before</div>
                      <Image
                        src={beforeImage}
                        alt="Original room"
                        width={600}
                        height={400}
                        className="comparison-image"
                        priority
                      />
                    </div>
                    <div className="comparison-divider">
                      <div className="divider-handle">
                        <Layers className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="comparison-panel">
                      <div className="comparison-label">After</div>
                      <Image
                        src={activeResult.resultImage}
                        alt="Transformed room"
                        width={600}
                        height={400}
                        className="comparison-image"
                        priority
                      />
                    </div>
                  </div>
                ) : (
                  // Single View
                  <div 
                    className="image-container"
                    style={{ 
                      transform: `scale(${zoom / 100})`,
                      maxWidth: '90%',
                      maxHeight: '90%'
                    }}
                    onDoubleClick={() => handleDoubleClickZoom(zoom, setZoom)}
                  >
                    <div className={cn(
                      "absolute inset-0 bg-gray-200 animate-pulse transition-opacity duration-300 rounded-lg",
                      imageLoadingStates[activeResult.id] && "opacity-0"
                    )} />
                    <Image
                      src={viewMode === 'original' ? beforeImage : activeResult.resultImage}
                      alt={viewMode === 'original' ? "Original room" : "Transformed room"}
                      width={1200}
                      height={800}
                      className={cn(
                        "main-image transition-all duration-700",
                        !imageLoadingStates[activeResult.id] && "blur-sm scale-105",
                        imageLoadingStates[activeResult.id] && "blur-0 scale-100"
                      )}
                      priority
                      onLoad={() => handleImageLoad(activeResult.id)}
                    />
                    
                    {/* Status Badge */}
                    <div className="status-badge">
                      <div className="status-content">
                        {viewMode === 'original' ? (
                          <>
                            <EyeOff className="w-3 h-3" />
                            <span>Original</span>
                          </>
                        ) : (
                          <>
                            <Eye className="w-3 h-3" />
                            <span>{activeResult.style}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="empty-state glass-card">
                <div className="empty-icon">
                  <Wand2 className="w-8 h-8" />
                </div>
                <p className="text-lg font-medium mb-2 text-gray-700">
                  No design selected
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Create a new design or select from your history
                </p>
                <Button
                  size="sm"
                  className="glass-button-primary"
                  onClick={() => document.querySelector<HTMLInputElement>('.glass-input')?.focus()}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Start creating
                </Button>
              </div>
            )}

            {/* Floating Paint Button - Available for both original and transformed */}
            {activeResult.resultImage && !showComparison && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setShowPaintModal(true)}
                      className="floating-action-button"
                    >
                      <Brush className="h-6 w-6" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Paint & mask areas</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
      </div>

      {/* Paint Modal */}
      <Dialog open={showPaintModal} onOpenChange={setShowPaintModal}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden glass-modal">
          <DialogHeader className="p-4 glass-header">
            <DialogTitle className="text-gray-900 flex items-center gap-2">
              <Brush className="w-5 h-5" />
              Paint & Mask Tool
            </DialogTitle>
          </DialogHeader>
          
          <div className="paint-modal-content">
            {/* Toolbar */}
            <div className="paint-toolbar glass-card">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Brush Size:</span>
                  <div className="brush-size-group">
                    {[10, 20, 40].map(size => (
                      <TooltipProvider key={size}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={() => setBrushSize(size)}
                              className={cn(
                                "brush-size-button",
                                brushSize === size && "active"
                              )}
                            >
                              <div 
                                className="brush-preview" 
                                style={{ 
                                  width: `${size / 2}px`, 
                                  height: `${size / 2}px` 
                                }}
                              />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{size}px brush</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetCanvas}
                  className="glass-button"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
                <Button
                  size="sm"
                  onClick={() => setShowPaintModal(false)}
                  className="glass-button-primary"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Apply Mask
                </Button>
              </div>
            </div>

            {/* Canvas Area */}
            <div className="paint-canvas-area">
              <div className="canvas-container">
                <Image
                  ref={imageRef}
                  src={activeResult.resultImage}
                  alt="Paint canvas"
                  width={800}
                  height={600}
                  className="canvas-image"
                />
                <canvas
                  ref={canvasRef}
                  className="paint-canvas"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}