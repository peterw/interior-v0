const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');

const CF_DELIVERY_URL = 'https://imagedelivery.net/0Q9aMhrPYW3Ug5f7HPnWUQ';

async function checkImageExists(imageId) {
  return new Promise((resolve) => {
    const url = `${CF_DELIVERY_URL}/${imageId}/public`;
    https.get(url, (res) => {
      resolve(res.statusCode === 200);
    }).on('error', () => {
      resolve(false);
    });
  });
}

async function findImages(dir, images = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      await findImages(fullPath, images);
    } else if (/\.(jpg|jpeg|png|webp|gif|svg)$/i.test(file)) {
      images.push(fullPath);
    }
  }
  return images;
}

async function main() {
  console.log('Rebuilding Cloudflare image mappings...\n');
  
  const mappings = {};
  const images = await findImages('public/images');
  
  console.log(`Found ${images.length} local images. Checking which are already uploaded...\n`);
  
  let found = 0;
  let notFound = 0;
  
  for (const imagePath of images) {
    const webPath = '/' + imagePath.replace('public/', '');
    const imageId = crypto.createHash('md5').update(webPath).digest('hex').substring(0, 20);
    
    process.stdout.write(`Checking ${webPath}... `);
    
    const exists = await checkImageExists(imageId);
    
    if (exists) {
      mappings[webPath] = `${CF_DELIVERY_URL}/${imageId}/public`;
      console.log('✅ Found');
      found++;
    } else {
      console.log('❌ Not found');
      notFound++;
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  console.log('\n📊 Summary:');
  console.log(`✅ Found on Cloudflare: ${found}`);
  console.log(`❌ Not found: ${notFound}`);
  console.log(`📁 Total images: ${images.length}`);
  
  // Save the mappings
  fs.writeFileSync('public/cf-images.json', JSON.stringify(mappings, null, 2));
  console.log('\n✅ Saved mappings to public/cf-images.json');
  
  // Show a sample of what was saved
  const entries = Object.entries(mappings).slice(0, 5);
  if (entries.length > 0) {
    console.log('\nSample mappings:');
    entries.forEach(([path, url]) => {
      console.log(`  ${path} → ${url}`);
    });
    if (Object.keys(mappings).length > 5) {
      console.log(`  ... and ${Object.keys(mappings).length - 5} more`);
    }
  }
}

main().catch(console.error);