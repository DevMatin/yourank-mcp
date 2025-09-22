-- =============================
-- DATAFORSEO MCP SERVER - COMPLETE SUPABASE SCHEMA
-- =============================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_cron";

-- =============================
-- 1) CORE TABLES
-- =============================

-- API Jobs Table (Main Queue System)
CREATE TABLE api_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_type TEXT NOT NULL, -- 'serp', 'keywords', 'backlinks', etc.
  tool_name TEXT NOT NULL, -- specific DataForSEO tool name
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'cancelled')),
  priority INTEGER DEFAULT 5 CHECK (priority BETWEEN 1 AND 10),
  
  -- DataForSEO specific fields
  dataforseo_task_id TEXT, -- DataForSEO returned task ID
  postback_url TEXT, -- callback URL for DataForSEO
  
  -- Request/Response data
  request_data JSONB NOT NULL,
  response_data JSONB,
  error_message TEXT,
  
  -- Retry mechanism
  retry_count INTEGER DEFAULT 0,
  max_retries INTEGER DEFAULT 3,
  
  -- Domain grouping
  domain TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- User context
  user_id UUID,
  session_id TEXT
);

-- API Cache Table
CREATE TABLE api_cache (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cache_key TEXT UNIQUE NOT NULL,
  endpoint TEXT NOT NULL,
  request_hash TEXT NOT NULL,
  response_data JSONB NOT NULL,
  
  -- Cache metadata
  domain TEXT,
  job_type TEXT,
  
  -- TTL and freshness
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  accessed_at TIMESTAMPTZ DEFAULT NOW(),
  access_count INTEGER DEFAULT 1,
  
  -- User context
  user_id UUID
);

-- API Rate Limits Table
CREATE TABLE api_rate_limits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  api_type TEXT NOT NULL, -- 'dataforseo', 'serp', 'keywords', etc.
  endpoint TEXT NOT NULL,
  
  -- Rate limit tracking
  requests_count INTEGER DEFAULT 0,
  requests_limit INTEGER NOT NULL,
  window_start TIMESTAMPTZ DEFAULT NOW(),
  window_duration INTERVAL DEFAULT '1 hour',
  
  -- Reset mechanism
  reset_at TIMESTAMPTZ,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(api_type, endpoint, window_start)
);

-- Job Batches Table (for bulk operations)
CREATE TABLE job_batches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  
  -- Batch status
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed', 'cancelled')),
  total_jobs INTEGER DEFAULT 0,
  completed_jobs INTEGER DEFAULT 0,
  failed_jobs INTEGER DEFAULT 0,
  
  -- Batch configuration
  batch_config JSONB,
  domain TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- User context
  user_id UUID,
  session_id TEXT
);

-- =============================
-- 2) INDEXES for Performance
-- =============================

-- API Jobs indexes
CREATE INDEX idx_api_jobs_status ON api_jobs(status);
CREATE INDEX idx_api_jobs_status_created ON api_jobs(status, created_at);
CREATE INDEX idx_api_jobs_domain ON api_jobs(domain);
CREATE INDEX idx_api_jobs_job_type ON api_jobs(job_type);
CREATE INDEX idx_api_jobs_dataforseo_task_id ON api_jobs(dataforseo_task_id) WHERE dataforseo_task_id IS NOT NULL;
CREATE INDEX idx_api_jobs_user_id ON api_jobs(user_id) WHERE user_id IS NOT NULL;
CREATE INDEX idx_api_jobs_created_at ON api_jobs(created_at DESC);

-- API Cache indexes
CREATE INDEX idx_api_cache_cache_key ON api_cache(cache_key);
CREATE INDEX idx_api_cache_domain ON api_cache(domain);
CREATE INDEX idx_api_cache_expires_at ON api_cache(expires_at);
CREATE INDEX idx_api_cache_endpoint ON api_cache(endpoint);
CREATE INDEX idx_api_cache_request_hash ON api_cache(request_hash);

