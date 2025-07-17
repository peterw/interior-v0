/**
 * Safely decode a URL-encoded string
 * Handles special characters including Nordic characters (Å, Ä, Ö, Ø, etc.)
 * and other international characters
 */
export function safeDecodeURIComponent(str: string | null | undefined): string {
  if (!str) return '';
  
  try {
    // Only decode if the string contains URL-encoded patterns
    if (str.includes('%')) {
      return decodeURIComponent(str);
    }
    return str;
  } catch (error) {
    // If decoding fails, return the original string
    console.warn('Failed to decode string:', str, error);
    return str;
  }
}

/**
 * Decode business name safely
 * Specifically handles business names that might be URL-encoded
 */
export function decodeBusinessName(name: string | null | undefined): string {
  return safeDecodeURIComponent(name);
}