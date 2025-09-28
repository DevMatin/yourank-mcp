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

// Helper function to make DataForSEO API calls for AI Mode (without location_name)
function makeDataForSEORequestForAiMode(endpoint, postData, method = 'POST') {
  console.log('🤖 makeDataForSEORequestForAiMode called with:', { endpoint, method, postData: postData ? JSON.stringify(postData, null, 2) : 'null' });
  
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
      // For AI Mode: Only minimal parameters - keyword, location_name, device
      const cleanPostData = postData.map(item => ({
        keyword: item.keyword,
        location_name: item.location_name || 'United States',
        device: item.device || 'desktop'
        // NO language_code, NO depth - AI Mode is very restrictive
      }));
      
      console.log('🤖 AI Mode Minimal Request (keyword, location_name, device only):', JSON.stringify(cleanPostData, null, 2));
      console.log('🤖 AI Mode Endpoint:', endpoint);
      console.log('🤖 AI Mode Method:', method);
      console.log('🤖 AI Mode Headers:', options.headers);
      
      req.write(JSON.stringify(cleanPostData));
    }
    req.end();
  });
}

// Helper function to make DataForSEO API calls
function makeDataForSEORequest(endpoint, postData, method = 'POST') {
  console.log('🔧 makeDataForSEORequest called with:', { endpoint, method, postData: postData ? JSON.stringify(postData, null, 2) : 'null' });
  
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
      console.log('🔧 Processing POST request for endpoint:', endpoint);
      
      // Special handling for different endpoints to remove invalid parameters
      let cleanPostData = postData;
      
      // AI Mode endpoints - remove language_name and language_code
      if (endpoint.includes('/v3/serp/google/ai_mode/')) {
        console.log('🔧 AI Mode endpoint detected!');
        cleanPostData = postData.map(item => {
          const { language_name, language_code, location_name, ...cleanItem } = item;
          // Only keep essential parameters for AI Mode
          const minimalItem = {
            keyword: cleanItem.keyword,
            device: cleanItem.device,
            depth: cleanItem.depth
          };
          return minimalItem;
        });
        console.log('🔧 AI Mode DataForSEO Request (minimal):', JSON.stringify(cleanPostData, null, 2));
        console.log('🔧 AI Mode Endpoint:', endpoint);
        console.log('🔧 AI Mode Method:', method);
      }
      // Google Ads endpoints - remove invalid parameters
      else if (endpoint.includes('/v3/keywords_data/google_ads/ad_traffic_by_keywords/live')) {
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
  
  // Google Keywords Tools (corrected URLs)
  'keywords_data_google_ads_search_volume': '/v3/keywords_data/google/search_volume/live',
  'keywords_data_google_ads_status': '/v3/keywords_data/google/status',
  'keywords_data_google_ads_locations': '/v3/keywords_data/google/locations',
  'keywords_data_google_ads_languages': '/v3/keywords_data/google/languages',
  'keywords_data_google_ads_keywords_for_site': '/v3/keywords_data/google/keywords_for_site/live',
  'keywords_data_google_ads_keywords_for_keywords': '/v3/keywords_data/google/keywords_for_keywords/live',
  'keywords_data_google_ads_ad_traffic_by_keywords': '/v3/keywords_data/google_ads/ad_traffic_by_keywords/live',
  
  // Google Keywords Task-based Tools (corrected URLs)
  'keywords_data_google_ads_search_volume_task_post': '/v3/keywords_data/google/search_volume/task_post',
  'keywords_data_google_ads_search_volume_tasks_ready': '/v3/keywords_data/google/search_volume/tasks_ready',
  'keywords_data_google_ads_search_volume_task_get': '/v3/keywords_data/google/search_volume/task_get',
  'keywords_data_google_ads_keywords_for_site_task_post': '/v3/keywords_data/google/keywords_for_site/task_post',
  'keywords_data_google_ads_keywords_for_site_tasks_ready': '/v3/keywords_data/google/keywords_for_site/tasks_ready',
  'keywords_data_google_ads_keywords_for_site_task_get': '/v3/keywords_data/google/keywords_for_site/task_get',
  'keywords_data_google_ads_keywords_for_keywords_task_post': '/v3/keywords_data/google/keywords_for_keywords/task_post',
  'keywords_data_google_ads_keywords_for_keywords_tasks_ready': '/v3/keywords_data/google/keywords_for_keywords/tasks_ready',
  'keywords_data_google_ads_keywords_for_keywords_task_get': '/v3/keywords_data/google/keywords_for_keywords/task_get',
  'keywords_data_google_ads_ad_traffic_by_keywords_task_post': '/v3/keywords_data/google_ads/ad_traffic_by_keywords/task_post',
  'keywords_data_google_ads_ad_traffic_by_keywords_tasks_ready': '/v3/keywords_data/google_ads/ad_traffic_by_keywords/tasks_ready',
  'keywords_data_google_ads_ad_traffic_by_keywords_task_get': '/v3/keywords_data/google_ads/ad_traffic_by_keywords/task_get',
  
  // Google Trends Tools
  'keywords_data_google_trends_categories': '/v3/keywords_data/google_trends/categories',
  'keywords_data_google_trends_explore': '/v3/keywords_data/google_trends/explore/live',
  'keywords_data_google_trends_locations': '/v3/keywords_data/google_trends/locations',
  'keywords_data_google_trends_languages': '/v3/keywords_data/google_trends/languages',
  'keywords_data_google_trends_explore_task_post': '/v3/keywords_data/google_trends/explore/task_post',
  'keywords_data_google_trends_explore_tasks_ready': '/v3/keywords_data/google_trends/explore/tasks_ready',
  'keywords_data_google_trends_explore_task_get': '/v3/keywords_data/google_trends/explore/task_get',
  
  // DataForSEO Trends Tools
  'keywords_data_dataforseo_trends_demography': '/v3/keywords_data/dataforseo_trends/demography/live',
  'keywords_data_dataforseo_trends_explore': '/v3/keywords_data/dataforseo_trends/explore/live',
  'keywords_data_dataforseo_trends_subregion_interests': '/v3/keywords_data/dataforseo_trends/subregion_interests/live',
  'keywords_data_dataforseo_trends_locations': '/v3/keywords_data/dataforseo_trends/locations',
  'keywords_data_dataforseo_trends_merged_data': '/v3/keywords_data/dataforseo_trends/merged_data/live',
  
  // Bing Tools
  'keywords_data_bing_locations': '/v3/keywords_data/bing/locations',
  'keywords_data_bing_languages': '/v3/keywords_data/bing/languages',
  'keywords_data_bing_search_volume': '/v3/keywords_data/bing/search_volume/live',
  'keywords_data_bing_search_volume_task_post': '/v3/keywords_data/bing/search_volume/task_post',
  'keywords_data_bing_search_volume_tasks_ready': '/v3/keywords_data/bing/search_volume/tasks_ready',
  'keywords_data_bing_search_volume_task_get': '/v3/keywords_data/bing/search_volume/task_get',
  
  // Bing Audience Estimation Tools
  'keywords_data_bing_audience_estimation_job_functions': '/v3/keywords_data/bing/audience_estimation/job_functions',
  'keywords_data_bing_audience_estimation_industries': '/v3/keywords_data/bing/audience_estimation/industries',
  'keywords_data_bing_audience_estimation_task_post': '/v3/keywords_data/bing/audience_estimation/task_post',
  'keywords_data_bing_audience_estimation_tasks_ready': '/v3/keywords_data/bing/audience_estimation/tasks_ready',
  'keywords_data_bing_audience_estimation_task_get': '/v3/keywords_data/bing/audience_estimation/task_get',
  'keywords_data_bing_audience_estimation_live': '/v3/keywords_data/bing/audience_estimation/live',
  
  // Bing Keywords for Site Tools
  'keywords_data_bing_keywords_for_site_task_post': '/v3/keywords_data/bing/keywords_for_site/task_post',
  'keywords_data_bing_keywords_for_site_tasks_ready': '/v3/keywords_data/bing/keywords_for_site/tasks_ready',
  'keywords_data_bing_keywords_for_site_task_get': '/v3/keywords_data/bing/keywords_for_site/task_get',
  'keywords_data_bing_keywords_for_site_live': '/v3/keywords_data/bing/keywords_for_site/live',
  
  // Bing Keywords for Keywords Tools
  'keywords_data_bing_keywords_for_keywords_task_post': '/v3/keywords_data/bing/keywords_for_keywords/task_post',
  'keywords_data_bing_keywords_for_keywords_tasks_ready': '/v3/keywords_data/bing/keywords_for_keywords/tasks_ready',
  'keywords_data_bing_keywords_for_keywords_task_get': '/v3/keywords_data/bing/keywords_for_keywords/task_get',
  'keywords_data_bing_keywords_for_keywords_live': '/v3/keywords_data/bing/keywords_for_keywords/live',
  
  // Bing Keyword Performance Tools
  'keywords_data_bing_keyword_performance_locations_and_languages': '/v3/keywords_data/bing/keyword_performance/locations_and_languages',
  'keywords_data_bing_keyword_performance_task_post': '/v3/keywords_data/bing/keyword_performance/task_post',
  'keywords_data_bing_keyword_performance_tasks_ready': '/v3/keywords_data/bing/keyword_performance/tasks_ready',
  'keywords_data_bing_keyword_performance_task_get': '/v3/keywords_data/bing/keyword_performance/task_get',
  'keywords_data_bing_keyword_performance_live': '/v3/keywords_data/bing/keyword_performance/live',
  
  // Bing Search Volume History Tools
  'keywords_data_bing_search_volume_history_locations_and_languages': '/v3/keywords_data/bing/search_volume_history/locations_and_languages',
  'keywords_data_bing_search_volume_history_task_post': '/v3/keywords_data/bing/search_volume_history/task_post',
  'keywords_data_bing_search_volume_history_tasks_ready': '/v3/keywords_data/bing/search_volume_history/tasks_ready',
  'keywords_data_bing_search_volume_history_task_get': '/v3/keywords_data/bing/search_volume_history/task_get',
  'keywords_data_bing_search_volume_history_live': '/v3/keywords_data/bing/search_volume_history/live',
  
  // Clickstream Data Tools
  'keywords_data_clickstream_data_locations_and_languages': '/v3/keywords_data/clickstream_data/locations_and_languages',
  'keywords_data_clickstream_data_dataforseo_search_volume_live': '/v3/keywords_data/clickstream_data/dataforseo_search_volume/live',
  'keywords_data_clickstream_data_global_search_volume_live': '/v3/keywords_data/clickstream_data/global_search_volume/live',
  'keywords_data_clickstream_data_bulk_search_volume_live': '/v3/keywords_data/clickstream_data/bulk_search_volume/live'
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
  // Gruppierte Endpoints für Custom GPT Schema
  'business_data_google_my_business': '/v3/business_data_google_my_business',
  'business_data_google_hotels': '/v3/business_data_google_hotels',
  'business_data_google_reviews': '/v3/business_data_google_reviews',
  'business_data_google_qa': '/v3/business_data_google_qa',
  'business_data_trustpilot': '/v3/business_data_trustpilot',
  'business_data_tripadvisor': '/v3/business_data_tripadvisor',
  'business_data_general': '/v3/business_data_general',
  'business_data_listings': '/v3/business_data_listings',
  'business_data_social_media': '/v3/business_data_social_media',
  
  // General Business Data Tools
  'business_data_id_list': '/v3/business_data/id_list',
  'business_data_errors': '/v3/business_data/errors',
  'business_data_tasks_ready': '/v3/business_data/tasks_ready',
  
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
  'business_data_google_my_business_info_task_post': '/v3/business_data/google/my_business_info/task_post',
  'business_data_google_my_business_info_tasks_ready': '/v3/business_data/google/my_business_info/tasks_ready',
  'business_data_google_my_business_info_task_get': '/v3/business_data/google/my_business_info/task_get/{id}',
  'business_data_google_my_business_updates_task_post': '/v3/business_data/google/my_business_updates/task_post',
  'business_data_google_my_business_updates_tasks_ready': '/v3/business_data/google/my_business_updates/tasks_ready',
  'business_data_google_my_business_updates_task_get': '/v3/business_data/google/my_business_updates/task_get/{id}',
  'business_data_google_hotel_searches_live': '/v3/business_data/google/hotel_searches/live',
  'business_data_google_hotel_searches_task_post': '/v3/business_data/google/hotel_searches/task_post',
  'business_data_google_hotel_searches_tasks_ready': '/v3/business_data/google/hotel_searches/tasks_ready',
  'business_data_google_hotel_searches_task_get': '/v3/business_data/google/hotel_searches/task_get/{id}',
  'business_data_google_hotel_info_live_advanced': '/v3/business_data/google/hotel_info/live/advanced',
  'business_data_google_hotel_info_live_html': '/v3/business_data/google/hotel_info/live/html',
  'business_data_google_hotel_info_task_post': '/v3/business_data/google/hotel_info/task_post',
  'business_data_google_hotel_info_tasks_ready': '/v3/business_data/google/hotel_info/tasks_ready',
  'business_data_google_hotel_info_task_get': '/v3/business_data/google/hotel_info/task_get/{id}',
  'business_data_google_hotel_info_task_get_html': '/v3/business_data/google/hotel_info/task_get/html/{id}',
  'business_data_google_reviews_live': '/v3/business_data/google/reviews/live',
  'business_data_google_reviews_task_post': '/v3/business_data/google/reviews/task_post',
  'business_data_google_reviews_tasks_ready': '/v3/business_data/google/reviews/tasks_ready',
  'business_data_google_reviews_task_get': '/v3/business_data/google/reviews/task_get/{id}',
  'business_data_google_extended_reviews_task_post': '/v3/business_data/google/extended_reviews/task_post',
  'business_data_google_extended_reviews_tasks_ready': '/v3/business_data/google/extended_reviews/tasks_ready',
  'business_data_google_extended_reviews_task_get': '/v3/business_data/google/extended_reviews/task_get/{id}',
  'business_data_google_questions_and_answers_live': '/v3/business_data/google/questions_and_answers/live',
  'business_data_google_questions_and_answers_task_post': '/v3/business_data/google/questions_and_answers/task_post',
  'business_data_google_questions_and_answers_tasks_ready': '/v3/business_data/google/questions_and_answers/tasks_ready',
  'business_data_google_questions_and_answers_task_get': '/v3/business_data/google/questions_and_answers/task_get/{id}',
  
  // Trustpilot Tools
  'business_data_trustpilot_search_live': '/v3/business_data/trustpilot/search/live',
  'business_data_trustpilot_search_task_post': '/v3/business_data/trustpilot/search/task_post',
  'business_data_trustpilot_search_tasks_ready': '/v3/business_data/trustpilot/search/tasks_ready',
  'business_data_trustpilot_search_task_get': '/v3/business_data/trustpilot/search/task_get/{id}',
  'business_data_trustpilot_reviews_live': '/v3/business_data/trustpilot/reviews/live',
  'business_data_trustpilot_reviews_task_post': '/v3/business_data/trustpilot/reviews/task_post',
  'business_data_trustpilot_reviews_tasks_ready': '/v3/business_data/trustpilot/reviews/tasks_ready',
  'business_data_trustpilot_reviews_task_get': '/v3/business_data/trustpilot/reviews/task_get/{id}',
  
  // Tripadvisor Tools
  'business_data_tripadvisor_locations': '/v3/business_data/tripadvisor/locations',
  'business_data_tripadvisor_locations_country': '/v3/business_data/tripadvisor/locations/{country}',
  'business_data_tripadvisor_languages': '/v3/business_data/tripadvisor/languages',
  'business_data_tripadvisor_search_live': '/v3/business_data/tripadvisor/search/live',
  'business_data_tripadvisor_search_task_post': '/v3/business_data/tripadvisor/search/task_post',
  'business_data_tripadvisor_search_tasks_ready': '/v3/business_data/tripadvisor/search/tasks_ready',
  'business_data_tripadvisor_search_task_get': '/v3/business_data/tripadvisor/search/task_get/{id}',
  'business_data_tripadvisor_reviews_live': '/v3/business_data/tripadvisor/reviews/live',
  'business_data_tripadvisor_reviews_task_post': '/v3/business_data/tripadvisor/reviews/task_post',
  'business_data_tripadvisor_reviews_tasks_ready': '/v3/business_data/tripadvisor/reviews/tasks_ready',
  'business_data_tripadvisor_reviews_task_get': '/v3/business_data/tripadvisor/reviews/task_get/{id}',
  
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
        } else if (apiName === 'businessDataGoogleMyBusiness') {
          // Handle grouped Business Data Google My Business endpoint
          const type = arguments_.type || 'my_business_info_live';
          if (type === 'my_business_info_live') {
            endpoint = '/v3/business_data/google/my_business_info/live';
          } else if (type === 'my_business_info_task_post') {
            endpoint = '/v3/business_data/google/my_business_info/task_post';
          } else if (type === 'my_business_info_tasks_ready') {
            endpoint = '/v3/business_data/google/my_business_info/tasks_ready';
          } else if (type === 'my_business_info_task_get') {
            endpoint = '/v3/business_data/google/my_business_info/task_get/{id}';
          } else if (type === 'my_business_updates_task_post') {
            endpoint = '/v3/business_data/google/my_business_updates/task_post';
          } else if (type === 'my_business_updates_tasks_ready') {
            endpoint = '/v3/business_data/google/my_business_updates/tasks_ready';
          } else if (type === 'my_business_updates_task_get') {
            endpoint = '/v3/business_data/google/my_business_updates/task_get/{id}';
          } else {
            endpoint = '/v3/business_data/google/my_business_info/live'; // Default
          }
        } else if (apiName === 'businessDataGoogleHotels') {
          // Handle grouped Business Data Google Hotels endpoint
          const type = arguments_.type || 'hotel_searches_live';
          if (type === 'hotel_searches_live') {
            endpoint = '/v3/business_data/google/hotel_searches/live';
          } else if (type === 'hotel_searches_task_post') {
            endpoint = '/v3/business_data/google/hotel_searches/task_post';
          } else if (type === 'hotel_searches_tasks_ready') {
            endpoint = '/v3/business_data/google/hotel_searches/tasks_ready';
          } else if (type === 'hotel_searches_task_get') {
            endpoint = '/v3/business_data/google/hotel_searches/task_get/{id}';
          } else if (type === 'hotel_info_live_advanced') {
            endpoint = '/v3/business_data/google/hotel_info/live/advanced';
          } else if (type === 'hotel_info_live_html') {
            endpoint = '/v3/business_data/google/hotel_info/live/html';
          } else if (type === 'hotel_info_task_post') {
            endpoint = '/v3/business_data/google/hotel_info/task_post';
          } else if (type === 'hotel_info_tasks_ready') {
            endpoint = '/v3/business_data/google/hotel_info/tasks_ready';
          } else if (type === 'hotel_info_task_get') {
            endpoint = '/v3/business_data/google/hotel_info/task_get/{id}';
          } else if (type === 'hotel_info_task_get_html') {
            endpoint = '/v3/business_data/google/hotel_info/task_get/html/{id}';
          } else {
            endpoint = '/v3/business_data/google/hotel_searches/live'; // Default
          }
        } else if (apiName === 'businessDataGoogleReviews') {
          // Handle grouped Business Data Google Reviews endpoint
          const type = arguments_.type || 'reviews_live';
          if (type === 'reviews_live') {
            endpoint = '/v3/business_data/google/reviews/live';
          } else if (type === 'reviews_task_post') {
            endpoint = '/v3/business_data/google/reviews/task_post';
          } else if (type === 'reviews_tasks_ready') {
            endpoint = '/v3/business_data/google/reviews/tasks_ready';
          } else if (type === 'reviews_task_get') {
            endpoint = '/v3/business_data/google/reviews/task_get/{id}';
          } else if (type === 'extended_reviews_task_post') {
            endpoint = '/v3/business_data/google/extended_reviews/task_post';
          } else if (type === 'extended_reviews_tasks_ready') {
            endpoint = '/v3/business_data/google/extended_reviews/tasks_ready';
          } else if (type === 'extended_reviews_task_get') {
            endpoint = '/v3/business_data/google/extended_reviews/task_get/{id}';
          } else {
            endpoint = '/v3/business_data/google/reviews/live'; // Default
          }
        } else if (apiName === 'businessDataGoogleQA') {
          // Handle grouped Business Data Google Q&A endpoint
          const type = arguments_.type || 'questions_and_answers_live';
          if (type === 'questions_and_answers_live') {
            endpoint = '/v3/business_data/google/questions_and_answers/live';
          } else if (type === 'questions_and_answers_task_post') {
            endpoint = '/v3/business_data/google/questions_and_answers/task_post';
          } else if (type === 'questions_and_answers_tasks_ready') {
            endpoint = '/v3/business_data/google/questions_and_answers/tasks_ready';
          } else if (type === 'questions_and_answers_task_get') {
            endpoint = '/v3/business_data/google/questions_and_answers/task_get/{id}';
          } else {
            endpoint = '/v3/business_data/google/questions_and_answers/live'; // Default
          }
        } else if (apiName === 'businessDataTrustpilot') {
          // Handle grouped Business Data Trustpilot endpoint
          const type = arguments_.type || 'search_live';
          if (type === 'search_live') {
            endpoint = '/v3/business_data/trustpilot/search/live';
          } else if (type === 'search_task_post') {
            endpoint = '/v3/business_data/trustpilot/search/task_post';
          } else if (type === 'search_tasks_ready') {
            endpoint = '/v3/business_data/trustpilot/search/tasks_ready';
          } else if (type === 'search_task_get') {
            endpoint = '/v3/business_data/trustpilot/search/task_get/{id}';
          } else if (type === 'reviews_live') {
            endpoint = '/v3/business_data/trustpilot/reviews/live';
          } else if (type === 'reviews_task_post') {
            endpoint = '/v3/business_data/trustpilot/reviews/task_post';
          } else if (type === 'reviews_tasks_ready') {
            endpoint = '/v3/business_data/trustpilot/reviews/tasks_ready';
          } else if (type === 'reviews_task_get') {
            endpoint = '/v3/business_data/trustpilot/reviews/task_get/{id}';
          } else {
            endpoint = '/v3/business_data/trustpilot/search/live'; // Default
          }
        } else if (apiName === 'businessDataTripadvisor') {
          // Handle grouped Business Data Tripadvisor endpoint
          const type = arguments_.type || 'search_live';
          if (type === 'locations') {
            endpoint = '/v3/business_data/tripadvisor/locations';
          } else if (type === 'locations_country') {
            endpoint = '/v3/business_data/tripadvisor/locations/{country}';
          } else if (type === 'languages') {
            endpoint = '/v3/business_data/tripadvisor/languages';
          } else if (type === 'search_live') {
            endpoint = '/v3/business_data/tripadvisor/search/live';
          } else if (type === 'search_task_post') {
            endpoint = '/v3/business_data/tripadvisor/search/task_post';
          } else if (type === 'search_tasks_ready') {
            endpoint = '/v3/business_data/tripadvisor/search/tasks_ready';
          } else if (type === 'search_task_get') {
            endpoint = '/v3/business_data/tripadvisor/search/task_get/{id}';
          } else if (type === 'reviews_live') {
            endpoint = '/v3/business_data/tripadvisor/reviews/live';
          } else if (type === 'reviews_task_post') {
            endpoint = '/v3/business_data/tripadvisor/reviews/task_post';
          } else if (type === 'reviews_tasks_ready') {
            endpoint = '/v3/business_data/tripadvisor/reviews/tasks_ready';
          } else if (type === 'reviews_task_get') {
            endpoint = '/v3/business_data/tripadvisor/reviews/task_get/{id}';
          } else {
            endpoint = '/v3/business_data/tripadvisor/search/live'; // Default
          }
        } else if (apiName === 'businessDataListings') {
          // Handle grouped Business Data Listings endpoint
          const type = arguments_.type || 'search_live';
          if (type === 'search_live') {
            endpoint = '/v3/business_data/business_listings/search/live';
          } else if (type === 'available_filters') {
            endpoint = '/v3/business_data/business_listings/filters';
          } else if (type === 'locations') {
            endpoint = '/v3/business_data/business_listings/locations';
          } else if (type === 'categories') {
            endpoint = '/v3/business_data/business_listings/categories';
          } else if (type === 'categories_aggregation_live') {
            endpoint = '/v3/business_data/business_listings/categories_aggregation/live';
          } else {
            endpoint = '/v3/business_data/business_listings/search/live'; // Default
          }
        } else if (apiName === 'businessDataSocialMedia') {
          // Handle grouped Business Data Social Media endpoint
          const type = arguments_.type || 'pinterest_live';
          if (type === 'pinterest_live') {
            endpoint = '/v3/business_data/social_media/pinterest/live';
          } else if (type === 'facebook_live') {
            endpoint = '/v3/business_data/social_media/facebook/live';
          } else if (type === 'reddit_live') {
            endpoint = '/v3/business_data/social_media/reddit/live';
          } else {
            endpoint = '/v3/business_data/social_media/pinterest/live'; // Default
          }
        } else if (apiName === 'businessDataGeneral') {
          // Handle grouped Business Data General endpoint
          const type = arguments_.type || 'id_list';
          if (type === 'id_list') {
            endpoint = '/v3/business_data/id_list';
          } else if (type === 'errors') {
            endpoint = '/v3/business_data/errors';
          } else if (type === 'tasks_ready') {
            endpoint = '/v3/business_data/tasks_ready';
          } else {
            endpoint = '/v3/business_data/id_list'; // Default
          }
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
    } else if (method === 'business_data_google_my_business') {
      // Handle grouped Business Data Google My Business endpoint
      console.log('🔧 Business Data Google My Business Method Call:', method);
      
      const type = params?.type || 'my_business_info_live';
      let endpoint;
      if (type === 'my_business_info_live') {
        endpoint = '/v3/business_data/google/my_business_info/live';
      } else if (type === 'my_business_info_task_post') {
        endpoint = '/v3/business_data/google/my_business_info/task_post';
      } else if (type === 'my_business_info_tasks_ready') {
        endpoint = '/v3/business_data/google/my_business_info/tasks_ready';
      } else if (type === 'my_business_info_task_get') {
        endpoint = '/v3/business_data/google/my_business_info/task_get/{id}';
      } else if (type === 'my_business_updates_task_post') {
        endpoint = '/v3/business_data/google/my_business_updates/task_post';
      } else if (type === 'my_business_updates_tasks_ready') {
        endpoint = '/v3/business_data/google/my_business_updates/tasks_ready';
      } else if (type === 'my_business_updates_task_get') {
        endpoint = '/v3/business_data/google/my_business_updates/task_get/{id}';
      } else {
        endpoint = '/v3/business_data/google/my_business_info/live'; // Default
      }
      
      const arguments_ = params || {};
      
      // Prepare request data for Business Data Google My Business
      const requestData = [{}];
      if (arguments_.keyword) { requestData[0].keyword = arguments_.keyword; }
      
      // Handle location parameter - convert location_name to location_code if needed
      if (arguments_.location_code) { 
        requestData[0].location_code = arguments_.location_code; 
      } else if (arguments_.location_coordinate) { 
        requestData[0].location_coordinate = arguments_.location_coordinate; 
      } else if (arguments_.location_name) {
        // Convert location_name to location_code using Google locations API
        console.log(`🔧 Converting location_name "${arguments_.location_name}" to location_code...`);
        try {
          const locationsResponse = await makeDataForSEORequest('/v3/business_data/google/locations', null, 'GET');
          if (locationsResponse.status === 200 && locationsResponse.body.tasks && locationsResponse.body.tasks[0].result) {
            const locations = locationsResponse.body.tasks[0].result;
            // Try multiple matching strategies
            let matchingLocation = locations.find(loc => 
              loc.location_name && loc.location_name.toLowerCase().includes(arguments_.location_name.toLowerCase())
            );
            
            // If no match, try with city name only (remove country)
            if (!matchingLocation) {
              const cityName = arguments_.location_name.split(',')[0].trim();
              matchingLocation = locations.find(loc => 
                loc.location_name && loc.location_name.toLowerCase().includes(cityName.toLowerCase())
              );
            }
            
            // If still no match, try with partial matching
            if (!matchingLocation) {
              const searchTerms = arguments_.location_name.toLowerCase().split(/[,\s]+/);
              matchingLocation = locations.find(loc => 
                loc.location_name && searchTerms.some(term => 
                  term.length > 2 && loc.location_name.toLowerCase().includes(term)
                )
              );
            }
            
            if (matchingLocation) {
              requestData[0].location_code = matchingLocation.location_code;
              console.log(`✅ Converted location_name "${arguments_.location_name}" to location_code: ${matchingLocation.location_code} (${matchingLocation.location_name})`);
            } else {
              console.warn(`⚠️ No matching location found for: ${arguments_.location_name}`);
              // Use default location code for Germany
              requestData[0].location_code = 2276; // Munich as fallback
              console.log(`🔄 Using fallback location_code: 2276 (Munich, Germany)`);
            }
          }
        } catch (error) {
          console.error('Error converting location_name to location_code:', error);
          // Use fallback location code
          requestData[0].location_code = 2276;
          console.log(`🔄 Using fallback location_code: 2276 due to error`);
        }
      }
      
      if (arguments_.language_name) { requestData[0].language_name = arguments_.language_name; }
      else if (arguments_.language_code) { requestData[0].language_code = arguments_.language_code; }
      if (arguments_.tag) { requestData[0].tag = arguments_.tag; }
      
      console.log('🔧 Business Data Google My Business Request:', {
        endpoint: endpoint,
        requestData: requestData,
        type: type
      });
      
      const httpMethod = 'POST';
      const dataforseoResponse = await makeDataForSEORequest(endpoint, requestData, httpMethod);
      if (dataforseoResponse.status === 200) {
        return res.json({ jsonrpc: '2.0', result: dataforseoResponse.body, id: req.body?.id || null });
      }
      console.error(`DataForSEO API Error (Business Data ${method}):`, {
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
    } else if (method === 'businessDataGoogleMyBusiness') {
      // Handle grouped Business Data Google My Business endpoint (legacy)
      console.log('🔧 Business Data Google My Business Method Call:', method);
      
      const type = params?.type || 'my_business_info_live';
      let endpoint;
      if (type === 'my_business_info_live') {
        endpoint = '/v3/business_data/google/my_business_info/live';
      } else if (type === 'my_business_info_task_post') {
        endpoint = '/v3/business_data/google/my_business_info/task_post';
      } else if (type === 'my_business_info_tasks_ready') {
        endpoint = '/v3/business_data/google/my_business_info/tasks_ready';
      } else if (type === 'my_business_info_task_get') {
        endpoint = '/v3/business_data/google/my_business_info/task_get/{id}';
      } else if (type === 'my_business_updates_task_post') {
        endpoint = '/v3/business_data/google/my_business_updates/task_post';
      } else if (type === 'my_business_updates_tasks_ready') {
        endpoint = '/v3/business_data/google/my_business_updates/tasks_ready';
      } else if (type === 'my_business_updates_task_get') {
        endpoint = '/v3/business_data/google/my_business_updates/task_get/{id}';
      } else {
        endpoint = '/v3/business_data/google/my_business_info/live'; // Default
      }
    } else if (method === 'business_data_google_reviews') {
      // Handle grouped Business Data Google Reviews endpoint
      console.log('🔧 Business Data Google Reviews Method Call:', method);
      
      const type = params?.type || 'reviews_task_post';
      let endpoint;
      if (type === 'reviews_live') {
        // Google Reviews hat keinen live endpoint - verwende task_post stattdessen
        endpoint = '/v3/business_data/google/reviews/task_post';
        console.log('⚠️ Google Reviews Live nicht verfügbar - verwende task_post');
      } else if (type === 'reviews_task_post') {
        endpoint = '/v3/business_data/google/reviews/task_post';
      } else if (type === 'reviews_tasks_ready') {
        endpoint = '/v3/business_data/google/reviews/tasks_ready';
      } else if (type === 'reviews_task_get') {
        endpoint = '/v3/business_data/google/reviews/task_get/{id}';
      } else if (type === 'extended_reviews_task_post') {
        endpoint = '/v3/business_data/google/extended_reviews/task_post';
      } else if (type === 'extended_reviews_tasks_ready') {
        endpoint = '/v3/business_data/google/extended_reviews/tasks_ready';
      } else if (type === 'extended_reviews_task_get') {
        endpoint = '/v3/business_data/google/extended_reviews/task_get/{id}';
      } else {
        endpoint = '/v3/business_data/google/reviews/task_post'; // Default - kein live endpoint verfügbar
      }
      
      const arguments_ = params || {};
      
      // Prepare request data for Business Data Google Reviews
      const requestData = [{}];
      if (arguments_.keyword) { requestData[0].keyword = arguments_.keyword; }
      
      // Handle location parameter - convert location_name to location_code if needed
      if (arguments_.location_code) { 
        requestData[0].location_code = arguments_.location_code; 
      } else if (arguments_.location_coordinate) { 
        requestData[0].location_coordinate = arguments_.location_coordinate; 
      } else if (arguments_.location_name) {
        // Convert location_name to location_code using Google locations API
        console.log(`🔧 Converting location_name "${arguments_.location_name}" to location_code...`);
        try {
          const locationsResponse = await makeDataForSEORequest('/v3/business_data/google/locations', null, 'GET');
          if (locationsResponse.status === 200 && locationsResponse.body.tasks && locationsResponse.body.tasks[0].result) {
            const locations = locationsResponse.body.tasks[0].result;
            // Try multiple matching strategies
            let matchingLocation = locations.find(loc => 
              loc.location_name && loc.location_name.toLowerCase().includes(arguments_.location_name.toLowerCase())
            );
            
            // If no match, try with city name only (remove country)
            if (!matchingLocation) {
              const cityName = arguments_.location_name.split(',')[0].trim();
              matchingLocation = locations.find(loc => 
                loc.location_name && loc.location_name.toLowerCase().includes(cityName.toLowerCase())
              );
            }
            
            // If still no match, try with partial matching
            if (!matchingLocation) {
              const searchTerms = arguments_.location_name.toLowerCase().split(/[,\s]+/);
              matchingLocation = locations.find(loc => 
                loc.location_name && searchTerms.some(term => 
                  term.length > 2 && loc.location_name.toLowerCase().includes(term)
                )
              );
            }
            
            if (matchingLocation) {
              requestData[0].location_code = matchingLocation.location_code;
              console.log(`✅ Converted location_name "${arguments_.location_name}" to location_code: ${matchingLocation.location_code} (${matchingLocation.location_name})`);
            } else {
              console.warn(`⚠️ No matching location found for: ${arguments_.location_name}`);
              // Use default location code for Germany
              requestData[0].location_code = 2276; // Munich as fallback
              console.log(`🔄 Using fallback location_code: 2276 (Munich, Germany)`);
            }
          }
        } catch (error) {
          console.error('Error converting location_name to location_code:', error);
          // Use fallback location code
          requestData[0].location_code = 2276;
          console.log(`🔄 Using fallback location_code: 2276 due to error`);
        }
      }
      
      if (arguments_.language_name) { requestData[0].language_name = arguments_.language_name; }
      else if (arguments_.language_code) { requestData[0].language_code = arguments_.language_code; }
      if (arguments_.depth) { requestData[0].depth = arguments_.depth; }
      if (arguments_.tag) { requestData[0].tag = arguments_.tag; }
      
      console.log('🔧 Business Data Google Reviews Request:', {
        endpoint: endpoint,
        requestData: requestData,
        type: type
      });
      
      const httpMethod = 'POST';
      const dataforseoResponse = await makeDataForSEORequest(endpoint, requestData, httpMethod);
      if (dataforseoResponse.status === 200) {
        return res.json({ jsonrpc: '2.0', result: dataforseoResponse.body, id: req.body?.id || null });
      }
      console.error(`DataForSEO API Error (Business Data ${method}):`, {
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
    } else if (method === 'business_data_google_hotels') {
      // Handle grouped Business Data Google Hotels endpoint
      console.log('🔧 Business Data Google Hotels Method Call:', method);
      
      const type = params?.type || 'hotel_searches_live';
      let endpoint;
      if (type === 'hotel_searches_live') {
        endpoint = '/v3/business_data/google/hotel_searches/live';
      } else if (type === 'hotel_searches_task_post') {
        endpoint = '/v3/business_data/google/hotel_searches/task_post';
      } else if (type === 'hotel_searches_tasks_ready') {
        endpoint = '/v3/business_data/google/hotel_searches/tasks_ready';
      } else if (type === 'hotel_searches_task_get') {
        endpoint = '/v3/business_data/google/hotel_searches/task_get/{id}';
      } else if (type === 'hotel_info_live_advanced') {
        endpoint = '/v3/business_data/google/hotel_info/live/advanced';
      } else if (type === 'hotel_info_live_html') {
        endpoint = '/v3/business_data/google/hotel_info/live/html';
      } else if (type === 'hotel_info_task_post') {
        endpoint = '/v3/business_data/google/hotel_info/task_post';
      } else if (type === 'hotel_info_tasks_ready') {
        endpoint = '/v3/business_data/google/hotel_info/tasks_ready';
      } else if (type === 'hotel_info_task_get') {
        endpoint = '/v3/business_data/google/hotel_info/task_get/{id}';
      } else if (type === 'hotel_info_task_get_html') {
        endpoint = '/v3/business_data/google/hotel_info/task_get/html/{id}';
      } else {
        endpoint = '/v3/business_data/google/hotel_searches/live'; // Default
      }
      
      const arguments_ = params || {};
      
      // Prepare request data for Business Data Google Hotels
      const requestData = [{}];
      if (arguments_.keyword) { requestData[0].keyword = arguments_.keyword; }
      
      // Handle location parameter - convert location_name to location_code if needed
      if (arguments_.location_code) { 
        requestData[0].location_code = arguments_.location_code; 
      } else if (arguments_.location_coordinate) { 
        requestData[0].location_coordinate = arguments_.location_coordinate; 
      } else if (arguments_.location_name) {
        // Convert location_name to location_code using Google locations API
        console.log(`🔧 Converting location_name "${arguments_.location_name}" to location_code...`);
        try {
          const locationsResponse = await makeDataForSEORequest('/v3/business_data/google/locations', null, 'GET');
          if (locationsResponse.status === 200 && locationsResponse.body.tasks && locationsResponse.body.tasks[0].result) {
            const locations = locationsResponse.body.tasks[0].result;
            // Try multiple matching strategies
            let matchingLocation = locations.find(loc => 
              loc.location_name && loc.location_name.toLowerCase().includes(arguments_.location_name.toLowerCase())
            );
            
            // If no match, try with city name only (remove country)
            if (!matchingLocation) {
              const cityName = arguments_.location_name.split(',')[0].trim();
              matchingLocation = locations.find(loc => 
                loc.location_name && loc.location_name.toLowerCase().includes(cityName.toLowerCase())
              );
            }
            
            // If still no match, try with partial matching
            if (!matchingLocation) {
              const searchTerms = arguments_.location_name.toLowerCase().split(/[,\s]+/);
              matchingLocation = locations.find(loc => 
                loc.location_name && searchTerms.some(term => 
                  term.length > 2 && loc.location_name.toLowerCase().includes(term)
                )
              );
            }
            
            if (matchingLocation) {
              requestData[0].location_code = matchingLocation.location_code;
              console.log(`✅ Converted location_name "${arguments_.location_name}" to location_code: ${matchingLocation.location_code} (${matchingLocation.location_name})`);
            } else {
              console.warn(`⚠️ No matching location found for: ${arguments_.location_name}`);
              // Use default location code for Germany
              requestData[0].location_code = 2276; // Munich as fallback
              console.log(`🔄 Using fallback location_code: 2276 (Munich, Germany)`);
            }
          }
        } catch (error) {
          console.error('Error converting location_name to location_code:', error);
          // Use fallback location code
          requestData[0].location_code = 2276;
          console.log(`🔄 Using fallback location_code: 2276 due to error`);
        }
      }
      
      if (arguments_.language_name) { requestData[0].language_name = arguments_.language_name; }
      else if (arguments_.language_code) { requestData[0].language_code = arguments_.language_code; }
      if (arguments_.adults) { requestData[0].adults = arguments_.adults; }
      if (arguments_.children) { requestData[0].children = arguments_.children; }
      if (arguments_.check_in) { requestData[0].check_in = arguments_.check_in; }
      if (arguments_.check_out) { requestData[0].check_out = arguments_.check_out; }
      if (arguments_.currency) { requestData[0].currency = arguments_.currency; }
      if (arguments_.hotel_identifier) { requestData[0].hotel_identifier = arguments_.hotel_identifier; }
      if (arguments_.depth) { requestData[0].depth = arguments_.depth; }
      if (arguments_.tag) { requestData[0].tag = arguments_.tag; }
      
      console.log('🔧 Business Data Google Hotels Request:', {
        endpoint: endpoint,
        requestData: requestData,
        type: type
      });
      
      const httpMethod = 'POST';
      const dataforseoResponse = await makeDataForSEORequest(endpoint, requestData, httpMethod);
      if (dataforseoResponse.status === 200) {
        return res.json({ jsonrpc: '2.0', result: dataforseoResponse.body, id: req.body?.id || null });
      }
      console.error(`DataForSEO API Error (Business Data ${method}):`, {
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
    } else if (method === 'businessDataGoogleReviews') {
      // Handle grouped Business Data Google Reviews endpoint
      console.log('🔧 Business Data Google Reviews Method Call:', method);
      
      const type = params?.type || 'reviews_live';
      let endpoint;
      if (type === 'reviews_live') {
        endpoint = '/v3/business_data/google/reviews/live';
      } else if (type === 'reviews_task_post') {
        endpoint = '/v3/business_data/google/reviews/task_post';
      } else if (type === 'reviews_tasks_ready') {
        endpoint = '/v3/business_data/google/reviews/tasks_ready';
      } else if (type === 'reviews_task_get') {
        endpoint = '/v3/business_data/google/reviews/task_get/{id}';
      } else if (type === 'extended_reviews_task_post') {
        endpoint = '/v3/business_data/google/extended_reviews/task_post';
      } else if (type === 'extended_reviews_tasks_ready') {
        endpoint = '/v3/business_data/google/extended_reviews/tasks_ready';
      } else if (type === 'extended_reviews_task_get') {
        endpoint = '/v3/business_data/google/extended_reviews/task_get/{id}';
      } else {
        endpoint = '/v3/business_data/google/reviews/live'; // Default
      }
    } else if (method === 'businessDataGoogleQA') {
      // Handle grouped Business Data Google Q&A endpoint
      console.log('🔧 Business Data Google Q&A Method Call:', method);
      
      const type = params?.type || 'questions_and_answers_live';
      let endpoint;
      if (type === 'questions_and_answers_live') {
        endpoint = '/v3/business_data/google/questions_and_answers/live';
      } else if (type === 'questions_and_answers_task_post') {
        endpoint = '/v3/business_data/google/questions_and_answers/task_post';
      } else if (type === 'questions_and_answers_tasks_ready') {
        endpoint = '/v3/business_data/google/questions_and_answers/tasks_ready';
      } else if (type === 'questions_and_answers_task_get') {
        endpoint = '/v3/business_data/google/questions_and_answers/task_get/{id}';
      } else {
        endpoint = '/v3/business_data/google/questions_and_answers/live'; // Default
      }
    } else if (method === 'businessDataTrustpilot') {
      // Handle grouped Business Data Trustpilot endpoint
      console.log('🔧 Business Data Trustpilot Method Call:', method);
      
      const type = params?.type || 'search_live';
      let endpoint;
      if (type === 'search_live') {
        endpoint = '/v3/business_data/trustpilot/search/live';
      } else if (type === 'search_task_post') {
        endpoint = '/v3/business_data/trustpilot/search/task_post';
      } else if (type === 'search_tasks_ready') {
        endpoint = '/v3/business_data/trustpilot/search/tasks_ready';
      } else if (type === 'search_task_get') {
        endpoint = '/v3/business_data/trustpilot/search/task_get/{id}';
      } else if (type === 'reviews_live') {
        endpoint = '/v3/business_data/trustpilot/reviews/live';
      } else if (type === 'reviews_task_post') {
        endpoint = '/v3/business_data/trustpilot/reviews/task_post';
      } else if (type === 'reviews_tasks_ready') {
        endpoint = '/v3/business_data/trustpilot/reviews/tasks_ready';
      } else if (type === 'reviews_task_get') {
        endpoint = '/v3/business_data/trustpilot/reviews/task_get/{id}';
      } else {
        endpoint = '/v3/business_data/trustpilot/search/live'; // Default
      }
    } else if (method === 'businessDataTripadvisor') {
      // Handle grouped Business Data Tripadvisor endpoint
      console.log('🔧 Business Data Tripadvisor Method Call:', method);
      
      const type = params?.type || 'search_live';
      let endpoint;
      if (type === 'locations') {
        endpoint = '/v3/business_data/tripadvisor/locations';
      } else if (type === 'locations_country') {
        endpoint = '/v3/business_data/tripadvisor/locations/{country}';
      } else if (type === 'languages') {
        endpoint = '/v3/business_data/tripadvisor/languages';
      } else if (type === 'search_live') {
        endpoint = '/v3/business_data/tripadvisor/search/live';
      } else if (type === 'search_task_post') {
        endpoint = '/v3/business_data/tripadvisor/search/task_post';
      } else if (type === 'search_tasks_ready') {
        endpoint = '/v3/business_data/tripadvisor/search/tasks_ready';
      } else if (type === 'search_task_get') {
        endpoint = '/v3/business_data/tripadvisor/search/task_get/{id}';
      } else if (type === 'reviews_live') {
        endpoint = '/v3/business_data/tripadvisor/reviews/live';
      } else if (type === 'reviews_task_post') {
        endpoint = '/v3/business_data/tripadvisor/reviews/task_post';
      } else if (type === 'reviews_tasks_ready') {
        endpoint = '/v3/business_data/tripadvisor/reviews/tasks_ready';
      } else if (type === 'reviews_task_get') {
        endpoint = '/v3/business_data/tripadvisor/reviews/task_get/{id}';
      } else {
        endpoint = '/v3/business_data/tripadvisor/search/live'; // Default
      }
    } else if (method === 'businessDataListings') {
      // Handle grouped Business Data Listings endpoint
      console.log('🔧 Business Data Listings Method Call:', method);
      
      const type = params?.type || 'search_live';
      let endpoint;
      if (type === 'search_live') {
        endpoint = '/v3/business_data/business_listings/search/live';
      } else if (type === 'available_filters') {
        endpoint = '/v3/business_data/business_listings/filters';
      } else if (type === 'locations') {
        endpoint = '/v3/business_data/business_listings/locations';
      } else if (type === 'categories') {
        endpoint = '/v3/business_data/business_listings/categories';
      } else if (type === 'categories_aggregation_live') {
        endpoint = '/v3/business_data/business_listings/categories_aggregation/live';
      } else {
        endpoint = '/v3/business_data/business_listings/search/live'; // Default
      }
    } else if (method === 'businessDataSocialMedia') {
      // Handle grouped Business Data Social Media endpoint
      console.log('🔧 Business Data Social Media Method Call:', method);
      
      const type = params?.type || 'pinterest_live';
      let endpoint;
      if (type === 'pinterest_live') {
        endpoint = '/v3/business_data/social_media/pinterest/live';
      } else if (type === 'facebook_live') {
        endpoint = '/v3/business_data/social_media/facebook/live';
      } else if (type === 'reddit_live') {
        endpoint = '/v3/business_data/social_media/reddit/live';
      } else {
        endpoint = '/v3/business_data/social_media/pinterest/live'; // Default
      }
    } else if (method === 'businessDataGeneral') {
      // Handle grouped Business Data General endpoint
      console.log('🔧 Business Data General Method Call:', method);
      
      const type = params?.type || 'id_list';
      let endpoint;
      if (type === 'id_list') {
        endpoint = '/v3/business_data/id_list';
      } else if (type === 'errors') {
        endpoint = '/v3/business_data/errors';
      } else if (type === 'tasks_ready') {
        endpoint = '/v3/business_data/tasks_ready';
      } else {
        endpoint = '/v3/business_data/id_list'; // Default
      }
      
      const arguments_ = params || {};
      
      // Prepare request data based on the method type
      let requestData = [{}];
      
      if (method === 'businessDataGoogleMyBusiness') {
        // Add required keyword parameter
        if (arguments_.keyword) {
          requestData[0].keyword = arguments_.keyword;
        }
        
        // Add location parameter (one of: location_name, location_code, or location_coordinate)
        if (arguments_.location_name) {
          requestData[0].location_name = arguments_.location_name;
        } else if (arguments_.location_code) {
          requestData[0].location_code = arguments_.location_code;
        } else if (arguments_.location_coordinate) {
          requestData[0].location_coordinate = arguments_.location_coordinate;
        }
        
        // Add language parameter (one of: language_name or language_code)
        if (arguments_.language_name) {
          requestData[0].language_name = arguments_.language_name;
        } else if (arguments_.language_code) {
          requestData[0].language_code = arguments_.language_code;
        }
        
        // Add optional tag parameter
        if (arguments_.tag) {
          requestData[0].tag = arguments_.tag;
        }
      } else if (method === 'businessDataGoogleHotels') {
        // Hotel-specific parameters
        if (arguments_.keyword) {
          requestData[0].keyword = arguments_.keyword;
        }
        if (arguments_.location_name) {
          requestData[0].location_name = arguments_.location_name;
        } else if (arguments_.location_code) {
          requestData[0].location_code = arguments_.location_code;
        }
        if (arguments_.language_name) {
          requestData[0].language_name = arguments_.language_name;
        } else if (arguments_.language_code) {
          requestData[0].language_code = arguments_.language_code;
        }
        if (arguments_.check_in) {
          requestData[0].check_in = arguments_.check_in;
        }
        if (arguments_.check_out) {
          requestData[0].check_out = arguments_.check_out;
        }
        if (arguments_.adults) {
          requestData[0].adults = arguments_.adults;
        }
        if (arguments_.children) {
          requestData[0].children = arguments_.children;
        }
        if (arguments_.currency) {
          requestData[0].currency = arguments_.currency;
        }
        if (arguments_.tag) {
          requestData[0].tag = arguments_.tag;
        }
      } else if (method === 'businessDataGoogleReviews') {
        // Reviews-specific parameters
        if (arguments_.keyword) {
          requestData[0].keyword = arguments_.keyword;
        }
        if (arguments_.location_name) {
          requestData[0].location_name = arguments_.location_name;
        } else if (arguments_.location_code) {
          requestData[0].location_code = arguments_.location_code;
        }
        if (arguments_.language_name) {
          requestData[0].language_name = arguments_.language_name;
        } else if (arguments_.language_code) {
          requestData[0].language_code = arguments_.language_code;
        }
        if (arguments_.depth) {
          requestData[0].depth = arguments_.depth;
        }
        if (arguments_.tag) {
          requestData[0].tag = arguments_.tag;
        }
      } else if (method === 'businessDataGoogleQA') {
        // Q&A-specific parameters
        if (arguments_.keyword) {
          requestData[0].keyword = arguments_.keyword;
        }
        if (arguments_.location_name) {
          requestData[0].location_name = arguments_.location_name;
        } else if (arguments_.location_code) {
          requestData[0].location_code = arguments_.location_code;
        }
        if (arguments_.language_name) {
          requestData[0].language_name = arguments_.language_name;
        } else if (arguments_.language_code) {
          requestData[0].language_code = arguments_.language_code;
        }
        if (arguments_.depth) {
          requestData[0].depth = arguments_.depth;
        }
        if (arguments_.tag) {
          requestData[0].tag = arguments_.tag;
        }
      } else if (method === 'businessDataTrustpilot') {
        // Trustpilot-specific parameters
        if (arguments_.keyword) {
          requestData[0].keyword = arguments_.keyword;
        }
        if (arguments_.location_name) {
          requestData[0].location_name = arguments_.location_name;
        } else if (arguments_.location_code) {
          requestData[0].location_code = arguments_.location_code;
        }
        if (arguments_.language_name) {
          requestData[0].language_name = arguments_.language_name;
        } else if (arguments_.language_code) {
          requestData[0].language_code = arguments_.language_code;
        }
        if (arguments_.depth) {
          requestData[0].depth = arguments_.depth;
        }
        if (arguments_.tag) {
          requestData[0].tag = arguments_.tag;
        }
      } else if (method === 'businessDataTripadvisor') {
        // Tripadvisor-specific parameters
        if (arguments_.keyword) {
          requestData[0].keyword = arguments_.keyword;
        }
        if (arguments_.location_name) {
          requestData[0].location_name = arguments_.location_name;
        } else if (arguments_.location_code) {
          requestData[0].location_code = arguments_.location_code;
        }
        if (arguments_.language_name) {
          requestData[0].language_name = arguments_.language_name;
        } else if (arguments_.language_code) {
          requestData[0].language_code = arguments_.language_code;
        }
        if (arguments_.depth) {
          requestData[0].depth = arguments_.depth;
        }
        if (arguments_.tag) {
          requestData[0].tag = arguments_.tag;
        }
      } else if (method === 'businessDataListings') {
        // Listings-specific parameters
        if (arguments_.keyword) {
          requestData[0].keyword = arguments_.keyword;
        }
        if (arguments_.location_name) {
          requestData[0].location_name = arguments_.location_name;
        } else if (arguments_.location_code) {
          requestData[0].location_code = arguments_.location_code;
        }
        if (arguments_.language_name) {
          requestData[0].language_name = arguments_.language_name;
        } else if (arguments_.language_code) {
          requestData[0].language_code = arguments_.language_code;
        }
        if (arguments_.depth) {
          requestData[0].depth = arguments_.depth;
        }
        if (arguments_.tag) {
          requestData[0].tag = arguments_.tag;
        }
      } else if (method === 'businessDataSocialMedia') {
        // Social Media-specific parameters
        if (arguments_.keyword) {
          requestData[0].keyword = arguments_.keyword;
        }
        if (arguments_.location_name) {
          requestData[0].location_name = arguments_.location_name;
        } else if (arguments_.location_code) {
          requestData[0].location_code = arguments_.location_code;
        }
        if (arguments_.language_name) {
          requestData[0].language_name = arguments_.language_name;
        } else if (arguments_.language_code) {
          requestData[0].language_code = arguments_.language_code;
        }
        if (arguments_.depth) {
          requestData[0].depth = arguments_.depth;
        }
        if (arguments_.tag) {
          requestData[0].tag = arguments_.tag;
        }
      } else if (method === 'businessDataGeneral') {
        // General-specific parameters
        if (arguments_.tag) {
          requestData[0].tag = arguments_.tag;
        }
      }
      
      console.log(`🔧 Business Data ${method} Request:`, {
        endpoint: endpoint,
        requestData: requestData,
        type: type
      });
      
      // Determine HTTP method
      const httpMethod = 'POST';

      const dataforseoResponse = await makeDataForSEORequest(endpoint, requestData, httpMethod);
      if (dataforseoResponse.status === 200) {
        return res.json({ jsonrpc: '2.0', result: dataforseoResponse.body, id: req.body?.id || null });
      }
      console.error(`DataForSEO API Error (Business Data ${method}):`, {
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
    } else if (ALL_ENDPOINTS[method] && !method.startsWith('business_data_google_') && !method.startsWith('business_data_trustpilot') && !method.startsWith('business_data_tripadvisor') && !method.startsWith('business_data_general') && !method.startsWith('business_data_listings') && !method.startsWith('business_data_social_media')) {
      // Handle direct API method calls (backwards compatibility)
      // Exclude grouped Business Data endpoints - they have special handlers
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
      'all_70_keywords_data_apis',
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

// AI Mode SERP endpoints - special handling to exclude language_name
app.post('/v3/serp/google/ai_mode/live/advanced', async (req, res) => {
  try {
    console.log('🚀 AI Mode Route called!');
    console.log('🚀 Original request body:', JSON.stringify(req.body, null, 2));
    
    const endpoint = '/v3/serp/google/ai_mode/live/advanced';
    
        // For AI Mode: Only minimal parameters - keyword, location_name, device
        let requestData = Array.isArray(req.body) ? req.body : [req.body];
        requestData = requestData.map(item => {
          const { language_name, language_code, depth, ...filteredItem } = item;
          return {
            keyword: filteredItem.keyword,
            location_name: normalizeLocationName(filteredItem.location_name || filteredItem.location),
            device: filteredItem.device || 'desktop'
            // NO language_code, NO depth - AI Mode is very restrictive
          };
        });
    
    console.log('🤖 AI Mode Live Advanced Request:', JSON.stringify(requestData, null, 2));
    
    const dataforseoResponse = await makeDataForSEORequestForAiMode(endpoint, requestData, 'POST');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in AI Mode live advanced route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

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

// OnPage API endpoints - direct HTTP access for Custom GPT
app.post('/v3/on_page/task_post', async (req, res) => {
  try {
    console.log('🚀 OnPage Task Post Route called!');
    console.log('🚀 Request body:', JSON.stringify(req.body, null, 2));
    
    const endpoint = '/v3/on_page/task_post';
    const requestData = Array.isArray(req.body) ? req.body : [req.body];
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, requestData, 'POST');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in OnPage task post route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.get('/v3/on_page/summary/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const endpoint = `/v3/on_page/summary/${id}`;
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, null, 'GET');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in OnPage summary route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.post('/v3/on_page/pages', async (req, res) => {
  try {
    const endpoint = '/v3/on_page/pages';
    const requestData = Array.isArray(req.body) ? req.body : [req.body];
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, requestData, 'POST');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in OnPage pages route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.post('/v3/on_page/instant_pages', async (req, res) => {
  try {
    const endpoint = '/v3/on_page/instant_pages';
    const requestData = Array.isArray(req.body) ? req.body : [req.body];
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, requestData, 'POST');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in OnPage instant pages route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.post('/v3/on_page/resources', async (req, res) => {
  try {
    const endpoint = '/v3/on_page/resources';
    const requestData = Array.isArray(req.body) ? req.body : [req.body];
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, requestData, 'POST');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in OnPage resources route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.post('/v3/on_page/links', async (req, res) => {
  try {
    const endpoint = '/v3/on_page/links';
    const requestData = Array.isArray(req.body) ? req.body : [req.body];
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, requestData, 'POST');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in OnPage links route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.post('/v3/on_page/duplicate_tags', async (req, res) => {
  try {
    const endpoint = '/v3/on_page/duplicate_tags';
    const requestData = Array.isArray(req.body) ? req.body : [req.body];
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, requestData, 'POST');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in OnPage duplicate tags route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.post('/v3/on_page/duplicate_content', async (req, res) => {
  try {
    const endpoint = '/v3/on_page/duplicate_content';
    const requestData = Array.isArray(req.body) ? req.body : [req.body];
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, requestData, 'POST');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in OnPage duplicate content route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.post('/v3/on_page/waterfall', async (req, res) => {
  try {
    const endpoint = '/v3/on_page/waterfall';
    const requestData = Array.isArray(req.body) ? req.body : [req.body];
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, requestData, 'POST');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in OnPage waterfall route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.post('/v3/on_page/keyword_density', async (req, res) => {
  try {
    const endpoint = '/v3/on_page/keyword_density';
    const requestData = Array.isArray(req.body) ? req.body : [req.body];
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, requestData, 'POST');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in OnPage keyword density route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.post('/v3/on_page/raw_html', async (req, res) => {
  try {
    const endpoint = '/v3/on_page/raw_html';
    const requestData = Array.isArray(req.body) ? req.body : [req.body];
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, requestData, 'POST');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in OnPage raw html route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.post('/v3/on_page/page_screenshot', async (req, res) => {
  try {
    const endpoint = '/v3/on_page/page_screenshot';
    const requestData = Array.isArray(req.body) ? req.body : [req.body];
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, requestData, 'POST');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in OnPage page screenshot route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.get('/v3/on_page/tasks_ready', async (req, res) => {
  try {
    const endpoint = '/v3/on_page/tasks_ready';
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, null, 'GET');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in OnPage tasks ready route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

// OnPage Lighthouse API endpoints - direct HTTP access for Custom GPT
app.get('/v3/on_page/lighthouse/languages', async (req, res) => {
  try {
    const endpoint = '/v3/on_page/lighthouse/languages';
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, null, 'GET');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in Lighthouse languages route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.get('/v3/on_page/lighthouse/audits', async (req, res) => {
  try {
    const endpoint = '/v3/on_page/lighthouse/audits';
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, null, 'GET');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in Lighthouse audits route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.get('/v3/on_page/lighthouse/versions', async (req, res) => {
  try {
    const endpoint = '/v3/on_page/lighthouse/versions';
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, null, 'GET');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in Lighthouse versions route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.post('/v3/on_page/lighthouse/task_post', async (req, res) => {
  try {
    console.log('🚀 Lighthouse Task Post Route called!');
    console.log('🚀 Request body:', JSON.stringify(req.body, null, 2));
    
    const endpoint = '/v3/on_page/lighthouse/task_post';
    const requestData = Array.isArray(req.body) ? req.body : [req.body];
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, requestData, 'POST');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in Lighthouse task post route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.get('/v3/on_page/lighthouse/tasks_ready', async (req, res) => {
  try {
    const endpoint = '/v3/on_page/lighthouse/tasks_ready';
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, null, 'GET');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in Lighthouse tasks ready route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.get('/v3/on_page/lighthouse/task_get/json/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const endpoint = `/v3/on_page/lighthouse/task_get/json/${id}`;
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, null, 'GET');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in Lighthouse task get route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.post('/v3/on_page/lighthouse/live/json', async (req, res) => {
  try {
    console.log('🚀 Lighthouse Live JSON Route called!');
    console.log('🚀 Request body:', JSON.stringify(req.body, null, 2));
    
    const endpoint = '/v3/on_page/lighthouse/live/json';
    const requestData = Array.isArray(req.body) ? req.body : [req.body];
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, requestData, 'POST');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in Lighthouse live json route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

// Additional OnPage API endpoints - direct HTTP access for Custom GPT
app.post('/v3/on_page/id_list', async (req, res) => {
  try {
    const endpoint = '/v3/on_page/id_list';
    const requestData = Array.isArray(req.body) ? req.body : [req.body];
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, requestData, 'POST');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in OnPage id list route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.post('/v3/on_page/errors', async (req, res) => {
  try {
    const endpoint = '/v3/on_page/errors';
    const requestData = Array.isArray(req.body) ? req.body : [req.body];
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, requestData, 'POST');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in OnPage errors route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.post('/v3/on_page/force_stop', async (req, res) => {
  try {
    const endpoint = '/v3/on_page/force_stop';
    const requestData = Array.isArray(req.body) ? req.body : [req.body];
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, requestData, 'POST');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in OnPage force stop route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.get('/v3/on_page/available_filters', async (req, res) => {
  try {
    const endpoint = '/v3/on_page/available_filters';
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, null, 'GET');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in OnPage available filters route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.post('/v3/on_page/pages_by_resource', async (req, res) => {
  try {
    const endpoint = '/v3/on_page/pages_by_resource';
    const requestData = Array.isArray(req.body) ? req.body : [req.body];
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, requestData, 'POST');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in OnPage pages by resource route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.post('/v3/on_page/redirect_chains', async (req, res) => {
  try {
    const endpoint = '/v3/on_page/redirect_chains';
    const requestData = Array.isArray(req.body) ? req.body : [req.body];
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, requestData, 'POST');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in OnPage redirect chains route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.post('/v3/on_page/non_indexable', async (req, res) => {
  try {
    const endpoint = '/v3/on_page/non_indexable';
    const requestData = Array.isArray(req.body) ? req.body : [req.body];
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, requestData, 'POST');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in OnPage non indexable route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.post('/v3/on_page/microdata', async (req, res) => {
  try {
    const endpoint = '/v3/on_page/microdata';
    const requestData = Array.isArray(req.body) ? req.body : [req.body];
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, requestData, 'POST');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in OnPage microdata route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.post('/v3/on_page/content_parsing', async (req, res) => {
  try {
    const endpoint = '/v3/on_page/content_parsing';
    const requestData = Array.isArray(req.body) ? req.body : [req.body];
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, requestData, 'POST');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in OnPage content parsing route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.post('/v3/on_page/content_parsing/live', async (req, res) => {
  try {
    const endpoint = '/v3/on_page/content_parsing/live';
    const requestData = Array.isArray(req.body) ? req.body : [req.body];
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, requestData, 'POST');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in OnPage content parsing live route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

// Gruppierte OnPage API Endpunkte - Moderne Lösung für 30 Operationen Limit
app.post('/v3/onpage_core', async (req, res) => {
  try {
    console.log('🚀 OnPage Core Route called!');
    console.log('🚀 Request body:', JSON.stringify(req.body, null, 2));
    
    const { type, ...params } = req.body;
    
    let endpoint;
    let requestData;
    
    switch(type) {
      case 'task_post':
        endpoint = '/v3/on_page/task_post';
        requestData = [{
          target: params.target,
          language_code: params.language_code || 'en',
          location_name: params.location_name || 'United States',
          device: params.device || 'desktop',
          max_crawl_pages: params.max_crawl_pages || 1
        }];
        break;
        
      case 'summary':
        endpoint = `/v3/on_page/summary/${params.id}`;
        requestData = null;
        break;
        
      case 'tasks_ready':
        endpoint = '/v3/on_page/tasks_ready';
        requestData = null;
        break;
        
      default:
        return res.status(400).json({ error: `Unsupported type: ${type}` });
    }
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, requestData, type === 'summary' || type === 'tasks_ready' ? 'GET' : 'POST');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in OnPage core route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.post('/v3/onpage_analysis', async (req, res) => {
  try {
    console.log('🚀 OnPage Analysis Route called!');
    console.log('🚀 Request body:', JSON.stringify(req.body, null, 2));
    
    const { type, id, url, limit = 100, filters = [] } = req.body;
    
    let endpoint;
    let requestData;
    
    switch(type) {
      case 'pages':
        endpoint = '/v3/on_page/pages';
        requestData = [{ id, limit }];
        break;
        
      case 'resources':
        endpoint = '/v3/on_page/resources';
        requestData = [{ id, limit }];
        break;
        
      case 'links':
        endpoint = '/v3/on_page/links';
        requestData = [{ id, limit }];
        break;
        
      case 'duplicate_tags':
        endpoint = '/v3/on_page/duplicate_tags';
        requestData = [{ id, limit }];
        break;
        
      case 'duplicate_content':
        endpoint = '/v3/on_page/duplicate_content';
        requestData = [{ id, limit }];
        break;
        
      case 'waterfall':
        endpoint = '/v3/on_page/waterfall';
        requestData = [{ id, url, limit }];
        break;
        
      case 'keyword_density':
        endpoint = '/v3/on_page/keyword_density';
        requestData = [{ id, url, limit }];
        break;
        
      default:
        return res.status(400).json({ error: `Unsupported type: ${type}` });
    }
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, requestData, 'POST');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in OnPage analysis route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.post('/v3/onpage_content', async (req, res) => {
  try {
    console.log('🚀 OnPage Content Route called!');
    console.log('🚀 Request body:', JSON.stringify(req.body, null, 2));
    
    const { type, id, url, limit = 100, screenshot_width = 1920, screenshot_height = 1080 } = req.body;
    
    let endpoint;
    let requestData;
    
    switch(type) {
      case 'raw_html':
        endpoint = '/v3/on_page/raw_html';
        requestData = [{ id, url, limit }];
        break;
        
      case 'page_screenshot':
        endpoint = '/v3/on_page/page_screenshot';
        requestData = [{ id, url, limit, screenshot_width, screenshot_height }];
        break;
        
      case 'content_parsing':
        endpoint = '/v3/on_page/content_parsing';
        requestData = [{ id, url, limit }];
        break;
        
      case 'content_parsing_live':
        endpoint = '/v3/on_page/content_parsing/live';
        requestData = [{ url, limit }];
        break;
        
      case 'instant_pages':
        endpoint = '/v3/on_page/instant_pages';
        requestData = [{ url, limit }];
        break;
        
      default:
        return res.status(400).json({ error: `Unsupported type: ${type}` });
    }
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, requestData, 'POST');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in OnPage content route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.post('/v3/onpage_lighthouse', async (req, res) => {
  try {
    console.log('🚀 OnPage Lighthouse Route called!');
    console.log('🚀 Request body:', JSON.stringify(req.body, null, 2));
    
    const { type, url, id, language_code = 'en', category = [], version } = req.body;
    
    let endpoint;
    let requestData;
    
    switch(type) {
      case 'languages':
        endpoint = '/v3/on_page/lighthouse/languages';
        requestData = null;
        break;
        
      case 'audits':
        endpoint = '/v3/on_page/lighthouse/audits';
        requestData = null;
        break;
        
      case 'versions':
        endpoint = '/v3/on_page/lighthouse/versions';
        requestData = null;
        break;
        
      case 'task_post':
        endpoint = '/v3/on_page/lighthouse/task_post';
        requestData = [{
          url: url,
          language_code: language_code,
          category: category,
          version: version
        }];
        break;
        
      case 'tasks_ready':
        endpoint = '/v3/on_page/lighthouse/tasks_ready';
        requestData = null;
        break;
        
      case 'task_get':
        endpoint = `/v3/on_page/lighthouse/task_get/json/${id}`;
        requestData = null;
        break;
        
      case 'live':
        endpoint = '/v3/on_page/lighthouse/live/json';
        requestData = [{
          url: url,
          language_code: language_code,
          category: category,
          version: version
        }];
        break;
        
      default:
        return res.status(400).json({ error: `Unsupported type: ${type}` });
    }
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, requestData, type === 'languages' || type === 'audits' || type === 'versions' || type === 'tasks_ready' || type === 'task_get' ? 'GET' : 'POST');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in OnPage lighthouse route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.post('/v3/onpage_management', async (req, res) => {
  try {
    console.log('🚀 OnPage Management Route called!');
    console.log('🚀 Request body:', JSON.stringify(req.body, null, 2));
    
    const { type, id, date_from, date_to, resource_url, limit = 100 } = req.body;
    
    let endpoint;
    let requestData;
    
    switch(type) {
      case 'id_list':
        endpoint = '/v3/on_page/id_list';
        requestData = [{ date_from, date_to, limit }];
        break;
        
      case 'errors':
        endpoint = '/v3/on_page/errors';
        requestData = [{ date_from, date_to, limit }];
        break;
        
      case 'force_stop':
        endpoint = '/v3/on_page/force_stop';
        requestData = [{ id }];
        break;
        
      case 'available_filters':
        endpoint = '/v3/on_page/available_filters';
        requestData = null;
        break;
        
      case 'pages_by_resource':
        endpoint = '/v3/on_page/pages_by_resource';
        requestData = [{ id, resource_url, limit }];
        break;
        
      case 'redirect_chains':
        endpoint = '/v3/on_page/redirect_chains';
        requestData = [{ id, limit }];
        break;
        
      case 'non_indexable':
        endpoint = '/v3/on_page/non_indexable';
        requestData = [{ id, limit }];
        break;
        
      case 'microdata':
        endpoint = '/v3/on_page/microdata';
        requestData = [{ id, limit }];
        break;
        
      default:
        return res.status(400).json({ error: `Unsupported type: ${type}` });
    }
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, requestData, type === 'available_filters' ? 'GET' : 'POST');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in OnPage management route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

// Gruppierte Keywords Data API Endpunkte - Moderne Lösung für 67 Operationen Limit
app.post('/v3/keywords_core', async (req, res) => {
  try {
    console.log('🚀 Keywords Core Route called!');
    console.log('🚀 Request body:', JSON.stringify(req.body, null, 2));
    
    const { type, date_from, date_to } = req.body;
    
    let endpoint;
    let requestData;
    
    switch(type) {
      case 'id_list':
        endpoint = '/v3/keywords_data/id_list';
        requestData = [{ date_from, date_to }];
        break;
        
      case 'errors':
        endpoint = '/v3/keywords_data/errors';
        requestData = [{ date_from, date_to }];
        break;
        
      default:
        return res.status(400).json({ error: `Unsupported type: ${type}` });
    }
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, requestData, 'POST');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in Keywords core route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.post('/v3/keywords_google_ads', async (req, res) => {
  try {
    console.log('🚀 Keywords Google Ads Route called!');
    console.log('🚀 Request body:', JSON.stringify(req.body, null, 2));
    
    const { type, keywords, target, location_name, language_code, device, id, date_from, date_to } = req.body;
    
    let endpoint;
    let requestData;
    
    switch(type) {
      case 'search_volume_live':
        endpoint = '/v3/keywords_data/google/search_volume/live';
        // Ultra-aggressive Limitierung: Nur 1 Keyword
        const limitedSearchKeywords = Array.isArray(keywords) ? keywords.slice(0, 1) : [keywords];
        requestData = [{
          keywords: limitedSearchKeywords,
          location_name: location_name || 'United States',
          language_code: language_code || 'en'
          // Entferne device für minimale Response
        }];
        break;
        
      case 'search_volume_task_post':
        endpoint = '/v3/keywords_data/google/search_volume/task_post';
        requestData = [{
          keywords,
          location_name: location_name || 'United States',
          language_code: language_code || 'en',
          device: device || 'desktop'
        }];
        break;
        
      case 'search_volume_tasks_ready':
        endpoint = '/v3/keywords_data/google/search_volume/tasks_ready';
        requestData = null;
        break;
        
      case 'search_volume_task_get':
        endpoint = `/v3/keywords_data/google/search_volume/task_get/${id}`;
        requestData = null;
        break;
        
      case 'keywords_for_site_live':
        endpoint = '/v3/keywords_data/google/keywords_for_site/live';
        requestData = [{
          target,
          location_name: location_name || 'United States',
          language_code: language_code || 'en',
          device: device || 'desktop'
        }];
        break;
        
      case 'keywords_for_site_task_post':
        endpoint = '/v3/keywords_data/google/keywords_for_site/task_post';
        requestData = [{
          target,
          location_name: location_name || 'United States',
          language_code: language_code || 'en',
          device: device || 'desktop'
        }];
        break;
        
      case 'keywords_for_site_tasks_ready':
        endpoint = '/v3/keywords_data/google/keywords_for_site/tasks_ready';
        requestData = null;
        break;
        
      case 'keywords_for_site_task_get':
        endpoint = `/v3/keywords_data/google/keywords_for_site/task_get/${id}`;
        requestData = null;
        break;
        
      case 'keywords_for_keywords_live':
        endpoint = '/v3/keywords_data/google/keywords_for_keywords/live';
        // Ultra-aggressive Limitierung: Nur 1 Keyword, minimale Parameter
        const limitedKeywords = Array.isArray(keywords) ? keywords.slice(0, 1) : [keywords];
        requestData = [{
          keywords: limitedKeywords,
          location_name: location_name || 'United States',
          language_code: language_code || 'en'
          // Entferne device und include_serp_info für minimale Response
        }];
        break;
        
      case 'keywords_for_keywords_task_post':
        endpoint = '/v3/keywords_data/google/keywords_for_keywords/task_post';
        requestData = [{
          keywords,
          location_name: location_name || 'United States',
          language_code: language_code || 'en',
          device: device || 'desktop'
        }];
        break;
        
      case 'keywords_for_keywords_tasks_ready':
        endpoint = '/v3/keywords_data/google/keywords_for_keywords/tasks_ready';
        requestData = null;
        break;
        
      case 'keywords_for_keywords_task_get':
        endpoint = `/v3/keywords_data/google/keywords_for_keywords/task_get/${id}`;
        requestData = null;
        break;
        
      case 'ad_traffic_by_keywords_live':
        endpoint = '/v3/keywords_data/google_ads/ad_traffic_by_keywords/live';
        requestData = [{
          keywords,
          location_name: location_name || 'United States',
          language_code: language_code || 'en',
          device: device || 'desktop'
        }];
        break;
        
      case 'ad_traffic_by_keywords_task_post':
        endpoint = '/v3/keywords_data/google_ads/ad_traffic_by_keywords/task_post';
        requestData = [{
          keywords,
          location_name: location_name || 'United States',
          language_code: language_code || 'en',
          device: device || 'desktop'
        }];
        break;
        
      case 'ad_traffic_by_keywords_tasks_ready':
        endpoint = '/v3/keywords_data/google_ads/ad_traffic_by_keywords/tasks_ready';
        requestData = null;
        break;
        
      case 'ad_traffic_by_keywords_task_get':
        endpoint = `/v3/keywords_data/google_ads/ad_traffic_by_keywords/task_get/${id}`;
        requestData = null;
        break;
        
      default:
        return res.status(400).json({ error: `Unsupported type: ${type}` });
    }
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, requestData, type.includes('task_get') || type.includes('tasks_ready') ? 'GET' : 'POST');
    
    if (dataforseoResponse.status === 200) {
      // Response Size Limiting für Keywords Data APIs
      let responseBody = dataforseoResponse.body;
      
      // Ultra-aggressive Response-Größen-Limitierung
      const jsonString = JSON.stringify(responseBody);
      if (jsonString.length > 50000) { // 50KB Limit (ultra-aggressiv)
        console.log(`Response zu groß (${jsonString.length} bytes), limitiere aggressiv...`);
        
        // Limitiere Arrays in der Response
        if (responseBody.tasks && Array.isArray(responseBody.tasks)) {
          responseBody.tasks = responseBody.tasks.slice(0, 1); // Nur erste Task
          
          if (responseBody.tasks[0] && responseBody.tasks[0].result && Array.isArray(responseBody.tasks[0].result)) {
            responseBody.tasks[0].result = responseBody.tasks[0].result.slice(0, 3); // Nur erste 3 Ergebnisse
            responseBody._truncated = true;
            responseBody._message = "Response wurde aufgrund der Größe auf 3 Ergebnisse beschränkt.";
          }
        }
        
        // Zusätzliche Limitierung für keyword_data Arrays
        if (responseBody.tasks && responseBody.tasks[0] && responseBody.tasks[0].result) {
          responseBody.tasks[0].result.forEach(item => {
            if (item.keyword_data && Array.isArray(item.keyword_data)) {
              item.keyword_data = item.keyword_data.slice(0, 3);
            }
          });
        }
      }
      
      res.json(responseBody);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in Keywords Google Ads route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.post('/v3/keywords_google_trends', async (req, res) => {
  try {
    console.log('🚀 Keywords Google Trends Route called!');
    console.log('🚀 Request body:', JSON.stringify(req.body, null, 2));
    
    const { type, keywords, location_name, language_code, id, date_from, date_to } = req.body;
    
    let endpoint;
    let requestData;
    
    switch(type) {
      case 'explore_live':
        endpoint = '/v3/keywords_data/google_trends/explore/live';
        requestData = [{
          keywords,
          location_name: location_name || 'United States',
          language_code: language_code || 'en'
        }];
        break;
        
      case 'explore_task_post':
        endpoint = '/v3/keywords_data/google_trends/explore/task_post';
        requestData = [{
          keywords,
          location_name: location_name || 'United States',
          language_code: language_code || 'en'
        }];
        break;
        
      case 'explore_tasks_ready':
        endpoint = '/v3/keywords_data/google_trends/explore/tasks_ready';
        requestData = null;
        break;
        
      case 'explore_task_get':
        endpoint = `/v3/keywords_data/google_trends/explore/task_get/${id}`;
        requestData = null;
        break;
        
      case 'demography_live':
        endpoint = '/v3/keywords_data/google_trends/demography/live';
        requestData = [{
          keywords,
          location_name: location_name || 'United States',
          language_code: language_code || 'en'
        }];
        break;
        
      case 'demography_task_post':
        endpoint = '/v3/keywords_data/google_trends/demography/task_post';
        requestData = [{
          keywords,
          location_name: location_name || 'United States',
          language_code: language_code || 'en'
        }];
        break;
        
      case 'demography_tasks_ready':
        endpoint = '/v3/keywords_data/google_trends/demography/tasks_ready';
        requestData = null;
        break;
        
      case 'demography_task_get':
        endpoint = `/v3/keywords_data/google_trends/demography/task_get/${id}`;
        requestData = null;
        break;
        
      case 'merged_data_live':
        endpoint = '/v3/keywords_data/google_trends/merged_data/live';
        requestData = [{
          keywords,
          location_name: location_name || 'United States',
          language_code: language_code || 'en'
        }];
        break;
        
      default:
        return res.status(400).json({ error: `Unsupported type: ${type}` });
    }
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, requestData, type.includes('task_get') || type.includes('tasks_ready') ? 'GET' : 'POST');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in Keywords Google Trends route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.post('/v3/keywords_dataforseo_trends', async (req, res) => {
  try {
    console.log('🚀 Keywords DataForSEO Trends Route called!');
    console.log('🚀 Request body:', JSON.stringify(req.body, null, 2));
    
    const { type, keywords, location_name, language_code, date_from, date_to } = req.body;
    
    let endpoint;
    let requestData;
    
    switch(type) {
      case 'demography_live':
        endpoint = '/v3/keywords_data/dataforseo_trends/demography/live';
        requestData = [{
          keywords,
          location_name: location_name || 'United States',
          language_code: language_code || 'en'
        }];
        break;
        
      case 'merged_data_live':
        endpoint = '/v3/keywords_data/dataforseo_trends/merged_data/live';
        requestData = [{
          keywords,
          location_name: location_name || 'United States',
          language_code: language_code || 'en'
        }];
        break;
        
      default:
        return res.status(400).json({ error: `Unsupported type: ${type}` });
    }
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, requestData, 'POST');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in Keywords DataForSEO Trends route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.post('/v3/keywords_bing', async (req, res) => {
  try {
    console.log('🚀 Keywords Bing Route called!');
    console.log('🚀 Request body:', JSON.stringify(req.body, null, 2));
    
    const { type, keywords, target, location_name, language_code, device, id, date_from, date_to } = req.body;
    
    let endpoint;
    let requestData;
    
    switch(type) {
      case 'search_volume_live':
        endpoint = '/v3/keywords_data/bing/search_volume/live';
        requestData = [{
          keywords,
          location_name: location_name || 'United States',
          language_code: language_code || 'en',
          device: device || 'desktop'
        }];
        break;
        
      case 'search_volume_task_post':
        endpoint = '/v3/keywords_data/bing/search_volume/task_post';
        requestData = [{
          keywords,
          location_name: location_name || 'United States',
          language_code: language_code || 'en',
          device: device || 'desktop'
        }];
        break;
        
      case 'search_volume_tasks_ready':
        endpoint = '/v3/keywords_data/bing/search_volume/tasks_ready';
        requestData = null;
        break;
        
      case 'search_volume_task_get':
        endpoint = `/v3/keywords_data/bing/search_volume/task_get/${id}`;
        requestData = null;
        break;
        
      case 'keywords_for_site_live':
        endpoint = '/v3/keywords_data/bing/keywords_for_site/live';
        requestData = [{
          target,
          location_name: location_name || 'United States',
          language_code: language_code || 'en',
          device: device || 'desktop'
        }];
        break;
        
      case 'keywords_for_site_task_post':
        endpoint = '/v3/keywords_data/bing/keywords_for_site/task_post';
        requestData = [{
          target,
          location_name: location_name || 'United States',
          language_code: language_code || 'en',
          device: device || 'desktop'
        }];
        break;
        
      case 'keywords_for_site_tasks_ready':
        endpoint = '/v3/keywords_data/bing/keywords_for_site/tasks_ready';
        requestData = null;
        break;
        
      case 'keywords_for_site_task_get':
        endpoint = `/v3/keywords_data/bing/keywords_for_site/task_get/${id}`;
        requestData = null;
        break;
        
      case 'keywords_for_keywords_live':
        endpoint = '/v3/keywords_data/bing/keywords_for_keywords/live';
        requestData = [{
          keywords,
          location_name: location_name || 'United States',
          language_code: language_code || 'en',
          device: device || 'desktop'
        }];
        break;
        
      case 'keywords_for_keywords_task_post':
        endpoint = '/v3/keywords_data/bing/keywords_for_keywords/task_post';
        requestData = [{
          keywords,
          location_name: location_name || 'United States',
          language_code: language_code || 'en',
          device: device || 'desktop'
        }];
        break;
        
      case 'keywords_for_keywords_tasks_ready':
        endpoint = '/v3/keywords_data/bing/keywords_for_keywords/tasks_ready';
        requestData = null;
        break;
        
      case 'keywords_for_keywords_task_get':
        endpoint = `/v3/keywords_data/bing/keywords_for_keywords/task_get/${id}`;
        requestData = null;
        break;
        
      default:
        return res.status(400).json({ error: `Unsupported type: ${type}` });
    }
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, requestData, type.includes('task_get') || type.includes('tasks_ready') ? 'GET' : 'POST');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in Keywords Bing route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.post('/v3/keywords_bing_advanced', async (req, res) => {
  try {
    console.log('🚀 Keywords Bing Advanced Route called!');
    console.log('🚀 Request body:', JSON.stringify(req.body, null, 2));
    
    const { type, keywords, location_name, language_code, device, id, date_from, date_to } = req.body;
    
    let endpoint;
    let requestData;
    
    switch(type) {
      case 'audience_estimation_job_functions_live':
        endpoint = '/v3/keywords_data/bing/audience_estimation/job_functions';
        requestData = null;
        break;
        
      case 'audience_estimation_industries_live':
        endpoint = '/v3/keywords_data/bing/audience_estimation/industries';
        requestData = null;
        break;
        
      case 'audience_estimation_live':
        endpoint = '/v3/keywords_data/bing/audience_estimation/live';
        requestData = [{
          keywords,
          location_name: location_name || 'United States',
          language_code: language_code || 'en',
          device: device || 'desktop'
        }];
        break;
        
      case 'audience_estimation_task_post':
        endpoint = '/v3/keywords_data/bing/audience_estimation/task_post';
        requestData = [{
          keywords,
          location_name: location_name || 'United States',
          language_code: language_code || 'en',
          device: device || 'desktop'
        }];
        break;
        
      case 'audience_estimation_tasks_ready':
        endpoint = '/v3/keywords_data/bing/audience_estimation/tasks_ready';
        requestData = null;
        break;
        
      case 'audience_estimation_task_get':
        endpoint = `/v3/keywords_data/bing/audience_estimation/task_get/${id}`;
        requestData = null;
        break;
        
      case 'keyword_performance_live':
        endpoint = '/v3/keywords_data/bing/keyword_performance/live';
        requestData = [{
          keywords,
          location_name: location_name || 'United States',
          language_code: language_code || 'en',
          device: device || 'desktop'
        }];
        break;
        
      case 'keyword_performance_task_post':
        endpoint = '/v3/keywords_data/bing/keyword_performance/task_post';
        requestData = [{
          keywords,
          location_name: location_name || 'United States',
          language_code: language_code || 'en',
          device: device || 'desktop'
        }];
        break;
        
      case 'keyword_performance_tasks_ready':
        endpoint = '/v3/keywords_data/bing/keyword_performance/tasks_ready';
        requestData = null;
        break;
        
      case 'keyword_performance_task_get':
        endpoint = `/v3/keywords_data/bing/keyword_performance/task_get/${id}`;
        requestData = null;
        break;
        
      case 'search_volume_history_live':
        endpoint = '/v3/keywords_data/bing/search_volume_history/live';
        requestData = [{
          keywords,
          location_name: location_name || 'United States',
          language_code: language_code || 'en',
          device: device || 'desktop'
        }];
        break;
        
      case 'search_volume_history_task_post':
        endpoint = '/v3/keywords_data/bing/search_volume_history/task_post';
        requestData = [{
          keywords,
          location_name: location_name || 'United States',
          language_code: language_code || 'en',
          device: device || 'desktop'
        }];
        break;
        
      case 'search_volume_history_tasks_ready':
        endpoint = '/v3/keywords_data/bing/search_volume_history/tasks_ready';
        requestData = null;
        break;
        
      case 'search_volume_history_task_get':
        endpoint = `/v3/keywords_data/bing/search_volume_history/task_get/${id}`;
        requestData = null;
        break;
        
      default:
        return res.status(400).json({ error: `Unsupported type: ${type}` });
    }
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, requestData, type.includes('task_get') || type.includes('tasks_ready') || type.includes('job_functions') || type.includes('industries') ? 'GET' : 'POST');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in Keywords Bing Advanced route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.post('/v3/keywords_clickstream', async (req, res) => {
  try {
    console.log('🚀 Keywords Clickstream Route called!');
    console.log('🚀 Request body:', JSON.stringify(req.body, null, 2));
    
    const { type, keywords, location_name, language_code, device, date_from, date_to } = req.body;
    
    let endpoint;
    let requestData;
    
    switch(type) {
      case 'locations_and_languages_live':
        endpoint = '/v3/keywords_data/clickstream_data/locations_and_languages';
        requestData = null;
        break;
        
      case 'dataforseo_search_volume_live':
        endpoint = '/v3/keywords_data/clickstream_data/dataforseo_search_volume/live';
        requestData = [{
          keywords,
          location_name: location_name || 'United States',
          language_code: language_code || 'en',
          device: device || 'desktop'
        }];
        break;
        
      case 'global_search_volume_live':
        endpoint = '/v3/keywords_data/clickstream_data/global_search_volume/live';
        requestData = [{
          keywords,
          location_name: location_name || 'United States',
          language_code: language_code || 'en',
          device: device || 'desktop'
        }];
        break;
        
      case 'bulk_search_volume_live':
        endpoint = '/v3/keywords_data/clickstream_data/bulk_search_volume/live';
        requestData = [{
          keywords,
          location_name: location_name || 'United States',
          language_code: language_code || 'en',
          device: device || 'desktop'
        }];
        break;
        
      default:
        return res.status(400).json({ error: `Unsupported type: ${type}` });
    }
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, requestData, type === 'locations_and_languages_live' ? 'GET' : 'POST');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in Keywords Clickstream route:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.post('/v3/keywords_management', async (req, res) => {
  try {
    console.log('🚀 Keywords Management Route called!');
    console.log('🚀 Request body:', JSON.stringify(req.body, null, 2));
    
    const { type, id } = req.body;
    
    let endpoint;
    let requestData;
    
    switch(type) {
      case 'force_stop':
        endpoint = '/v3/keywords_data/force_stop';
        requestData = [{ id }];
        break;
        
      case 'available_filters':
        endpoint = '/v3/keywords_data/available_filters';
        requestData = null;
        break;
        
      default:
        return res.status(400).json({ error: `Unsupported type: ${type}` });
    }
    
    const dataforseoResponse = await makeDataForSEORequest(endpoint, requestData, type === 'available_filters' ? 'GET' : 'POST');
    
    if (dataforseoResponse.status === 200) {
      res.json(dataforseoResponse.body);
    } else {
      res.status(dataforseoResponse.status).json({ error: 'DataForSEO API returned an error' });
    }
  } catch (error) {
    console.error('Error in Keywords Management route:', error);
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
    
    // Check if this is a grouped Business Data endpoint that needs special handling
    const groupedEndpoints = [
      'business_data_google_my_business',
      'business_data_google_hotels', 
      'business_data_google_reviews',
      'business_data_google_qa',
      'business_data_trustpilot',
      'business_data_tripadvisor',
      'business_data_general',
      'business_data_listings',
      'business_data_social_media'
    ];
    
    const isGroupedEndpoint = groupedEndpoints.some(endpoint => apiPath.includes(endpoint));
    
    if (isGroupedEndpoint) {
      // Route to MCP handler for grouped endpoints
      const method = apiPath.replace('/v3/', '');
      const params = Array.isArray(req.body) ? req.body[0] : req.body;
      
      // Create a mock request object for the MCP handler
      const mockReq = {
        body: { method, params }
      };
      
      // Call the MCP handler
      await handleMcpRequest(mockReq, res);
      return;
    }
    
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