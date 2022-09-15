module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/:path*",
        destination: "http://127.0.0.1:5000/:path*",
      },
    ];
  };
  return {
    rewrites,
  };
};