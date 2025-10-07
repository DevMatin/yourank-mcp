// Labs Schema Index - Exportiert alle Labs Schemas
import { GoogleLabsApis } from '../../schemas/labs/google-labs'
import { BingLabsApis } from '../../schemas/labs/bing-labs'
import { AmazonLabsApis } from '../../schemas/labs/amazon-labs'
import { TrendsLabsApis } from '../../schemas/labs/trends-labs'
import { ToolApi } from '../../schemas/labs/google-labs'

// Re-export für externe Verwendung
export { GoogleLabsApis } from '../../schemas/labs/google-labs'
export { BingLabsApis } from '../../schemas/labs/bing-labs'
export { AmazonLabsApis } from '../../schemas/labs/amazon-labs'
export { TrendsLabsApis } from '../../schemas/labs/trends-labs'
export { ToolApi } from '../../schemas/labs/google-labs'

// Kombiniertes Array aller Labs APIs
export const AllLabsApis = [
  ...GoogleLabsApis,
  ...BingLabsApis,
  ...AmazonLabsApis,
  ...TrendsLabsApis
]
