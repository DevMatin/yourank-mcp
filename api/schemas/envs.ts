export function getDataForSEOAuthHeader(): string {
  const username = process.env.DATAFORSEO_USERNAME || process.env.DATAFORSEO_LOGIN;
  const password = process.env.DATAFORSEO_PASSWORD;
  
  if (!username || !password) {
    return "Bearer YOUR_API_KEY_HERE";
  }
  
  const credentials = Buffer.from(`${username}:${password}`).toString('base64');
  return `Basic ${credentials}`;
}
