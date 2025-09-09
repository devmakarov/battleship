export type PlayerQueueItem = {
    playerId: string;
    board: number[][];
    playerName?: string;
};

export type Game = {
    id: string;
    players: string[];
    boards: Record<string, number[][]>;
    turn: string | null;
    status: "waiting" | "playing" | "finished";
    finishedAt?: number; // timestamp for cleanup
};
