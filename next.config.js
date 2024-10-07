/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheHandler: require.resolve("./cache-handler.js"),
  cacheMaxMemorySize: 0,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

module.exports = nextConfig;
