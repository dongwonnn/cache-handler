const cache = new Map();

module.exports = class CacheHandler {
  constructor(options) {
    this.options = options;
  }

  async get(key) {
    const value = cache.get(key);
    console.log("[=== get value ===]", value);
    return value;
  }

  async set(key, data, ctx) {
    console.log("[=== set key ===]", key);
    cache.set(key, {
      value: data,
      lastModified: Date.now(),
      tags: ctx.tags,
    });
  }

  async revalidateTag(tag) {
    console.log("[=== revalidateTag tag ===]", tag);

    for (let [key, value] of cache) {
      // If the value's tags include the specified tag, delete this entry
      if (value.tags.includes(tag)) {
        cache.delete(key);
      }
    }
  }
};
