import { z } from 'zod';
import { BaseTool } from '../../base.tool.js';
import { DataForSEOClient } from '../../../client/dataforseo.client.js';

export class SerpScreenshotTool extends BaseTool {
  constructor(dataForSEOClient: DataForSEOClient) {
    super(dataForSEOClient);
  }

  getName(): string {
    return 'serp_screenshot';
  }

  getDescription(): string {
    return 'Capture a screenshot of any SERP page';
  }

  getParams(): z.ZodRawShape {
    return {
      url: z.string().describe("URL of the SERP page to capture"),
      browser_width: z.number().optional().describe("Browser window width"),
      browser_height: z.number().optional().describe("Browser window height"),
      device: z.enum(['desktop', 'mobile']).optional().describe("Device type"),
      format: z.enum(['png', 'jpg']).optional().describe("Screenshot format"),
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const requestData: any = {
        url: params.url
      };
      
      if (params.browser_width) {
        requestData.browser_width = params.browser_width;
      }
      if (params.browser_height) {
        requestData.browser_height = params.browser_height;
      }
      if (params.device) {
        requestData.device = params.device;
      }
      if (params.format) {
        requestData.format = params.format;
      }

      const response = await this.dataForSEOClient.makeRequest('/v3/serp/screenshot', 'POST', [requestData]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
