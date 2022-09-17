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
      {
        source: "/api/investments/:path*",
        destination: "http://18.142.121.89:5000/investments/:path*",
      },
      {
        source: "/api/analytics/:path*",
        destination: "http://18.141.212.96:5000/analytics/:path*",
      },
    ];
  };
  return {
    rewrites,
    generateEtags: false,
  };
};