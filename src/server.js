import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/connectdb.js";
import initRoutes from "./routes/web.js";

dotenv.config();

const app = express();

app.use(cors({ origin: true }));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

initRoutes(app);

connectDatabase();

let port = process.env.NODE_SERVER_PORT || 9876;

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
        console.error(`Port ${port} is already in use. Stop the running server before starting a new one.`);
        process.exit(1);
    }

    throw error;
});
