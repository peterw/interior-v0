import { useEffect, useRef, useState, useCallback } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

interface ContextualSuggestion {
  text: string;
  icon: string;
  category: 'style' | 'lighting' | 'furniture' | 'color' | 'layout';
}

interface ProgressStep {
  step: 'analyzing' | 'generating' | 'refining' | 'finalizing';
  label: string;
  duration: number;
}

export function useCanvasChatEnhancements() {
  const [draftPrompt, setDraftPrompt] = useState<string>('');
  const [currentProgress, setCurrentProgress] = useState<ProgressStep | null>(null);
  const [contextualSuggestions, setContextualSuggestions] = useState<ContextualSuggestion[]>([]);
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);
  const [successAnimation, setSuccessAnimation] = useState(false);
  const lastSavedRef = useRef<number>(Date.now());
  
  // Progressive loading states for images
  const [imageLoadingStates, setImageLoadingStates] = useState<Record<string, boolean>>({});
  
  // Navigation index for keyboard navigation
  const [navigationIndex, setNavigationIndex] = useState<number>(-1);

  // Auto-save draft functionality
  useEffect(() => {
    const saveTimer = setInterval(() => {
      const now = Date.now();
      if (draftPrompt && now - lastSavedRef.current > 2000) {
        localStorage.setItem('canvas-chat-draft', draftPrompt);
        lastSavedRef.current = now;
      }
    }, 2000);

    return () => clearInterval(saveTimer);
  }, [draftPrompt]);

  // Restore draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('canvas-chat-draft');
    if (savedDraft) {
      setDraftPrompt(savedDraft);
    }
  }, []);

  // Clear draft after successful submission
  const clearDraft = useCallback(() => {
    setDraftPrompt('');
    localStorage.removeItem('canvas-chat-draft');
  }, []);

  // Progress steps for generation
  const progressSteps: ProgressStep[] = [
    { step: 'analyzing', label: 'Analyzing your request...', duration: 800 },
    { step: 'generating', label: 'Creating design variations...', duration: 1200 },
    { step: 'refining', label: 'Refining details...', duration: 700 },
    { step: 'finalizing', label: 'Finalizing your design...', duration: 300 }
  ];

  // Smart progress indicator
  const startProgress = useCallback(() => {
    let stepIndex = 0;
    
    const runStep = () => {
      if (stepIndex < progressSteps.length) {
        setCurrentProgress(progressSteps[stepIndex]);
        setTimeout(() => {
          stepIndex++;
          runStep();
        }, progressSteps[stepIndex].duration);
      } else {
        setCurrentProgress(null);
        setSuccessAnimation(true);
        setTimeout(() => setSuccessAnimation(false), 1500);
      }
    };
    
    runStep();
  }, []);

  // Generate contextual suggestions based on current result
  const generateContextualSuggestions = useCallback((prompt: string, style?: string) => {
    const suggestions: ContextualSuggestion[] = [];
    
    // Style-based suggestions
    if (style?.toLowerCase().includes('modern')) {
      suggestions.push(
        { text: 'Add metallic accents', icon: '✨', category: 'style' },
        { text: 'Incorporate glass elements', icon: '🪟', category: 'style' }
      );
    } else if (style?.toLowerCase().includes('cozy')) {
      suggestions.push(
        { text: 'Add warm textiles', icon: '🧶', category: 'style' },
        { text: 'Include fireplace', icon: '🔥', category: 'furniture' }
      );
    }
    
    // Prompt-based suggestions
    if (prompt.toLowerCase().includes('living room')) {
      suggestions.push(
        { text: 'Add statement lighting', icon: '💡', category: 'lighting' },
        { text: 'Include entertainment center', icon: '📺', category: 'furniture' }
      );
    }
    
    // Always include some general suggestions
    suggestions.push(
      { text: 'Adjust color temperature', icon: '🎨', category: 'color' },
      { text: 'Rearrange layout', icon: '📐', category: 'layout' }
    );
    
    setContextualSuggestions(suggestions.slice(0, 4));
  }, []);

  // Copy prompt functionality
  const copyPrompt = useCallback((prompt: string) => {
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(prompt);
    setTimeout(() => setCopiedPrompt(null), 2000);
  }, []);

  // Image loading with blur-up effect
  const handleImageLoad = useCallback((imageId: string) => {
    setImageLoadingStates(prev => ({ ...prev, [imageId]: true }));
  }, []);

  // Keyboard navigation
  const navigateHistory = useCallback((direction: 'up' | 'down', historyLength: number) => {
    setNavigationIndex(prev => {
      if (direction === 'up') {
        return Math.max(0, prev - 1);
      } else {
        return Math.min(historyLength - 1, prev + 1);
      }
    });
  }, []);

  // Keyboard shortcuts
  useHotkeys('cmd+z, ctrl+z', () => {
    // Undo last action - could be implemented based on specific needs
    console.log('Undo triggered');
  });

  useHotkeys('cmd+enter, ctrl+enter', () => {
    // Quick submit - trigger submit button click
    const submitButton = document.querySelector('[data-submit-button]') as HTMLButtonElement;
    submitButton?.click();
  });

  useHotkeys('/', (e) => {
    e.preventDefault();
    // Focus on input
    const input = document.querySelector('[data-prompt-input]') as HTMLInputElement;
    input?.focus();
  });

  useHotkeys('cmd+k, ctrl+k', (e) => {
    e.preventDefault();
    // Clear input
    const input = document.querySelector('[data-prompt-input]') as HTMLInputElement;
    if (input) {
      input.value = '';
      input.focus();
    }
  });

  // Double-click zoom handler
  const handleDoubleClickZoom = useCallback((currentZoom: number, setZoom: (zoom: number) => void) => {
    const newZoom = currentZoom === 100 ? 150 : 100;
    setZoom(newZoom);
  }, []);

  return {
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
  };
}