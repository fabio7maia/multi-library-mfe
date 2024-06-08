/**
 * Type Branding
 */
type Brand<K, T> = K & { __type: T };

/**
 * CacheKey branded type
 */
export type CacheKey = Brand<string, "CacheKey">;

/**
 * Memory store
 */
export let cache: Record<string, any> = {};

/**
 * Helper method that returns all Branded cache keys
 * @returns The keys in the cache as CacheKeys for ejection purposes
 */
export const CacheKeys = () => Object.keys(cache) as CacheKey[];
/**
 * Flushes the cache - use at your own risk!
 */
export const CacheFlush = () => {
  const count = CacheKeys().length;
  cache = {};
  console.log(`Cleared ${count} keys`);
};
/**
 * Removes a value from the cache
 * @param key The cache key to remove from the cache
 * @returns Boolean value indicating if the deletion was successful
 */
export const CacheEject = (key: CacheKey) => delete cache[key];
/**
 * Decorator that works with the memory cache
 * @param group The group or prefix for the keys
 * @returns
 */
export const Cached = (group: string) => {
  return function (
    originalMethod: Function,
    _context: ClassMethodDecoratorContext
  ) {
    function ReplacementMethod(this: any, ...args: any[]) {
      const gennedKey = [group, ...args].map(String).join(",");
      if (!cache[gennedKey]) {
        cache[gennedKey] = originalMethod.call(this, ...args);
      }
      return cache[gennedKey];
    }
    return ReplacementMethod;
  };
};
