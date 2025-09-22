const fs = require('fs');
const path = require('path');

// Tool Templates
const toolTemplate = (className, name, description, params, endpoint, method = 'GET', hasParams = false) => `import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';

export class ${className} extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return '${name}';
  }

  getDescription(): string {
    return '${description}';
  }

  getParams(): z.ZodRawShape {
    return {
${params}
    };
  }

  async handle(params: any): Promise<any> {
    try {
${hasParams ? `      const requestData = [{
        ${Object.keys(params).map(key => `${key}: params.${key}`).join(',\n        ')},
      }];

      const response = await this.dataForSEOClient.makeRequest(
        '${endpoint}',
        '${method}',
        requestData
      );` : `      const response = await this.dataForSEOClient.makeRequest(
        '${endpoint}',
        '${method}'
      );`}
      
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}`;

// Tool Definitions
const tools = [
  // Google Shopping Tools
  {
    className: 'MerchantGoogleSellersTasksReadyTool',
    name: 'merchant_google_sellers_tasks_ready',
    description: 'Get the list of completed Google Shopping sellers tasks that haven\'t been collected yet',
    params: {},
    endpoint: '/v3/merchant/google/sellers/tasks_ready',
    method: 'GET'
  },
  {
    className: 'MerchantGoogleSellersTaskGetAdvancedTool',
    name: 'merchant_google_sellers_task_get_advanced',
    description: 'Get advanced results for a completed Google Shopping sellers task',
    params: { id: "z.string().describe('Task identifier (UUID format)')" },
    endpoint: '/v3/merchant/google/sellers/task_get/advanced/${params.id}',
    method: 'GET'
  },
  {
    className: 'MerchantGoogleSellersTaskGetHtmlTool',
    name: 'merchant_google_sellers_task_get_html',
    description: 'Get HTML results for a completed Google Shopping sellers task',
    params: { id: "z.string().describe('Task identifier (UUID format)')" },
    endpoint: '/v3/merchant/google/sellers/task_get/html/${params.id}',
    method: 'GET'
  },
  {
    className: 'MerchantGoogleProductSpecTaskPostTool',
    name: 'merchant_google_product_spec_task_post',
    description: 'Create a Google Shopping product specification task',
    params: { 
      product_id: "z.string().describe('Product ID to get specifications for')",
      location_code: "z.number().optional().describe('Location code for search')",
      language_code: "z.string().default('en').describe('Language code')",
      postback_url: "z.string().optional().describe('Postback URL for notifications')"
    },
    endpoint: '/v3/merchant/google/product_spec/task_post',
    method: 'POST',
    hasParams: true
  },
  {
    className: 'MerchantGoogleProductSpecTasksReadyTool',
    name: 'merchant_google_product_spec_tasks_ready',
    description: 'Get the list of completed Google Shopping product specification tasks that haven\'t been collected yet',
    params: {},
    endpoint: '/v3/merchant/google/product_spec/tasks_ready',
    method: 'GET'
  },
  {
    className: 'MerchantGoogleProductSpecTaskGetAdvancedTool',
    name: 'merchant_google_product_spec_task_get_advanced',
    description: 'Get advanced results for a completed Google Shopping product specification task',
    params: { id: "z.string().describe('Task identifier (UUID format)')" },
    endpoint: '/v3/merchant/google/product_spec/task_get/advanced/${params.id}',
    method: 'GET'
  },
  {
    className: 'MerchantGoogleProductSpecTaskGetHtmlTool',
    name: 'merchant_google_product_spec_task_get_html',
    description: 'Get HTML results for a completed Google Shopping product specification task',
    params: { id: "z.string().describe('Task identifier (UUID format)')" },
    endpoint: '/v3/merchant/google/product_spec/task_get/html/${params.id}',
    method: 'GET'
  },
  {
    className: 'MerchantGoogleProductInfoTaskPostTool',
    name: 'merchant_google_product_info_task_post',
    description: 'Create a Google Shopping product info task',
    params: { 
      product_id: "z.string().describe('Product ID to get information for')",
      location_code: "z.number().optional().describe('Location code for search')",
      language_code: "z.string().default('en').describe('Language code')",
      postback_url: "z.string().optional().describe('Postback URL for notifications')"
    },
    endpoint: '/v3/merchant/google/product_info/task_post',
    method: 'POST',
    hasParams: true
  },
  {
    className: 'MerchantGoogleProductInfoTasksReadyTool',
    name: 'merchant_google_product_info_tasks_ready',
    description: 'Get the list of completed Google Shopping product info tasks that haven\'t been collected yet',
    params: {},
    endpoint: '/v3/merchant/google/product_info/tasks_ready',
    method: 'GET'
  },
  {
    className: 'MerchantGoogleProductInfoTaskGetAdvancedTool',
    name: 'merchant_google_product_info_task_get_advanced',
    description: 'Get advanced results for a completed Google Shopping product info task',
    params: { id: "z.string().describe('Task identifier (UUID format)')" },
    endpoint: '/v3/merchant/google/product_info/task_get/advanced/${params.id}',
    method: 'GET'
  },
  {
    className: 'MerchantGoogleSellersAdUrlTool',
    name: 'merchant_google_sellers_ad_url',
    description: 'Get the full URL of a Google Shopping advertisement',
    params: { shop_ad_aclk: "z.string().describe('Unique ad click referral parameter')" },
    endpoint: '/v3/merchant/google/sellers/ad_url/${params.shop_ad_aclk}',
    method: 'GET'
  },
  
  // Amazon Tools
  {
    className: 'MerchantAmazonProductsTasksReadyTool',
    name: 'merchant_amazon_products_tasks_ready',
    description: 'Get the list of completed Amazon products tasks that haven\'t been collected yet',
    params: {},
    endpoint: '/v3/merchant/amazon/products/tasks_ready',
    method: 'GET'
  },
  {
    className: 'MerchantAmazonProductsTaskGetAdvancedTool',
    name: 'merchant_amazon_products_task_get_advanced',
    description: 'Get advanced results for a completed Amazon products task',
    params: { id: "z.string().describe('Task identifier (UUID format)')" },
    endpoint: '/v3/merchant/amazon/products/task_get/advanced/${params.id}',
    method: 'GET'
  },
  {
    className: 'MerchantAmazonProductsTaskGetHtmlTool',
    name: 'merchant_amazon_products_task_get_html',
    description: 'Get HTML results for a completed Amazon products task',
    params: { id: "z.string().describe('Task identifier (UUID format)')" },
    endpoint: '/v3/merchant/amazon/products/task_get/html/${params.id}',
    method: 'GET'
  },
  {
    className: 'MerchantAmazonAsinTaskPostTool',
    name: 'merchant_amazon_asin_task_post',
    description: 'Create an Amazon ASIN task to get ASIN information for a product',
    params: { 
      keyword: "z.string().describe('Product keyword to search for')",
      location_code: "z.number().optional().describe('Location code for search')",
      language_code: "z.string().default('en').describe('Language code')",
      postback_url: "z.string().optional().describe('Postback URL for notifications')"
    },
    endpoint: '/v3/merchant/amazon/asin/task_post',
    method: 'POST',
    hasParams: true
  },
  {
    className: 'MerchantAmazonAsinTasksReadyTool',
    name: 'merchant_amazon_asin_tasks_ready',
    description: 'Get the list of completed Amazon ASIN tasks that haven\'t been collected yet',
    params: {},
    endpoint: '/v3/merchant/amazon/asin/tasks_ready',
    method: 'GET'
  },
  {
    className: 'MerchantAmazonAsinTaskGetAdvancedTool',
    name: 'merchant_amazon_asin_task_get_advanced',
    description: 'Get advanced results for a completed Amazon ASIN task',
    params: { id: "z.string().describe('Task identifier (UUID format)')" },
    endpoint: '/v3/merchant/amazon/asin/task_get/advanced/${params.id}',
    method: 'GET'
  },
  {
    className: 'MerchantAmazonAsinTaskGetHtmlTool',
    name: 'merchant_amazon_asin_task_get_html',
    description: 'Get HTML results for a completed Amazon ASIN task',
    params: { id: "z.string().describe('Task identifier (UUID format)')" },
    endpoint: '/v3/merchant/amazon/asin/task_get/html/${params.id}',
    method: 'GET'
  },
  {
    className: 'MerchantAmazonSellersTaskPostTool',
    name: 'merchant_amazon_sellers_task_post',
    description: 'Create an Amazon sellers task to get seller information for a specific product',
    params: { 
      product_id: "z.string().describe('Product ID to search sellers for')",
      location_code: "z.number().optional().describe('Location code for search')",
      language_code: "z.string().default('en').describe('Language code')",
      postback_url: "z.string().optional().describe('Postback URL for notifications')"
    },
    endpoint: '/v3/merchant/amazon/sellers/task_post',
    method: 'POST',
    hasParams: true
  },
  {
    className: 'MerchantAmazonSellersTasksReadyTool',
    name: 'merchant_amazon_sellers_tasks_ready',
    description: 'Get the list of completed Amazon sellers tasks that haven\'t been collected yet',
    params: {},
    endpoint: '/v3/merchant/amazon/sellers/tasks_ready',
    method: 'GET'
  },
  {
    className: 'MerchantAmazonSellersTaskGetAdvancedTool',
    name: 'merchant_amazon_sellers_task_get_advanced',
    description: 'Get advanced results for a completed Amazon sellers task',
    params: { id: "z.string().describe('Task identifier (UUID format)')" },
    endpoint: '/v3/merchant/amazon/sellers/task_get/advanced/${params.id}',
    method: 'GET'
  },
  {
    className: 'MerchantAmazonSellersTaskGetHtmlTool',
    name: 'merchant_amazon_sellers_task_get_html',
    description: 'Get HTML results for a completed Amazon sellers task',
    params: { id: "z.string().describe('Task identifier (UUID format)')" },
    endpoint: '/v3/merchant/amazon/sellers/task_get/html/${params.id}',
    method: 'GET'
  },
  {
    className: 'MerchantAmazonReviewsTaskPostTool',
    name: 'merchant_amazon_reviews_task_post',
    description: 'Create an Amazon reviews task to get review information for a specific product',
    params: { 
      asin: "z.string().describe('Amazon ASIN to get reviews for')",
      location_code: "z.number().optional().describe('Location code for search')",
      language_code: "z.string().default('en').describe('Language code')",
      postback_url: "z.string().optional().describe('Postback URL for notifications')"
    },
    endpoint: '/v3/merchant/amazon/reviews/task_post',
    method: 'POST',
    hasParams: true
  },
  {
    className: 'MerchantAmazonReviewsTasksReadyTool',
    name: 'merchant_amazon_reviews_tasks_ready',
    description: 'Get the list of completed Amazon reviews tasks that haven\'t been collected yet',
    params: {},
    endpoint: '/v3/merchant/amazon/reviews/tasks_ready',
    method: 'GET'
  },
  {
    className: 'MerchantAmazonReviewsTaskGetAdvancedTool',
    name: 'merchant_amazon_reviews_task_get_advanced',
    description: 'Get advanced results for a completed Amazon reviews task',
    params: { id: "z.string().describe('Task identifier (UUID format)')" },
    endpoint: '/v3/merchant/amazon/reviews/task_get/advanced/${params.id}',
    method: 'GET'
  },
  {
    className: 'MerchantAmazonReviewsTaskGetHtmlTool',
    name: 'merchant_amazon_reviews_task_get_html',
    description: 'Get HTML results for a completed Amazon reviews task',
    params: { id: "z.string().describe('Task identifier (UUID format)')" },
    endpoint: '/v3/merchant/amazon/reviews/task_get/html/${params.id}',
    method: 'GET'
  }
];

// Generate tools
tools.forEach(tool => {
  const paramsString = Object.entries(tool.params)
    .map(([key, value]) => `      ${key}: ${value}`)
    .join(',\n');

  const content = toolTemplate(
    tool.className,
    tool.name,
    tool.description,
    paramsString,
    tool.endpoint,
    tool.method,
    tool.hasParams
  );

  const fileName = `${tool.name.replace(/_/g, '-')}.tool.ts`;
  const filePath = path.join(__dirname, '..', 'src', 'core', 'modules', 'merchant', 'tools', 
    tool.name.includes('google') ? 'google' : 'amazon', fileName);

  // Ensure directory exists
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(filePath, content);
  console.log(`Created: ${fileName}`);
});

console.log('All merchant tools generated successfully!');
