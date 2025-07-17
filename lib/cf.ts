// Simple helper to get Cloudflare image URLs
import mappingsData from '@/public/cf-images.json';

const mappings = mappingsData as Record<string, string>;

export function cf(path: string): string {
  return mappings[path] || path;
}