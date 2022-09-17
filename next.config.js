module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/api/instruments/:path*",
        destination: "http://127.0.0.1:5001/instruments/:path*",
      },
      {
        source: "/api/market-values/:path*",
        destination: "http://127.0.0.1:5002/market-values/:path*",
      },
      {
        source: "/api/transactions/:path*",
        destination: "http://127.0.0.1:5003/transactions/:path*",
      },
    ];
  };
  return {
    rewrites,
  };
};