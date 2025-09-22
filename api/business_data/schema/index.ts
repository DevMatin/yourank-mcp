// Business Data Schema Index - Exportiert alle Business Data Schemas
export { TrustpilotApis } from '../../schemas/business_data/trustpilot-schema.js'
export { TripadvisorApis } from '../../schemas/business_data/tripadvisor-schema.js'
export { GoogleBusinessApis } from '../../schemas/business_data/google-business-schema.js'
export { SocialMediaApis } from '../../schemas/business_data/social-media-schema.js'
export { BusinessUtilitiesApis } from '../../schemas/business_data/business-utilities-schema.js'
export { GoogleMapsApis } from '../../schemas/business_data/google-maps-schema.js'
export { ToolApi } from '../../schemas/business_data/google-business-schema.js'

// Kombiniertes Array aller Business Data APIs
export const AllBusinessDataApis = [
  ...TrustpilotApis,
  ...TripadvisorApis,
  ...GoogleBusinessApis,
  ...SocialMediaApis,
  ...BusinessUtilitiesApis,
  ...GoogleMapsApis
]
