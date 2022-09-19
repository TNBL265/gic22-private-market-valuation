module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/api/instruments/:path*",
        destination: "http://127.0.0.1:5000/instruments/:path*",
      },
      {
        source: "/api/market-values/:path*",
        destination: "http://127.0.0.1:5000/market-values/:path*",
      },
      {
        source: "/api/transactions/:path*",
        destination: "http://127.0.0.1:5000/transactions/:path*",
      },
      {
        source: "/api/investments/:path*",
        destination: "http://127.0.0.1:5000/investments/:path*",
      },
      {
        source: "/api/analytics/:path*",
        destination: "http://127.0.0.1:5000/analytics/:path*",
      },
    ];
  };
  const redirects = () => {
    return [
      {
        source: '/',
        destination: '/instruments',
        permanent: true,
      },
    ]
  }
  return {
    rewrites,
    redirects,
    generateEtags: false,
  };
};
