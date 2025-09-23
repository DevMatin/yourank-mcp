// Vercel API handler - Real DataForSEO integration with all 30 OnPage APIs and Backlinks APIs
import express from 'express';
import https from 'https';

const app = express();
app.use(express.json());

// DataForSEO Configuration
const DATAFORSEO_USERNAME = process.env.DATAFORSEO_USERNAME || 'marcos.gonzalez@you-rank.de';
const DATAFORSEO_PASSWORD = process.env.DATAFORSEO_PASSWORD || '23778ba164190549';
const DATAFORSEO_BASE_URL = 'https://api.dataforseo.com';

// Dynamic Location Mapping - wird beim Server-Start automatisch geladen
let LOCATION_MAPPING = {
  // Basis-Länder (statisch)
  'deutschland': 'Germany',
  'österreich': 'Austria', 
  'schweiz': 'Switzerland',
  'germany': 'Germany',
  'austria': 'Austria',
  'switzerland': 'Switzerland'
};

// Funktion um alle deutschen Städte von DataForSEO API zu laden
async function loadGermanCities() {
  try {
    console.log('🗺️ Loading all German cities from DataForSEO API...');
    
    // Lade alle deutschen Standorte von DataForSEO
    const response = await makeDataForSEORequest('/v3/serp/google/locations/DE', null, 'GET');
    
    if (response.status === 200 && response.body?.tasks?.[0]?.result) {
      const locations = response.body.tasks[0].result;
      let addedCount = 0;
      
      // Erstelle automatisches Mapping für alle deutschen Standorte
      locations.forEach(location => {
        if (location.location_name && location.country_iso_code === 'DE') {
          const germanName = location.location_name_de || location.location_name;
          const englishName = location.location_name;
          
          // Füge verschiedene Schreibweisen hinzu
          if (germanName && englishName) {
            // Original Name
            LOCATION_MAPPING[germanName.toLowerCase()] = englishName;
            
            // Ohne Umlaute (ä→ae, ö→oe, ü→ue, ß→ss)
            const withoutUmlauts = germanName.toLowerCase()
              .replace(/ä/g, 'ae')
              .replace(/ö/g, 'oe') 
              .replace(/ü/g, 'ue')
              .replace(/ß/g, 'ss');
            LOCATION_MAPPING[withoutUmlauts] = englishName;
            
            // Englischer Name auch als Key
            LOCATION_MAPPING[englishName.toLowerCase()] = englishName;
            
            addedCount++;
          }
        }
      });
      
      console.log(`✅ Successfully loaded ${addedCount} German cities dynamically`);
      console.log(`📍 Total locations in mapping: ${Object.keys(LOCATION_MAPPING).length}`);
      
    } else {
      console.log('⚠️ DataForSEO API not available, using comprehensive fallback');
      addFallbackCities();
    }
  } catch (error) {
    console.error('❌ Error loading German cities from API:', error.message);
    console.log('🔄 Using comprehensive fallback city list');
    addFallbackCities();
  }
}

// Fallback für wichtigste deutsche Städte wenn API nicht verfügbar
function addFallbackCities() {
  const fallbackCities = {
    // Top 50 deutsche Städte
    'berlin': 'Berlin, Germany', 'münchen': 'Munich, Germany', 'hamburg': 'Hamburg, Germany',
    'köln': 'Cologne, Germany', 'frankfurt': 'Frankfurt, Germany', 'stuttgart': 'Stuttgart, Germany',
    'düsseldorf': 'Dusseldorf, Germany', 'leipzig': 'Leipzig, Germany', 'dortmund': 'Dortmund, Germany',
    'essen': 'Essen, Germany', 'bremen': 'Bremen, Germany', 'dresden': 'Dresden, Germany',
    'hannover': 'Hanover, Germany', 'nürnberg': 'Nuremberg, Germany', 'duisburg': 'Duisburg, Germany',
    'bochum': 'Bochum, Germany', 'wuppertal': 'Wuppertal, Germany', 'bielefeld': 'Bielefeld, Germany',
    'bonn': 'Bonn, Germany', 'münster': 'Munster, Germany', 'karlsruhe': 'Karlsruhe, Germany',
    'mannheim': 'Mannheim, Germany', 'augsburg': 'Augsburg, Germany', 'wiesbaden': 'Wiesbaden, Germany',
    'mönchengladbach': 'Monchengladbach, Germany', 'braunschweig': 'Brunswick, Germany',
    'kiel': 'Kiel, Germany', 'aachen': 'Aachen, Germany', 'magdeburg': 'Magdeburg, Germany',
    'freiburg': 'Freiburg, Germany', 'lübeck': 'Lubeck, Germany', 'erfurt': 'Erfurt, Germany',
    'rostock': 'Rostock, Germany', 'kassel': 'Kassel, Germany', 'potsdam': 'Potsdam, Germany',
    'erlangen': 'Erlangen, Germany', 'göttingen': 'Gottingen, Germany', 'heidelberg': 'Heidelberg, Germany',
    // Ohne Umlaute Varianten
    'munchen': 'Munich, Germany', 'koln': 'Cologne, Germany', 'dusseldorf': 'Dusseldorf, Germany',
    'nurnberg': 'Nuremberg, Germany', 'munster': 'Munster, Germany', 'monchengladbach': 'Monchengladbach, Germany',
    'lubeck': 'Lubeck, Germany', 'gottingen': 'Gottingen, Germany'
  };
  
  LOCATION_MAPPING = { ...LOCATION_MAPPING, ...fallbackCities };
  console.log(`📍 Added ${Object.keys(fallbackCities).length} fallback cities`);
}

// Lade deutsche Städte beim Server-Start
loadGermanCities();

// Funktion um Location Namen zu normalisieren
function normalizeLocationName(locationName) {
  if (!locationName) return 'Germany';
  
  const normalized = locationName.toLowerCase().trim();
  return LOCATION_MAPPING[normalized] || locationName;
}

// Helper function to make DataForSEO API calls
function makeDataForSEORequest(endpoint, postData, method = 'POST') {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.dataforseo.com',
      port: 443,
      path: endpoint,
      method: method,
      headers: {
        'Authorization': `Basic ${Buffer.from(`${DATAFORSEO_USERNAME}:${DATAFORSEO_PASSWORD}`).toString('base64')}`,
        'Content-Type': 'application/json',
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const jsonResponse = JSON.parse(body);
          resolve({
            status: res.statusCode,
            body: jsonResponse
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            body: body
          });
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    if (postData && method === 'POST') {
      // Special handling for google_ads_ad_traffic_by_keywords to remove invalid parameters
      let cleanPostData = postData;
      if (endpoint.includes('/v3/keywords_data/google_ads/ad_traffic_by_keywords/live')) {
        cleanPostData = postData.map(item => {
          // Create a completely new object with only valid parameters
          const cleanItem = {};
          
          // Only add valid parameters
          if (item.keywords && Array.isArray(item.keywords)) {
            cleanItem.keywords = item.keywords;
          }
          if (item.location_name && typeof item.location_name === 'string') {
            cleanItem.location_name = item.location_name;
          }
          if (item.language_code && typeof item.language_code === 'string') {
            cleanItem.language_code = item.language_code;
          }
          if (item.location_code && typeof item.location_code === 'number') {
            cleanItem.location_code = item.location_code;
          }
          
          return cleanItem;
        });
      }
      req.write(JSON.stringify(cleanPostData));
    }
    req.end();
  });
}

