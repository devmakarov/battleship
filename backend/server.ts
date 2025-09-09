import http from "http";
import { createApp } from "./app";
import { initSocket } from "./socket";
import { startMatchmaking, stopMatchmaking } from "./matchmaking";

import redis from "./services/redisClient";
import prisma from "./services/prismaClient";
import gameRoutes from "./routes/game";

const app = createApp();
const server = http.createServer(app);

const io = initSocket(server);
app.use("/api/game", gameRoutes(io));

startMatchmaking(io).catch((err) => {
    console.error("matchmaking crashed:", err);
});

const PORT = Number(process.env.PORT) || 3000;
const serverInstance = server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

async function shutdown() {
    console.log("Shutting down server...");
    stopMatchmaking();

    serverInstance.close(async (err?: Error) => {
        if (err) console.error("Error closing server:", err);
        try {
            await redis.quit();
        } catch (e) {
            console.warn("Redis quit error:", e);
        }
        try {
            await prisma.$disconnect();
        } catch (e) {
            console.warn("Prisma disconnect error:", e);
        }
        process.exit(err ? 1 : 0);
    });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
