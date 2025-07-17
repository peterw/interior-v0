import axios from '@/lib/axios';
import { AxiosError } from 'axios';

// Original Backend result data (used by existing code)
export interface BackendResultData {
  keyword: string;
  position: number | null;
  url: string | null;
}

// Pin result as returned from the backend API (matching PinResultSerializer)
export interface PinResult {
  id?: number;
  lat: number;
  lng: number;
  rank: number | null;
  found: boolean;
  error: string | null;
  is_center?: boolean;
}

// Keyword result as returned from the backend API (matching KeywordResultSerializer)
export interface KeywordResult {
  term: string;
  avg_rank: number;
  pins: PinResult[];
}

export interface BackendBusinessData {
  name: string;
  url: string;
  latitude: number;
  longitude: number;
}

// Business location from the backend API
export interface BusinessLocation {
  lat: number;
  lng: number;
  name: string;
  url?: string;  // Add URL field for business location
}

export interface ScanHistoryItem {
  uuid: string;
  url: string;
  status: string; 
  created_at: string;
  completed_at: string | null;
  scanType: string;
  frequency: string | null;
  nextScanDate: string | null;
  radius: number;
  keywords: string[];
  pinCount: number;
  keyword_results: KeywordResult[];
  business_location?: BusinessLocation;
  public_share_enabled?: boolean;
  public_share_token?: string;
  test_mode?: boolean;
}

export interface ScanHistoryResponse {
  scanHistory: ScanHistoryItem[];
}

/**
 * Fetches timeline data for a specific scan
 */
export interface ScanTimelineItem {
  id: string;
  date: string;
  formattedDate: string;
}

export interface KeywordRanking {
  id: string;
  term: string;
  avgRank: number;
}

export interface ScanTimelineResponse {
  timeline: ScanTimelineItem[];
  keywordRankings: {
    [scanId: string]: KeywordRanking[];
  };
}

// Backend API URL
const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Interface for the old backend scan data format
interface OldBackendScanData {
  uuid: string;
  created_at: string;
  updated_at: string;
  status: string;
  scan_type: string;
  radius: number;
  pin_count: number;
  business: BackendBusinessData;
  keywords: string;
  results: BackendResultData[];
  url: string;
  frequency: string | null;
  next_scan_date: string | null;
  completed_at: string | null;
}

// Interface for the new backend scan data format (from ScanDetailSerializer)
interface BackendScanData {
  uuid: string;
  url: string;
  status: string;
  created_at: string;
  completed_at: string | null;
  scanType: string;
  frequency: string | null;
  nextScanDate: string | null;
  radius: number;
  keywords: string[];
  pinCount: number;
  keyword_results: KeywordResult[];
  public_share_enabled?: boolean;
  public_share_token?: string;
  business?: BackendBusinessData;
  test_mode?: boolean;
}

// Add interface for paginated response
interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

/**
 * Fetches the scan history for the authenticated user
 */
export async function getScanHistory(): Promise<ScanHistoryResponse> {
  console.log(`🔄 API Call: GET ${BACKEND_API_URL}/api/scans/`);
  
  try {
    const { data } = await axios.get<PaginatedResponse<BackendScanData>>(`${BACKEND_API_URL}/api/scans/`);
    console.log(`✅ API Response from ${BACKEND_API_URL}/api/scans/:`, data);

    // Transform the backend response to match the frontend expected format
    const scanHistory = data.results.map(item => {
      return {
        uuid: item.uuid,
        url: item.url || '',
        status: item.status as 'completed' | 'in-progress' | 'repeated' | 'failed',
        created_at: item.created_at,
        completed_at: item.completed_at,
        scanType: item.scanType,
        frequency: item.frequency,
        nextScanDate: item.nextScanDate,
        radius: item.radius,
        keywords: item.keywords,
        pinCount: item.pinCount,
        keyword_results: item.keyword_results,
        public_share_enabled: item.public_share_enabled || false,
        public_share_token: item.public_share_token || undefined,
        business_location: item.business ? {
          lat: item.business.latitude,
          lng: item.business.longitude,
          name: item.business.name,
          url: item.business.url || ''
        } : undefined,
        test_mode: item.test_mode || false
      };
    });

    return { scanHistory };
  } catch (error) {
    console.error('Error fetching scan history:', error);
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message;
      throw new Error(`Failed to fetch scan history: ${errorMessage}`);
    }
    throw new Error('Failed to fetch scan history');
  }
}

/**
 * Fetches a specific scan by ID
 */
