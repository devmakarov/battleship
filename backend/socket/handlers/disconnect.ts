import { Socket } from "socket.io";
import redis from "../../services/redisClient";

export default function makeDisconnectHandler(io: Socket["server"]) {
    return async function handleDisconnect(socket: Socket) {
        try {
            await redis.srem("online:sockets", socket.id);
            const count = await redis.scard("online:sockets");
            io.emit("online.count", { count });

            const playerId = await redis.get(`socket:${socket.id}:player`);
            if (!playerId) return;

            await redis.del(`socket:${socket.id}:player`);
            await redis.del(`player:${playerId}:socket`);

            const gameId = await redis.get(`player:${playerId}:game`);
            if (!gameId) return;

            const gameRaw = await redis.get(gameId);
            if (!gameRaw) {
                await redis.del(`player:${playerId}:game`);
                return;
            }

            const game = JSON.parse(gameRaw) as any;
            const opponentId = game.players.find((p: string) => p !== playerId);

            if (opponentId) {
                const opponentSocket = await redis.get(`player:${opponentId}:socket`);
                if (opponentSocket && io.sockets.sockets.has(opponentSocket)) {
                    io.to(opponentSocket).emit("game.opponentLeft", {
                        gameId,
                        leftPlayer: playerId,
                    });
                }
            }

            await redis.del(gameId);
            for (const p of game.players) {
                await redis.del(`player:${p}:game`);
            }
        } catch (err) {
            console.error("disconnect handler error:", err);
        }
    };
}
