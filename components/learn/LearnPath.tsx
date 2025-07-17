"use client";

import React, { useState } from 'react';
import { PathNode } from './PathNode';
import { PathConnections } from './PathConnections';
import { Trophy } from 'lucide-react';
import { 
  getLearnProgress, 
  markModuleComplete, 
  isModuleCompleted, 
  isModuleUnlocked,
  isCertificationUnlocked 
} from '@/lib/learn-progress';
import { useRouter } from 'next/navigation';

const learnModules = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Master the fundamentals of local SEO',
    lessons: 4,
    duration: '30 min',
    free: true,
    position: { x: 15, y: 20 }
  },
  {
    id: 'google-business-profile',
    title: 'Google Business Profile',
    description: 'Optimize your GBP for maximum visibility',
    lessons: 6,
    duration: '45 min',
    free: true,
    position: { x: 35, y: 35 }
  },
  {
    id: 'citation-building',
    title: 'Citation Building',
    description: 'Build authority with strategic citations',
    lessons: 5,
    duration: '40 min',
    free: false,
    position: { x: 65, y: 25 }
  },
  {
    id: 'review-management',
    title: 'Review Management',
    description: 'Turn reviews into your competitive advantage',
    lessons: 4,
    duration: '35 min',
    free: false,
    position: { x: 80, y: 45 }
  },
  {
    id: 'local-keywords',
    title: 'Local Keywords',
    description: 'Find keywords that drive local traffic',
    lessons: 4,
    duration: '30 min',
    free: false,
    position: { x: 60, y: 65 }
  },
  {
    id: 'advanced-strategies',
    title: 'Advanced Strategies',
    description: 'Next-level tactics for market domination',
    lessons: 6,
    duration: '50 min',
    free: false,
    position: { x: 30, y: 75 }
  }
];

export function LearnPath() {
  const [progress, setProgress] = useState(getLearnProgress());
  const router = useRouter();

  const handleNodeClick = (module: typeof learnModules[0], index: number) => {
    if (!isModuleUnlocked(module.id, index)) {
      alert('Complete previous modules to unlock this one!');
      return;
    }
    
    if (module.free) {
      alert(`Starting ${module.title} course...`);
    } else {
      router.push('/upgrade');
    }
  };

  const handleCertificationClick = () => {
    if (isCertificationUnlocked()) {
      router.push('/learn/certification');
    } else {
      alert('Complete all modules to unlock certification!');
    }
  };

  const pathNodes = learnModules.map((module, index) => ({
    x: module.position.x,
    y: module.position.y,
    isCompleted: isModuleCompleted(module.id)
  }));

  const certificationPosition = { x: 85, y: 85 };
  pathNodes.push({
    x: certificationPosition.x,
    y: certificationPosition.y,
    isCompleted: isCertificationUnlocked()
  });

  return (
    <div className="relative w-full h-full min-h-[400px] bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 overflow-hidden">
      <PathConnections nodes={pathNodes} />
      
      {learnModules.map((module, index) => (
        <PathNode
          key={module.id}
          id={module.id}
          title={module.title}
          description={module.description}
          lessons={module.lessons}
          duration={module.duration}
          isCompleted={isModuleCompleted(module.id)}
          isUnlocked={isModuleUnlocked(module.id, index)}
          isFree={module.free}
          position={module.position}
          onClick={() => handleNodeClick(module, index)}
        />
      ))}
      
      <div
        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
        style={{ left: `${certificationPosition.x}%`, top: `${certificationPosition.y}%` }}
        onClick={handleCertificationClick}
      >
        <div className={`relative w-20 h-20 rounded-full border-4 transition-all duration-300 ${
          isCertificationUnlocked() 
            ? 'bg-yellow-400 border-yellow-500 text-yellow-900 shadow-lg shadow-yellow-200 hover:bg-yellow-500' 
            : 'bg-gray-300 border-gray-400 text-gray-600'
        }`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <Trophy className="h-8 w-8" />
          </div>
        </div>
        
        <div className="mt-2 text-center max-w-28">
          <h3 className="text-sm font-semibold text-gray-900 mb-1 leading-tight">
            Certification
          </h3>
          <p className="text-xs text-gray-600">
            {isCertificationUnlocked() ? 'Available!' : 'Complete all modules'}
          </p>
        </div>
      </div>
      
      <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-white/50">
        <div className="text-sm font-semibold text-gray-900 mb-1">
          Progress: {Math.round((progress.completedModules.length / 6) * 100)}%
        </div>
        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500"
            style={{ width: `${(progress.completedModules.length / 6) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
