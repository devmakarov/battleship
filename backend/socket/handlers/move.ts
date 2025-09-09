import { Socket } from "socket.io";
import redis from "../../services/redisClient";
import { getBoardState } from "../../utils/getBoardState";
import { checkShipKilled } from "../../utils/checkShipKilled";
import {Game} from "../../types";

export default function makeMoveHandler(io: Socket["server"]) {
    return async function handleMove(socket: Socket, payload: { gameId?: string; playerId?: string; row?: number; col?: number }) {
        try {
            const { gameId, playerId, row, col } = payload || {};
            if (!gameId || !playerId || typeof row !== "number" || typeof col !== "number") return;

            const gameRaw = await redis.get(gameId);
            if (!gameRaw) return;

            const game = JSON.parse(gameRaw) as any;
            if (game.turn !== playerId) return;

            const opponentId = game.players.find((p: string) => p !== playerId);
            if (!opponentId) return;

            const opponentBoard = game.boards[opponentId] as number[][];

            const hit = opponentBoard[row][col] === 1;
            opponentBoard[row][col] = hit ? 2 : 3;

            const pointlessToShot = checkShipKilled(opponentBoard, row, col);
            for (const [prow, pcol] of pointlessToShot) {
                if (opponentBoard[row][col] !== 2) {
                    opponentBoard[prow][pcol] = 4;
                }
            }


            game.turn = hit ? playerId : opponentId;
            await redis.set(gameId, JSON.stringify(game));

            for (const p of game.players) {
                const socketId = await redis.get(`player:${p}:socket`);
                if (socketId && io.sockets.sockets.has(socketId)) {
                    const state = getBoardState(opponentBoard);
                    io.to(socketId).emit("game.nextMove", {
                        turn: game.turn,
                        prevTurn: playerId,
                        state: JSON.stringify(state),
                        pointlessToShot,
                        move: { row, col, hit },
                    });
                }
            }

            const opponentLost = opponentBoard.flat().every((c: number) => c !== 1);

            if (opponentLost) {
                for (const p of game.players) {
                    const socketId = await redis.get(`player:${p}:socket`);
                    if (socketId && io.sockets.sockets.has(socketId)) {
                        io.to(socketId).emit("game.finished", { winner: playerId });
                    }
                }

                game.status = "finished";
                game.finishedAt = Date.now();
                await redis.set(gameId, JSON.stringify(game));

                // Schedule deletion after 5 minutes
                setTimeout(async () => {
                    const g = await redis.get(gameId);
                    if (!g) return;
                    const gameObj = JSON.parse(g) as Game;
                    if (gameObj.status === "finished" && Date.now() - (gameObj.finishedAt || 0) > 5 * 60 * 1000) {
                        await redis.del(gameId);
                        for (const p of gameObj.players) await redis.del(`player:${p}:game`);
                        console.log(`Game ${gameId} cleaned up`);
                    }
                }, 5 * 60 * 1000);

                return;
            }

        } catch (err) {
            console.error("game.move error:", err);
        }
    };
}
