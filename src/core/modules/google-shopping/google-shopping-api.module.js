import { BaseModule } from '../base.module.js';
import { GoogleShoppingSerpTool } from './tools/google-shopping-serp.tool.js';
import { GoogleShoppingPaidTool } from './tools/google-shopping-paid.tool.js';
import { GoogleShoppingCarouselTool } from './tools/google-shopping-carousel.tool.js';
export class GoogleShoppingApiModule extends BaseModule {
    constructor(dataForSEOClient) {
        super(dataForSEOClient);
    }
    getTools() {
        return {
            'google_shopping_serp': {
                description: 'Get Google Shopping SERP results',
                params: new GoogleShoppingSerpTool(this.dataForSEOClient).getParams(),
                handler: async (params) => {
                    const tool = new GoogleShoppingSerpTool(this.dataForSEOClient);
                    return await tool.handle(params);
                }
            },
            'google_shopping_paid': {
                description: 'Get Google Shopping paid advertisement results',
                params: new GoogleShoppingPaidTool(this.dataForSEOClient).getParams(),
                handler: async (params) => {
                    const tool = new GoogleShoppingPaidTool(this.dataForSEOClient);
                    return await tool.handle(params);
                }
            },
            'google_shopping_carousel': {
                description: 'Get Google Shopping sponsored carousel results',
                params: new GoogleShoppingCarouselTool(this.dataForSEOClient).getParams(),
                handler: async (params) => {
                    const tool = new GoogleShoppingCarouselTool(this.dataForSEOClient);
                    return await tool.handle(params);
                }
            }
        };
    }
}
