import React from 'react';

export function Watermark() {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
      {/* Diagonal watermark pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 200px,
            rgba(0, 0, 0, 0.1) 200px,
            rgba(0, 0, 0, 0.1) 201px
          )`
        }} />
      </div>
      {/* Center watermark */}
      <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-lg shadow-lg border border-gray-200">
        <div className="flex flex-col items-center gap-1">
          <span className="text-lg font-bold text-gray-800">PREVIEW</span>
          <span className="text-sm font-medium text-gray-600">localrank.so</span>
        </div>
      </div>
    </div>
  );
}