-- Rate Limits indexes
CREATE INDEX idx_api_rate_limits_api_type ON api_rate_limits(api_type);
CREATE INDEX idx_api_rate_limits_endpoint ON api_rate_limits(endpoint);
CREATE INDEX idx_api_rate_limits_window_start ON api_rate_limits(window_start);

-- Job Batches indexes
CREATE INDEX idx_job_batches_status ON job_batches(status);
CREATE INDEX idx_job_batches_domain ON job_batches(domain);
CREATE INDEX idx_job_batches_user_id ON job_batches(user_id) WHERE user_id IS NOT NULL;

-- =============================
-- 3) FUNCTIONS
-- =============================

-- Updated timestamp function
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Cache cleanup function
CREATE OR REPLACE FUNCTION cleanup_expired_cache()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM api_cache WHERE expires_at < NOW();
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Job status update function
CREATE OR REPLACE FUNCTION update_job_status(
  job_id UUID,
  new_status TEXT,
  response_data JSONB DEFAULT NULL,
  error_msg TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
BEGIN
  UPDATE api_jobs 
  SET 
    status = new_status,
    response_data = COALESCE(update_job_status.response_data, api_jobs.response_data),
    error_message = error_msg,
    completed_at = CASE WHEN new_status IN ('completed', 'failed', 'cancelled') THEN NOW() ELSE completed_at END,
    started_at = CASE WHEN new_status = 'processing' AND started_at IS NULL THEN NOW() ELSE started_at END
  WHERE id = job_id;
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql;

-- Batch progress update function
CREATE OR REPLACE FUNCTION update_batch_progress()
RETURNS TRIGGER AS $$
BEGIN
  -- Update batch statistics when job status changes
  UPDATE job_batches 
  SET 
    completed_jobs = (
      SELECT COUNT(*) FROM api_jobs 
      WHERE api_jobs.session_id = job_batches.session_id 
      AND status = 'completed'
    ),
    failed_jobs = (
      SELECT COUNT(*) FROM api_jobs 
      WHERE api_jobs.session_id = job_batches.session_id 
      AND status = 'failed'
    ),
    status = CASE 
      WHEN (completed_jobs + failed_jobs) >= total_jobs THEN 'completed'
      WHEN completed_jobs + failed_jobs > 0 THEN 'running'
      ELSE status 
    END
  WHERE session_id = NEW.session_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =============================
-- 4) TRIGGERS
-- =============================

-- Updated timestamp triggers
CREATE TRIGGER trigger_api_jobs_updated_at
  BEFORE UPDATE ON api_jobs
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trigger_api_rate_limits_updated_at
  BEFORE UPDATE ON api_rate_limits
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trigger_job_batches_updated_at
  BEFORE UPDATE ON job_batches
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Batch progress trigger
CREATE TRIGGER trigger_batch_progress
  AFTER UPDATE OF status ON api_jobs
  FOR EACH ROW 
  WHEN (NEW.session_id IS NOT NULL)
  EXECUTE FUNCTION update_batch_progress();

-- =============================
-- 5) VIEWS for Monitoring
-- =============================

-- Jobs Overview
CREATE OR REPLACE VIEW jobs_overview AS
SELECT 
  job_type,
  status,
  COUNT(*) as count,
  AVG(EXTRACT(EPOCH FROM (completed_at - created_at))) as avg_duration_seconds,
  MIN(created_at) as oldest_job,
  MAX(created_at) as newest_job
FROM api_jobs 
GROUP BY job_type, status
ORDER BY job_type, status;

-- Pending Jobs Queue
CREATE OR REPLACE VIEW pending_jobs_queue AS
SELECT 
  id,
  job_type,
  tool_name,
  priority,
  domain,
  retry_count,
  created_at,
  request_data->>'keywords' as keywords_preview
FROM api_jobs 
WHERE status = 'pending'
ORDER BY priority DESC, created_at ASC;

