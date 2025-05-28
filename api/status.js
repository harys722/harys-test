const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');

const endpointsPath = path.join(__dirname, 'endpoints.json');

let endpoints;
try {
  const data = fs.readFileSync(endpointsPath, 'utf-8');
  endpoints = JSON.parse(data);
} catch (err) {
  console.error('Failed to read or parse endpoints.json:', err);
  process.exit(1);
}

const runtimeParamsMap = {
};

async function checkEndpoint(endpoint, runtimeParams = {}) {
  try {
    const urlObj = new URL(endpoint.url);
    const mergedParams = { ...(endpoint.params || {}), ...runtimeParams };
    for (const [key, value] of Object.entries(mergedParams)) {
      urlObj.searchParams.append(key, value);
    }
    const lib = urlObj.protocol === 'https:' ? https : http;
    const options = {
      method: 'GET',
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      timeout: 5000,
    };

    return await new Promise((resolve) => {
      const req = lib.request(options, (res) => {
        const { statusCode } = res;
        res.on('data', () => {});
        res.on('end', () => {
          if (statusCode >= 200 && statusCode < 300) {
            resolve({ status: 'healthy', statusCode });
          } else {
            resolve({ status: 'unhealthy', statusCode, reason: `Status code: ${statusCode}` });
          }
        });
      });

      req.on('error', (err) => {
        resolve({ status: 'unhealthy', reason: err.message });
      });

      req.on('timeout', () => {
        req.destroy();
        resolve({ status: 'unhealthy', reason: 'Timeout' });
      });
      req.end();
    });
  } catch (err) {
    return { status: 'unhealthy', reason: err.message };
  }
}

async function performChecks() {
  const results = [];
  for (const endpoint of endpoints) {
    const runtimeParams = runtimeParamsMap[endpoint.name] || {};
    const result = await checkEndpoint(endpoint, runtimeParams);
    results.push({ name: endpoint.name, ...result });
  }
  return results;
}

(async () => {
  const results = await performChecks();
  console.log('Results:', JSON.stringify(results, null, 2));
})();