// OnPage API endpoints mapping
const ONPAGE_ENDPOINTS = {
  'on_page_instant_pages': '/v3/on_page/instant_pages',
  'on_page_content_parsing': '/v3/on_page/content_parsing',
  'on_page_page_screenshot': '/v3/on_page/page_screenshot',
  'on_page_raw_html': '/v3/on_page/raw_html',
  'on_page_microdata': '/v3/on_page/microdata',
  'on_page_keyword_density': '/v3/on_page/keyword_density',
  'on_page_waterfall': '/v3/on_page/waterfall',
  'on_page_links': '/v3/on_page/links',
  'on_page_resources': '/v3/on_page/resources',
  'on_page_pages': '/v3/on_page/pages',
  'on_page_summary': '/v3/on_page/summary',
  'on_page_task_post': '/v3/on_page/task_post',
  'on_page_tasks_ready': '/v3/on_page/tasks_ready',
  'on_page_force_stop': '/v3/on_page/force_stop',
  'on_page_id_list': '/v3/on_page/id_list',
  'on_page_errors': '/v3/on_page/errors',
  'on_page_available_filters': '/v3/on_page/available_filters',
  'on_page_non_indexable': '/v3/on_page/non_indexable',
  'on_page_redirect_chains': '/v3/on_page/redirect_chains',
  'on_page_duplicate_content': '/v3/on_page/duplicate_content',
  'on_page_duplicate_tags': '/v3/on_page/duplicate_tags',
  'on_page_pages_by_resource': '/v3/on_page/pages_by_resource',
  'on_page_content_parsing_live': '/v3/on_page/content_parsing/live',
  'on_page_lighthouse_languages': '/v3/on_page/lighthouse/languages',
  'on_page_lighthouse_audits': '/v3/on_page/lighthouse/audits',
  'on_page_lighthouse_versions': '/v3/on_page/lighthouse/versions',
  'on_page_lighthouse_task_post': '/v3/on_page/lighthouse/task_post',
  'on_page_lighthouse_tasks_ready': '/v3/on_page/lighthouse/tasks_ready',
  'on_page_lighthouse_task_get': '/v3/on_page/lighthouse/task_get',
  'on_page_lighthouse_live': '/v3/on_page/lighthouse/live'
};

// Backlinks API endpoints mapping
const BACKLINKS_ENDPOINTS = {
  'backlinks_summary': '/v3/backlinks/summary/live',
  'backlinks_backlinks': '/v3/backlinks/backlinks/live',
  'backlinks_anchors': '/v3/backlinks/anchors/live',
  'backlinks_history': '/v3/backlinks/history/live',
  'backlinks_domain_pages': '/v3/backlinks/domain_pages/live',
  'backlinks_domain_pages_summary': '/v3/backlinks/domain_pages_summary/live',
  'backlinks_referring_domains': '/v3/backlinks/referring_domains/live',
  'backlinks_referring_networks': '/v3/backlinks/referring_networks/live',
  'backlinks_competitors': '/v3/backlinks/competitors/live',
  'backlinks_domain_intersection': '/v3/backlinks/domain_intersection/live',
  'backlinks_page_intersection': '/v3/backlinks/page_intersection/live',
  'backlinks_timeseries_summary': '/v3/backlinks/timeseries_summary/live',
  'backlinks_timeseries_new_lost_summary': '/v3/backlinks/timeseries_new_lost_summary/live',
  'backlinks_bulk_backlinks': '/v3/backlinks/bulk_backlinks/live',
  'backlinks_bulk_ranks': '/v3/backlinks/bulk_ranks/live',
  'backlinks_bulk_spam_score': '/v3/backlinks/bulk_spam_score/live',
  'backlinks_bulk_referring_domains': '/v3/backlinks/bulk_referring_domains/live',
  'backlinks_bulk_new_lost_backlinks': '/v3/backlinks/bulk_new_lost_backlinks/live',
  'backlinks_bulk_new_lost_referring_domains': '/v3/backlinks/bulk_new_lost_referring_domains/live',
  'backlinks_bulk_pages_summary': '/v3/backlinks/bulk_pages_summary/live',
  'backlinks_filters': '/v3/backlinks/available_filters',
  'backlinks_id_list': '/v3/backlinks/id_list',
  'backlinks_errors': '/v3/backlinks/errors',
  'backlinks_available_filters': '/v3/backlinks/available_filters',
  'backlinks_index': '/v3/backlinks/index'
};

// Domain Analytics API endpoints mapping
const DOMAIN_ANALYTICS_ENDPOINTS = {
  // General Tools
  'domain_analytics_id_list': '/v3/domain_analytics/id_list',
  'domain_analytics_errors': '/v3/domain_analytics/errors',
  
  // Technologies Tools
  'domain_analytics_technologies_available_filters': '/v3/domain_analytics/technologies/available_filters',
  'domain_analytics_technologies_locations': '/v3/domain_analytics/technologies/locations',
  'domain_analytics_technologies_languages': '/v3/domain_analytics/technologies/languages',
  'domain_analytics_technologies_technologies': '/v3/domain_analytics/technologies/technologies',
  'domain_analytics_technologies_aggregation_technologies_live': '/v3/domain_analytics/technologies/aggregation_technologies/live',
  'domain_analytics_technologies_technologies_summary_live': '/v3/domain_analytics/technologies/technologies_summary/live',
  'domain_analytics_technologies_technology_stats_live': '/v3/domain_analytics/technologies/technology_stats/live',
  'domain_analytics_technologies_summary_live': '/v3/domain_analytics/technologies/summary/live',
  'domain_analytics_technologies_stats_live': '/v3/domain_analytics/technologies/stats/live',
  'domain_analytics_technologies_domains_by_technology_live': '/v3/domain_analytics/technologies/domains_by_technology/live',
  'domain_analytics_technologies_domains_by_html_terms_live': '/v3/domain_analytics/technologies/domains_by_html_terms/live',
  'domain_analytics_technologies_domain_technologies_live': '/v3/domain_analytics/technologies/domain_technologies/live',
  'domain_technologies': '/v3/domain_analytics/technologies/domain_technologies/live',
  'domain_technologies_filters': '/v3/domain_analytics/technologies/available_filters',
  
  // WHOIS Tools
  'whois_overview': '/v3/domain_analytics/whois/overview/live',
  'whois_filters': '/v3/domain_analytics/whois/available_filters',
  'domain_analytics_whois_available_filters': '/v3/domain_analytics/whois/available_filters'
};

