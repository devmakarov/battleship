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
import { EModalType } from "../../Modal/enums.ts";

export interface UseGameStateReturn {
  gameNumber: number;

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
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;

  modalType?: EModalType;
  setModalType: Dispatch<SetStateAction<EModalType | undefined>>;

  onReady: (state: number[][]) => void;
  finish: () => void;
  closeModal: () => void;

  isFriendGame: boolean;
  setIsFriendGame: Dispatch<SetStateAction<boolean>>;
}

export function useGameState(): UseGameStateReturn {
  const [gameNumber, setGameCount] = useState(1);
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<EModalType>();
  const [isFriendGame, setIsFriendGame] = useState<boolean>(false);
  // const [opponentRoots, setOpponentRoots] = useState<Record<Cell, ShipInfo>>(
  //   {},
  // );
  const [hasGeneratedRandomPosition, setHasGeneratedRandomPosition] =
    useState(false);

  const myself = useBoardState({ grid: getDefaultPosition() });
  const opponent = useBoardState({
    grid: getDefaultPosition(),
    hasExternalRoots: true,
    // defaultRoots: opponentRoots,
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
    setShips(new Set<string>());
  };

  const changeTurn = () => setTurn(false);

  const onReady = (state: number[][]) => {
    myself.setState(state);
    setView(EAppViews.Game);
  };

  const finish = () => {
    setGameCount(gameNumber + 1);
    setIsPlaying(false);
    setIsStarted(false);
    setTurn(false);
    myself.setState(savedState);
    myself.resetPrevMove();
    myself.resetDestroyed();

    opponent.resetState();
    opponent.resetPrevMove();
    opponent.resetDestroyed();
    opponent.setExternalRoots({});
    setHasPlayed(true);
  };

  const closeModal = () => {
    setModalType(undefined);
    setIsModalOpen(false);
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
    setOpponentRoots: opponent.setExternalRoots,
    myself,
    opponent,
    isRandomizeDisabled,
    generateRandomPosition,
    resetPosition,
    hasPlayed,
    setHasPlayed,
    isStarted,
    setIsStarted,
    changeTurn,
    isModalOpen,
    setIsModalOpen,
    modalType,
    setModalType,
    onReady,
    finish,
    closeModal,
    isFriendGame,
    setIsFriendGame,
    gameNumber,
  };
}
