import { z } from 'zod';
import { BaseTool } from '../../base.tool.js';
import { DataForSEOClient } from '../../../client/dataforseo.client.js';

export class GoogleQuestionsAndAnswersLiveTool extends BaseTool {
  constructor(private dataForSEOClient: DataForSEOClient) {
    super();
  }

  getName(): string {
    return 'google_questions_and_answers_live';
  }

  getDescription(): string {
    return 'This endpoint will provide you with a detailed overview of questions and answers associated with a specific business entity listed on Google My Business. By submitting a request to this endpoint, you can access comprehensive data on the inquiries and responses related to a particular business, including the full text of the questions and answers, as well as metadata such as timestamps, user information.';
  }

  getParams() {
    return {
      keyword: z.string().describe('keyword required field the keyword you specify should indicate the name of the local establishment you would like to receive data for example: "pizza new york"'),
      location_name: z.string().optional().describe('location name optional field location name you can specify the name of the location if you want to receive results for a particular location example: "New York,New York,United States"'),
      location_code: z.number().optional().describe('location code optional field location code you can specify the code of the location if you want to receive results for a particular location example: 2840'),
      language_name: z.string().optional().describe('language name optional field language name you can specify the name of the language if you want to receive results in a particular language example: "English"'),
      language_code: z.string().optional().describe('language code optional field language code you can specify the code of the language if you want to receive results in a particular language example: "en"'),
      depth: z.number().optional().describe('depth optional field number of results in SERP default value: 10 maximum value: 100'),
    };
  }

  async handle(params: any) {
    const requestData = [{
      keyword: params.keyword,
      location_name: params.location_name,
      location_code: params.location_code,
      language_name: params.language_name,
      language_code: params.language_code,
      depth: params.depth,
    }];

    return await this.dataForSEOClient.post('/v3/business_data/google/questions_and_answers/live', requestData);
  }
}