// Keywords Data API endpoints mapping
const KEYWORDS_DATA_ENDPOINTS = {
  // Core Keywords Data Tools
  'keywords_data_id_list': '/v3/keywords_data/id_list',
  'keywords_data_errors': '/v3/keywords_data/errors',
  
  // Google Ads Tools
  'keywords_data_google_ads_search_volume': '/v3/keywords_data/google_ads/search_volume/live',
  'keywords_data_google_ads_status': '/v3/keywords_data/google_ads/status',
  'keywords_data_google_ads_locations': '/v3/keywords_data/google_ads/locations',
  'keywords_data_google_ads_languages': '/v3/keywords_data/google_ads/languages',
  'keywords_data_google_ads_keywords_for_site': '/v3/keywords_data/google_ads/keywords_for_site/live',
  'keywords_data_google_ads_keywords_for_keywords': '/v3/keywords_data/google_ads/keywords_for_keywords/live',
  'keywords_data_google_ads_ad_traffic_by_keywords': '/v3/keywords_data/google_ads/ad_traffic_by_keywords/live',
  
  // Google Ads Task-based Tools
  'keywords_data_google_ads_search_volume_task_post': '/v3/keywords_data/google_ads/search_volume/task_post',
  'keywords_data_google_ads_search_volume_tasks_ready': '/v3/keywords_data/google_ads/search_volume/tasks_ready',
  'keywords_data_google_ads_search_volume_task_get': '/v3/keywords_data/google_ads/search_volume/task_get',
  'keywords_data_google_ads_keywords_for_site_task_post': '/v3/keywords_data/google_ads/keywords_for_site/task_post',
  'keywords_data_google_ads_keywords_for_site_tasks_ready': '/v3/keywords_data/google_ads/keywords_for_site/tasks_ready',
  'keywords_data_google_ads_keywords_for_site_task_get': '/v3/keywords_data/google_ads/keywords_for_site/task_get',
  'keywords_data_google_ads_keywords_for_keywords_task_post': '/v3/keywords_data/google_ads/keywords_for_keywords/task_post',
  'keywords_data_google_ads_keywords_for_keywords_tasks_ready': '/v3/keywords_data/google_ads/keywords_for_keywords/tasks_ready',
  'keywords_data_google_ads_keywords_for_keywords_task_get': '/v3/keywords_data/google_ads/keywords_for_keywords/task_get',
  
  // Google Trends Tools
  'keywords_data_google_trends_categories': '/v3/keywords_data/google_trends/categories',
  'keywords_data_google_trends_explore': '/v3/keywords_data/google_trends/explore/live',
  'keywords_data_google_trends_locations': '/v3/keywords_data/google_trends/locations',
  'keywords_data_google_trends_languages': '/v3/keywords_data/google_trends/languages',
  
  // DataForSEO Trends Tools
  'keywords_data_dataforseo_trends_demography': '/v3/keywords_data/dataforseo_trends/demography/live',
  'keywords_data_dataforseo_trends_explore': '/v3/keywords_data/dataforseo_trends/explore/live',
  'keywords_data_dataforseo_trends_subregion_interests': '/v3/keywords_data/dataforseo_trends/subregion_interests/live',
  'keywords_data_dataforseo_trends_locations': '/v3/keywords_data/dataforseo_trends/locations',
  
  // Bing Tools
  'keywords_data_bing_locations': '/v3/keywords_data/bing/locations',
  'keywords_data_bing_languages': '/v3/keywords_data/bing/languages',
  'keywords_data_bing_search_volume': '/v3/keywords_data/bing/search_volume/live'
};

// Content Analysis API endpoints mapping
const CONTENT_ANALYSIS_ENDPOINTS = {
  // Core Tools
  'content_analysis_id_list': '/v3/content_analysis/id_list',
  'content_analysis_available_filters': '/v3/content_analysis/available_filters',
  'content_analysis_locations': '/v3/content_analysis/locations',
  'content_analysis_languages': '/v3/content_analysis/languages',
  'content_analysis_categories': '/v3/content_analysis/categories',
  
  // Live Analysis Tools
  'content_analysis_search': '/v3/content_analysis/search/live',
  'content_analysis_summary': '/v3/content_analysis/summary/live',
  'content_analysis_sentiment_analysis': '/v3/content_analysis/sentiment_analysis/live',
  'content_analysis_rating_distribution': '/v3/content_analysis/rating_distribution/live',
  'content_analysis_phrase_trends': '/v3/content_analysis/phrase_trends/live',
  'content_analysis_category_trends': '/v3/content_analysis/category_trends/live'
};

// Content Generation API endpoints mapping
const CONTENT_GENERATION_ENDPOINTS = {
  // Core Generation Tools
  'content_generation_generate': '/v3/content_generation/generate/live',
  'content_generation_generate_text': '/v3/content_generation/generate_text/live',
  'content_generation_generate_meta_tags': '/v3/content_generation/generate_meta_tags/live',
  'content_generation_generate_sub_topics': '/v3/content_generation/generate_sub_topics/live',
  'content_generation_paraphrase': '/v3/content_generation/paraphrase/live',
  
  // Grammar Tools
  'content_generation_grammar': '/v3/content_generation/check_grammar/live',
  'content_generation_grammar_languages': '/v3/content_generation/check_grammar/languages',
  'content_generation_grammar_rules': '/v3/content_generation/grammar_rules',
  
  // Summary Tools
  'content_generation_summary': '/v3/content_generation/text_summary/live',
  'content_generation_text_summary_languages': '/v3/content_generation/text_summary/languages'
};

// Merchant API endpoints mapping
const MERCHANT_ENDPOINTS = {
  // Core Merchant Tools
  'merchant_id_list': '/v3/merchant/id_list',
  'merchant_errors': '/v3/merchant/errors',
  'merchant_tasks_ready': '/v3/merchant/tasks_ready',
  
  // Google Merchant Tools
  'merchant_google_languages': '/v3/merchant/google/languages',
  'merchant_google_locations': '/v3/merchant/google/locations',
  'merchant_google_locations_country': '/v3/merchant/google/locations/{country}',
  'merchant_google_products_task_post': '/v3/merchant/google/products/task_post',
  'merchant_google_products_tasks_ready': '/v3/merchant/google/products/tasks_ready',
  'merchant_google_products_task_get_advanced': '/v3/merchant/google/products/task_get/advanced/{id}',
  'merchant_google_products_task_get_html': '/v3/merchant/google/products/task_get/html/{id}',
  'merchant_google_sellers_task_post': '/v3/merchant/google/sellers/task_post',
  'merchant_google_sellers_tasks_ready': '/v3/merchant/google/sellers/tasks_ready',
  'merchant_google_sellers_task_get_advanced': '/v3/merchant/google/sellers/task_get/advanced/{id}',
  'merchant_google_sellers_task_get_html': '/v3/merchant/google/sellers/task_get/html/{id}',
  'merchant_google_sellers_ad_url': '/v3/merchant/google/sellers/ad_url/{shop_ad_aclk}',
  'merchant_google_product_spec_task_post': '/v3/merchant/google/product_spec/task_post',
  'merchant_google_product_spec_tasks_ready': '/v3/merchant/google/product_spec/tasks_ready',
  'merchant_google_product_spec_task_get_advanced': '/v3/merchant/google/product_spec/task_get/advanced/{id}',
  'merchant_google_product_spec_task_get_html': '/v3/merchant/google/product_spec/task_get/html/{id}',
  'merchant_google_product_info_task_post': '/v3/merchant/google/product_info/task_post',
  'merchant_google_product_info_tasks_ready': '/v3/merchant/google/product_info/tasks_ready',
  'merchant_google_product_info_task_get_advanced': '/v3/merchant/google/product_info/task_get/advanced/{id}',
  
  // Amazon Merchant Tools
  'merchant_amazon_languages': '/v3/merchant/amazon/languages',
  'merchant_amazon_locations': '/v3/merchant/amazon/locations',
  'merchant_amazon_locations_country': '/v3/merchant/amazon/locations/{country}',
  'merchant_amazon_products_task_post': '/v3/merchant/amazon/products/task_post',
  'merchant_amazon_products_tasks_ready': '/v3/merchant/amazon/products/tasks_ready',
  'merchant_amazon_products_task_get_advanced': '/v3/merchant/amazon/products/task_get/advanced/{id}',
  'merchant_amazon_products_task_get_html': '/v3/merchant/amazon/products/task_get/html/{id}',
  'merchant_amazon_asin_task_post': '/v3/merchant/amazon/asin/task_post',
  'merchant_amazon_asin_tasks_ready': '/v3/merchant/amazon/asin/tasks_ready',
  'merchant_amazon_asin_task_get_advanced': '/v3/merchant/amazon/asin/task_get/advanced/{id}',
  'merchant_amazon_asin_task_get_html': '/v3/merchant/amazon/asin/task_get/html/{id}',
  'merchant_amazon_sellers_task_post': '/v3/merchant/amazon/sellers/task_post',
  'merchant_amazon_sellers_tasks_ready': '/v3/merchant/amazon/sellers/tasks_ready',
  'merchant_amazon_sellers_task_get_advanced': '/v3/merchant/amazon/sellers/task_get/advanced/{id}',
  'merchant_amazon_sellers_task_get_html': '/v3/merchant/amazon/sellers/task_get/html/{id}',
  'merchant_amazon_reviews_task_post': '/v3/merchant/amazon/reviews/task_post',
  'merchant_amazon_reviews_tasks_ready': '/v3/merchant/amazon/reviews/tasks_ready',
  'merchant_amazon_reviews_task_get_advanced': '/v3/merchant/amazon/reviews/task_get/advanced/{id}',
  'merchant_amazon_reviews_task_get_html': '/v3/merchant/amazon/reviews/task_get/html/{id}'
};

