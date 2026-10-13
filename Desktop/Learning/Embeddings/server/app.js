import express from "express";
import cors from "cors";

import searchRoutes from "./routes/routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

app.use("/api", searchRoutes);

export default app;
