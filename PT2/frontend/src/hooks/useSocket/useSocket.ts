import { useEffect, useState, useRef } from "react";
import { Socket } from "socket.io-client";
import { getSocket } from "./socket.ts";

import {
  type EventGameFinished,
  type EventGameInitialize,
  type EventGameNextMove,
  type EventGameOpponentLeft,
  GameEvent,
} from "./types.ts";

export function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);

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

  useEffect(() => {
    const s = getSocket();
    setSocket(s);

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

    s.on(GameEvent.Connect, () => console.log("Connected to socket:", s.id));
    s.on(GameEvent.Initialize, handleInitialize);
    s.on(GameEvent.NextMove, handleNextMove);
    s.on(GameEvent.Finished, handleFinished);
    s.on(GameEvent.OpponentLeft, handleOpponentLeft);

    return () => {
      s.off(GameEvent.Initialize, handleInitialize);
      s.off(GameEvent.NextMove, handleNextMove);
      s.off(GameEvent.Finished, handleFinished);
      s.off(GameEvent.OpponentLeft, handleOpponentLeft);
    };
  }, []);

  return {
    socket,
    setOnInitialize,
    setOnNextMove,
    setOnFinished,
    setOnOpponentLeft,
  };
}
