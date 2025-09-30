import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schema'
import { cloudinaryAssetSource, cloudinarySchemaPlugin } from 'sanity-plugin-cloudinary'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "dfvr7i1k"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

// Cloudinary configuration
const cloudinaryConfig = {
  cloudName: process.env.SANITY_STUDIO_CLOUDINARY_CLOUD_NAME || "shubz-entertainment",
  apiKey: process.env.SANITY_STUDIO_CLOUDINARY_API_KEY,
  apiSecret: process.env.SANITY_STUDIO_CLOUDINARY_API_SECRET, // Only needed for server-side operations
}

export default defineConfig({
  basePath: '/studio',
  name: 'shubz_visuals_content_studio',
  title: 'SHUBZ Visuals Studio',

  projectId,
  dataset,

  plugins: [structureTool(), cloudinarySchemaPlugin({
    cloudinary: cloudinaryConfig
  })],

  schema: {
    types: schemaTypes,
  },

  form: {
    image: {
      assetSources: (previousAssetSources) => {
        // Add Cloudinary as an asset source
        return [...previousAssetSources, cloudinaryAssetSource]
      }
    }
  }
})