/**
 * Utility functions for generating map grid coordinates
 */

// Earth radius in kilometers
const EARTH_RADIUS_KM = 6371;

/**
 * Convert degrees to radians
 */
export function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Convert radians to degrees
 */
export function radiansToDegrees(radians: number): number {
  return radians * (180 / Math.PI);
}

/**
 * Convert kilometers to miles
 */
export function kmToMiles(km: number): number {
  return km * 0.621371;
}

/**
 * Convert miles to kilometers
 */
export function milesToKm(miles: number): number {
  return miles / 0.621371;
}

/**
 * Calculate the destination point given a starting point, distance, and bearing
 * using the Haversine formula
 * 
 * @param lat Starting latitude in degrees
 * @param lng Starting longitude in degrees
 * @param distance Distance in kilometers
 * @param bearing Bearing in degrees (0 = north, 90 = east, etc.)
 * @returns [latitude, longitude] of the destination point
 */
export function calculateDestinationPoint(
  lat: number,
  lng: number,
  distance: number,
  bearing: number
): [number, number] {
  // Convert to radians
  const latRad = degreesToRadians(lat);
  const lngRad = degreesToRadians(lng);
  const bearingRad = degreesToRadians(bearing);
  
  // Calculate angular distance
  const angularDistance = distance / EARTH_RADIUS_KM;
  
  // Calculate destination latitude
  const destLatRad = Math.asin(
    Math.sin(latRad) * Math.cos(angularDistance) +
    Math.cos(latRad) * Math.sin(angularDistance) * Math.cos(bearingRad)
  );
  
  // Calculate destination longitude
  const destLngRad = lngRad + Math.atan2(
    Math.sin(bearingRad) * Math.sin(angularDistance) * Math.cos(latRad),
    Math.cos(angularDistance) - Math.sin(latRad) * Math.sin(destLatRad)
  );
  
  // Convert back to degrees
  const destLat = radiansToDegrees(destLatRad);
  const destLng = radiansToDegrees(destLngRad);
  
  return [destLat, destLng];
}

/**
 * Generate a circular grid of coordinates around a center point
 * 
 * @param centerLat Center latitude in degrees
 * @param centerLng Center longitude in degrees
 * @param radius Radius in kilometers
 * @param pinCount Number of pins to generate (excluding center)
 * @returns Array of [latitude, longitude] coordinates
 */
export function generateCircularGrid(
  centerLat: number,
  centerLng: number,
  radius: number,
  pinCount: number
): [number, number][] {
  const coordinates: [number, number][] = [];
  
  // Add center point
  coordinates.push([centerLat, centerLng]);
  
  // Generate rings based on pin count
  if (pinCount >= 7) {
    // First ring - 6 pins
    const firstRingRadius = radius * 0.4;
    for (let i = 0; i < 6; i++) {
      const bearing = (i * 60) % 360;
      coordinates.push(calculateDestinationPoint(centerLat, centerLng, firstRingRadius, bearing));
    }
  }
  
  if (pinCount >= 19) {
    // Second ring - 12 pins
    const secondRingRadius = radius * 0.7;
    for (let i = 0; i < 12; i++) {
      const bearing = (i * 30) % 360;
      coordinates.push(calculateDestinationPoint(centerLat, centerLng, secondRingRadius, bearing));
    }
  }
  
  if (pinCount >= 39) {
    // Third ring - 20 pins
    const thirdRingRadius = radius * 0.9;
    for (let i = 0; i < 20; i++) {
      const bearing = (i * 18) % 360;
      coordinates.push(calculateDestinationPoint(centerLat, centerLng, thirdRingRadius, bearing));
    }
  }
  
  // Return only the requested number of pins
  return coordinates.slice(0, pinCount);
} 