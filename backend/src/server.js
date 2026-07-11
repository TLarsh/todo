import express from "express";
// const express = require('express')
import notesRoutes from "./routes/notesRoutes.js";
import { connectDb } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve()

if (process.env.NODE_ENV !== "production") {
  app.use(cors({
    origin: "http://localhost:5173",
  }));
}

app.use(express.json());
app.use(rateLimiter);

// connectDb();
app.use("/api/notes", notesRoutes);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// // Simple CORS middleware for local development (replace with `cors` in production)
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   if (req.method === "OPTIONS") return res.sendStatus(204);
//   next();
// });




connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});