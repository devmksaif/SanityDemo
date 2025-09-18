import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schema'

// Using the project details you provided
const projectId = 'dfvr7i1k'
const dataset = 'production'

export default defineConfig({
  basePath: '/studio',
  name: 'shubz_visuals_content_studio',
  title: 'SHUBZ Visuals Studio',

  projectId,
  dataset,

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})