"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import 'mapbox-gl/dist/mapbox-gl.css';

// Import MapResults dynamically to avoid SSR issues with mapbox-gl
// Temporarily commented out - MapResults component not found
const MapResults = ({ scanDate, selectedKeyword, businessLocation, keywordResults, onKeywordSelect }: any) => {
  return <div className="h-full w-full bg-gray-100 flex items-center justify-center">Map component not available</div>;
};

interface BusinessLocation {
  lat: number;
  lng: number;
  name: string;
}

interface KeywordResult {
  term: string;
  avg_rank: number;
  pins: any[];
  found: boolean;
}

interface MapResultsWrapperProps {
  scanDate?: string;
  selectedKeyword?: string;
  businessLocation?: BusinessLocation;
  keywordResults?: KeywordResult[];
  onKeywordSelect?: (keyword: string) => void;
}

export function MapResultsWrapper({ scanDate, selectedKeyword, businessLocation, keywordResults, onKeywordSelect }: MapResultsWrapperProps) {
  return (
    <MapResults
      scanDate={scanDate}
      selectedKeyword={selectedKeyword}
      businessLocation={businessLocation}
      keywordResults={keywordResults?.map(kr => ({
        term: kr.term,
        avg_rank: kr.avg_rank,
        pins: (kr.pins || []).map(pin => ({
          ...pin,
          rank: pin.rank ?? 99,
          error: pin.error || undefined,
          is_center: !!pin.is_center
        }))
      })) || []}
      onKeywordSelect={onKeywordSelect}
    />
  );
}    