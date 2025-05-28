export default async function handler(req, res) {
  const endpoints = [
    { path: '/api/time', name: 'Time API' },
  ];

  const timezones = Array.from({ length: 29 }, (_, i) => i - 14); // -14 to +14

  let allHealthy = true;
  const issues = [];

  // Check all endpoints with all timezones
  for (const endpoint of endpoints) {
    for (const tz of timezones) {
      const url = new URL(`https://harys-test.vercel.app${endpoint.path}`);
      url.searchParams.append('timezone', tz.toString());

      try {
        const response = await fetch(url.toString());
        if (!response.ok) {
          allHealthy = false;
          issues.push({
            endpoint: endpoint.name,
            timezone: `GMT${tz >= 0 ? '+' : ''}${tz}`,
            status: response.status,
          });
        }
      } catch (error) {
        allHealthy = false;
        issues.push({
          endpoint: endpoint.name,
          timezone: `GMT${tz >= 0 ? '+' : ''}${tz}`,
          error: error.message,
        });
      }
    }
  }

  if (allHealthy) {
    // All endpoints are healthy
    res.status(200).json({ message: 'API is running perfectly', status: 200 });
  } else {
    // Some endpoints had issues
    res.status(503).json({
      message: 'Some endpoints are not responding correctly',
      issues,
    });
  }
}
