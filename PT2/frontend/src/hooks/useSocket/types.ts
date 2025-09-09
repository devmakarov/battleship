export type EventGameInitialize = {
  gameId: string;
  turn: string;
  players: string[];
};

export type EventGameFinished = { winner: string };

export type EventGameNextMove = {
  turn: string;
  prevTurn: string;
  state: string;
  pointlessToShot: [number, number][];
  move: { row: number; col: number; hit: boolean };
};

export type EventGameOpponentLeft = {
  gameId: string;
  leftPlayer: string;
};

export enum GameEvent {
  Connect = "connect",
  Initialize = "game.initialize",
  NextMove = "game.nextMove",
  Finished = "game.finished",
  OpponentLeft = "game.opponentLeft",
}