// Business Data API endpoints mapping
const BUSINESS_DATA_ENDPOINTS = {
  // General Business Data Tools
  'business_data_id_list': '/v3/business_data/id_list',
  'business_data_errors': '/v3/business_data/errors',
  
  // Business Listings Tools
  'business_data_business_listings_search': '/v3/business_data/business_listings/search/live',
  'business_data_business_listings_filters': '/v3/business_data/business_listings/filters',
  'business_data_business_listings_locations': '/v3/business_data/business_listings/locations',
  'business_data_business_listings_categories': '/v3/business_data/business_listings/categories',
  'business_data_business_listings_categories_aggregation': '/v3/business_data/business_listings/categories_aggregation/live',
  
  // Google Business Tools
  'business_data_google_locations': '/v3/business_data/google/locations',
  'business_data_google_locations_country': '/v3/business_data/google/locations/{country}',
  'business_data_google_languages': '/v3/business_data/google/languages',
  'business_data_google_my_business_info_live': '/v3/business_data/google/my_business_info/live',
  'business_data_google_hotel_searches_live': '/v3/business_data/google/hotel_searches/live',
  'business_data_google_hotel_info_live_advanced': '/v3/business_data/google/hotel_info/live/advanced',
  'business_data_google_reviews_live': '/v3/business_data/google/reviews/live',
  
  // Trustpilot Tools
  'business_data_trustpilot_search_live': '/v3/business_data/trustpilot/search/live',
  'business_data_trustpilot_reviews_live': '/v3/business_data/trustpilot/reviews/live',
  
  // Tripadvisor Tools
  'business_data_tripadvisor_locations': '/v3/business_data/tripadvisor/locations',
  'business_data_tripadvisor_locations_country': '/v3/business_data/tripadvisor/locations/{country}',
  'business_data_tripadvisor_languages': '/v3/business_data/tripadvisor/languages',
  'business_data_tripadvisor_search_live': '/v3/business_data/tripadvisor/search/live',
  'business_data_tripadvisor_reviews_live': '/v3/business_data/tripadvisor/reviews/live',
  
  // Social Media Tools
  'business_data_social_media_pinterest_live': '/v3/business_data/social_media/pinterest/live',
  'business_data_social_media_facebook_live': '/v3/business_data/social_media/facebook/live',
  'business_data_social_media_reddit_live': '/v3/business_data/social_media/reddit/live'
};

// AI Optimization API endpoints mapping
const AI_OPTIMIZATION_ENDPOINTS = {
  // ChatGPT LLM Responses Tools
  'ai_optimization_chatgpt_llm_responses_models': '/v3/ai_optimization/chat_gpt/llm_responses/models',
  'ai_optimization_chatgpt_llm_responses_live': '/v3/ai_optimization/chat_gpt/llm_responses/live',
  'ai_optimization_chatgpt_llm_responses_task_post': '/v3/ai_optimization/chat_gpt/llm_responses/task_post',
  'ai_optimization_chatgpt_llm_responses_tasks_ready': '/v3/ai_optimization/chat_gpt/llm_responses/tasks_ready',
  'ai_optimization_chatgpt_llm_responses_task_get': '/v3/ai_optimization/chat_gpt/llm_responses/task_get/{id}',
  
  // Claude LLM Responses Tools
  'ai_optimization_claude_llm_responses_models': '/v3/ai_optimization/claude/llm_responses/models',
  'ai_optimization_claude_llm_responses_live': '/v3/ai_optimization/claude/llm_responses/live',
  'ai_optimization_claude_llm_responses_task_post': '/v3/ai_optimization/claude/llm_responses/task_post',
  'ai_optimization_claude_llm_responses_tasks_ready': '/v3/ai_optimization/claude/llm_responses/tasks_ready',
  'ai_optimization_claude_llm_responses_task_get': '/v3/ai_optimization/claude/llm_responses/task_get/{id}',
  
  // Gemini LLM Responses Tools
  'ai_optimization_gemini_llm_responses_models': '/v3/ai_optimization/gemini/llm_responses/models',
  'ai_optimization_gemini_llm_responses_live': '/v3/ai_optimization/gemini/llm_responses/live',
  
  // Perplexity LLM Responses Tools
  'ai_optimization_perplexity_llm_responses_models': '/v3/ai_optimization/perplexity/llm_responses/models',
  'ai_optimization_perplexity_llm_responses_live': '/v3/ai_optimization/perplexity/llm_responses/live',
  
  // AI Keyword Data Tools
  'ai_optimization_ai_keyword_data_available_filters': '/v3/ai_optimization/ai_keyword_data/available_filters',
  'ai_optimization_ai_keyword_data_locations_and_languages': '/v3/ai_optimization/ai_keyword_data/locations_and_languages',
  'ai_optimization_ai_keyword_data_keywords_search_volume_live': '/v3/ai_optimization/ai_keyword_data/keywords_search_volume/live'
};

