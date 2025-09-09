import redis from "./services/redisClient";
import { Game } from "./types";

let running = true;

export async function startMatchmaking(io: any) {
    console.log("Matchmaking started");

    while (running) {
        try {
            const queueLength = await redis.llen("queue:games");
            if (queueLength >= 2) {
                const p1Raw = await redis.lpop("queue:games");
                const p2Raw = await redis.lpop("queue:games");

                if (!p1Raw || !p2Raw) {
                    if (p1Raw) await redis.rpush("queue:games", p1Raw);
                    if (p2Raw) await redis.rpush("queue:games", p2Raw);
                    await wait(200);
                    continue;
                }

                const player1 = JSON.parse(p1Raw);
                const player2 = JSON.parse(p2Raw);

                const p1Socket = await redis.get(`player:${player1.playerId}:socket`);
                const p2Socket = await redis.get(`player:${player2.playerId}:socket`);

                if (!p1Socket || !io.sockets.sockets.has(p1Socket)) {
                    console.log(`Player ${player1.playerId} disconnected, skipping`);
                    await redis.rpush("queue:games", JSON.stringify(player2));
                    continue;
                }

                if (!p2Socket || !io.sockets.sockets.has(p2Socket)) {
                    console.log(`Player ${player2.playerId} disconnected, skipping`);
                    await redis.rpush("queue:games", JSON.stringify(player1));
                    continue;
                }

                const gameKey = `game:${Date.now()}:${Math.floor(Math.random() * 10000)}`;
                const turnPlayer = Math.random() < 0.5 ? player1.playerId : player2.playerId;

                const game: Game = {
                    id: gameKey,
                    players: [player1.playerId, player2.playerId],
                    boards: {
                        [player1.playerId]: player1.board,
                        [player2.playerId]: player2.board,
                    },
                    turn: turnPlayer,
                    status: "waiting",
                };

                await redis.set(gameKey, JSON.stringify(game));

                for (const p of game.players) {
                    await redis.set(`player:${p}:game`, gameKey);
                }

                for (const p of game.players) {
                    const socketId = await redis.get(`player:${p}:socket`);
                    if (socketId && io.sockets.sockets.has(socketId)) {
                        io.to(socketId).emit("game.initialize", {
                            gameId: gameKey,
                            turn: game.turn,
                            players: game.players,
                        });
                    }
                }
            }
        } catch (err) {
            console.error("matchmaking error:", err);
        }

        await wait(500);
    }
}

export function stopMatchmaking() {
    running = false;
}

function wait(ms: number) {
    return new Promise((r) => setTimeout(r, ms));
}
