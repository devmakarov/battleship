import { Server, Socket } from "socket.io";
import redis from "../../services/redisClient";
import { Game } from "../../types";

export default async function handleRegister(
    io: Server,
    socket: Socket,
    payload: { playerId?: string }
) {
    try {
        const { playerId } = payload || {};
        if (!playerId) return;

        // Register socket in Redis
        await redis.set(`player:${playerId}:socket`, socket.id);
        await redis.set(`socket:${socket.id}:player`, playerId);

        // Check if player belongs to a game
        const gameId = await redis.get(`player:${playerId}:game`);
        if (!gameId) return;

        const gameRaw = await redis.get(gameId);
        if (!gameRaw) return;

        const game: Game = JSON.parse(gameRaw);

        // Only emit if there are 2 players
        if (game.players.length < 2) return;

        // Emit game.initialize to all registered players
        for (const p of game.players) {
            const socketId = await redis.get(`player:${p}:socket`);
            if (socketId && io.sockets.sockets.has(socketId)) {
                io.to(socketId).emit("game.initialize", {
                    gameId,
                    turn: game.turn,
                    players: game.players,
                });
            }
        }

    } catch (err) {
        console.error("register handler error:", err);
    }
}
