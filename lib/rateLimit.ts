import { NextRequest } from "next/server";

const rateLimit = new Map<string, number[]>();
const WINDOW_MS = 60 * 1000; // 1 dakika
const MAX_REQUESTS = 60; // dakikada maksimum istek sayısı

export async function applyRateLimit(request: NextRequest) {
  const ip = request.ip || "anonymous";
  const now = Date.now();
  const windowStart = now - WINDOW_MS;

  const requestTimestamps = rateLimit.get(ip) || [];
  const requestsInWindow = requestTimestamps.filter((timestamp: number) => timestamp > windowStart);

  if (requestsInWindow.length >= MAX_REQUESTS) {
    throw new Error("Rate limit exceeded");
  }

  requestsInWindow.push(now);
  rateLimit.set(ip, requestsInWindow);
}

// Rate limit bilgilerini temizleme (opsiyonel)
setInterval(() => {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;

  rateLimit.forEach((timestamps, ip) => {
    const validTimestamps = timestamps.filter((timestamp: number) => timestamp > windowStart);
    if (validTimestamps.length === 0) {
      rateLimit.delete(ip);
    } else {
      rateLimit.set(ip, validTimestamps);
    }
  });
}, WINDOW_MS); 