module.exports = () => {
  const rewrites = () => {
    return [
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
        source: "/api/transactions/:path*",
        destination: "http://127.0.0.1:5003/transactions/:path*",
      },
    ];
  };
  return {
    rewrites,
  };
};