// SERP API endpoints mapping
const SERP_ENDPOINTS = {
  // Core SERP Tools
  'serp_id_list': '/v3/serp/id_list',
  'serp_errors': '/v3/serp/errors',
  'serp_tasks_ready': '/v3/serp/tasks_ready',
  
  // Google SERP Tools - Organic
  'serp_google_locations': '/v3/serp/google/locations',
  'serp_google_languages': '/v3/serp/google/languages',
  'serp_google_organic_live': '/v3/serp/google/organic/live',
  'serp_google_organic_live_advanced': '/v3/serp/google/organic/live/advanced',
  'serp_google_organic_live_html': '/v3/serp/google/organic/live/html',
  'serp_google_organic_task_post': '/v3/serp/google/organic/task_post',
  'serp_google_organic_tasks_ready': '/v3/serp/google/organic/tasks_ready',
  'serp_google_organic_task_get_advanced': '/v3/serp/google/organic/task_get/advanced',
  'serp_google_organic_task_get_html': '/v3/serp/google/organic/task_get/html',
  'serp_google_organic_task_get_regular': '/v3/serp/google/organic/task_get/regular',
  
  // Google SERP Tools - AI Mode
  'serp_google_ai_mode_languages': '/v3/serp/google/ai_mode/languages',
  'serp_google_ai_mode_live_advanced': '/v3/serp/google/ai_mode/live/advanced',
  'serp_google_ai_mode_live_html': '/v3/serp/google/ai_mode/live/html',
  'serp_google_ai_mode_task_post': '/v3/serp/google/ai_mode/task_post',
  'serp_google_ai_mode_tasks_ready': '/v3/serp/google/ai_mode/tasks_ready',
  'serp_google_ai_mode_task_get_advanced': '/v3/serp/google/ai_mode/task_get/advanced',
  'serp_google_ai_mode_task_get_html': '/v3/serp/google/ai_mode/task_get/html',
  
  // Google SERP Tools - Maps
  'serp_google_maps_live_advanced': '/v3/serp/google/maps/live/advanced',
  'serp_google_maps_task_post': '/v3/serp/google/maps/task_post',
  'serp_google_maps_tasks_ready': '/v3/serp/google/maps/tasks_ready',
  'serp_google_maps_task_get_advanced': '/v3/serp/google/maps/task_get/advanced',
  
  // Google SERP Tools - Local Finder
  'serp_google_local_finder_live_advanced': '/v3/serp/google/local_finder/live/advanced',
  'serp_google_local_finder_live_html': '/v3/serp/google/local_finder/live/html',
  'serp_google_local_finder_task_post': '/v3/serp/google/local_finder/task_post',
  'serp_google_local_finder_tasks_ready': '/v3/serp/google/local_finder/tasks_ready',
  'serp_google_local_finder_task_get_advanced': '/v3/serp/google/local_finder/task_get/advanced',
  'serp_google_local_finder_task_get_html': '/v3/serp/google/local_finder/task_get/html',
  
  // Google SERP Tools - News
  'serp_google_news_live_advanced': '/v3/serp/google/news/live/advanced',
  'serp_google_news_live_html': '/v3/serp/google/news/live/html',
  'serp_google_news_task_post': '/v3/serp/google/news/task_post',
  'serp_google_news_tasks_ready': '/v3/serp/google/news/tasks_ready',
  'serp_google_news_task_get_advanced': '/v3/serp/google/news/task_get/advanced',
  'serp_google_news_task_get_html': '/v3/serp/google/news/task_get/html',
  
  // Google SERP Tools - Events
  'serp_google_events_locations': '/v3/serp/google/events/locations',
  'serp_google_events_live_advanced': '/v3/serp/google/events/live/advanced',
  'serp_google_events_task_post': '/v3/serp/google/events/task_post',
  'serp_google_events_tasks_ready': '/v3/serp/google/events/tasks_ready',
  'serp_google_events_task_get_advanced': '/v3/serp/google/events/task_get/advanced',
  
  // Google SERP Tools - Images
  'serp_google_images_live_advanced': '/v3/serp/google/images/live/advanced',
  'serp_google_images_live_html': '/v3/serp/google/images/live/html',
  'serp_google_images_task_post': '/v3/serp/google/images/task_post',
  'serp_google_images_tasks_ready': '/v3/serp/google/images/tasks_ready',
  'serp_google_images_task_get_advanced': '/v3/serp/google/images/task_get/advanced',
  'serp_google_images_task_get_html': '/v3/serp/google/images/task_get/html',
  
  // Google SERP Tools - Search By Image
  'serp_google_search_by_image_task_post': '/v3/serp/google/search_by_image/task_post',
  'serp_google_search_by_image_tasks_ready': '/v3/serp/google/search_by_image/tasks_ready',
  'serp_google_search_by_image_task_get_advanced': '/v3/serp/google/search_by_image/task_get/advanced',
  'serp_google_search_by_image_task_get_html': '/v3/serp/google/search_by_image/task_get/html',
  
  // Google SERP Tools - Jobs
  'serp_google_jobs_locations': '/v3/serp/google/jobs/locations',
  'serp_google_jobs_task_post': '/v3/serp/google/jobs/task_post',
  'serp_google_jobs_tasks_ready': '/v3/serp/google/jobs/tasks_ready',
  'serp_google_jobs_task_get_advanced': '/v3/serp/google/jobs/task_get/advanced',
  'serp_google_jobs_task_get_html': '/v3/serp/google/jobs/task_get/html',
  
  // Google SERP Tools - Autocomplete
  'serp_google_autocomplete_live_advanced': '/v3/serp/google/autocomplete/live/advanced',
  'serp_google_autocomplete_task_post': '/v3/serp/google/autocomplete/task_post',
  'serp_google_autocomplete_tasks_ready': '/v3/serp/google/autocomplete/tasks_ready',
  'serp_google_autocomplete_task_get_advanced': '/v3/serp/google/autocomplete/task_get/advanced',
  
  // Google SERP Tools - Dataset Search
  'serp_google_dataset_search_live_advanced': '/v3/serp/google/dataset_search/live/advanced',
  'serp_google_dataset_search_task_post': '/v3/serp/google/dataset_search/task_post',
  'serp_google_dataset_search_tasks_ready': '/v3/serp/google/dataset_search/tasks_ready',
  'serp_google_dataset_search_task_get_advanced': '/v3/serp/google/dataset_search/task_get/advanced',
  
  // Google SERP Tools - Dataset Info
  'serp_google_dataset_info_live_advanced': '/v3/serp/google/dataset_info/live/advanced',
  'serp_google_dataset_info_task_post': '/v3/serp/google/dataset_info/task_post',
  'serp_google_dataset_info_tasks_ready': '/v3/serp/google/dataset_info/tasks_ready',
  'serp_google_dataset_info_task_get_advanced': '/v3/serp/google/dataset_info/task_get/advanced',
  
  // Google SERP Tools - Ads Advertisers
  'serp_google_ads_advertisers_locations': '/v3/serp/google/ads_advertisers/locations',
  'serp_google_ads_advertisers_live_advanced': '/v3/serp/google/ads_advertisers/live/advanced',
  'serp_google_ads_advertisers_task_post': '/v3/serp/google/ads_advertisers/task_post',
  'serp_google_ads_advertisers_tasks_ready': '/v3/serp/google/ads_advertisers/tasks_ready',
  'serp_google_ads_advertisers_task_get_advanced': '/v3/serp/google/ads_advertisers/task_get/advanced',
  
  // Google SERP Tools - Ads Search
  'serp_google_ads_search_locations': '/v3/serp/google/ads_search/locations',
  'serp_google_ads_search_live_advanced': '/v3/serp/google/ads_search/live/advanced',
  'serp_google_ads_search_task_post': '/v3/serp/google/ads_search/task_post',
  'serp_google_ads_search_tasks_ready': '/v3/serp/google/ads_search/tasks_ready',
  'serp_google_ads_search_task_get_advanced': '/v3/serp/google/ads_search/task_get/advanced',
  
  // Bing SERP Tools - Organic
  'serp_bing_locations': '/v3/serp/bing/locations',
  'serp_bing_languages': '/v3/serp/bing/languages',
  'serp_bing_organic_live': '/v3/serp/bing/organic/live',
  'serp_bing_organic_live_advanced': '/v3/serp/bing/organic/live/advanced',
  'serp_bing_organic_live_html': '/v3/serp/bing/organic/live/html',
  'serp_bing_organic_task_post': '/v3/serp/bing/organic/task_post',
  'serp_bing_organic_tasks_ready': '/v3/serp/bing/organic/tasks_ready',
  'serp_bing_organic_task_get_advanced': '/v3/serp/bing/organic/task_get/advanced',
  'serp_bing_organic_task_get_html': '/v3/serp/bing/organic/task_get/html',
  'serp_bing_organic_task_get_regular': '/v3/serp/bing/organic/task_get/regular',
  
  // Bing SERP Tools - Local Pack
  'serp_bing_local_pack_live': '/v3/serp/bing/local_pack/live',
  'serp_bing_local_pack_live_html': '/v3/serp/bing/local_pack/live/html',
  'serp_bing_local_pack_task_post': '/v3/serp/bing/local_pack/task_post',
  'serp_bing_local_pack_tasks_ready': '/v3/serp/bing/local_pack/tasks_ready',
  'serp_bing_local_pack_task_get_regular': '/v3/serp/bing/local_pack/task_get/regular',
  'serp_bing_local_pack_task_get_html': '/v3/serp/bing/local_pack/task_get/html',
  
  // YouTube SERP Tools - Organic
  'serp_youtube_locations': '/v3/serp/youtube/locations',
  'serp_youtube_languages': '/v3/serp/youtube/languages',
  'serp_youtube_organic_live': '/v3/serp/youtube/organic/live',
  'serp_youtube_organic_task_post': '/v3/serp/youtube/organic/task_post',
  'serp_youtube_organic_tasks_ready': '/v3/serp/youtube/organic/tasks_ready',
  'serp_youtube_organic_task_get_advanced': '/v3/serp/youtube/organic/task_get/advanced',
  'serp_youtube_organic_task_get_html': '/v3/serp/youtube/organic/task_get/html',
  'serp_youtube_organic_task_get_regular': '/v3/serp/youtube/organic/task_get/regular',
  
  // YouTube SERP Tools - Video Info
  'serp_youtube_video_info_live_advanced': '/v3/serp/youtube/video_info/live/advanced',
  'serp_youtube_video_info_task_post': '/v3/serp/youtube/video_info/task_post',
  'serp_youtube_video_info_tasks_ready': '/v3/serp/youtube/video_info/tasks_ready',
  'serp_youtube_video_info_task_get_advanced': '/v3/serp/youtube/video_info/task_get/advanced',
  
  // YouTube SERP Tools - Video Subtitles
  'serp_youtube_video_subtitles_live_advanced': '/v3/serp/youtube/video_subtitles/live/advanced',
  'serp_youtube_video_subtitles_task_post': '/v3/serp/youtube/video_subtitles/task_post',
  'serp_youtube_video_subtitles_tasks_ready': '/v3/serp/youtube/video_subtitles/tasks_ready',
  'serp_youtube_video_subtitles_task_get_advanced': '/v3/serp/youtube/video_subtitles/task_get/advanced',
  
  // YouTube SERP Tools - Video Comments
  'serp_youtube_video_comments_live_advanced': '/v3/serp/youtube/video_comments/live/advanced',
  'serp_youtube_video_comments_task_post': '/v3/serp/youtube/video_comments/task_post',
  'serp_youtube_video_comments_tasks_ready': '/v3/serp/youtube/video_comments/tasks_ready',
  'serp_youtube_video_comments_task_get_advanced': '/v3/serp/youtube/video_comments/task_get/advanced'
};

