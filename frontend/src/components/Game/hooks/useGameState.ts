import { type Dispatch, type SetStateAction, useMemo, useState } from "react";
import { EAppViews } from "../../../enums.ts";
import {
  type Cell,
  useBoardState,
  type UseBoardStateReturn,
} from "../../Board/hooks/useBoardState.ts";
import type { ShipInfo } from "../../Setup/types.ts";
import { generateBattleshipGrid, getDefaultPosition } from "../utils.ts";
import { EInTheQueue } from "../types.ts";

export interface UseGameStateReturn {
  view: EAppViews;
  setView: Dispatch<SetStateAction<EAppViews>>;

  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;

  isInTheQueue: EInTheQueue;
  setIsInTheQueue: Dispatch<SetStateAction<EInTheQueue>>;

  ships: Set<string>;
  setShips: Dispatch<SetStateAction<Set<string>>>;

  turn: boolean;
  setTurn: Dispatch<SetStateAction<boolean>>;

  savedState: number[][];
  setSavedState: Dispatch<SetStateAction<number[][]>>;

  playerId: string;
  setPlayerId: Dispatch<SetStateAction<string>>;

  gameId: string;
  setGameId: Dispatch<SetStateAction<string>>;

  opponentRoots: Record<Cell, ShipInfo>;
  setOpponentRoots: Dispatch<SetStateAction<Record<Cell, ShipInfo>>>;

  myself: UseBoardStateReturn;
  opponent: UseBoardStateReturn;

  isRandomizeDisabled: boolean;
  generateRandomPosition: () => void;
  resetPosition: () => void;

  hasPlayed: boolean;
  setHasPlayed: Dispatch<SetStateAction<boolean>>;

  isStarted: boolean;
  setIsStarted: Dispatch<SetStateAction<boolean>>;

  changeTurn: () => void;
}

export function useGameState(): UseGameStateReturn {
  const [view, setView] = useState(EAppViews.Setup);
  const [isStarted, setIsStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInTheQueue, setIsInTheQueue] = useState(EInTheQueue.Unset);
  const [ships, setShips] = useState(new Set<string>());
  const [turn, setTurn] = useState(false);
  const [savedState, setSavedState] = useState<number[][]>([]);
  const [playerId, setPlayerId] = useState("");
  const [gameId, setGameId] = useState("");
  const [hasPlayed, setHasPlayed] = useState(false);
  const [opponentRoots, setOpponentRoots] = useState<Record<Cell, ShipInfo>>(
    {},
  );
  const [hasGeneratedRandomPosition, setHasGeneratedRandomPosition] =
    useState(false);

  const myself = useBoardState({ grid: getDefaultPosition() });
  const opponent = useBoardState({
    grid: getDefaultPosition(),
    defaultRoots: opponentRoots,
  });

  const isRandomizeDisabled = useMemo(
    () => hasGeneratedRandomPosition && view === EAppViews.Setup,
    [hasGeneratedRandomPosition, view],
  );

  const generateRandomPosition = () => {
    const randomPosition = generateBattleshipGrid();
    myself.setState(randomPosition);
    if (EAppViews.Setup) setHasGeneratedRandomPosition(true);
  };

  const resetPosition = () => {
    myself.setState(getDefaultPosition());
    setView(EAppViews.Setup);
    setHasGeneratedRandomPosition(false);
  };

  const changeTurn = () => setTurn(false);

  return {
    view,
    setView,
    isPlaying,
    setIsPlaying,
    isInTheQueue,
    setIsInTheQueue,
    ships,
    setShips,
    turn,
    setTurn,
    savedState,
    setSavedState,
    playerId,
    setPlayerId,
    gameId,
    setGameId,
    opponentRoots,
    setOpponentRoots,
    myself,
    opponent,
    isRandomizeDisabled,
    generateRandomPosition,
    resetPosition,
    hasPlayed,
    setHasPlayed,
    isStarted,
    setIsStarted,
    changeTurn
  };
}
