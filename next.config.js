module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/instruments/:path*",
        destination: "http://127.0.0.1:5000/instruments/:path*",
      },
    ];
  };
  return {
    rewrites,
  };
};