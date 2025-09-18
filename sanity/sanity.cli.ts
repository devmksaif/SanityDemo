import { defineCliConfig } from 'sanity/cli'

// Fallback to hardcoded values for local development
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "dfvr7i1k"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  }
})