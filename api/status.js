import { endpoints } from './endpoints';

export default async function handler(request, response) {
  const results = await Promise.all(
    endpoints.map(async (endpoint) => {
      try {
        const res = await fetch(endpoint.url);
        if (res.ok) {
          return { name: endpoint.name, status: 'healthy' };
        } else {
          return { name: endpoint.name, status: 'unhealthy', reason: `Status code: ${res.status}` };
        }
      } catch (error) {
        return { name: endpoint.name, status: 'unhealthy', reason: error.message };
      }
    })
  );

  response.status(200).json(results);
}
