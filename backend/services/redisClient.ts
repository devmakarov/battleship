import Redis from "ioredis";

const isProduction = process.env.NODE_ENV === "production";

console.log('REDIS_PUBLIC_URL', process.env.REDIS_PUBLIC_URL);
const redis = new Redis(process.env.REDIS_PUBLIC_URL ? process.env.REDIS_PUBLIC_URL : "redis://127.0.0.1:6379");

redis.on("error", (err) => {
    console.error("Redis error:", err);
});

redis.on("connect", () => {
    console.log(`Redis connected: ${isProduction ? "production" : "local"}`);
});

export default redis;
