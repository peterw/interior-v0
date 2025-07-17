/* Custom TypeScript interfaces for recurring scan and timeline data */

// Business location coordinates
export interface BusinessLocation {
  lat: number;
  lng: number;
  name: string;
  url: string;
}

// Recurring scan data structure
export interface RecurringScanData {
  uuid: string;
  url: string;
  status: string;
  created_at: string;
  completed_at: string | null;
  scanType: string;
  frequency: string;
  nextScanDate: string | null;
  radius: number;
  keywords: string[];
  pinCount: number;
  keyword_results: any[];
  archived: boolean;
  test_mode: boolean;
  business_location: BusinessLocation;
  avg_rank: number;
}

// Timeline business information
export interface TimelineBusiness {
  name: string;
  url: string;
  latitude: number;
  longitude: number;
}

// Base scan information for timeline
export interface TimelineBaseScan {
  uuid: string;
  keywords: string[];
  frequency: string;
}

// Individual scan date entry in timeline
export interface TimelineAvailableDate {
  date: string;
  scan_uuid: string;
  completed_at: string;
  keywords: string[];
  pin_count: number;
  total_results: number;
  found_results: number;
  average_rank: number;
}

// Date range for timeline
export interface TimelineDateRange {
  earliest: string;
  latest: string;
}

// Complete timeline data structure
export interface TimelineData {
  scan_type: string;
  business: TimelineBusiness;
  base_scan: TimelineBaseScan;
  available_dates: TimelineAvailableDate[];
  total_scans: number;
  date_range: TimelineDateRange;
}

// Combined response structure from backend
export interface ScanTimelineResponse {
  scan_data: RecurringScanData;
  timeline_data: TimelineData;
}

// Processed timeline item for UI display
export interface ProcessedTimelineItem {
  id: string;
  date: string;
  formattedDate: string;
  scan_uuid: string;
  completed_at: string;
  keywords: string[];
  pin_count: number;
  total_results: number;
  found_results: number;
  average_rank: number;
}

// Processed keyword ranking for UI display
export interface ProcessedKeywordRanking {
  id: string;
  term: string;
  avgRank: number;
  date: string;
  scan_uuid: string;
}

// Final processed response for UI consumption
export interface ProcessedScanTimelineResponse {
  scan_data: RecurringScanData;
  timeline: ProcessedTimelineItem[];
  keywordRankings: {
    [scanId: string]: ProcessedKeywordRanking[];
  };
  totalScans: number;
  dateRange: TimelineDateRange;
  business: TimelineBusiness;
}