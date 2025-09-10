import Redis from "ioredis";

const isProduction = process.env.NODE_ENV === "production";

console.log('isProduction', isProduction)
const redisUrl = isProduction
    ? process.env.REDIS_URL!
    : process.env.REDIS_URL || "redis://127.0.0.1:6379";

const redis = new Redis(redisUrl, {  });

redis.on("error", (err) => {
    console.error("Redis error:", err);
});

redis.on("connect", () => {
    console.log(`Redis connected: ${isProduction ? "production" : "local"}`);
});

export default redis;