export async function getScanById(scanId: string): Promise<ScanHistoryItem> {
  console.log(`🔄 API Call: GET ${BACKEND_API_URL}/api/scans/${scanId}/`);
  
  try {
    const { data: scanData } = await axios.get<BackendScanData>(`${BACKEND_API_URL}/api/scans/${scanId}/`);
    console.log(`✅ API Response from ${BACKEND_API_URL}/api/scans/${scanId}/:`, scanData);

    // Transform the backend response to match the frontend expected format
    return {
      uuid: scanData.uuid,
      url: scanData.url || '',
      status: scanData.status as 'completed' | 'in-progress' | 'repeated' | 'failed',
      created_at: scanData.created_at,
      completed_at: scanData.completed_at,
      scanType: scanData.scanType,
      frequency: scanData.frequency,
      nextScanDate: scanData.nextScanDate,
      radius: scanData.radius,
      keywords: scanData.keywords,
      pinCount: scanData.pinCount,
      keyword_results: scanData.keyword_results,
      public_share_enabled: scanData.public_share_enabled || false,
      public_share_token: scanData.public_share_token || undefined,
      business_location: scanData.business ? {
        lat: scanData.business.latitude,
        lng: scanData.business.longitude,
        name: scanData.business.name,
        url: scanData.business.url || ''
      } : undefined,
      test_mode: scanData.test_mode || false
    };
  } catch (error) {
    console.error(`Error fetching scan ${scanId}:`, error);
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message;
      throw new Error(`Failed to fetch scan: ${errorMessage}`);
    }
    throw new Error('Failed to fetch scan details');
  }
}

/**
 * Filters scan history based on provided parameters
 */
export async function filterScanHistory(params: {
  keyword?: string;
  status?: 'all' | 'completed' | 'in-progress' | 'repeated';
  sortBy?: string;
}): Promise<ScanHistoryResponse> {
  try {
    const urlParams = new URLSearchParams({
      ...(params.keyword ? { keyword: params.keyword } : {}),
      ...(params.status && params.status !== 'all' ? { status: params.status } : {}),
      ...(params.sortBy ? { ordering: params.sortBy } : {}),
    });

    const url = `${BACKEND_API_URL}/api/scans/?${urlParams.toString()}`;
    console.log(`🔄 API Call: GET ${url}`);

    const { data } = await axios.get<PaginatedResponse<BackendScanData>>(url);
    console.log(`✅ API Response from ${url}:`, data);

    // Transform the backend response to match the frontend expected format
    const scanHistory = data.results.map(item => {
      return {
        uuid: item.uuid,
        url: item.url || '',
        status: item.status as 'completed' | 'in-progress' | 'repeated' | 'failed',
        created_at: item.created_at,
        completed_at: item.completed_at,
        scanType: item.scanType,
        frequency: item.frequency,
        nextScanDate: item.nextScanDate,
        radius: item.radius,
        keywords: item.keywords,
        pinCount: item.pinCount,
        keyword_results: item.keyword_results,
        public_share_enabled: item.public_share_enabled || false,
        public_share_token: item.public_share_token || undefined,
        business_location: item.business ? {
          lat: item.business.latitude,
          lng: item.business.longitude,
          name: item.business.name,
          url: item.business.url || ''
        } : undefined,
        test_mode: item.test_mode || false
      };
    });

    return { scanHistory };
  } catch (error) {
    console.error('Error fetching filtered scan history:', error);
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message;
      throw new Error(`Failed to fetch filtered scan history: ${errorMessage}`);
    }
    throw new Error('Failed to fetch filtered scan history');
  }
}

/**
 * Creates a new scan
 */
export async function createScan(scanData: {
  business: string;
  address: string;
  searchTerm: string;
  keywords: string[];
}): Promise<ScanHistoryItem> {
  try {
    const { data } = await axios.post<ScanHistoryItem>(
      `${BACKEND_API_URL}/api/scans/`,
      scanData
    );
    return data;
  } catch (error) {
    console.error('Error creating scan:', error);
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message;
      throw new Error(`Failed to create scan: ${errorMessage}`);
    }
    throw new Error('Failed to create scan');
  }
}

/**
 * Fetches timeline data for a specific scan
 */
export async function getScanTimeline(scanId: string): Promise<ScanTimelineResponse> {
  console.log(`Fetching timeline for scan ${scanId} (from scan-history.ts)`);
  const url = `${BACKEND_API_URL}/api/scans/${scanId}/timeline/`;
  console.log(`API URL: ${url}`);

  try {
    const { data } = await axios.get(url);
    console.log("Timeline API response:", data);

    // Handle case where API returns a single scan object instead of an array
    const scanArray = Array.isArray(data) ? data : [data];

    // Transform scan data into timeline format
    const timeline: ScanTimelineItem[] = scanArray.map(scan => ({
      id: scan.uuid || '',
      date: scan.created_at || '',
      formattedDate: scan.created_at ? new Date(scan.created_at).toLocaleDateString() : ''
    }));

    // Create keyword rankings by scan
    const keywordRankings: { [scanId: string]: KeywordRanking[] } = {};

    scanArray.forEach(scan => {
      if (scan.keyword_results && scan.keyword_results.length > 0) {
        keywordRankings[scan.uuid] = scan.keyword_results.map((result: KeywordResult, index: number) => ({
          id: `kw-${index}`,
          term: result.term,
          avgRank: result.avg_rank
        }));
      }
    });

    return {
      timeline,
      keywordRankings
    };
  } catch (error) {
    console.error(`Error fetching timeline for scan ${scanId}:`, error);
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message;
      throw new Error(`Failed to fetch scan timeline: ${errorMessage}`);
    }
    throw new Error('Failed to fetch scan timeline');
  }
}
