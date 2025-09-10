import Redis from "ioredis";

const isProduction = process.env.NODE_ENV === "production";

const redis = new Redis({
    host: isProduction
        ? process.env.REDIS_HOST!
        : process.env.REDIS_HOST || "redis",
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
    tls: isProduction ? {} : undefined,
});

redis.on("error", (err) => {
    console.error("Redis error:", err);
});

redis.on("connect", () => {
    console.log(`Redis connected: ${isProduction ? "production" : "local"}`);
});

export default redis;
