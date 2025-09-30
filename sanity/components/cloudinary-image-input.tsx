import React, { useEffect, useState } from 'react'
import { setCloudinaryConfig } from 'cloudinary-core'
import { cloudinaryAssetSource } from 'sanity-plugin-cloudinary'

interface CloudinaryImageInputProps {
  onChange: (value: any) => void
  value: any
  type: any
}

export function CloudinaryImageInput({ onChange, value, type }: CloudinaryImageInputProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Ensure Cloudinary is loaded
    const cloudName = process.env.SANITY_STUDIO_CLOUDINARY_CLOUD_NAME || "shubz-entertainment"
    const apiKey = process.env.SANITY_STUDIO_CLOUDINARY_API_KEY

    if (cloudName && apiKey) {
      setCloudinaryConfig({
        cloud_name: cloudName,
        api_key: apiKey,
        secure: true
      })
      setIsLoaded(true)
    }
  }, [])

  if (!isLoaded) {
    return <div>Loading Cloudinary...</div>
  }

  // Render the original Cloudinary asset source
  return cloudinaryAssetSource.component({ onChange, value, type })
}