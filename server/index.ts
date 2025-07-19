import express from "express";
import cors from "cors";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Simple ping endpoint for health checks
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "West Hill Basketball Club API is running!" });
  });

  return app;
}
