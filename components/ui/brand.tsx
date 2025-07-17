import React from 'react';
import { cn } from '@/lib/utils';

interface BrandProps {
  className?: string;
  variant?: 'default' | 'bold' | 'gradient' | 'highlight';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Brand: React.FC<BrandProps> = ({ 
  className,
  variant = 'default',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const variantClasses = {
    default: '',
    bold: 'font-bold',
    gradient: 'font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent',
    highlight: 'font-semibold text-green-600 dark:text-green-400'
  };

  return (
    <span 
      className={cn(
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      LocalRank
    </span>
  );
};