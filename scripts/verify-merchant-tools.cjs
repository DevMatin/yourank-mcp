#!/usr/bin/env node

/**
 * Merchant Tools Verification Script
 * 
 * Überprüft, ob alle 43 Merchant API Tools korrekt registriert sind
 */

const fs = require('fs');
const path = require('path');

// Alle erwarteten Merchant Tools
const expectedTools = [
  // Allgemeine Merchant Tools
  'merchant_id_list',
  'merchant_errors', 
  'merchant_tasks_ready',

  // Google Shopping Tools
  'merchant_google_languages',
  'merchant_google_locations',
  'merchant_google_locations_country',
  'merchant_google_products_task_post',
  'merchant_google_products_tasks_ready',
  'merchant_google_products_task_get_advanced',
  'merchant_google_products_task_get_html',
  'merchant_google_sellers_task_post',
  'merchant_google_sellers_tasks_ready',
  'merchant_google_sellers_task_get_advanced',
  'merchant_google_sellers_task_get_html',
  'merchant_google_product_spec_task_post',
  'merchant_google_product_spec_tasks_ready',
  'merchant_google_product_spec_task_get_advanced',
  'merchant_google_product_spec_task_get_html',
  'merchant_google_product_info_task_post',
  'merchant_google_product_info_tasks_ready',
  'merchant_google_product_info_task_get_advanced',
  'merchant_google_sellers_ad_url',

  // Amazon Tools
  'merchant_amazon_locations',
  'merchant_amazon_locations_country',
  'merchant_amazon_languages',
  'merchant_amazon_products_task_post',
  'merchant_amazon_products_tasks_ready',
  'merchant_amazon_products_task_get_advanced',
  'merchant_amazon_products_task_get_html',
  'merchant_amazon_asin_task_post',
  'merchant_amazon_asin_tasks_ready',
  'merchant_amazon_asin_task_get_advanced',
  'merchant_amazon_asin_task_get_html',
  'merchant_amazon_sellers_task_post',
  'merchant_amazon_sellers_tasks_ready',
  'merchant_amazon_sellers_task_get_advanced',
  'merchant_amazon_sellers_task_get_html',
  'merchant_amazon_reviews_task_post',
  'merchant_amazon_reviews_tasks_ready',
  'merchant_amazon_reviews_task_get_advanced',
  'merchant_amazon_reviews_task_get_html'
];

function checkToolFile(toolName) {
  const toolFileName = toolName.replace(/_/g, '-') + '.tool.ts';
  
  // Prüfe Google Shopping Tools
  const googlePath = path.join(__dirname, '..', 'src', 'core', 'modules', 'merchant', 'tools', 'google', toolFileName);
  if (fs.existsSync(googlePath)) {
    return { exists: true, path: googlePath, type: 'google' };
  }
  
  // Prüfe Amazon Tools
  const amazonPath = path.join(__dirname, '..', 'src', 'core', 'modules', 'merchant', 'tools', 'amazon', toolFileName);
  if (fs.existsSync(amazonPath)) {
    return { exists: true, path: amazonPath, type: 'amazon' };
  }
  
  // Prüfe Allgemeine Tools
  const generalPath = path.join(__dirname, '..', 'src', 'core', 'modules', 'merchant', 'tools', toolFileName);
  if (fs.existsSync(generalPath)) {
    return { exists: true, path: generalPath, type: 'general' };
  }
  
  return { exists: false, path: null, type: null };
}

function verifyToolContent(toolPath) {
  try {
    const content = fs.readFileSync(toolPath, 'utf8');
    
    // Prüfe wichtige Komponenten
    const hasImport = content.includes('import { z } from \'zod\'');
    const hasBaseTool = content.includes('extends BaseTool');
    const hasGetName = content.includes('getName(): string');
    const hasGetDescription = content.includes('getDescription(): string');
    const hasGetParams = content.includes('getParams(): z.ZodRawShape');
    const hasHandle = content.includes('async handle(params: any)');
    
    return {
      hasImport,
      hasBaseTool,
      hasGetName,
      hasGetDescription,
      hasGetParams,
      hasHandle,
      isValid: hasImport && hasBaseTool && hasGetName && hasGetDescription && hasGetParams && hasHandle
    };
  } catch (error) {
    return { isValid: false, error: error.message };
  }
}

function main() {
  console.log('🔍 Verifying all 43 Merchant API Tools...\n');
  
  let validTools = 0;
  let invalidTools = 0;
  let missingTools = 0;
  
  const results = [];
  
  for (const toolName of expectedTools) {
    const fileCheck = checkToolFile(toolName);
    
    if (fileCheck.exists) {
      const contentCheck = verifyToolContent(fileCheck.path);
      
      if (contentCheck.isValid) {
        console.log(`✅ ${toolName}: Valid (${fileCheck.type})`);
        validTools++;
      } else {
        console.log(`❌ ${toolName}: Invalid structure`);
        invalidTools++;
      }
      
      results.push({
        tool: toolName,
        status: contentCheck.isValid ? 'valid' : 'invalid',
        type: fileCheck.type,
        path: fileCheck.path
      });
    } else {
      console.log(`❌ ${toolName}: Missing file`);
      missingTools++;
      
      results.push({
        tool: toolName,
        status: 'missing',
        type: null,
        path: null
      });
    }
  }
  
  console.log('\n📊 Verification Results:');
  console.log(`✅ Valid Tools: ${validTools}`);
  console.log(`❌ Invalid Tools: ${invalidTools}`);
  console.log(`❌ Missing Tools: ${missingTools}`);
  console.log(`📈 Success Rate: ${((validTools / expectedTools.length) * 100).toFixed(1)}%`);
  
  if (validTools === expectedTools.length) {
    console.log('\n🎉 All 43 Merchant API Tools are properly implemented!');
    console.log('🚀 Ready for Vercel deployment!');
  } else {
    console.log('\n⚠️  Some tools need attention before deployment.');
    
    if (missingTools > 0) {
      console.log('\n❌ Missing Tools:');
      results.filter(r => r.status === 'missing').forEach(r => {
        console.log(`  - ${r.tool}`);
      });
    }
    
    if (invalidTools > 0) {
      console.log('\n❌ Invalid Tools:');
      results.filter(r => r.status === 'invalid').forEach(r => {
        console.log(`  - ${r.tool}`);
      });
    }
  }
  
  return {
    total: expectedTools.length,
    valid: validTools,
    invalid: invalidTools,
    missing: missingTools,
    results
  };
}

if (require.main === module) {
  main();
}

module.exports = { main, expectedTools };
