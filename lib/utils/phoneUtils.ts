/**
 * Strips all non-digit characters from a phone number
 * @param phoneNumber - The phone number string to clean
 * @returns The phone number with only digits, or null if input is null/undefined
 */
export function stripPhoneNumber(phoneNumber: string | null | undefined): string | null {
  if (!phoneNumber) {
    return null;
  }
  
  // Remove all non-digit characters
  const digitsOnly = phoneNumber.replace(/\D/g, '');
  
  // Return null if no digits found, otherwise return the cleaned number
  return digitsOnly.length > 0 ? digitsOnly : null;
} 