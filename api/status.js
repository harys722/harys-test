const http = require('http');
const { URL } = require('url');

// Import your endpoints from 'api/endpoints.js'
const endpoints = require('./api/endpoints');

// Function to perform HTTP GET request using built-in modules
function checkEndpoint(endpointUrl) {
  return new Promise((resolve) => {
    const urlObj = new URL(endpointUrl);

    const options = {
      method: 'GET',
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      timeout: 5000, // 5 seconds timeout
    };

    // Decide whether to use http or https
    const protocol = urlObj.protocol === 'https:' ? require('https') : require('http');

    const req = protocol.request(options, (res) => {
      // Success if status code is 200-299
      if (res.statusCode >= 200 && res.statusCode < 300) {
        resolve({ status: 'healthy' });
      } else {
        resolve({ status: 'unhealthy', reason: `Status code: ${res.statusCode}` });
      }
      res.resume(); // Consume response data to free up memory
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
}

// Function to check all endpoints
async function checkEndpoints() {
  const results = [];

  for (const endpoint of endpoints) {
    const result = await checkEndpoint(endpoint.url);
    results.push({ name: endpoint.name, ...result });
  }

  // Determine overall health
  const isHealthy = results.every(r => r.status === 'healthy');

  return {
    statusCode: isHealthy ? 200 : 500,
    body: JSON.stringify({
      status: isHealthy ? 'ok' : 'error',
      results: results,
    }),
  };
}

// Create HTTP server
const server = http.createServer(async (req, res) => {
  if (req.url === '/api/status') {
    const result = await checkEndpoints();
    res.writeHead(result.statusCode, { 'Content-Type': 'application/json' });
    res.end(result.body);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

// Start server
const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Status server is running at https://harys-test.vercel.app/api/status`);
});
