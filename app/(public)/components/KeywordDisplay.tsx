"use client";

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { KeywordResult } from '@/lib/api/scan-history';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

// Add styles for the glow animation
const glowStyles = `
  @keyframes shine {
    0% {
      background-position: 0% 50%;
      transform: skewY(0deg);
    }
    25% {
      transform: skewY(1deg);
    }
    75% {
      transform: skewY(-1deg);
    }
    100% {
      background-position: 300% 50%;
      transform: skewY(0deg);
    }
  }

  .animate-shine {
    display: inline-block;
    background: linear-gradient(
      110deg,
      #1e3a8a 0%,     /* Darker blue */
      #1e3a8a 45%,    /* Darker blue */
      #60a5fa 47%,    /* Bright blue */
      #93c5fd 50%,    /* Light blue */
      #60a5fa 53%,    /* Bright blue */
      #1e3a8a 55%,    /* Darker blue */
      #1e3a8a 100%    /* Darker blue */
    );
    background-size: 300% 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shine 12s ease-in-out infinite;
    transform-origin: center;
  }
`;

interface KeywordDisplayProps {
  keywordResults: KeywordResult[];
  mobileMinimizable?: boolean; // Adding option to make component minimizable on mobile
  selectedKeyword?: string;
  onKeywordSelect?: (keyword: string) => void;
  className?: string;
}

