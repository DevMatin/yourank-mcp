// Labs Schema Index - Exportiert alle Labs Schemas
export { GoogleLabsApis } from '../../schemas/labs/google-labs.js';
export { BingLabsApis } from '../../schemas/labs/bing-labs.js';
export { AmazonLabsApis } from '../../schemas/labs/amazon-labs.js';
export { TrendsLabsApis } from '../../schemas/labs/trends-labs.js';
// Kombiniertes Array aller Labs APIs
export const AllLabsApis = [
    ...GoogleLabsApis,
    ...BingLabsApis,
    ...AmazonLabsApis,
    ...TrendsLabsApis
];
