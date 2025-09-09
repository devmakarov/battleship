import { io, type Socket } from "socket.io-client";

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    socket = io(import.meta.env.VITE_API_URI, {
      autoConnect: true,
      transports: ["websocket"],
    });
  }

  return socket;
}
