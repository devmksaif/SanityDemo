// Simple configuration without importing from sanity/cli
export default {
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "dfvr7i1k",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  }
}