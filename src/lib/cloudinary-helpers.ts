// Helper function to get image URL from either Sanity or Cloudinary
export function getImageUrl(asset: any, options: { width?: number; height?: number; crop?: string } = {}): string {
  if (!asset) return "";
  
  // If it's a Cloudinary asset, return the secure_url directly
  if (asset._type === 'cloudinary.asset' && asset.secure_url) {
    return asset.secure_url;
  }
  
  // If it's a Sanity asset, use urlFor
  if (asset._type === 'image' || asset._type === 'sanity.imageAsset') {
    // You'll need to import your urlFor function here
    const { urlFor } = require('@/lib/sanity');
    return urlFor(asset).width(options.width || 800).height(options.height || 600).url();
  }
  
  // Fallback
  return "";
}

// Helper to check if asset is Cloudinary
export function isCloudinaryAsset(asset: any): boolean {
  return asset && asset._type === 'cloudinary.asset';
}