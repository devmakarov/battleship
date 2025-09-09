import { Router } from "express";
import redis from "../services/redisClient";
import { PlayerQueueItem, Game } from "../types";
import {  Server } from "socket.io";

export default function gameRoutes(io: Server) {
    const router = Router();

    router.post("/join", async (req, res) => {
        try {
            const { board, playerName } = req.body as { board?: number[][]; playerName?: string };
            if (!board || !playerName) {
                return res.status(400).json({ error: "Missing board or playerName" });
            }

            const playerId = `player:${Date.now()}:${Math.floor(Math.random() * 10000)}`;
            const item: PlayerQueueItem = { playerId, board, playerName };

            await redis.rpush("queue:games", JSON.stringify(item));
            return res.json({ playerId });
        } catch (err) {
            console.error("POST /api/game/join error:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
    });

    router.post("/create-game", async (req, res) => {
        try {
            const gameId = `game:${Date.now()}:${Math.floor(Math.random() * 10000)}`;

            const game: Game = {
                id: gameId,
                players: [],
                boards: {},
                turn: null,
                status: "waiting",
            };

            await redis.set(gameId, JSON.stringify(game));

            return res.json({ gameId });
        } catch (err) {
            console.error("POST /api/game/create-game error:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
    });

    router.post("/join-game", async (req, res) => {
        try {
            const { board, playerName, gameId, playerId: existingPlayerId } = req.body as {
                board?: number[][];
                playerName?: string;
                gameId?: string;
                playerId?: string;
            };

            if (!board || !playerName || !gameId) {
                return res.status(400).json({ error: "Missing board, playerName, or gameId" });
            }

            const gameRaw = await redis.get(gameId);
            if (!gameRaw) return res.status(404).json({ error: "Game not found" });

            const game: Game = JSON.parse(gameRaw);

            let playerId: string;

            if (existingPlayerId && game.players.includes(existingPlayerId)) {
                playerId = existingPlayerId;
                game.boards[playerId] = board;
            } else {
                playerId = `player:${Date.now()}:${Math.floor(Math.random() * 10000)}`;
                game.players.push(playerId);
                game.boards[playerId] = board;
                await redis.set(`player:${playerId}:game`, gameId);
            }

            if (!game.turn && game.players.length === 2) {
                game.turn = Math.random() < 0.5 ? game.players[0] : game.players[1];
            }

            await redis.set(gameId, JSON.stringify(game));

            return res.json({ playerId, gameId });
        } catch (err) {
            console.error("POST /api/game/join-game error:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
    });

    router.post("/reset-game", async (req, res) => {
        const { gameId } = req.body as { gameId?: string };
        if (!gameId) return res.status(400).json({ error: "Missing gameId" });

        const gameRaw = await redis.get(gameId);
        if (!gameRaw) return res.status(404).json({ error: "Game not found" });

        await redis.set(gameId, JSON.stringify({
            id: gameId,
            players: [],
            boards: {},
            turn: null,
            status: "waiting",
        }));
        return res.json({ success: true });
    });
    return router;
}
