import { useEffect, useRef } from "react";
import { Socket } from "socket.io-client";
import { getSocket } from "./socket.ts";

import {
  type EventGameFinished,
  type EventGameInitialize,
  type EventGameNextMove,
  type EventGameOnlineUpdate,
  type EventGameOpponentLeft,
  GameEvent,
} from "./types.ts";

export function useSocket() {
  const socket = useRef<Socket | null>(null);

  const onInitializeRef = useRef<((data: EventGameInitialize) => void) | null>(
    null,
  );
  const onNextMoveRef = useRef<((data: EventGameNextMove) => void) | null>(
    null,
  );
  const onFinishedRef = useRef<((data: EventGameFinished) => void) | null>(
    null,
  );
  const onOpponentLeftRef = useRef<
    ((data: EventGameOpponentLeft) => void) | null
  >(null);

  const onOnlineUpdate = useRef<((data: EventGameOnlineUpdate) => void) | null>(
    null,
  );

  const setOnInitialize = (
    callback: ((data: EventGameInitialize) => void) | null,
  ) => {
    onInitializeRef.current = callback;
  };
  const setOnNextMove = (
    callback: ((data: EventGameNextMove) => void) | null,
  ) => {
    onNextMoveRef.current = callback;
  };
  const setOnFinished = (
    callback: ((data: EventGameFinished) => void) | null,
  ) => {
    onFinishedRef.current = callback;
  };
  const setOnOpponentLeft = (
    callback: ((data: EventGameOpponentLeft) => void) | null,
  ) => {
    onOpponentLeftRef.current = callback;
  };
  const setOnOnlineUpdate = (
    callback: ((data: EventGameOnlineUpdate) => void) | null,
  ) => {
    onOnlineUpdate.current = callback;
  };

  useEffect(() => {
    const s = getSocket();
    socket.current = s;

    const handleConnect = () => {
      console.log("Connected to socket:", s.id);
    };

    const handleInitialize = (data: EventGameInitialize) => {
      onInitializeRef.current?.(data);
    };
    const handleNextMove = (data: EventGameNextMove) => {
      onNextMoveRef.current?.(data);
    };
    const handleFinished = (data: EventGameFinished) => {
      onFinishedRef.current?.(data);
    };

    const handleOpponentLeft = (data: EventGameOpponentLeft) => {
      onOpponentLeftRef.current?.(data);
    };

    const handleDisconnect = () => {
      console.log("Disconnected from socket:", s.id);
    };

    const handleOnlineUpdate = (data: EventGameOnlineUpdate) => {
      onOnlineUpdate.current?.(data);
    };

    s.on(GameEvent.Connect, handleConnect);
    s.on(GameEvent.Initialize, handleInitialize);
    s.on(GameEvent.NextMove, handleNextMove);
    s.on(GameEvent.Finished, handleFinished);
    s.on(GameEvent.OpponentLeft, handleOpponentLeft);
    s.on(GameEvent.Disconnect, handleDisconnect);
    s.on(GameEvent.OnlineUpdate, handleOnlineUpdate);

    return () => {
      s.off(GameEvent.Connect, handleConnect);
      s.off(GameEvent.Initialize, handleInitialize);
      s.off(GameEvent.NextMove, handleNextMove);
      s.off(GameEvent.Finished, handleFinished);
      s.off(GameEvent.OpponentLeft, handleOpponentLeft);
      s.off(GameEvent.Disconnect, handleDisconnect);
      s.off(GameEvent.OnlineUpdate, handleOnlineUpdate);
    };
  }, []);

  return {
    socket: socket.current,
    setOnInitialize,
    setOnNextMove,
    setOnFinished,
    setOnOpponentLeft,
    setOnOnlineUpdate,
  };
}
