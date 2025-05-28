const endpoints = require('./endpoints');

async function checkEndpoint(endpointUrl) {
  const { hostname, pathname, search, protocol } = new URL(endpointUrl);
  const isHttps = protocol === 'https:';

  const options = {
    method: 'GET',
    hostname,
    path: pathname + search,
    timeout: 5000,
  };

  const lib = isHttps ? require('https') : require('http');

  return new Promise((resolve) => {
    const req = lib.request({ ...options, port: isHttps ? 443 : 80 }, (res) => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        resolve({ status: 'healthy' });
      } else {
        resolve({ status: 'unhealthy', reason: `Status code: ${res.statusCode}` });
      }
      res.resume();
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

export default async function handler(req, res) {
  const results = [];

  for (const endpoint of endpoints) {
    const result = await checkEndpoint(endpoint.url);
    results.push({ name: endpoint.name, ...result });
  }

  const isHealthy = results.every(r => r.status === 'healthy');

  res.status(isHealthy ? 200 : 500).json({
    status: isHealthy ? 'ok' : 'error',
    results,
  });
}
