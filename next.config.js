module.exports = () => {
  const rewrites = () => {
    return [
      // {
      //   source: '/:path*',
      //   // destination: '/:path*',
      //   headers: [
      //     {
      //       key: 'Cache-Control',
      //       value: 'no-store',
      //     },
      //   ],
      // },
      {
        source: "/api/instruments/:path*",
        destination: "http://18.143.155.239:5000/instruments/:path*",
      },
      {
        source: "/api/market-values/:path*",
        destination: "http://13.214.136.233:5000/market-values/:path*",
      },
      {
        source: "/api/transactions/:path*",
        destination: "http://18.138.81.156:5000/transactions/:path*",
      },
    ];
  };
  return {
    rewrites,
    generateEtags: false,
  };
};