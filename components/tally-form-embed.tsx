"use client";

import React, { useEffect, useRef, CSSProperties } from 'react';

interface TallyFormEmbedProps {
  formId: string;
  height?: string | number;
  width?: string;
  title?: string;
  transparentBackground?: boolean;
  fullscreen?: boolean;
}

export function TallyFormEmbed({ 
  formId, 
  height = '500px',
  width = '100%',
  title = 'Feedback Form',
  transparentBackground = true,
  fullscreen = false
}: TallyFormEmbedProps) {
  useEffect(() => {
    // Load Tally embed script
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    
    // Only add the script if it's not already in the document
    if (!document.querySelector('script[src="https://tally.so/widgets/embed.js"]')) {
      document.body.appendChild(script);
    }

    return () => {
      // We don't remove the script on cleanup to avoid issues with other forms on the page
    };
  }, []);

  const iframeStyles: CSSProperties = fullscreen ? {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    border: 'none',
    width: '100%',
    height: '100%'
  } : {
    border: 'none',
    borderRadius: '4px',
    width,
    height
  };

  const containerStyles: CSSProperties = fullscreen ? {
    position: 'relative',
    width: '100%',
    height: typeof height === 'string' ? height : `${height}px`,
    overflow: 'hidden'
  } : {};

  return (
    <div style={containerStyles}>
      <iframe
        data-tally-src={`https://tally.so/embed/${formId}?${transparentBackground ? 'transparentBackground=1' : ''}`}
        width={fullscreen ? "100%" : width}
        height={fullscreen ? "100%" : height}
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        title={title}
        style={iframeStyles}
      />
    </div>
  );
} 