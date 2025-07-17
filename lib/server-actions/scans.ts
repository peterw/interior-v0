import { serverFetch } from '../server-fetch';
import axios from '@/lib/axios';
import { AxiosError } from 'axios';

import { 
  ScanHistoryItem, 
  ScanHistoryResponse, 
  ScanTimelineResponse 
} from '@/lib/api/scan-history';

// API URL constant
const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * Server action to fetch scan history 
 */
export async function fetchScanHistory(): Promise<ScanHistoryResponse> {
  console.log(`🔄 Server Action: Fetching scan history from ${BACKEND_API_URL}/api/scans/`);
  
  try {
    const response = await axios.get(`${BACKEND_API_URL}/api/scans/`);
    console.log('✅ Server Action Response: Scan history', response.data);
    return response.data;
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
 * Server action to fetch a specific scan by ID
 */
export async function fetchScanById(scanId: string): Promise<ScanHistoryItem> {
  console.log(`🔄 Server Action: Fetching scan detail for ID ${scanId} from ${BACKEND_API_URL}/api/scans/${scanId}/`);
  
  try {
    const response = await axios.get(`${BACKEND_API_URL}/api/scans/${scanId}/`);
    console.log(`✅ Server Action Response: Scan detail for ID ${scanId}`, response.data);
    return response.data;
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
 * Server action to fetch scan timeline data
 */
export async function fetchScanTimeline(scanId: string): Promise<ScanTimelineResponse> {
  console.log(`🔄 Server Action: Fetching scan timeline for ID ${scanId} from ${BACKEND_API_URL}/api/scans/${scanId}/timeline/`);
  
  try {
    const response = await axios.get(`${BACKEND_API_URL}/api/scans/${scanId}/timeline/`);
    console.log(`✅ Server Action Response: Scan timeline for ID ${scanId}`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching timeline for scan ${scanId}:`, error);
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message;
      throw new Error(`Failed to fetch scan timeline: ${errorMessage}`);
    }
    throw new Error('Failed to fetch scan timeline');
  }
}

/**
 * Server action to filter scan history
 */
export async function fetchFilteredScanHistory(params: {
  keyword?: string;
  status?: 'all' | 'completed' | 'in-progress' | 'repeated' | 'failed' | 'one-time';
  sortBy?: string;
}): Promise<ScanHistoryResponse> {
  const urlParams = new URLSearchParams();
  
  if (params.keyword) urlParams.append('keyword', params.keyword);
  if (params.status && params.status !== 'all') urlParams.append('status', params.status);
  if (params.sortBy) urlParams.append('sort_by', params.sortBy); // Use 'sort_by' to match backend expectation
  
  const url = `${BACKEND_API_URL}/api/scans/?${urlParams.toString()}`;
  console.log(`🔄 Server Action: Fetching filtered scan history from ${url}`);
  
  try {
    const response = await axios.get(url);
    console.log('✅ Server Action Response: Filtered scan history', response.data);
    return response.data;
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
 * Server action to retry a scan
 */
export async function retryScan(scanId: string): Promise<void> {
  console.log(`🔄 Server Action: Retrying scan ${scanId} at ${BACKEND_API_URL}/api/scans/${scanId}/retry/`);
  
  try {
    console.log('Request URL:', `${BACKEND_API_URL}/api/scans/${scanId}/retry/`);
    console.log('Request method:', 'POST');
    console.log('Request headers:', axios.defaults.headers);
    
    const response = await axios.post(`${BACKEND_API_URL}/api/scans/${scanId}/retry/`);
    console.log(`✅ Server Action Response: Scan ${scanId} retry initiated`, response.data);
  } catch (error) {
    console.error(`Error retrying scan ${scanId}:`, error);
    if (error instanceof AxiosError) {
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      console.error('Error headers:', error.response?.headers);
      const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message;
      throw new Error(`Failed to retry scan: ${errorMessage}`);
    }
    throw new Error('Failed to retry scan');
  }
}                                                                                                                                                                                                                                                