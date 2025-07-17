import useSWR from 'swr';

export function useDashboard() {
  // Define types for scan data
  interface ScanDetail {
    id: string;
    business: string;
    address: string;
    businessId: string;
    searchTerm: string;
    created: string;
    area: string;
    nextScan?: string;
    schedule?: string;
    pins: Array<{
      id?: string;
      latitude: number;
      longitude: number;
      isCenter?: boolean;
      rank?: number | null;
    }>;
  }

  interface ScanHistoryItem {
    id: string;
    date: string;
    formattedDate: string;
    pins?: Array<{
      id?: string;
      latitude: number;
      longitude: number;
      isCenter?: boolean;
      rank?: number | null;
    }>;
  }

  interface KeywordRankings {
    [key: string]: Array<{
      id: string;
      term: string;
      avgRank: number;
    }>;
  }

  // Mock data or fetch from API
  const { data: scans, error: scansError, isLoading: scansLoading } = useSWR<ScanDetail[]>(
    '/api/scans',
    // Fetcher would go here
  );

  const { data: history, error: historyError, isLoading: historyLoading } = useSWR<ScanHistoryItem[]>(
    '/api/scan-history',
    // Fetcher would go here
  );

  return {
    scans: scans || [],
    history: history || [],
    isLoading: scansLoading || historyLoading,
    error: scansError || historyError
  };
} 