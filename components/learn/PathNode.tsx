"use client";

import React from 'react';
import { Check, Lock, BookOpen, Clock } from 'lucide-react';

interface PathNodeProps {
  id: string;
  title: string;
  description: string;
  lessons: number;
  duration: string;
  isCompleted: boolean;
  isUnlocked: boolean;
  isFree: boolean;
  position: { x: number; y: number };
  onClick: () => void;
}

export function PathNode({
  id,
  title,
  description,
  lessons,
  duration,
  isCompleted,
  isUnlocked,
  isFree,
  position,
  onClick
}: PathNodeProps) {
  const getNodeStyle = () => {
    if (isCompleted) {
      return 'bg-green-500 border-green-600 text-white shadow-lg shadow-green-200';
    } else if (isUnlocked) {
      return 'bg-blue-500 border-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-600 cursor-pointer';
    } else {
      return 'bg-gray-300 border-gray-400 text-gray-600 cursor-not-allowed';
    }
  };

  const getIconStyle = () => {
    if (isCompleted) {
      return 'bg-green-600 text-white';
    } else if (isUnlocked) {
      return 'bg-blue-600 text-white';
    } else {
      return 'bg-gray-400 text-gray-600';
    }
  };

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
    >
      <div
        className={`relative w-16 h-16 rounded-full border-3 transition-all duration-300 ${getNodeStyle()}`}
        onClick={isUnlocked ? onClick : undefined}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {isCompleted ? (
            <Check className="h-6 w-6" />
          ) : isUnlocked ? (
            <BookOpen className="h-6 w-6" />
          ) : (
            <Lock className="h-6 w-6" />
          )}
        </div>
        
        {!isFree && !isCompleted && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
            <Lock className="h-3 w-3 text-white" />
          </div>
        )}
      </div>
      
      <div className="mt-2 text-center max-w-28">
        <h3 className="text-sm font-semibold text-gray-900 mb-1 leading-tight">
          {title}
        </h3>
        <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
          <span className="flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            {lessons}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {duration}
          </span>
        </div>
      </div>
    </div>
  );
}
