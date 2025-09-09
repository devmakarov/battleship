import { useState, useEffect } from "react";
import useAudio, { EAudio } from "../../../hooks/useAudio";
import { useSocket } from "../../../hooks/useSocket/useSocket.ts";
import { EModalType } from "../../Modal/enums.ts";
import { ECellValue } from "../../Board/enums.ts";
import { EInTheQueue } from "../types.ts";
import type { UseGameStateReturn } from "./useGameState.ts";

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
}: UseGameStateReturn) {
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
