import { useState, useEffect, useCallback } from 'react';
import { getScanById, ScanHistoryItem } from '@/lib/api/scan-history';

export function useScanDetail(scanId: string | null) {
  const [scan, setScan] = useState<ScanHistoryItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Function to fetch scan details
  const fetchScan = useCallback(async () => {
    if (!scanId) {
      setScan(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    console.log(`🔄 Fetching scan details for ID: ${scanId}`);
    
    try {
      const result = await getScanById(scanId);
      console.log(`✅ Scan detail response for ID ${scanId}:`, result);
      setScan(result);
    } catch (err) {
      console.error(`Error fetching scan ${scanId}:`, err);
      setError(err instanceof Error ? err : new Error(`Failed to fetch scan ${scanId}`));
    } finally {
      setIsLoading(false);
    }
  }, [scanId]);

  // Fetch data when scanId changes
  useEffect(() => {
    fetchScan();
  }, [fetchScan]);

  return {
    scan,
    isLoading,
    error,
    refetch: fetchScan
  };
} 