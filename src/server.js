import { config } from "dotenv";
config();

import express from "express";
import cors from 'cors';
import { connectDB, disconnectDB } from "./config/db.js";

await connectDB();

import movieRoutes from "./routes/movieRoutes.js";
import transactionRoutes from "./routes/transactionsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import accountRoutes from './routes/accountRoutes.js';

const app = express();

const allowedOrigins = process.env.CORS_ORIGINS.split(',')

//enable cors

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());


// API Routes

app.use("/movies", movieRoutes);
app.use("/transactions", transactionRoutes);
app.use("/user", userRoutes);
app.use("/categories", categoryRoutes);
app.use("/login", authRoutes);
app.use("/accounts", accountRoutes);


const PORT = 5001;

const server = app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
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