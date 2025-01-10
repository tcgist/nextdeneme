const rateLimit = new Map();

export async function applyRateLimit(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || 
             request.headers.get("x-real-ip") || 
             'unknown';
             
  const now = Date.now();
  const windowStart = now - 60 * 1000; // son 1 dakika
  
  const requestTimestamps = rateLimit.get(ip) || [];
  const requestsInWindow = requestTimestamps.filter(timestamp => timestamp > windowStart);
  
  if (requestsInWindow.length >= 60) { // dakikada 60 istek limiti
    throw new Error("Rate limit exceeded");
  }
  
  requestsInWindow.push(now);
  rateLimit.set(ip, requestsInWindow);
} 