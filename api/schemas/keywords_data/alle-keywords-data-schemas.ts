// Alle Keywords Data Schemas - Kombinierte Export-Datei
import { KeywordsGoogleAdsApis, ToolApi as GoogleAdsToolApi } from './google-ads-schema'
import { KeywordsBingApis, ToolApi as BingToolApi } from './bing-schema'
import { KeywordsTrendsApis, ToolApi as TrendsToolApi } from './trends-schema'
import { KeywordsClickstreamApis, ToolApi as ClickstreamToolApi } from './clickstream-schema'
import { KeywordsSharedApis, ToolApi as SharedToolApi } from './shared-schema'

// Exportiere alle einzelnen Schema-Arrays
export { KeywordsGoogleAdsApis } from './google-ads-schema'
export { KeywordsBingApis } from './bing-schema'
export { KeywordsTrendsApis } from './trends-schema'
export { KeywordsClickstreamApis } from './clickstream-schema'
export { KeywordsSharedApis } from './shared-schema'

// Exportiere ToolApi Interface (alle haben die gleiche Struktur)
export type ToolApi = GoogleAdsToolApi

// Kombiniertes Array aller Keywords Data APIs
export const AllKeywordsDataApis: ToolApi[] = [
  ...KeywordsGoogleAdsApis,
  ...KeywordsBingApis,
  ...KeywordsTrendsApis,
  ...KeywordsClickstreamApis,
  ...KeywordsSharedApis
]
