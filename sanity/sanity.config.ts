import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schema'
import { cloudinaryAssetSourcePlugin, cloudinarySchemaPlugin } from 'sanity-plugin-cloudinary'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "dfvr7i1k"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

export default defineConfig({
  basePath: '/studio',
  name: 'shubz_visuals_content_studio',
  title: 'SHUBZ Visuals Studio',

  projectId,
  dataset,

  plugins: [
    structureTool(),
    cloudinarySchemaPlugin(), // Adds the `cloudinary.asset` type
    cloudinaryAssetSourcePlugin(), // Adds Cloudinary as an asset source for `image` fields
  ],

  schema: {
    types: schemaTypes,
  },
})