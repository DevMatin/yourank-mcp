// Business Data Schema Index - Exportiert alle Business Data Schemas
import { TrustpilotApis } from '../../schemas/business_data/trustpilot-schema'
import { TripadvisorApis } from '../../schemas/business_data/tripadvisor-schema'
import { GoogleBusinessApis } from '../../schemas/business_data/google-business-schema'
import { SocialMediaApis } from '../../schemas/business_data/social-media-schema'
import { BusinessUtilitiesApis } from '../../schemas/business_data/business-utilities-schema'
import { GoogleMapsApis } from '../../schemas/business_data/google-maps-schema'
import { ToolApi } from '../../schemas/business_data/google-business-schema'

// Re-export für externe Verwendung
export { TrustpilotApis } from '../../schemas/business_data/trustpilot-schema'
export { TripadvisorApis } from '../../schemas/business_data/tripadvisor-schema'
export { GoogleBusinessApis } from '../../schemas/business_data/google-business-schema'
export { SocialMediaApis } from '../../schemas/business_data/social-media-schema'
export { BusinessUtilitiesApis } from '../../schemas/business_data/business-utilities-schema'
export { GoogleMapsApis } from '../../schemas/business_data/google-maps-schema'
export { ToolApi } from '../../schemas/business_data/google-business-schema'

// Kombiniertes Array aller Business Data APIs
export const AllBusinessDataApis = [
  ...TrustpilotApis,
  ...TripadvisorApis,
  ...GoogleBusinessApis,
  ...SocialMediaApis,
  ...BusinessUtilitiesApis,
  ...GoogleMapsApis
]
