#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

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
      ${hasParams ? `const requestData = [{
${params.split('\n').map(p => p.trim()).filter(p => p).map(p => {
  const key = p.split(':')[0].trim();
  return `        ${key}: params.${key},`;
}).join('\n')}
      }];

      const response = await this.dataForSEOClient.makeRequest(
        '${endpoint}',
        '${method}',
        requestData
      );` : `const response = await this.dataForSEOClient.makeRequest(
        '${endpoint}',
        '${method}'
      );`}
      
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
`;

const tools = [
  // Google Shopping Sellers Tools
  {
    className: 'MerchantGoogleSellersTaskPostTool',
    name: 'merchant_google_sellers_task_post',
    description: 'Post a task to search Google Shopping sellers for a product',
    params: `      product_id: z.string().describe("Product ID to search sellers for"),
      location_code: z.number().describe("Location code for Google Shopping"),
      language_code: z.string().describe("Language code (e.g., 'en', 'de')"),
      device: z.string().optional().describe("Device type (desktop, mobile)"),
      depth: z.number().min(1).max(100).default(20).describe("Number of results to retrieve"),`,
    endpoint: '/v3/merchant/google/sellers/task_post',
    method: 'POST',
    hasParams: true,
    directory: 'google'
  },
  {
    className: 'MerchantGoogleSellersTasksReadyTool',
    name: 'merchant_google_sellers_tasks_ready',
    description: 'Get the list of completed Google Shopping sellers tasks that are ready for collection',
    params: '',
    endpoint: '/v3/merchant/google/sellers/tasks_ready',
    method: 'GET',
    hasParams: false,
    directory: 'google'
  },
  {
    className: 'MerchantGoogleSellersTaskGetAdvancedTool',
    name: 'merchant_google_sellers_task_get_advanced',
    description: 'Get advanced results of a completed Google Shopping sellers task',
    params: `      id: z.string().describe("Task identifier (UUID)"),`,
    endpoint: '/v3/merchant/google/sellers/task_get/advanced/{id}',
    method: 'GET',
    hasParams: false,
    directory: 'google'
  },
  {
    className: 'MerchantGoogleSellersTaskGetHtmlTool',
    name: 'merchant_google_sellers_task_get_html',
    description: 'Get HTML results of a completed Google Shopping sellers task',
    params: `      id: z.string().describe("Task identifier (UUID)"),`,
    endpoint: '/v3/merchant/google/sellers/task_get/html/{id}',
    method: 'GET',
    hasParams: false,
    directory: 'google'
  },
  // Google Shopping Product Spec Tools
  {
    className: 'MerchantGoogleProductSpecTaskPostTool',
    name: 'merchant_google_product_spec_task_post',
    description: 'Post a task to get Google Shopping product specifications',
    params: `      product_id: z.string().describe("Product ID to get specifications for"),
      location_code: z.number().describe("Location code for Google Shopping"),
      language_code: z.string().describe("Language code (e.g., 'en', 'de')"),`,
    endpoint: '/v3/merchant/google/product_spec/task_post',
    method: 'POST',
    hasParams: true,
    directory: 'google'
  },
  {
    className: 'MerchantGoogleProductSpecTasksReadyTool',
    name: 'merchant_google_product_spec_tasks_ready',
    description: 'Get the list of completed Google Shopping product spec tasks that are ready for collection',
    params: '',
    endpoint: '/v3/merchant/google/product_spec/tasks_ready',
    method: 'GET',
    hasParams: false,
    directory: 'google'
  },
  {
    className: 'MerchantGoogleProductSpecTaskGetAdvancedTool',
    name: 'merchant_google_product_spec_task_get_advanced',
    description: 'Get advanced results of a completed Google Shopping product spec task',
    params: `      id: z.string().describe("Task identifier (UUID)"),`,
    endpoint: '/v3/merchant/google/product_spec/task_get/advanced/{id}',
    method: 'GET',
    hasParams: false,
    directory: 'google'
  },
  {
    className: 'MerchantGoogleProductSpecTaskGetHtmlTool',
    name: 'merchant_google_product_spec_task_get_html',
    description: 'Get HTML results of a completed Google Shopping product spec task',
    params: `      id: z.string().describe("Task identifier (UUID)"),`,
    endpoint: '/v3/merchant/google/product_spec/task_get/html/{id}',
    method: 'GET',
    hasParams: false,
    directory: 'google'
  },
  // Google Shopping Product Info Tools
  {
    className: 'MerchantGoogleProductInfoTaskPostTool',
    name: 'merchant_google_product_info_task_post',
    description: 'Post a task to get Google Shopping product information',
    params: `      product_id: z.string().describe("Product ID to get information for"),
      location_code: z.number().describe("Location code for Google Shopping"),
      language_code: z.string().describe("Language code (e.g., 'en', 'de')"),`,
    endpoint: '/v3/merchant/google/product_info/task_post',
    method: 'POST',
    hasParams: true,
    directory: 'google'
  },
  {
    className: 'MerchantGoogleProductInfoTasksReadyTool',
    name: 'merchant_google_product_info_tasks_ready',
    description: 'Get the list of completed Google Shopping product info tasks that are ready for collection',
    params: '',
    endpoint: '/v3/merchant/google/product_info/tasks_ready',
    method: 'GET',
    hasParams: false,
    directory: 'google'
  },
  {
    className: 'MerchantGoogleProductInfoTaskGetAdvancedTool',
    name: 'merchant_google_product_info_task_get_advanced',
    description: 'Get advanced results of a completed Google Shopping product info task',
    params: `      id: z.string().describe("Task identifier (UUID)"),`,
    endpoint: '/v3/merchant/google/product_info/task_get/advanced/{id}',
    method: 'GET',
    hasParams: false,
    directory: 'google'
  },
  // Google Shopping Sellers Ad URL Tool
  {
    className: 'MerchantGoogleSellersAdUrlTool',
    name: 'merchant_google_sellers_ad_url',
    description: 'Get the full URL of a Google Shopping advertisement',
    params: `      shop_ad_aclk: z.string().describe("Unique ad click referral parameter"),`,
    endpoint: '/v3/merchant/google/sellers/ad_url/{shop_ad_aclk}',
    method: 'GET',
    hasParams: false,
    directory: 'google'
  },
  // Amazon ASIN Tools
  {
    className: 'MerchantAmazonAsinTaskPostTool',
    name: 'merchant_amazon_asin_task_post',
    description: 'Post a task to get Amazon ASINs for a product',
    params: `      asin: z.string().describe("ASIN to get information for"),
      location_code: z.number().describe("Location code for Amazon"),
      language_code: z.string().describe("Language code (e.g., 'en', 'de')"),`,
    endpoint: '/v3/merchant/amazon/asin/task_post',
    method: 'POST',
    hasParams: true,
    directory: 'amazon'
  },
  {
    className: 'MerchantAmazonAsinTasksReadyTool',
    name: 'merchant_amazon_asin_tasks_ready',
    description: 'Get the list of completed Amazon ASIN tasks that are ready for collection',
    params: '',
    endpoint: '/v3/merchant/amazon/asin/tasks_ready',
    method: 'GET',
    hasParams: false,
    directory: 'amazon'
  },
  {
    className: 'MerchantAmazonAsinTaskGetAdvancedTool',
    name: 'merchant_amazon_asin_task_get_advanced',
    description: 'Get advanced results of a completed Amazon ASIN task',
    params: `      id: z.string().describe("Task identifier (UUID)"),`,
    endpoint: '/v3/merchant/amazon/asin/task_get/advanced/{id}',
    method: 'GET',
    hasParams: false,
    directory: 'amazon'
  },
  {
    className: 'MerchantAmazonAsinTaskGetHtmlTool',
    name: 'merchant_amazon_asin_task_get_html',
    description: 'Get HTML results of a completed Amazon ASIN task',
    params: `      id: z.string().describe("Task identifier (UUID)"),`,
    endpoint: '/v3/merchant/amazon/asin/task_get/html/{id}',
    method: 'GET',
    hasParams: false,
    directory: 'amazon'
  },
  // Amazon Sellers Tools
  {
    className: 'MerchantAmazonSellersTaskPostTool',
    name: 'merchant_amazon_sellers_task_post',
    description: 'Post a task to search Amazon sellers for a product',
    params: `      asin: z.string().describe("ASIN to search sellers for"),
      location_code: z.number().describe("Location code for Amazon"),
      language_code: z.string().describe("Language code (e.g., 'en', 'de')"),
      device: z.string().optional().describe("Device type (desktop, mobile)"),
      depth: z.number().min(1).max(100).default(20).describe("Number of results to retrieve"),`,
    endpoint: '/v3/merchant/amazon/sellers/task_post',
    method: 'POST',
    hasParams: true,
    directory: 'amazon'
  },
  {
    className: 'MerchantAmazonSellersTasksReadyTool',
    name: 'merchant_amazon_sellers_tasks_ready',
    description: 'Get the list of completed Amazon sellers tasks that are ready for collection',
    params: '',
    endpoint: '/v3/merchant/amazon/sellers/tasks_ready',
    method: 'GET',
    hasParams: false,
    directory: 'amazon'
  },
  {
    className: 'MerchantAmazonSellersTaskGetAdvancedTool',
    name: 'merchant_amazon_sellers_task_get_advanced',
    description: 'Get advanced results of a completed Amazon sellers task',
    params: `      id: z.string().describe("Task identifier (UUID)"),`,
    endpoint: '/v3/merchant/amazon/sellers/task_get/advanced/{id}',
    method: 'GET',
    hasParams: false,
    directory: 'amazon'
  },
  {
    className: 'MerchantAmazonSellersTaskGetHtmlTool',
    name: 'merchant_amazon_sellers_task_get_html',
    description: 'Get HTML results of a completed Amazon sellers task',
    params: `      id: z.string().describe("Task identifier (UUID)"),`,
    endpoint: '/v3/merchant/amazon/sellers/task_get/html/{id}',
    method: 'GET',
    hasParams: false,
    directory: 'amazon'
  },
  // Amazon Reviews Tools
  {
    className: 'MerchantAmazonReviewsTaskPostTool',
    name: 'merchant_amazon_reviews_task_post',
    description: 'Post a task to get Amazon product reviews',
    params: `      asin: z.string().describe("ASIN to get reviews for"),
      location_code: z.number().describe("Location code for Amazon"),
      language_code: z.string().describe("Language code (e.g., 'en', 'de')"),
      depth: z.number().min(1).max(100).default(20).describe("Number of reviews to retrieve"),`,
    endpoint: '/v3/merchant/amazon/reviews/task_post',
    method: 'POST',
    hasParams: true,
    directory: 'amazon'
  },
  {
    className: 'MerchantAmazonReviewsTasksReadyTool',
    name: 'merchant_amazon_reviews_tasks_ready',
    description: 'Get the list of completed Amazon reviews tasks that are ready for collection',
    params: '',
    endpoint: '/v3/merchant/amazon/reviews/tasks_ready',
    method: 'GET',
    hasParams: false,
    directory: 'amazon'
  },
  {
    className: 'MerchantAmazonReviewsTaskGetAdvancedTool',
    name: 'merchant_amazon_reviews_task_get_advanced',
    description: 'Get advanced results of a completed Amazon reviews task',
    params: `      id: z.string().describe("Task identifier (UUID)"),`,
    endpoint: '/v3/merchant/amazon/reviews/task_get/advanced/{id}',
    method: 'GET',
    hasParams: false,
    directory: 'amazon'
  },
  {
    className: 'MerchantAmazonReviewsTaskGetHtmlTool',
    name: 'merchant_amazon_reviews_task_get_html',
    description: 'Get HTML results of a completed Amazon reviews task',
    params: `      id: z.string().describe("Task identifier (UUID)"),`,
    endpoint: '/v3/merchant/amazon/reviews/task_get/html/{id}',
    method: 'GET',
    hasParams: false,
    directory: 'amazon'
  }
];

tools.forEach(tool => {
  const paramsString = Object.entries(tool.params ? { params: tool.params } : {})
    .map(([key, value]) => value)
    .join('\n');
  
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
  const filePath = path.join(__dirname, '..', 'src', 'core', 'modules', 'merchant', 'tools', tool.directory, fileName);
  const dir = path.dirname(filePath);
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(filePath, content);
  console.log(`Created: ${tool.directory}/${fileName}`);
});

console.log('\nAll remaining merchant tools generated successfully!');
