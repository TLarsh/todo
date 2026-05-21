import express from "express";
// const express = require('express')
const app = express();

app.use(express.json());

// // Simple CORS middleware for local development (replace with `cors` in production)
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   if (req.method === "OPTIONS") return res.sendStatus(204);
//   next();
// });


// Added endpoint to satisfy frontend requests to /api/get
app.get("/api/get", (req, res) => {
  const notes = [
    { id: 1, title: "Todo 1", content: "Buy milk" },
    { id: 2, title: "Todo 2", content: "Walk dog" }
  ];
  res.json({ success: true, notes });
});

app.listen(5000, () => {
  console.log("Server is running on port: 5000");
});