/**
 * In-Memory Sliding Window Rate Limiter Middleware for public endpoints
 * Protects RFQ and Contact submission routes against automated spam and abuse.
 */
export const rateLimit = ({ windowMs = 15 * 60 * 1000, max = 15, message = 'Too many requests from this IP, please try again later.' }) => {
  const requests = new Map();

  // Periodic cleanup of expired IP records every 5 minutes
  setInterval(() => {
    const now = Date.now();
    for (const [ip, data] of requests.entries()) {
      if (now - data.startTime > windowMs) {
        requests.delete(ip);
      }
    }
  }, 5 * 60 * 1000).unref();

  return (req, res, next) => {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown-ip';
    const now = Date.now();

    if (!requests.has(ip)) {
      requests.set(ip, {
        count: 1,
        startTime: now,
      });
      return next();
    }

    const clientData = requests.get(ip);

    if (now - clientData.startTime > windowMs) {
      clientData.count = 1;
      clientData.startTime = now;
      return next();
    }

    clientData.count += 1;

    if (clientData.count > max) {
      return res.status(429).json({
        success: false,
        message,
        retryAfterMinutes: Math.ceil((clientData.startTime + windowMs - now) / (60 * 1000)),
      });
    }

    next();
  };
};
