import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schema'
import { cloudinaryAssetSource, cloudinarySchemaPlugin } from 'sanity-plugin-cloudinary'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "dfvr7i1k"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

export default defineConfig({
  basePath: '/studio',
  name: 'shubz_visuals_content_studio',
  title: 'SHUBZ Visuals Studio',

  projectId,
  dataset,

  plugins: [structureTool(), cloudinarySchemaPlugin()],

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