// Combine all endpoints
const ALL_ENDPOINTS = { ...ONPAGE_ENDPOINTS, ...BACKLINKS_ENDPOINTS, ...DOMAIN_ANALYTICS_ENDPOINTS, ...KEYWORDS_DATA_ENDPOINTS, ...CONTENT_ANALYSIS_ENDPOINTS, ...CONTENT_GENERATION_ENDPOINTS, ...MERCHANT_ENDPOINTS, ...BUSINESS_DATA_ENDPOINTS, ...AI_OPTIMIZATION_ENDPOINTS, ...SERP_ENDPOINTS };

// MCP handler function
async function handleMcpRequest(req, res) {
  try {
    const { method, params } = req.body;
    console.log('🔧 MCP Request:', { method, params });
    
    // Check if it's a tools/call request OR direct API method call
    if (method === 'tools/call' && params?.name) {
      const apiName = params.name;
      const arguments_ = params.arguments || {};

      // Universal handling for ALL APIs with German defaults and location mapping  
      if (true) { // Handle ALL APIs universally
        const engine = apiName.includes('_bing_')
          ? 'bing'
          : apiName.includes('_yahoo_')
          ? 'yahoo'
          : (arguments_.search_engine || 'google');

        // Universal endpoint mapping for ALL APIs
        let endpoint;
        if (apiName === 'serp_locations') {
          const country = arguments_.country_code || 'US';
          endpoint = `/v3/serp/${engine}/locations/${country}`;
        } else if (ALL_ENDPOINTS[apiName]) {
          // Use ALL_ENDPOINTS mapping for known APIs
          endpoint = ALL_ENDPOINTS[apiName];
        } else {
          // Fallback: Unknown API
          return res.status(400).json({ jsonrpc: '2.0', error: { code: -32601, message: 'Method not found: ' + apiName }, id: req.body?.id || null });
        }
        
        // Deutsche Standardwerte für ALLE APIs - API-spezifische Parameter-Sammlung
        let requestData = [{}];
        
        // Base Parameter für alle APIs (nur basics)
        const baseParams = {
          keyword: arguments_.keyword,
          url: arguments_.url
        };
        
        // API-spezifische Parameter-Sets (Reihenfolge ist wichtig!)
        if (apiName.includes('merchant_')) {
          // Merchant APIs (Google Shopping, Amazon) - korrekte Parameter mit richtigen Formaten
          const merchantParams = {
            keyword: arguments_.keyword,
            location_name: normalizeLocationName(arguments_.location_name || arguments_.location),
            // Merchant APIs brauchen language_code im Format "en_US", "de_DE", etc.
            language_code: arguments_.language_code === 'de' ? 'de_DE' : 
                          arguments_.language_code === 'en' ? 'en_US' :
                          arguments_.language_code || 'de_DE',
            depth: arguments_.depth || 100,
            max_crawl_pages: arguments_.max_crawl_pages || 1,
            se_domain: arguments_.se_domain,
            department: arguments_.department,
            search_param: arguments_.search_param,
            price_min: arguments_.price_min,
            price_max: arguments_.price_max,
            sort_by: arguments_.sort_by,
            priority: arguments_.priority || 1,
            tag: arguments_.tag
          };
          
          // Nur definierte Parameter senden (undefined entfernen)
          requestData = [Object.fromEntries(
            Object.entries(merchantParams).filter(([key, value]) => value !== undefined)
          )];
        } else if (apiName.includes('domain_analytics_') || apiName.includes('domain_technologies')) {
          // Domain Analytics APIs
          requestData = [{
            target: arguments_.target || arguments_.domain,
            domain: arguments_.domain || arguments_.target,
            technology: arguments_.technology,
            html_terms: arguments_.html_terms,
            limit: arguments_.limit || 100
          }];
        } else if (apiName.includes('keywords_data_')) {
          // Keywords Data APIs
          requestData = [{
            ...baseParams,
            location_name: normalizeLocationName(arguments_.location_name || arguments_.location),
            language_code: arguments_.language_code || 'de',
            keywords: arguments_.keywords,
            site: arguments_.site,
            limit: arguments_.limit || 100
          }];
        } else if (apiName.includes('business_data_')) {
          // Business Data APIs  
          requestData = [{
            ...baseParams,
            location_name: normalizeLocationName(arguments_.location_name || arguments_.location),
            language_code: arguments_.language_code || 'de',
            search_partners: arguments_.search_partners,
            limit: arguments_.limit || 100
          }];
        } else {
          // SERP, Content Analysis, OnPage, Backlinks APIs (Standard)
          const standardParams = {
            ...baseParams,
            location_name: normalizeLocationName(arguments_.location_name || arguments_.location),
            language_code: arguments_.language_code || 'de',
            depth: arguments_.depth || 20,
            max_crawl_pages: arguments_.max_crawl_pages || 1,
            device: arguments_.device || 'desktop',
            people_also_ask_click_depth: arguments_.people_also_ask_click_depth,
            limit: arguments_.limit || 100,
            query: arguments_.query,
            content: arguments_.content,
            text: arguments_.text,
            backlinks_status_type: arguments_.backlinks_status_type
          };
          
          // AI Mode Endpoints unterstützen KEIN language_name - nur language_code
          if (!apiName.includes('ai_mode')) {
            standardParams.language_name = arguments_.language_name;
          }
          
          requestData = [standardParams];
        }
      
      // Merchant APIs: KEINE anderen Parameter hinzufügen - diese sind bereits perfekt konfiguriert
      // Andere APIs: Füge zusätzliche Parameter hinzu falls nötig
      if (!apiName.includes('merchant_')) {
        const otherParams = Object.fromEntries(
          Object.entries(arguments_).filter(([key, value]) => 
            !['location_name', 'location', 'language_code', 'language_name', 'keyword', 'url', 'target', 'domain'].includes(key) && 
            value !== undefined && value !== null && value !== ''
          )
        );
        requestData[0] = { ...requestData[0], ...otherParams };
      }

        // Debug: Log request data for AI Mode endpoints
        if (apiName.includes('ai_mode')) {
          console.log('🤖 AI Mode Arguments:', JSON.stringify(arguments_, null, 2));
          console.log('🤖 AI Mode Request Data:', JSON.stringify(requestData, null, 2));
          console.log('🤖 AI Mode API Name:', apiName);
        }

        // Determine HTTP method based on endpoint pattern
        const httpMethod = (endpoint.includes('/languages') || 
                           endpoint.includes('/audits') || 
                           endpoint.includes('/versions') || 
                           endpoint.includes('/available_filters') || 
                           endpoint.includes('/index') || 
                           endpoint.includes('/status') || 
                           endpoint.includes('/locations') || 
                           endpoint.includes('/categories') || 
                           endpoint.includes('/grammar_rules') || 
                           endpoint.includes('/tasks_ready') || 
                           endpoint.includes('/task_get/') || 
                           endpoint.includes('/ad_url/') ||
                           endpoint.includes('/models') ||
                           endpoint.includes('/id_list') ||
                           endpoint.includes('/errors')) ? 'GET' : 'POST';

                const dataforseoResponse = await makeDataForSEORequest(endpoint, httpMethod === 'POST' ? requestData : null, httpMethod);
        if (dataforseoResponse.status === 200) {
          return res.json({ jsonrpc: '2.0', result: dataforseoResponse.body, id: req.body?.id || null });
        }
        console.error('DataForSEO API Error:', {
          status: dataforseoResponse.status,
          body: dataforseoResponse.body,
          endpoint: endpoint,
          requestData: requestData
        });
        return res.status(500).json({ 
          jsonrpc: '2.0', 
          error: { 
            code: -32603, 
            message: `DataForSEO API returned status ${dataforseoResponse.status}: ${JSON.stringify(dataforseoResponse.body)}` 
          }, 
          id: req.body?.id || null 
        });
      } else {
        // Handle unknown methods  
        res.status(400).json({
          jsonrpc: "2.0",
          error: {
            code: -32601,
            message: "Method not found or not implemented"
          },
          id: req.body?.id || null
        });
      }
    } else if (ALL_ENDPOINTS[method]) {
      // Handle direct API method calls (backwards compatibility)
      console.log('🔧 Direct API Method Call:', method);
      
      const endpoint = ALL_ENDPOINTS[method];
      const arguments_ = params || {};
      
      // Prepare request data same as above
      const requestData = [{
        ...arguments_,
        location_name: normalizeLocationName(arguments_.location_name || arguments_.location || 'Germany'),
        language_code: arguments_.language_code || 'de'
      }];
      
      // Determine HTTP method
      const httpMethod = (endpoint.includes('/languages') || 
                         endpoint.includes('/audits') || 
                         endpoint.includes('/versions') || 
                         endpoint.includes('/available_filters') || 
                         endpoint.includes('/index') || 
                         endpoint.includes('/status') || 
                         endpoint.includes('/locations') || 
                         endpoint.includes('/categories') || 
                         endpoint.includes('/grammar_rules') || 
                         endpoint.includes('/tasks_ready') || 
                         endpoint.includes('/task_get/') || 
                         endpoint.includes('/ad_url/') ||
                         endpoint.includes('/models') ||
                         endpoint.includes('/id_list') ||
                         endpoint.includes('/errors')) ? 'GET' : 'POST';

      const dataforseoResponse = await makeDataForSEORequest(endpoint, httpMethod === 'POST' ? requestData : null, httpMethod);
      if (dataforseoResponse.status === 200) {
        return res.json({ jsonrpc: '2.0', result: dataforseoResponse.body, id: req.body?.id || null });
      }
      console.error('DataForSEO API Error (direct call):', {
        status: dataforseoResponse.status,
        body: dataforseoResponse.body,
        endpoint: endpoint,
        requestData: requestData
      });
      return res.status(500).json({ 
        jsonrpc: '2.0', 
        error: { 
          code: -32603, 
          message: `DataForSEO API returned status ${dataforseoResponse.status}: ${JSON.stringify(dataforseoResponse.body)}` 
        }, 
        id: req.body?.id || null 
      });
    } else {
      // Handle other methods or return error
      res.status(400).json({
        jsonrpc: "2.0",
        error: {
          code: -32601,
          message: "Method not found or not implemented: " + method
        },
        id: req.body?.id || null
      });
    }
  } catch (error) {
    console.error('Error in MCP handler:', error);
    console.error('Stack trace:', error.stack);
    console.error('Request body:', req.body);
    res.status(500).json({
      jsonrpc: "2.0",
      error: {
        code: -32603,
        message: "Internal server error: " + error.message
      },
      id: req.body?.id || null
    });
  }
}

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'healthy',
    server: 'dataforseo-mcp-server',
    version: '2.7.2',
    timestamp: new Date().toISOString(),
    endpoints: ['/http', '/mcp'],
    message: 'DataForSEO MCP Server is running on Vercel! 🚀',
    deployment: 'successful',
    features: [
      'on_page_instant_pages', 
      'real_dataforseo_integration', 
      'all_30_onpage_apis',
      'all_25_backlinks_apis',
      'all_17_domain_analytics_apis',
      'all_29_keywords_data_apis',
      'all_11_content_analysis_apis',
      'all_10_content_generation_apis',
      'all_41_merchant_apis',
      'all_24_business_data_apis',
      'all_17_ai_optimization_apis'
    ],
    available_apis: {
      onpage: Object.keys(ONPAGE_ENDPOINTS).length,
      backlinks: Object.keys(BACKLINKS_ENDPOINTS).length,
      domain_analytics: Object.keys(DOMAIN_ANALYTICS_ENDPOINTS).length,
      keywords_data: Object.keys(KEYWORDS_DATA_ENDPOINTS).length,
      content_analysis: Object.keys(CONTENT_ANALYSIS_ENDPOINTS).length,
      content_generation: Object.keys(CONTENT_GENERATION_ENDPOINTS).length,
      merchant: Object.keys(MERCHANT_ENDPOINTS).length,
      business_data: Object.keys(BUSINESS_DATA_ENDPOINTS).length,
      ai_optimization: Object.keys(AI_OPTIMIZATION_ENDPOINTS).length,
      total: Object.keys(ALL_ENDPOINTS).length
    }
  });
});

