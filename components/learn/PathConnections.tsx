"use client";

import React from 'react';

interface PathConnectionsProps {
  nodes: Array<{ x: number; y: number; isCompleted: boolean }>;
}

export function PathConnections({ nodes }: PathConnectionsProps) {
  const createPath = () => {
    if (nodes.length < 2) return '';
    
    let path = `M ${nodes[0].x} ${nodes[0].y}`;
    
    for (let i = 1; i < nodes.length; i++) {
      const prev = nodes[i - 1];
      const curr = nodes[i];
      
      const midX = (prev.x + curr.x) / 2;
      const midY = (prev.y + curr.y) / 2;
      
      path += ` Q ${midX} ${midY} ${curr.x} ${curr.y}`;
    }
    
    return path;
  };

  const createCompletedPath = () => {
    if (nodes.length < 2) return '';
    
    const completedNodes: Array<{ x: number; y: number; isCompleted: boolean }> = [];
    for (let i = 0; i < nodes.length; i++) {
      completedNodes.push(nodes[i]);
      if (!nodes[i].isCompleted) break;
    }
    
    if (completedNodes.length < 2) return '';
    
    let path = `M ${completedNodes[0].x} ${completedNodes[0].y}`;
    
    for (let i = 1; i < completedNodes.length; i++) {
      const prev = completedNodes[i - 1];
      const curr = completedNodes[i];
      
      const midX = (prev.x + curr.x) / 2;
      const midY = (prev.y + curr.y) / 2;
      
      path += ` Q ${midX} ${midY} ${curr.x} ${curr.y}`;
    }
    
    return path;
  };

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      
      <path
        d={createPath()}
        stroke="#E5E7EB"
        strokeWidth="0.5"
        fill="none"
        strokeDasharray="1,1"
      />
      
      <path
        d={createCompletedPath()}
        stroke="url(#pathGradient)"
        strokeWidth="0.8"
        fill="none"
        className="animate-pulse"
      />
    </svg>
  );
}
