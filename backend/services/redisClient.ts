import Redis from "ioredis";

const isProduction = process.env.NODE_ENV === "production";

const redis = new Redis({
    host: isProduction
        ? process.env.REDISHOST!
        : process.env.REDISHOST || "redis",
    port: Number(process.env.REDISPORT) || 6379,
    password: process.env.REDISPASSWORD || undefined,
    tls: isProduction ? {} : undefined,
});

redis.on("error", (err) => {
    console.error("Redis error:", err);
});

redis.on("connect", () => {
    console.log(`Redis connected: ${isProduction ? "production" : "local"}`);
});

export default redis;
