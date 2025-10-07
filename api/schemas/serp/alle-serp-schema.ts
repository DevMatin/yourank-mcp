// Alle SERP Schemas - Kombinierte Export-Datei
import { SerpGeneralCompleteApi, ToolApi as SerpGeneralToolApi } from './serp-general'

// Exportiere das SERP General Schema
export { SerpGeneralCompleteApi } from './serp-general'

// Exportiere ToolApi Interface
export type ToolApi = SerpGeneralToolApi

// Kombiniertes Array aller SERP APIs
export const AllSerpApis: ToolApi[] = [
  ...SerpGeneralCompleteApi
]

// Alias für bessere Kompatibilität
export const SerpAllgemeinApis = SerpGeneralCompleteApi
export const SerpGoogleApis = SerpGeneralCompleteApi
export const SerpBingApis = SerpGeneralCompleteApi
export const SerpYoutubeApis = SerpGeneralCompleteApi
