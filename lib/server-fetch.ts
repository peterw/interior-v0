import { API_URL } from '@/config/constants';
import { cookies } from 'next/headers';

/**
 * Simple fetch utility for server components
 */
export async function serverFetch<T>(
  path: string, 
  options: RequestInit = {}
): Promise<T> {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const url = path.startsWith('http') ? path : `${API_URL}${path}`;
  
  const response = await fetch(url, {
    ...options,
    headers,
    cache: 'no-store', // Disable caching for dynamic data
  });

  if (!response.ok) {
    throw new Error(`Server fetch error: ${response.status}`);
  }

  return response.json();
} 