// This file should not exist - this is a temporary fix for a TypeScript cache issue
// The real file is at api/schemas/domain_analytics/domain-analytics-technologies-schema.ts
import { getDataForSEOAuthHeader } from "../../schemas/envs"

export interface ToolApi {
  id: string
  name: string
  description: string
  category: string
  icon: string
  url?: string
  customHeaders?: object
  schema: object
}

// Placeholder export to fix import error
export const DomainAnalyticsTechnologiesApis: ToolApi[] = []
