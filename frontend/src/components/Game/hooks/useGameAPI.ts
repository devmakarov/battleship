import { EInTheQueue } from "../types.ts";
import axios from "axios";
import type { Socket } from "socket.io-client";
import type { UseGameStateReturn } from "./useGameState.ts";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const useGameAPI = ({
  game,
}: {
  game: UseGameStateReturn;
  socket: Socket | null;
}) => {
  const location = useLocation();
  const gameIdFromUrl = location.pathname.split("/game/")[1];
  const joinParam = new URLSearchParams(location.search).get("join");

  const handleCreateGame = async () => {
    game.setSavedState(() => game.myself.state.map((row) => [...row]));
    game.setIsInTheQueue(EInTheQueue.WithFriend);

    const response = await axios.post(
      `${import.meta.env.VITE_API_URI}/api/game/create-game`,
      {
        board: game.myself.state,
        playerName: "guest",
      },
    );

    const { gameId } = response.data;
    game.setGameId(gameId);
    game.setIsInTheQueue(EInTheQueue.Unset);
    game.setIsFriendGame(true);

    const link = `${window.location.origin}/game/${gameId}?join=true`;
    alert(`Share this link with your friend: ${link}`);
  };

  const handleJoinRandomGame = async () => {
    game.setSavedState(() => game.myself.state.map((row) => [...row]));
    game.setIsInTheQueue(EInTheQueue.Random);

    const response = await axios.post(
      `${import.meta.env.VITE_API_URI}/api/game/join`,
      {
        board: game.myself.state,
        playerName: "guest",
      },
    );

    const { playerId, gameId } = response.data;

    game.setPlayerId(playerId);
    game.setGameId(gameId);
    game.setIsStarted(true);
  };

  const handleJoinGame = async () => {
    game.setSavedState(() => game.myself.state.map((row) => [...row]));
    game.setIsInTheQueue(EInTheQueue.WithFriend);
    game.setIsFriendGame(true);

    const response = await axios.post(
      `${import.meta.env.VITE_API_URI}/api/game/join-game`,
      {
        board: game.myself.state,
        playerName: "guest",
        gameId: game.gameId || gameIdFromUrl,
        playerId: game.playerId,
      },
    );

    const { playerId, gameId } = response.data;

    game.setPlayerId(playerId);
    game.setGameId(gameId);
    game.setIsStarted(true);
  };

  const handleResetGame = async () => {
    await axios.post(`${import.meta.env.VITE_API_URI}/api/game/reset-game`, {
      gameId: game.gameId || gameIdFromUrl,
    });
  };

  useEffect(() => {
    game.setIsFriendGame(!!gameIdFromUrl && !!joinParam);
  }, []);

  return {
    handleCreateGame,
    handleJoinRandomGame,
    handleJoinGame,
    handleResetGame,
  };
};

export { useGameAPI };