-- Job Performance Stats
CREATE OR REPLACE VIEW job_performance_stats AS
SELECT 
  tool_name,
  COUNT(*) as total_jobs,
  COUNT(*) FILTER (WHERE status = 'completed') as completed_jobs,
  COUNT(*) FILTER (WHERE status = 'failed') as failed_jobs,
  AVG(EXTRACT(EPOCH FROM (completed_at - started_at))) as avg_processing_seconds,
  AVG(retry_count) as avg_retries
FROM api_jobs 
WHERE started_at IS NOT NULL
GROUP BY tool_name
ORDER BY total_jobs DESC;

-- Cache Stats
CREATE OR REPLACE VIEW cache_stats AS
SELECT 
  endpoint,
  COUNT(*) as cached_requests,
  COUNT(*) FILTER (WHERE expires_at > NOW()) as active_cache_entries,
  COUNT(*) FILTER (WHERE expires_at <= NOW()) as expired_entries,
  AVG(access_count) as avg_access_count,
  MAX(accessed_at) as last_accessed
FROM api_cache 
GROUP BY endpoint
ORDER BY cached_requests DESC;

-- Domain Cache Stats
CREATE OR REPLACE VIEW domain_cache_stats AS
SELECT 
  domain,
  COUNT(*) as total_cached,
  COUNT(*) FILTER (WHERE expires_at > NOW()) as active_entries,
  COUNT(DISTINCT endpoint) as unique_endpoints,
  SUM(access_count) as total_accesses
FROM api_cache 
WHERE domain IS NOT NULL
GROUP BY domain
ORDER BY total_cached DESC;

-- Domain Crawl History
CREATE OR REPLACE VIEW domain_crawl_history AS
SELECT 
  domain,
  job_type,
  COUNT(*) as total_jobs,
  COUNT(*) FILTER (WHERE status = 'completed') as completed_jobs,
  MAX(completed_at) as last_crawl,
  MIN(created_at) as first_crawl,
  AVG(EXTRACT(EPOCH FROM (completed_at - created_at))) as avg_job_duration
FROM api_jobs 
WHERE domain IS NOT NULL
GROUP BY domain, job_type
ORDER BY domain, job_type;

-- =============================
-- 6) ROW LEVEL SECURITY (RLS)
-- =============================

-- Enable RLS
ALTER TABLE api_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_batches ENABLE ROW LEVEL SECURITY;

-- RLS Policies for api_jobs
CREATE POLICY "Users can view their own jobs" ON api_jobs
  FOR SELECT USING (user_id = auth.uid() OR user_id IS NULL);

CREATE POLICY "Users can insert their own jobs" ON api_jobs
  FOR INSERT WITH CHECK (user_id = auth.uid() OR user_id IS NULL);

CREATE POLICY "Users can update their own jobs" ON api_jobs
  FOR UPDATE USING (user_id = auth.uid() OR user_id IS NULL);

-- RLS Policies for api_cache
CREATE POLICY "Users can view their own cache" ON api_cache
  FOR SELECT USING (user_id = auth.uid() OR user_id IS NULL);

CREATE POLICY "Users can insert their own cache" ON api_cache
  FOR INSERT WITH CHECK (user_id = auth.uid() OR user_id IS NULL);

-- RLS Policies for job_batches
CREATE POLICY "Users can view their own batches" ON job_batches
  FOR SELECT USING (user_id = auth.uid() OR user_id IS NULL);

CREATE POLICY "Users can insert their own batches" ON job_batches
  FOR INSERT WITH CHECK (user_id = auth.uid() OR user_id IS NULL);

CREATE POLICY "Users can update their own batches" ON job_batches
  FOR UPDATE USING (user_id = auth.uid() OR user_id IS NULL);

-- =============================
-- 7) SCHEDULED JOBS (using pg_cron)
-- =============================