export function KeywordDisplay({ keywordResults, mobileMinimizable = true, selectedKeyword, onKeywordSelect, className }: KeywordDisplayProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  
  const toggleMinimized = () => {
    setIsMinimized(!isMinimized);
  };
  
  if (!keywordResults || keywordResults.length === 0) {
    return (
      <Card className="absolute top-4 right-4 z-10 bg-white/95 rounded-md shadow-lg w-72">
        <CardContent className="p-4">
          <h3 className="font-bold text-sm text-gray-800 mb-2">No Keywords Found</h3>
          <div className="text-sm p-3 bg-gray-100 rounded-md text-gray-500">
            No keywords available
          </div>
        </CardContent>
      </Card>
    );
  }

  const avgRankAll = selectedKeyword 
    ? keywordResults.find(k => k.term === selectedKeyword)?.avg_rank || 0
    : keywordResults.reduce((sum, keyword) => sum + keyword.avg_rank, 0) / keywordResults.length;
  
  const calculateRankingDistribution = () => {
    let highRankCount = 0;
    let midRankCount = 0;
    let lowRankCount = 0;
    
    const relevantKeywords = selectedKeyword 
      ? keywordResults.filter(k => k.term === selectedKeyword)
      : keywordResults;
    
    relevantKeywords.forEach(keyword => {
      if (keyword.pins) {
        keyword.pins.forEach(pin => {
          if (pin.rank !== null && pin.rank <= 3) {
            highRankCount++;
          } else if (pin.rank !== null && pin.rank > 3 && pin.rank <= 10) {
            midRankCount++;
          } else if (pin.rank !== null && pin.rank > 10) {
            lowRankCount++;
          }
        });
      }
    });
    
    const total = highRankCount + midRankCount + lowRankCount;
    
    let highPercentage = total > 0 ? (highRankCount / total) * 100 : 0;
    let midPercentage = total > 0 ? (midRankCount / total) * 100 : 0;
    let lowPercentage = total > 0 ? (lowRankCount / total) * 100 : 0;
    
    if (highRankCount > 0 && highPercentage < 15) highPercentage = 15;
    if (midRankCount > 0 && midPercentage < 15) midPercentage = 15;
    if (lowRankCount > 0 && lowPercentage < 15) lowPercentage = 15;
    
    const totalPercentage = highPercentage + midPercentage + lowPercentage;
    if (totalPercentage > 0) {
      highPercentage = (highPercentage / totalPercentage) * 100;
      midPercentage = (midPercentage / totalPercentage) * 100;
      lowPercentage = (lowPercentage / totalPercentage) * 100;
    }
    
    console.log('Rank distribution:', { 
      highRankCount, midRankCount, lowRankCount, 
      highPercentage, midPercentage, lowPercentage 
    });
    
    return {
      highPercentage,
      midPercentage,
      lowPercentage
    };
  };
  
  const distribution = calculateRankingDistribution();

  return (
    <>
      <style jsx global>{glowStyles}</style>
      <Card className={cn("absolute top-4 left-4 z-10 bg-white/95 rounded-md shadow-lg w-auto", className)}>
        {mobileMinimizable && (
          <div 
            className="absolute right-2 top-2 md:hidden cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-full p-1"
            onClick={toggleMinimized}
          >
            {isMinimized ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7"></path></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 9-7 7-7-7"></path></svg>
            )}
          </div>
        )}
        <CardContent className="p-1">
          {/* Score displayed at the top with reduced margins */}
          <div className="text-xl font-bold text-blue-800 text-center mb-1 flex items-center justify-center gap-1">
            {/* Show circle indicator next to score when minimized */}
            {mobileMinimizable && isMinimized && typeof window !== 'undefined' && window.innerWidth < 768 && (
              <div className="relative w-6 h-6">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  {/* Background circle */}
                  <circle 
                    cx="18" 
                    cy="18" 
                    r="15" 
                    fill="white" 
                    stroke="#E0E0E0" 
                    strokeWidth="2" 
                  />
                  
                  {/* Multi-segment progress circles */}
                  {/* Green segment (high ranking) */}
                  {distribution.highPercentage > 0 && (
                    <circle 
                      cx="18" 
                      cy="18" 
                      r="15" 
                      fill="none" 
                      stroke="#4CAF50" 
                      strokeWidth="3" 
                      strokeDasharray={`${distribution.highPercentage} 100`}
                      strokeLinecap="round"
                      transform="rotate(-90 18 18)"
                    />
                  )}
                  
                  {/* Yellow segment (mid ranking) */}
                  {distribution.midPercentage > 0 && (
                    <circle 
                      cx="18" 
                      cy="18" 
                      r="15" 
                      fill="none" 
                      stroke="#FFC107" 
                      strokeWidth="3" 
                      strokeDasharray={`${distribution.midPercentage} 100`}
                      strokeLinecap="round"
                      strokeDashoffset={`${-distribution.highPercentage}`}
                      transform="rotate(-90 18 18)"
                    />
                  )}
                  
                  {/* Red segment (low ranking) */}
                  {distribution.lowPercentage > 0 && (
                    <circle 
                      cx="18" 
                      cy="18" 
                      r="15" 
                      fill="none" 
                      stroke="#F44336" 
                      strokeWidth="3" 
                      strokeDasharray={`${distribution.lowPercentage} 100`}
                      strokeLinecap="round"
                      strokeDashoffset={`${-(distribution.highPercentage + distribution.midPercentage)}`}
                      transform="rotate(-90 18 18)"
                    />
                  )}
                </svg>
              </div>
            )}
            {avgRankAll.toFixed(2)}
          </div>
          
          {/* Only show details if not minimized on mobile, or if not mobile */}
          {(!mobileMinimizable || !isMinimized || typeof window !== 'undefined' && window.innerWidth >= 768) && (
            <>
              {/* Circle on left, legend on right with reduced spacing */}
              <div className="flex items-center gap-2 mb-1">
                {/* Left side - Circle */}
                <div className="relative w-10 h-10">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    {/* Background circle */}
                    <circle 
                      cx="18" 
                      cy="18" 
                      r="15" 
                      fill="white" 
                      stroke="#E0E0E0" 
                      strokeWidth="2" 
                    />
                    
                    {/* Multi-segment progress circles */}
                    {/* Green segment (high ranking) */}
                    {distribution.highPercentage > 0 && (
                      <circle 
                        cx="18" 
                        cy="18" 
                        r="15" 
                        fill="none" 
                        stroke="#4CAF50" 
                        strokeWidth="4" 
                        strokeDasharray={`${distribution.highPercentage} 100`}
                        strokeLinecap="round"
                        transform="rotate(-90 18 18)"
                      />
                    )}
                    
                    {/* Yellow segment (mid ranking) */}
                    {distribution.midPercentage > 0 && (
                      <circle 
                        cx="18" 
                        cy="18" 
                        r="15" 
                        fill="none" 
                        stroke="#FFC107" 
                        strokeWidth="4" 
                        strokeDasharray={`${distribution.midPercentage} 100`}
                        strokeLinecap="round"
                        strokeDashoffset={`${-distribution.highPercentage}`}
                        transform="rotate(-90 18 18)"
                      />
                    )}
                    
                    {/* Red segment (low ranking) */}
                    {distribution.lowPercentage > 0 && (
                      <circle 
                        cx="18" 
                        cy="18" 
                        r="15" 
                        fill="none" 
                        stroke="#F44336" 
                        strokeWidth="4" 
                        strokeDasharray={`${distribution.lowPercentage} 100`}
                        strokeLinecap="round"
                        strokeDashoffset={`${-(distribution.highPercentage + distribution.midPercentage)}`}
                        transform="rotate(-90 18 18)"
                      />
                    )}
                  </svg>
                </div>
                
                {/* Right side - Ranking legend with reduced spacing */}
                <div className="flex flex-col gap-0.5">
                  <div className="text-xs">
                    <span className="inline-flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></span>
                      <span className="text-[10px]">High Ranking</span>
                    </span>
                  </div>
                  <div className="text-xs">
                    <span className="inline-flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mr-1"></span>
                      <span className="text-[10px]">Mid Ranking</span>
                    </span>
                  </div>
                  <div className="text-xs">
                    <span className="inline-flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1"></span>
                      <span className="text-[10px]">Low Ranking</span>
                    </span>
                  </div>
                </div>
              </div>
              
              {/* "Average Scan Ranking" text below both with reduced padding */}
              <div className="text-[10px] text-gray-500 text-center w-full border-t pt-1 mb-1">
                Average Scan Ranking
              </div>
              
              <div className="border-t pt-1">
                <h3 className="font-bold text-xs text-gray-800 mb-0.5">Search term:</h3>
                <div className="space-y-0.5">
                  {keywordResults.map((keyword, index) => (
                    <div
                      key={index}
                      className={`text-sm rounded-md flex justify-between items-center py-0.5 px-1 ${selectedKeyword === keyword.term ? 'bg-blue-50' : ''} ${onKeywordSelect ? 'cursor-pointer hover:bg-gray-50' : ''}`}
                      onClick={() => onKeywordSelect && onKeywordSelect(keyword.term)}
                    >
                      <div className="flex flex-col">
                        <span className="font-medium text-xs text-gray-800">{keyword.term}</span>
                        <span className="text-[10px] text-gray-500">Avg. Rank: {keyword.avg_rank.toFixed(1)}</span>
                      </div>
                      <RankingCircle rank={keyword.avg_rank} keyword={keyword.term} allKeywordResults={keywordResults} />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
          
          {/* Verification text at the bottom with reduced padding */}
          <div className={`${(!mobileMinimizable || !isMinimized) ? 'mt-1 pt-0.5 border-t' : ''} text-center`}>
            <span className="text-[12px] font-medium text-gray-600 flex items-center justify-center gap-1">
              <CheckCircle className="h-3 w-3 text-green-600" />
              <span>
                Verified by{' '}
                <span className="animate-shine font-semibold">
                  localrank.so
                </span>
              </span>
            </span>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

interface RankingCircleProps {
  rank: number;
  keyword?: string;
  allKeywordResults?: KeywordResult[];
}

function RankingCircle({ rank, keyword, allKeywordResults }: RankingCircleProps) {
  const calculateDistribution = () => {
    const defaultDistribution = () => {
      if (rank <= 3) {
        return {
          high: 100,
          mid: 0,
          low: 0
        };
      } else if (rank <= 10) {
        return {
          high: 25, // Always show some green for mid-ranking keywords
          mid: 75,
          low: 0
        };
      } else {
        return {
          high: 15, // Always show some green for visibility
          mid: 25, // Always show some yellow for visibility
          low: 60
        };
      }
    };
    
    const keywordResult = allKeywordResults?.find(kr => kr.term === keyword);
    
    if (!keywordResult || !keywordResult.pins || keywordResult.pins.length === 0) {
      return defaultDistribution();
    }
    
    let highRankCount = 0;
    let midRankCount = 0;
    let lowRankCount = 0;
    
    keywordResult.pins.forEach(pin => {
      if (pin.rank !== null && pin.rank <= 3) {
        highRankCount++;
      } else if (pin.rank !== null && pin.rank > 3 && pin.rank <= 10) {
        midRankCount++;
      } else if (pin.rank !== null && pin.rank > 10) {
        lowRankCount++;
      }
    });
    
    const total = highRankCount + midRankCount + lowRankCount;
    
    if (total === 0) {
      return defaultDistribution();
    }
    
    let highPercentage = (highRankCount / total) * 100;
    let midPercentage = (midRankCount / total) * 100;
    let lowPercentage = (lowRankCount / total) * 100;
    
    if (highRankCount > 0 && highPercentage < 15) highPercentage = 15;
    if (midRankCount > 0 && midPercentage < 15) midPercentage = 15;
    if (lowRankCount > 0 && lowPercentage < 15) lowPercentage = 15;
    
    const totalPercentage = highPercentage + midPercentage + lowPercentage;
    
    return {
      high: (highPercentage / totalPercentage) * 100,
      mid: (midPercentage / totalPercentage) * 100,
      low: (lowPercentage / totalPercentage) * 100
    };
  };
  
  const distribution = calculateDistribution();
  
  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Rank number above circle */}
      <span className="text-xs font-bold mb-0.5">{rank.toFixed(1)}</span>
      
      {/* Circle with reduced size */}
      <div className="relative w-6 h-6">
        <svg className="w-full h-full" viewBox="0 0 36 36">
          {/* Background circle */}
          <circle 
            cx="18" 
            cy="18" 
            r="15" 
            fill="none" 
            stroke="#E0E0E0" 
            strokeOpacity="0.2" 
            strokeWidth="3" 
          />
          
          {/* Green segment (high ranking) */}
          {distribution.high > 0 && (
            <circle 
              cx="18" 
              cy="18" 
              r="15" 
              fill="none" 
              stroke="#4CAF50" 
              strokeWidth="4" 
              strokeDasharray={`${distribution.high} 100`}
              strokeLinecap="round"
              transform="rotate(-90 18 18)"
            />
          )}
          
          {/* Yellow segment (mid ranking) */}
          {distribution.mid > 0 && (
            <circle 
              cx="18" 
              cy="18" 
              r="15" 
              fill="none" 
              stroke="#FFC107" 
              strokeWidth="4" 
              strokeDasharray={`${distribution.mid} 100`}
              strokeLinecap="round"
              strokeDashoffset={`${-distribution.high}`}
              transform="rotate(-90 18 18)"
            />
          )}
          
          {/* Red segment (low ranking) */}
          {distribution.low > 0 && (
            <circle 
              cx="18" 
              cy="18" 
              r="15" 
              fill="none" 
              stroke="#F44336" 
              strokeWidth="4" 
              strokeDasharray={`${distribution.low} 100`}
              strokeLinecap="round"
              strokeDashoffset={`${-(distribution.high + distribution.mid)}`}
              transform="rotate(-90 18 18)"
            />
          )}
        </svg>
      </div>
    </div>
  );
}
