module.exports = {
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/index.html",
      },
      {
        source: "/api",
        destination: "/api.html"
      },
      {
        source: "/(.*)",
        destination: "/404.html"
      },
      {
        source: "/api/:path*", // Crucial change
        destination: "/api/:path*", // Crucial change
      }
    ];
  },
  async headers() {
    return [
      {
        source: '/api/:slug*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: '*'
          }
        ],
      },
    ]
  },
};