-- Cleanup expired cache every hour
SELECT cron.schedule('cleanup-expired-cache', '0 * * * *', 'SELECT cleanup_expired_cache();');

-- Cleanup old completed jobs (older than 30 days)
SELECT cron.schedule('cleanup-old-jobs', '0 2 * * *', 
  'DELETE FROM api_jobs WHERE status IN (''completed'', ''failed'') AND completed_at < NOW() - INTERVAL ''30 days'';'
);

-- Update rate limit windows
SELECT cron.schedule('reset-rate-limits', '0 * * * *',
  'UPDATE api_rate_limits SET requests_count = 0, window_start = NOW() WHERE reset_at <= NOW();'
);

-- =============================
-- 8) INITIAL DATA
-- =============================

-- Insert default rate limits for DataForSEO
INSERT INTO api_rate_limits (api_type, endpoint, requests_limit, window_duration) VALUES
  ('dataforseo', 'serp', 2000, '1 hour'),
  ('dataforseo', 'keywords', 1000, '1 hour'),
  ('dataforseo', 'backlinks', 500, '1 hour'),
  ('dataforseo', 'onpage', 1000, '1 hour'),
  ('dataforseo', 'merchant', 500, '1 hour')
ON CONFLICT (api_type, endpoint, window_start) DO NOTHING;

-- =============================
-- 9) HELPER FUNCTIONS for Application
-- =============================

-- Get next pending job
CREATE OR REPLACE FUNCTION get_next_pending_job(job_types TEXT[] DEFAULT NULL)
RETURNS TABLE (
  id UUID,
  job_type TEXT,
  tool_name TEXT,
  request_data JSONB,
  priority INTEGER,
  created_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    j.id,
    j.job_type,
    j.tool_name,
    j.request_data,
    j.priority,
    j.created_at
  FROM api_jobs j
  WHERE j.status = 'pending'
    AND (job_types IS NULL OR j.job_type = ANY(job_types))
    AND j.retry_count < j.max_retries
  ORDER BY j.priority DESC, j.created_at ASC
  LIMIT 1
  FOR UPDATE SKIP LOCKED;
END;
$$ LANGUAGE plpgsql;

-- Check cache
CREATE OR REPLACE FUNCTION get_cached_response(cache_key_param TEXT)
RETURNS JSONB AS $$
DECLARE
  cached_data JSONB;
BEGIN
  SELECT response_data INTO cached_data
  FROM api_cache 
  WHERE cache_key = cache_key_param 
    AND expires_at > NOW();
  
  -- Update access count and timestamp
  IF FOUND THEN
    UPDATE api_cache 
    SET 
      access_count = access_count + 1,
      accessed_at = NOW()
    WHERE cache_key = cache_key_param;
  END IF;
  
  RETURN cached_data;
END;
$$ LANGUAGE plpgsql;

-- =============================
-- SETUP COMPLETE
-- =============================

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, service_role;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT INSERT, UPDATE ON api_jobs TO authenticated;
GRANT INSERT, UPDATE ON api_cache TO authenticated;
GRANT INSERT, UPDATE ON job_batches TO authenticated;
GRANT UPDATE ON api_rate_limits TO service_role;

-- Create indexes on JSONB columns for better performance
CREATE INDEX idx_api_jobs_request_data_keywords ON api_jobs USING GIN ((request_data->'keywords'));
CREATE INDEX idx_api_jobs_response_data ON api_jobs USING GIN (response_data);
CREATE INDEX idx_api_cache_response_data ON api_cache USING GIN (response_data);

COMMENT ON TABLE api_jobs IS 'Main queue system for DataForSEO API tasks';
COMMENT ON TABLE api_cache IS 'Response cache for API requests to improve performance';
COMMENT ON TABLE api_rate_limits IS 'Track API rate limits to prevent hitting DataForSEO limits';
COMMENT ON TABLE job_batches IS 'Batch job management for bulk operations';
