/**
 * Mask Processing Utilities
 * 
 * Utilities for converting and processing mask data between different formats.
 * Handles conversion between canvas drawings and AI-compatible mask formats.
 */

/**
 * Convert a colored mask (e.g., purple from canvas) to black/white mask
 * This runs in the browser using Canvas API
 * 
 * @param maskDataUrl - The mask data URL from canvas (may contain colors)
 * @param invertMask - Whether to invert the mask (default: false)
 * @returns Promise<string> - Black/white mask data URL
 */
export async function convertToBlackWhiteMask(
  maskDataUrl: string,
  invertMask: boolean = false
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }
      
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw the mask image
      ctx.drawImage(img, 0, 0);
      
      // Get image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Convert to black/white
      // Any non-transparent pixel becomes white (edit area)
      // Transparent pixels become black (preserve area)
      for (let i = 0; i < data.length; i += 4) {
        const alpha = data[i + 3];
        
        // If pixel has any opacity, it's part of the mask
        const isMasked = alpha > 0;
        
        // Set to white (255) for masked areas, black (0) for non-masked
        const value = (isMasked !== invertMask) ? 255 : 0;
        
        data[i] = value;     // R
        data[i + 1] = value; // G
        data[i + 2] = value; // B
        data[i + 3] = 255;   // A (fully opaque)
      }
      
      // Put the processed data back
      ctx.putImageData(imageData, 0, 0);
      
      // Convert to data URL
      resolve(canvas.toDataURL('image/png'));
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load mask image'));
    };
    
    img.src = maskDataUrl;
  });
}

/**
 * Dilate/expand the mask to ensure better coverage
 * Useful for avoiding edge artifacts in AI generation
 * 
 * @param maskDataUrl - The mask data URL
 * @param radius - Dilation radius in pixels (default: 5)
 * @returns Promise<string> - Dilated mask data URL
 */
export async function dilateMask(
  maskDataUrl: string,
  radius: number = 5
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }
      
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw the original mask
      ctx.drawImage(img, 0, 0);
      
      // Get image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const width = canvas.width;
      const height = canvas.height;
      
      // Create a copy for the dilated result
      const dilatedData = new Uint8ClampedArray(data);
      
      // Perform dilation
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = (y * width + x) * 4;
          
          // Check if any pixel within radius is white
          let hasWhiteNeighbor = false;
          
          for (let dy = -radius; dy <= radius; dy++) {
            for (let dx = -radius; dx <= radius; dx++) {
              const nx = x + dx;
              const ny = y + dy;
              
              // Check bounds
              if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                const nIdx = (ny * width + nx) * 4;
                
                // Check if neighbor is white (masked)
                if (data[nIdx] > 128) {
                  hasWhiteNeighbor = true;
                  break;
                }
              }
            }
            if (hasWhiteNeighbor) break;
          }
          
          // Set pixel to white if it has a white neighbor
          const value = hasWhiteNeighbor ? 255 : 0;
          dilatedData[idx] = value;
          dilatedData[idx + 1] = value;
          dilatedData[idx + 2] = value;
          dilatedData[idx + 3] = 255;
        }
      }
      
      // Create new image data with dilated mask
      const newImageData = new ImageData(dilatedData, width, height);
      ctx.putImageData(newImageData, 0, 0);
      
      // Convert to data URL
      resolve(canvas.toDataURL('image/png'));
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load mask image'));
    };
    
    img.src = maskDataUrl;
  });
}

/**
 * Smooth/blur the mask edges for softer transitions
 * 
 * @param maskDataUrl - The mask data URL
 * @param blurRadius - Blur radius in pixels (default: 3)
 * @returns Promise<string> - Smoothed mask data URL
 */
export async function smoothMaskEdges(
  maskDataUrl: string,
  blurRadius: number = 3
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }
      
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Apply blur filter
      ctx.filter = `blur(${blurRadius}px)`;
      ctx.drawImage(img, 0, 0);
      
      // Convert to data URL
      resolve(canvas.toDataURL('image/png'));
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load mask image'));
    };
    
    img.src = maskDataUrl;
  });
}

/**
 * Get mask statistics (coverage percentage, bounds, etc.)
 * 
 * @param maskDataUrl - The mask data URL
 * @returns Promise<MaskStats> - Mask statistics
 */
export interface MaskStats {
  coverage: number; // Percentage of image covered by mask
  bounds: {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
    width: number;
    height: number;
  };
  isEmpty: boolean;
}

export async function getMaskStats(maskDataUrl: string): Promise<MaskStats> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }
      
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      let maskedPixels = 0;
      let minX = canvas.width;
      let minY = canvas.height;
      let maxX = 0;
      let maxY = 0;
      
      // Analyze mask
      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const idx = (y * canvas.width + x) * 4;
          const alpha = data[idx + 3];
          
          // Check if pixel is part of mask (has opacity)
          if (alpha > 0) {
            maskedPixels++;
            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            maxX = Math.max(maxX, x);
            maxY = Math.max(maxY, y);
          }
        }
      }
      
      const totalPixels = canvas.width * canvas.height;
      const coverage = (maskedPixels / totalPixels) * 100;
      const isEmpty = maskedPixels === 0;
      
      resolve({
        coverage,
        bounds: {
          minX: isEmpty ? 0 : minX,
          minY: isEmpty ? 0 : minY,
          maxX: isEmpty ? canvas.width : maxX,
          maxY: isEmpty ? canvas.height : maxY,
          width: isEmpty ? 0 : maxX - minX + 1,
          height: isEmpty ? 0 : maxY - minY + 1,
        },
        isEmpty,
      });
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load mask image'));
    };
    
    img.src = maskDataUrl;
  });
}

/**
 * Validate mask data before sending to API
 * 
 * @param maskDataUrl - The mask data URL
 * @returns Promise<ValidationResult> - Validation result
 */
export interface ValidationResult {
  isValid: boolean;
  error?: string;
  stats?: MaskStats;
}

export async function validateMask(maskDataUrl: string): Promise<ValidationResult> {
  try {
    // Check if it's a valid data URL
    if (!maskDataUrl.startsWith('data:image/')) {
      return {
        isValid: false,
        error: 'Invalid mask data URL format',
      };
    }
    
    // Get mask statistics
    const stats = await getMaskStats(maskDataUrl);
    
    // Check if mask is empty
    if (stats.isEmpty) {
      return {
        isValid: false,
        error: 'No mask area selected. Please draw on the image to select an area to edit.',
        stats,
      };
    }
    
    // Check if mask is too small
    if (stats.coverage < 0.1) {
      return {
        isValid: false,
        error: 'Mask area is too small. Please select a larger area.',
        stats,
      };
    }
    
    // Check if mask is too large
    if (stats.coverage > 90) {
      return {
        isValid: false,
        error: 'Mask covers most of the image. Consider using full image transformation instead.',
        stats,
      };
    }
    
    return {
      isValid: true,
      stats,
    };
  } catch (error) {
    return {
      isValid: false,
      error: error instanceof Error ? error.message : 'Failed to validate mask',
    };
  }
}