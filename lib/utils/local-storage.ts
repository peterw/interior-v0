/**
 * Utility functions for working with localStorage
 */

// Constants for localStorage keys
export const STORAGE_KEYS = {
  RECENT_URLS: 'localrank_recent_urls',
  RECENT_KEYWORDS: 'localrank_recent_keywords',
};

// Maximum number of items to store
const MAX_STORED_ITEMS = 10;

// Type definitions
export interface RecentUrl {
  url: string;
  businessName?: string;
}

/**
 * Check if localStorage is available
 */
export function isLocalStorageAvailable(): boolean {
  try {
    const testKey = '__test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Generic localStorage utilities
 */
function getStoredArray(key: string): any[] {
  if (!isLocalStorageAvailable()) return [];
  
  try {
    const storedValue = localStorage.getItem(key);
    const items = storedValue ? JSON.parse(storedValue) : [];
    return Array.isArray(items) ? items : [];
  } catch (error) {
    console.error(`Error retrieving stored items for key ${key}:`, error);
    return [];
  }
}

function setStoredArray(key: string, items: any[]): void {
  if (!isLocalStorageAvailable()) return;
  
  try {
    localStorage.setItem(key, JSON.stringify(items));
  } catch (error) {
    console.error(`Error storing items for key ${key}:`, error);
  }
}

/**
 * Validation functions for specific data types
 */
function isValidRecentUrl(item: any): item is RecentUrl {
  return item && 
         typeof item === 'object' && 
         typeof item.url === 'string' && 
         item.url.trim().length > 0 &&
         (item.businessName === undefined || typeof item.businessName === 'string');
}

function normalizeRecentUrl(item: any): RecentUrl | null {
  // Handle legacy string format
  if (typeof item === 'string' && item.trim().length > 0) {
    return { url: item.trim() };
  }
  
  // Handle object format
  if (item && typeof item === 'object' && typeof item.url === 'string') {
    const normalized: RecentUrl = { url: item.url.trim() };
    
    // Only include businessName if it's a valid string
    if (typeof item.businessName === 'string' && item.businessName.trim().length > 0) {
      normalized.businessName = item.businessName.trim();
    }
    
    return normalized;
  }
  
  return null;
}

function isValidKeyword(item: any): item is string {
  return typeof item === 'string' && item.trim().length > 0;
}

/**
 * Specific functions for each data type
 */
export function getRecentUrls(): RecentUrl[] {
  const items = getStoredArray(STORAGE_KEYS.RECENT_URLS);
  return items
    .map(normalizeRecentUrl)
    .filter((item): item is RecentUrl => item !== null);
}

export function addRecentUrl(url: string, businessName?: string): RecentUrl[] {
  const newItem: RecentUrl = { url: url.trim() };
  if (businessName && businessName.trim().length > 0) {
    newItem.businessName = businessName.trim();
  }
  
  if (!isValidRecentUrl(newItem)) {
    console.error('Invalid recent URL item:', newItem);
    return getRecentUrls();
  }
  
  const currentItems = getRecentUrls();
  
  // Remove duplicates (by URL)
  const filteredItems = currentItems.filter(item => item.url !== newItem.url);
  
  // Add new item at the beginning
  const newItems = [newItem, ...filteredItems].slice(0, MAX_STORED_ITEMS);
  
  setStoredArray(STORAGE_KEYS.RECENT_URLS, newItems);
  return newItems;
}

export function getRecentKeywords(): string[] {
  const items = getStoredArray(STORAGE_KEYS.RECENT_KEYWORDS);
  return items
    .filter(isValidKeyword)
    .map(keyword => keyword.trim());
}

export function addRecentKeyword(keyword: string): string[] {
  const trimmedKeyword = keyword.trim();
  
  if (!isValidKeyword(trimmedKeyword)) {
    console.error('Invalid keyword:', keyword);
    return getRecentKeywords();
  }
  
  const currentItems = getRecentKeywords();
  
  // Remove duplicates (case-insensitive)
  const filteredItems = currentItems.filter(
    item => item.toLowerCase() !== trimmedKeyword.toLowerCase()
  );
  
  // Add new item at the beginning
  const newItems = [trimmedKeyword, ...filteredItems].slice(0, MAX_STORED_ITEMS);
  
  setStoredArray(STORAGE_KEYS.RECENT_KEYWORDS, newItems);
  return newItems;
}

/**
 * Generic functions for backward compatibility
 */
export function getStoredItems<T>(key: string): T[] {
  if (key === STORAGE_KEYS.RECENT_URLS) {
    return getRecentUrls() as unknown as T[];
  }
  if (key === STORAGE_KEYS.RECENT_KEYWORDS) {
    return getRecentKeywords() as unknown as T[];
  }
  return getStoredArray(key) as T[];
}

export function addStoredItem<T>(key: string, item: T): T[] {
  if (key === STORAGE_KEYS.RECENT_URLS && typeof item === 'object' && item !== null) {
    const urlItem = item as any;
    return addRecentUrl(urlItem.url, urlItem.businessName) as unknown as T[];
  }
  if (key === STORAGE_KEYS.RECENT_KEYWORDS && typeof item === 'string') {
    return addRecentKeyword(item) as unknown as T[];
  }
  
  // Fallback for unknown keys
  const currentItems = getStoredArray(key);
  const newItems = [item, ...currentItems].slice(0, MAX_STORED_ITEMS);
  setStoredArray(key, newItems);
  return newItems;
}

/**
 * Clean up corrupted localStorage data
 */
export function cleanupStoredItems(key: string): void {
  if (key === STORAGE_KEYS.RECENT_URLS) {
    const cleanedItems = getRecentUrls(); // This already normalizes/cleans the data
    setStoredArray(key, cleanedItems);
  } else if (key === STORAGE_KEYS.RECENT_KEYWORDS) {
    const cleanedItems = getRecentKeywords(); // This already normalizes/cleans the data
    setStoredArray(key, cleanedItems);
  }
}
