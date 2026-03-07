interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitRecord>();

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  store.forEach((record, key) => {
    if (now > record.resetAt) store.delete(key);
  });
}, 5 * 60 * 1000);

export function checkRateLimit(
  identifier: string,
  maxRequests = 5,
  windowMs = 60_000
): { success: boolean; remaining: number; resetInMs: number } {
  const now = Date.now();
  const record = store.get(identifier);

  if (!record || now > record.resetAt) {
    store.set(identifier, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: maxRequests - 1, resetInMs: windowMs };
  }

  if (record.count >= maxRequests) {
    return { success: false, remaining: 0, resetInMs: record.resetAt - now };
  }

  record.count++;
  return {
    success: true,
    remaining: maxRequests - record.count,
    resetInMs: record.resetAt - now,
  };
}