// MCP endpoints with real DataForSEO integration
app.post('/http', handleMcpRequest);
app.post('/mcp', handleMcpRequest);

// Direct REST API routes for SERP endpoints

// General SERP endpoints
app.post('/v3/serp/id_list', async (req, res) => {
  try {
    const endpoint = '/v3/serp/id_list';
    const requestData = Array.isArray(req.body) ? req.body : [req.body];
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, requestData, 'POST');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in SERP ID list route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.post('/v3/serp/errors', async (req, res) => {
  try {
    const endpoint = '/v3/serp/errors';
    const requestData = Array.isArray(req.body) ? req.body : [req.body];
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, requestData, 'POST');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in SERP errors route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.post('/v3/serp/tasks_ready', async (req, res) => {
  try {
    const endpoint = '/v3/serp/tasks_ready';
    const requestData = Array.isArray(req.body) ? req.body : [req.body];
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, requestData, 'POST');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in SERP tasks ready route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.post('/v3/serp/screenshot', async (req, res) => {
  try {
    const endpoint = '/v3/serp/screenshot';
    const requestData = Array.isArray(req.body) ? req.body : [req.body];
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, requestData, 'POST');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in SERP screenshot route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.post('/v3/serp/ai_summary', async (req, res) => {
  try {
    const endpoint = '/v3/serp/ai_summary';
    const requestData = Array.isArray(req.body) ? req.body : [req.body];
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, requestData, 'POST');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in SERP AI summary route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.get('/v3/serp/:engine/locations/:country?', async (req, res) => {
  try {
    const { engine, country } = req.params;
    const countryCode = country || 'US';
    const endpoint = `/v3/serp/${engine}/locations/${countryCode}`;
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, null, 'GET');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in SERP locations route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.get('/v3/serp/:engine/languages', async (req, res) => {
  try {
    const { engine } = req.params;
    const endpoint = `/v3/serp/${engine}/languages`;
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, null, 'GET');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in SERP languages route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.post('/v3/serp/:engine/organic/live', async (req, res) => {
  try {
    const { engine } = req.params;
    const endpoint = `/v3/serp/${engine}/organic/live`;
    const requestData = Array.isArray(req.body) ? req.body : [req.body];
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, requestData, 'POST');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in SERP organic live route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.post('/v3/serp/:engine/organic/live/advanced', async (req, res) => {
  try {
    const { engine } = req.params;
    const endpoint = `/v3/serp/${engine}/organic/live/advanced`;
    
    // Deutsche Standardwerte für direkte API-Aufrufe
    let requestData = Array.isArray(req.body) ? req.body : [req.body];
    requestData = requestData.map(item => ({
      location_name: normalizeLocationName(item.location_name || item.location),
      language_code: item.language_code || 'de',
      ...item
    }));
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, requestData, 'POST');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in SERP organic live advanced route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.post('/v3/serp/:engine/organic/task_post', async (req, res) => {
  try {
    const { engine } = req.params;
    const endpoint = `/v3/serp/${engine}/organic/task_post`;
    const requestData = Array.isArray(req.body) ? req.body : [req.body];
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, requestData, 'POST');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in SERP task post route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.get('/v3/serp/:engine/organic/tasks_ready', async (req, res) => {
  try {
    const { engine } = req.params;
    const endpoint = `/v3/serp/${engine}/organic/tasks_ready`;
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, null, 'GET');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in SERP tasks ready route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.get('/v3/serp/:engine/organic/task_get/:format/:id', async (req, res) => {
  try {
    const { engine, format, id } = req.params;
    const endpoint = `/v3/serp/${engine}/organic/task_get/${format}/${id}`;
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, null, 'GET');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in SERP task get route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

// Universal Catch-All Route for all DataForSEO v3 APIs
app.all('/v3/*', async (req, res) => {
  try {
    const apiPath = req.path;
    
    // Determine HTTP method based on endpoint pattern
    const isGetEndpoint = apiPath.includes('/languages') || 
                         apiPath.includes('/locations') || 
                         apiPath.includes('/audits') || 
                         apiPath.includes('/versions') || 
                         apiPath.includes('/available_filters') || 
                         apiPath.includes('/index') || 
                         apiPath.includes('/status') || 
                         apiPath.includes('/categories') || 
                         apiPath.includes('/grammar_rules') || 
                         apiPath.includes('/tasks_ready') || 
                         apiPath.includes('/task_get/') || 
                         apiPath.includes('/ad_url/') ||
                         apiPath.includes('/models') ||
                         apiPath.includes('/id_list') ||
                         apiPath.includes('/errors');
    
    const httpMethod = isGetEndpoint ? 'GET' : 'POST';
    
    // For POST requests, prepare request data
    let requestData = null;
    if (httpMethod === 'POST' && req.body) {
      requestData = Array.isArray(req.body) ? req.body : [req.body];
    }
    
    const dataforseoResponse = await makeDataForSEORequest(apiPath, requestData, httpMethod);
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ 
        error: 'DataForSEO API returned an error',
        details: dataforseoResponse.body 
      });
    }
  } catch (error) {
    console.error('Error in universal v3 route:', error);
    res.status(500).json({ 
      error: 'Internal server error: ' + error.message,
      path: req.path 
    });
  }
});

// Debug: expose available tools (including special SERP handlers)
app.get('/debug/tools', (req, res) => {
  const specialSerp = [
    'serp_organic_live_advanced',
    'serp_bing_organic_live_advanced',
    'serp_yahoo_organic_live_advanced',
    'serp_locations'
  ];
  res.json({ tools: [...Object.keys(ALL_ENDPOINTS), ...specialSerp] });
});

// Handle other methods
app.get('/http', (req, res) => {
  res.status(405).json({
    jsonrpc: "2.0",
    error: {
      code: -32000,
      message: "Method not allowed."
    },
    id: null
  });
});

app.get('/mcp', (req, res) => {
  res.status(405).json({
    jsonrpc: "2.0",
    error: {
      code: -32000,
      message: "Method not allowed."
    },
    id: null
  });
});

// Export for Vercel
export default app; 