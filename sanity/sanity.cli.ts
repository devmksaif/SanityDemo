import { defineCliConfig } from 'sanity/cli'

// Using the project details you provided
const projectId = 'dfvr7i1k'
const dataset = 'production'

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  }
})