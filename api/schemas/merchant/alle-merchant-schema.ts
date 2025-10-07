// Alle Merchant Schemas - Kombinierte Export-Datei
import { MerchantCoreApis, ToolApi as CoreToolApi } from './merchant-core-schema'
import { MerchantAmazonProductsApis, ToolApi as AmazonProductsToolApi } from './merchant-amazon-products-schema'
import { MerchantGoogleProductsApis, ToolApi as GoogleProductsToolApi } from './merchant-google-products-schema'
import { MerchantAmazonSellersApis, ToolApi as AmazonSellersToolApi } from './merchant-amazon-sellers-schema'
import { MerchantGoogleSellersApis, ToolApi as GoogleSellersToolApi } from './merchant-google-sellers-schema'

// Exportiere alle einzelnen Schema-Arrays
export { MerchantCoreApis } from './merchant-core-schema'
export { MerchantAmazonProductsApis } from './merchant-amazon-products-schema'
export { MerchantGoogleProductsApis } from './merchant-google-products-schema'
export { MerchantAmazonSellersApis } from './merchant-amazon-sellers-schema'
export { MerchantGoogleSellersApis } from './merchant-google-sellers-schema'

// Exportiere ToolApi Interface (alle haben die gleiche Struktur)
export type ToolApi = CoreToolApi

// Kombiniertes Array aller Merchant APIs
export const AllMerchantApis: ToolApi[] = [
  ...MerchantCoreApis,
  ...MerchantAmazonProductsApis,
  ...MerchantGoogleProductsApis,
  ...MerchantAmazonSellersApis,
  ...MerchantGoogleSellersApis
]
