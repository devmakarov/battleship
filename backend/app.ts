import express from "express";
import cors from "cors";

export function createApp() {
    const app = express();

    app.use(
        cors({
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE"],
        })
    );
    app.use(express.json());

    app.get("/health", (_, res) => res.json({ ok: true }));

    return app;
}
