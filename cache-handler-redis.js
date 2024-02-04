const { createClient } = require("redis");

const client = createClient({
  socket: { host: "127.0.0.1", port: 6379 },
});

client.connect();

module.exports = class CacheHandler {
  async get(key) {
    try {
      const value = await client.get(key);
      return value;
    } catch (err) {
      console.error("Error fetching from Redis:", err);
    }
  }

  async set(key, value, ctx) {
    try {
      await client.set(key, {
        value,
        lastModified: Date.now(),
        tags: ctx.tags,
      });
    } catch (err) {
      console.error("Error setting value in Redis:", err);
    }
  }

  async revalidateTag(tag) {
    const stream = await client.scanIterator();
    for await (const key of stream) {
      const value = await client.get(key);

      if (value.tags.includes(tag)) {
        await client.del(key);
      }
    }
  }
};
