import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import useAudio, { EAudio } from "../../../hooks/useAudio";
import { useSocket } from "../../../hooks/useSocket/useSocket.ts";
import { EModalType } from "../../Modal/enums.ts";
import { ECellValue } from "../../Board/enums.ts";
import type {
  Cell,
  UseBoardStateReturn,
} from "../../Board/hooks/useBoardState.ts";
import type { ShipInfo } from "../../Setup/types.ts";
import { EInTheQueue } from "../types.ts";

interface UseGameSocketParams {
  playerId: string;
  myself: UseBoardStateReturn;
  opponent: UseBoardStateReturn;
  setTurn: Dispatch<SetStateAction<boolean>>;
  setOpponentRoots: Dispatch<SetStateAction<Record<Cell, ShipInfo>>>;
  setGameId: Dispatch<SetStateAction<string>>;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  setIsInTheQueue: Dispatch<SetStateAction<EInTheQueue>>;
  setHasPlayed: Dispatch<SetStateAction<boolean>>;
}

export function useGameSocket({
  playerId,
  myself,
  opponent,
  setTurn,
  setOpponentRoots,
  setGameId,
  setIsPlaying,
  setIsInTheQueue,
  setHasPlayed,
}: UseGameSocketParams) {
  const {
    socket,
    setOnInitialize,
    setOnNextMove,
    setOnFinished,
    setOnOpponentLeft,
  } = useSocket();
  const { playAudio } = useAudio();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<EModalType>();

  useEffect(() => {
    if (!playerId) {
      return;
    }

    setOnInitialize((data) => {
      if (!data) {
        return;
      }
      console.log("setOnInitialize", playerId);
      console.log("data", data);

      setGameId(data.gameId);
      setIsPlaying(true);
      setTurn(data.turn === playerId);
      setIsInTheQueue(EInTheQueue.Unset);
      playAudio(EAudio.GameStarted);
    });

    setOnNextMove((data) => {
      const player = data.prevTurn === playerId ? opponent : myself;
      const copy = player.state.map((row) => [...row]);

      copy[data.move.row][data.move.col] = data.move.hit
        ? ECellValue.Shot
        : ECellValue.Miss;

      playAudio(data.move.hit ? EAudio.Hit : EAudio.Miss);

      data.pointlessToShot.forEach(([row, col]) => {
        if (copy[row][col] !== ECellValue.Miss)
          copy[row][col] = ECellValue.Pointless;
      });

      player.setState(copy);
      setTurn(playerId === data.turn);

      if (data.prevTurn === playerId) {
        const newRoots = JSON.parse(data.state);
        setOpponentRoots(newRoots.roots);
      }
    });

    setOnFinished((data) => {
      setIsModalOpen(true);
      setModalType(playerId === data.winner ? EModalType.Win : EModalType.Lose);
    });

    setOnOpponentLeft(() => {
      setGameId("");
      setIsModalOpen(true);
      setHasPlayed(false);
      setIsInTheQueue(EInTheQueue.Unset);
      setModalType(EModalType.GameIsTerminated);
    });
  }, [playerId, myself, opponent]);

  return {
    socket,
    isModalOpen,
    modalType,
    setIsModalOpen,
    setModalType,
  };
}
