// Helper function to build Cloudinary URL with transformations
export function getCloudinaryImageUrl(asset: any, options: { width?: number; height?: number; crop?: string } = {}) {
  if (!asset || !asset.public_id) {
    return null;
  }

  const { width, height, crop = 'fill' } = options;
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dxfahpeb2"; // Your cloud name from the error
  
  // Base URL
  let url = `https://res.cloudinary.com/${cloudName}/image/upload/`;
  
  // Add transformations
  const transformations = [];
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (crop) transformations.push(`c_${crop}`);
  
  if (transformations.length > 0) {
    url += transformations.join(',') + '/';
  }
  
  // Add the public ID and format
  url += asset.public_id;
  if (asset.format) {
    url += '.' + asset.format;
  }
  
  return url;
}

// Helper function to check if an asset is a Cloudinary asset
export function isCloudinaryAsset(asset: any): boolean {
  return asset && asset._type === 'cloudinary.asset' && asset.public_id;
}

// Helper function to get image URL from either Sanity or Cloudinary
export function getImageUrl(asset: any, options: { width?: number; height?: number } = {}): string | null {
  if (!asset) return null;
  
  // If it's a Cloudinary asset
  if (isCloudinaryAsset(asset)) {
    return getCloudinaryImageUrl(asset, options);
  }
  
  // If it's a Sanity asset (fallback)
  if (asset._type === 'image' || asset._type === 'sanity.imageAsset') {
    // You'll need to import your urlFor function here
    // For now, return the raw URL if available
    return asset.url || null;
  }
  
  return null;
}