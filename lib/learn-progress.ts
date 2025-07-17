export interface LearnProgress {
  completedModules: string[];
  certificationUnlocked: boolean;
}

const mockProgress: LearnProgress = {
  completedModules: ['getting-started'],
  certificationUnlocked: false
};

export function getLearnProgress(): LearnProgress {
  return mockProgress;
}

export function markModuleComplete(moduleId: string): void {
  console.log(`Module ${moduleId} marked as complete`);
}

export function isModuleCompleted(moduleId: string): boolean {
  return mockProgress.completedModules.includes(moduleId);
}

export function isModuleUnlocked(moduleId: string, moduleIndex: number): boolean {
  if (moduleIndex === 0) return true;
  
  if (moduleIndex === 1) return true;
  
  return false;
}

export function isCertificationUnlocked(): boolean {
  return mockProgress.certificationUnlocked;
}

export function getCompletionPercentage(): number {
  const totalModules = 6;
  return Math.round((mockProgress.completedModules.length / totalModules) * 100);
}
