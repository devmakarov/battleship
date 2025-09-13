import { Server } from "socket.io";
import handleRegister from "./handlers/register";
import makeMoveHandler from "./handlers/move";
import makeDisconnectHandler from "./handlers/disconnect";
import redis from "../services/redisClient";

export function initSocket(server: any) {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    const moveHandler = makeMoveHandler(io);
    const disconnectHandler = makeDisconnectHandler(io);

    io.on("connection", async (socket) => {
        await redis.sadd("online:sockets", socket.id);

        const count = await redis.scard("online:sockets");
        io.emit("online.count", { count });

        socket.on("register", (payload) => handleRegister(io, socket, payload));
        socket.on("game.move", (payload) => moveHandler(socket, payload));
        socket.on("disconnect", () => disconnectHandler(socket));
    });

    return io;
}
