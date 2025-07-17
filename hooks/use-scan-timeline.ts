import { useState, useEffect, useCallback } from 'react';
import axios from '@/lib/axios';
import type {
  ScanTimelineResponse,
  ProcessedScanTimelineResponse,
  ProcessedTimelineItem,
  ProcessedKeywordRanking,
  RecurringScanData,
  TimelineData
} from '@/types/scan-timeline';

// Backend API URL
const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * Processes raw timeline data into UI-friendly format
 */
function processTimelineData(data: ScanTimelineResponse): ProcessedScanTimelineResponse {
  const { scan_data, timeline_data } = data;
  
  // Process timeline items from available_dates
  const timeline: ProcessedTimelineItem[] = timeline_data.available_dates.map(dateEntry => ({
    id: dateEntry.scan_uuid,
    date: new Date(dateEntry.date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }),
    formattedDate: new Date(dateEntry.completed_at).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }),
    scan_uuid: dateEntry.scan_uuid,
    completed_at: dateEntry.completed_at,
    keywords: dateEntry.keywords,
    pin_count: dateEntry.pin_count,
    total_results: dateEntry.total_results,
    found_results: dateEntry.found_results,
    average_rank: dateEntry.average_rank
  }));
  
  // Process keyword rankings by scan
  const keywordRankings: { [scanId: string]: ProcessedKeywordRanking[] } = {};
  
  timeline_data.available_dates.forEach(dateEntry => {
    keywordRankings[dateEntry.scan_uuid] = dateEntry.keywords.map((keyword, index) => ({
      id: `${dateEntry.scan_uuid}-kw-${index}`,
      term: keyword,
      avgRank: dateEntry.average_rank,
      date: dateEntry.date,
      scan_uuid: dateEntry.scan_uuid
    }));
  });
  
  return {
    scan_data,
    timeline,
    keywordRankings,
    totalScans: timeline_data.total_scans,
    dateRange: timeline_data.date_range,
    business: timeline_data.business
  };
}

/**
 * Fetches timeline data for a specific scan
 */
export async function getScanTimeline(scanId: string): Promise<ProcessedScanTimelineResponse> {
  console.log(`Fetching timeline for scan ${scanId}`);
  const url = `${BACKEND_API_URL}/api/scans/${scanId}/timeline/`;
  console.log(`API URL: ${url}`);
  
  try {
    const { data } = await axios.get<ScanTimelineResponse>(url);
    console.log("Timeline API response:", data);
    
    // Process the raw data into UI-friendly format
    const processedData = processTimelineData(data);
    
    console.log("Processed timeline:", processedData.timeline);
    console.log("Processed keyword rankings:", processedData.keywordRankings);
    
    return processedData;
  } catch (error) {
    console.error("Error fetching timeline:", error);
    throw error;
  }
}

export function useScanTimeline(scanId: string | null) {
  const [scanData, setScanData] = useState<RecurringScanData | null>(null);
  const [timeline, setTimeline] = useState<ProcessedTimelineItem[]>([]);
  const [keywordRankings, setKeywordRankings] = useState<{ [scanId: string]: ProcessedKeywordRanking[] }>({});
  const [totalScans, setTotalScans] = useState<number>(0);
  const [dateRange, setDateRange] = useState<{ earliest: string; latest: string } | null>(null);
  const [business, setBusiness] = useState<{ name: string; url: string; latitude: number; longitude: number } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Function to fetch timeline data
  const fetchTimeline = useCallback(async () => {
    if (!scanId) {
      setScanData(null);
      setTimeline([]);
      setKeywordRankings({});
      setTotalScans(0);
      setDateRange(null);
      setBusiness(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const result = await getScanTimeline(scanId);
      setScanData(result.scan_data);
      setTimeline(result.timeline || []);
      setKeywordRankings(result.keywordRankings || {});
      setTotalScans(result.totalScans);
      setDateRange(result.dateRange);
      setBusiness(result.business);
    } catch (err) {
      console.error(`Error fetching timeline for scan ${scanId}:`, err);
      setError(err instanceof Error ? err : new Error(`Failed to fetch timeline for scan ${scanId}`));
    } finally {
      setIsLoading(false);
    }
  }, [scanId]);

  // Fetch data when scanId changes
  useEffect(() => {
    fetchTimeline();
  }, [fetchTimeline]);

  return {
    scanData,
    timeline,
    keywordRankings,
    totalScans,
    dateRange,
    business,
    isLoading,
    error,
    refetch: fetchTimeline
  };
} 