import express from "express";
// const express = require('express')
import notesRoutes from "./routes/notesRoutes.js";
const app = express();

app.use(express.json());

app.use("/api/notes", notesRoutes);

// // Simple CORS middleware for local development (replace with `cors` in production)
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   if (req.method === "OPTIONS") return res.sendStatus(204);
//   next();
// });




app.listen(5000, () => {
  console.log("Server is running on port: 5000");
});