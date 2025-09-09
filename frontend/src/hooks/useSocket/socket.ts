import { io, type Socket } from "socket.io-client";
import { GameEvent } from "./types.ts";

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    socket = io(import.meta.env.VITE_API_URI, {
      autoConnect: true,
      transports: ["websocket"],
    });

    socket.on(GameEvent.Connect, () => {
      console.log("Socket connected:", socket?.id);
    });
  }

  return socket;
}
