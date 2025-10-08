import fs from 'fs';
import path from 'path';

function fixJavaScriptFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove TypeScript type annotations
    content = content.replace(/:\s*[A-Za-z<>\[\]{}|&,()\s]+(?=\s*[,)])/g, '');
    content = content.replace(/:\s*[A-Za-z<>\[\]{}|&,()\s]+(?=\s*[=])/g, '');
    
    // Remove private keyword in constructors
    content = content.replace(/constructor\s*\(\s*private\s+([^)]+)\)/g, 'constructor($1)');
    
    // Remove interface and type declarations
    content = content.replace(/interface\s+\w+\s*{[^}]*}/g, '');
    content = content.replace(/type\s+\w+\s*=\s*[^;]+;/g, '');
    
    // Remove import type statements
    content = content.replace(/import\s+type\s+[^;]+;/g, '');
    
    // Fix constructor assignments
    content = content.replace(/constructor\s*\(\s*([^)]+)\s*\)\s*{\s*super\s*\(\s*\1\s*\);\s*}/g, 'constructor($1) {\n    super($1);\n    this.client = $1;\n  }');
    
    // Remove duplicate super calls
    content = content.replace(/this\.client\s*=\s*client;\s*{\s*super\s*\(\s*client\s*\);\s*}/g, 'this.client = client;');
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed: ${filePath}`);
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
  }
}

function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.js') && (file.includes('google-ads') || file.includes('bing') || file.includes('id-list'))) {
      fixJavaScriptFile(fullPath);
    }
  }
}

// Process the keywords-data google-ads directory
const googleAdsDir = './src/core/modules/keywords-data/tools/google-ads';
if (fs.existsSync(googleAdsDir)) {
  console.log('🔧 Fixing JavaScript files in google-ads directory...');
  processDirectory(googleAdsDir);
  console.log('✅ All JavaScript files fixed!');
} else {
  console.error('❌ Directory not found:', googleAdsDir);
}

// Process the keywords-data bing directory
const bingDir = './src/core/modules/keywords-data/tools/bing';
if (fs.existsSync(bingDir)) {
  console.log('🔧 Fixing JavaScript files in bing directory...');
  processDirectory(bingDir);
  console.log('✅ All JavaScript files fixed!');
} else {
  console.error('❌ Directory not found:', bingDir);
}
