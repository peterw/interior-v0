"use client";

import { Player } from '@remotion/player';
import { InteriorTransformation } from '../remotion/InteriorTransformation';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useState } from 'react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface VideoPreviewProps {
  beforeImage: string;
  afterImage: string;
  styleName: string;
  videoStyle?: string;
  onExport: () => void;
}

export function VideoPreview({ beforeImage, afterImage, styleName, videoStyle, onExport }: VideoPreviewProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  const handleClientExport = async () => {
    setIsExporting(true);
    setExportProgress(0);

    try {
      // For client-side export, use the onExport callback which will handle server communication
      await onExport();
    } catch (error) {
      console.error('Export error:', error);
    } finally {
      setIsExporting(false);
      setExportProgress(0);
    }
  };
  return (
    <div className="space-y-4">
      <div className="rounded-lg overflow-hidden border border-gray-200">
        <Player
          component={InteriorTransformation as unknown as React.FC<Record<string, unknown>>}
          inputProps={{
            beforeImage,
            afterImage,
            styleName,
            videoStyle,
          }}
          durationInFrames={450}
          fps={30}
          compositionWidth={1920}
          compositionHeight={1080}
          style={{
            width: '100%',
            aspectRatio: '16/9',
          }}
          controls
        />
      </div>
      
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Preview your 15-second transformation reel
        </p>
        <Button 
          onClick={handleClientExport} 
          variant="outline" 
          size="sm"
          disabled={isExporting}
        >
          {isExporting ? (
            <>
              <LoadingSpinner className="mr-2 h-4 w-4" />
              Exporting...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Export HD Video
            </>
          )}
        </Button>
      </div>
    </div>
  );
}