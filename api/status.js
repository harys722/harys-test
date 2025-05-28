export default async function handler(req, res) {

  const endpointsToCheck = [
    { path: '/api/time', name: 'Time API' },
  ];

  const timezones = Array.from({ length: 29 }, (_, i) => i - 14);

  const results = [];

  await Promise.all(
    endpointsToCheck.map(async (endpoint) => {
      const endpointResults = [];

      await Promise.all(
        timezones.map(async (tzOffset) => {
          const url = new URL(`https://harys-test.vercel.app${endpoint.path}`);
          url.searchParams.append('timezone', tzOffset.toString());

          try {
            const response = await fetch(url.toString());

            if (response.ok) {
              const data = await response.json();
              endpointResults.push({
                timezone: `GMT${tzOffset >= 0 ? '+' : ''}${tzOffset}`,
                status: 'healthy',
                statusCode: response.status,
                data, // optional
              });
            } else {
              endpointResults.push({
                timezone: `GMT${tzOffset >= 0 ? '+' : ''}${tzOffset}`,
                status: 'unhealthy',
                statusCode: response.status,
              });
            }
          } catch (error) {
            endpointResults.push({
              timezone: `GMT${tzOffset >= 0 ? '+' : ''}${tzOffset}`,
              status: 'error',
              error: error.message,
            });
          }
        })
      );

      results.push({
        endpoint: endpoint.name,
        path: endpoint.path,
        checks: endpointResults,
      });
    })
  );

  res.status(200).json({ status: 'OK', endpoints: results });
}
