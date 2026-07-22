import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import path from "path";
import connectDatabase from "./config/connectdb.js";
import initRoutes from "./routes/web.js";
import db from "./models";

dotenv.config();

const app = express();

app.use(cors({ origin: true }));

app.use(
    "/product-images",
    express.static(path.resolve(process.cwd(), "public", "product-images"), {
        maxAge: "1d",
    }),
);

app.use(bodyParser.json({ limit: "25mb" }));

app.use(bodyParser.urlencoded({ extended: true, limit: "25mb" }));

initRoutes(app);

let port = process.env.NODE_SERVER_PORT || 9876;
let server;
let isShuttingDown = false;

const listen = () =>
    new Promise((resolve, reject) => {
        const candidate = app.listen(port);
        candidate.once("listening", () => {
            server = candidate;
            resolve();
        });
        candidate.once("error", reject);
    });

const shutdown = async (reason, exitCode = 0) => {
    if (isShuttingDown) return;
    isShuttingDown = true;

    console.log(`Shutting down server (${reason})...`);

    if (server) {
        await new Promise((resolve) => server.close(resolve));
    }

    await db.sequelize.close();
    process.exitCode = exitCode;
};

const startServer = async () => {
    await connectDatabase();
    await listen();
    console.log(`Server running on port ${port}`);
};

startServer().catch(async (error) => {
    if (error.code === "EADDRINUSE") {
        console.error(`Port ${port} is already in use. Stop the running server before starting a new one.`);
    } else {
        console.error("Unable to start server:", error);
    }

    await shutdown("startup failure", 1);
});

process.once("SIGINT", () => void shutdown("SIGINT"));
process.once("SIGTERM", () => void shutdown("SIGTERM"));

process.on("unhandledRejection", (error) => {
    console.error("Unhandled promise rejection:", error);
    void shutdown("unhandled rejection", 1);
});

process.on("uncaughtException", (error) => {
    console.error("Uncaught exception:", error);
    void shutdown("uncaught exception", 1);
});
