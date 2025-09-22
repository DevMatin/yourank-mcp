import { z } from 'zod';
import { BaseTool } from '../../base.tool.js';
export class GoogleShoppingSerpTool extends BaseTool {
    constructor(dataForSEOClient) {
        super(dataForSEOClient);
    }
    getName() {
        return 'google_shopping_serp';
    }
    getDescription() {
        return 'Get Google Shopping SERP results';
    }
    getParams() {
        return {
            keyword: z.string().describe("Product keyword to search"),
            location_code: z.number().optional().describe("Location code for search"),
            language_code: z.string().default('en').describe("Language code"),
            device: z.enum(['desktop', 'mobile']).default('desktop').describe("Device type"),
            depth: z.number().min(10).max(100).default(20).describe("Number of results to retrieve"),
            include_ratings: z.boolean().optional().describe("Include product ratings"),
            include_reviews: z.boolean().optional().describe("Include product reviews"),
            include_price_range: z.boolean().optional().describe("Include price range filters"),
        };
    }
    async handle(params) {
        try {
            const response = await this.dataForSEOClient.makeRequest('/v3/serp/google_shopping/live/regular', 'POST', [{
                    keyword: params.keyword,
                    location_code: params.location_code,
                    language_code: params.language_code,
                    device: params.device,
                    depth: params.depth,
                    include_ratings: params.include_ratings || false,
                    include_reviews: params.include_reviews || false,
                    include_price_range: params.include_price_range || false,
                }]);
            return this.validateAndFormatResponse(response);
        }
        catch (error) {
            return this.formatErrorResponse(error);
        }
    }
}
