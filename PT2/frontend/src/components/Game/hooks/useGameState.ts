import { useMemo, useState } from "react";
import { EAppViews } from "../../../enums.ts";
import { type Cell, useBoardState } from "../../Board/hooks/useBoardState.ts";
import type { ShipInfo } from "../../Setup/types.ts";
import { generateBattleshipGrid, getDefaultPosition } from "../utils.ts";
import { EInTheQueue } from "../types.ts";

export function useGameState() {
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
  };
}
