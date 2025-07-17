const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');
const FormData = require('form-data');

const CF_ACCOUNT_ID = process.env.CF_ACCOUNT_ID;
const CF_API_TOKEN = process.env.CF_API_TOKEN;
const CF_DELIVERY_URL = 'https://imagedelivery.net/0Q9aMhrPYW3Ug5f7HPnWUQ';

async function uploadImage(imagePath) {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    
    // Generate consistent ID from path
    const webPath = '/' + imagePath.replace('public/', '');
    const imageId = crypto.createHash('md5').update(webPath).digest('hex').substring(0, 20);
    
    // Add file to form data
    const fileStream = fs.createReadStream(imagePath);
    formData.append('file', fileStream, path.basename(imagePath));
    formData.append('id', imageId);

    const options = {
      method: 'POST',
      hostname: 'api.cloudflare.com',
      path: `/client/v4/accounts/${CF_ACCOUNT_ID}/images/v1`,
      headers: {
        'Authorization': `Bearer ${CF_API_TOKEN}`,
        ...formData.getHeaders()
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          console.log(`Response for ${webPath}:`, JSON.stringify(result, null, 2));
          
          if (result.success) {
            resolve(`${CF_DELIVERY_URL}/${imageId}/public`);
          } else {
            console.error(`Failed to upload ${webPath}:`, result.errors);
            resolve(null);
          }
        } catch (error) {
          console.error(`Error parsing response for ${webPath}:`, error);
          resolve(null);
        }
      });
    });

    req.on('error', (error) => {
      console.error(`Request error for ${webPath}:`, error);
      resolve(null);
    });

    formData.pipe(req);
  });
}

async function findImages(dir, images = []) {
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        await findImages(fullPath, images);
      } else if (/\.(jpg|jpeg|png|webp|gif|svg)$/i.test(file)) {
        images.push(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message);
  }
  return images;
}

async function main() {
  console.log('Starting Cloudflare image sync...');
  console.log('Account ID:', CF_ACCOUNT_ID);
  console.log('Delivery URL:', CF_DELIVERY_URL);
  
  if (!CF_ACCOUNT_ID || !CF_API_TOKEN) {
    console.error('ERROR: Missing required environment variables!');
    console.error('CF_ACCOUNT_ID:', CF_ACCOUNT_ID ? 'Set' : 'Missing');
    console.error('CF_API_TOKEN:', CF_API_TOKEN ? 'Set' : 'Missing');
    process.exit(1);
  }

  const mappingsPath = 'public/cf-images.json';
  const mappings = fs.existsSync(mappingsPath) 
    ? JSON.parse(fs.readFileSync(mappingsPath, 'utf-8'))
    : {};

  console.log('Current mappings:', Object.keys(mappings).length, 'images');

  const images = await findImages('public/images');
  console.log('Found', images.length, 'local images');
  
  let uploaded = 0;
  let skipped = 0;
  let failed = 0;
  
  for (const imagePath of images) {
    const webPath = '/' + imagePath.replace('public/', '');
    
    if (!mappings[webPath]) {
      console.log(`\nUploading ${webPath}...`);
      const cfUrl = await uploadImage(imagePath);
      
      if (cfUrl) {
        mappings[webPath] = cfUrl;
        console.log(`✓ Success: ${webPath} → ${cfUrl}`);
        uploaded++;
      } else {
        console.log(`✗ Failed: ${webPath}`);
        failed++;
      }
      
      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    } else {
      console.log(`⏭ Skipping ${webPath} (already uploaded)`);
      skipped++;
    }
  }

  console.log('\n📊 Summary:');
  console.log(`✓ Uploaded: ${uploaded}`);
  console.log(`⏭ Skipped: ${skipped}`);
  console.log(`✗ Failed: ${failed}`);
  console.log(`📁 Total mappings: ${Object.keys(mappings).length}`);

  fs.writeFileSync(mappingsPath, JSON.stringify(mappings, null, 2));
  console.log(`\n✅ Saved mappings to ${mappingsPath}`);
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});