const { CacheHandler } = require("next/dist/server/lib/incremental-cache");
const { createClient } = require("redis");

let redisClient = null;

async function getRedisClient() {
  if (!redisClient) {
    redisClient = createClient({
      socket: { host: "127.0.0.1", port: 6379 },
    });

    redisClient.on("error", (error) => {
      console.error("Redis error:", error);
    });

    await redisClient.connect();
    console.log("Redis client connected successfully");
  }

  return redisClient;
}

class CustomCacheHandler extends CacheHandler {
  constructor(ctx) {
    super(ctx);
  }

  #generateRedisKey(key, tags) {
    return `${tags}:${key}`;
  }

  async get(key, ctx) {
    const redisKey = this.#generateRedisKey(key, ctx.tags);

    try {
      const redisClient = await getRedisClient();
      const cachedValue = await redisClient.get(redisKey);

      return cachedValue ? JSON.parse(cachedValue) : null;
    } catch (error) {
      console.error("Error fetching from Redis:", error);
      return null;
    }
  }

  async set(key, value, ctx) {
    const redisKey = this.#generateRedisKey(key, ctx.tags);
    const cacheData = {
      value,
      lastModified: Date.now(),
      tags: ctx.tags,
    };

    try {
      const redisClient = await getRedisClient();
      await redisClient.set(redisKey, JSON.stringify(cacheData));
    } catch (error) {
      console.error("Error setting value in Redis:", error);
    }
  }
}

module.exports = CustomCacheHandler;
