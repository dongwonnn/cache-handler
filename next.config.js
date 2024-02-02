/** @type {import('next').NextConfig} */
/** @type {import('next').NextConfig} */
const nextConfig = {
  /*
   * 1. new Map()을 이용한 cache handler
   * 2. redis를 이용한 cache handler
   * 3. neshca를 이용한 cache handler
   * */
  // cacheHandler: require.resolve("./cache-handler-custom.js"),
  // cacheHandler: require.resolve('./cache-handler-redis.js'),
  // cacheHandler: require.resolve('./cache-handler-neshca.js'),

  // disabled file system memory
  cacheMaxMemorySize: 0,

  // for self-hosting
  // output: 'standalone',
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

module.exports = nextConfig;
