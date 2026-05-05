import { config } from "dotenv";
config();

import express from "express";
import cors from 'cors';
import { connectDB, disconnectDB } from "./config/db.js";

await connectDB();

import movieRoutes from "./routes/movieRoutes.js";
import transactionRoutes from "./routes/transactionsRoutes.js";
import userRoutes from "./routes/userRoutes.js";


const app = express();

app.use(cors({
  origin: 'https://opulent-space-meme-4wj9xw4jg693g4-4200.app.github.dev',
  credentials: true,
}));

app.use(express.json());


// API Routes

app.use("/movies", movieRoutes);
app.use("/transactions", transactionRoutes);
app.use("/user", userRoutes);

const PORT = 5001;

const server = app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
  console.log("DATABASE_URL =", process.env.DIRECT_URL);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

process.on("uncaughtException", async (err) => {
  console.error("uncaught Exception:", err);
  await disconnectDB();
  process.exit(1);
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});