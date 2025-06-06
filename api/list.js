export default function handler(req, res) {
  const endpoints = [
    {
      path: "/api/time",
      description: "Returns the current server time."
    },
    {
      path: "/api/encode",
      description: "Encodes provided content into Base64."
    }
  ];

  res.json({
    message: "All Available API endpoints, made by harys722.",
    base_url: "https://harys.is-a.dev",
    endpoints: endpoints
  });
}
