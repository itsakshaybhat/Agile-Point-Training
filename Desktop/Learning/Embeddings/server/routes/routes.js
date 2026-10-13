import express from "express";

import { searchSnippets } from "../services/searchService.js";

const router = express.Router();

router.post("/search", async (req, res) => {
  try {
    const { query } = req.body;
    const results = await searchSnippets(query);

    res.json({ results });
  } catch (error) {
    console.error(error.message);

    if (error.message === "Query is required") {
      return res.status(400).json({ message: error.message });
    }

    if (error.message === "GEMINI_API_KEY is not configured") {
      return res.status(500).json({ message: error.message });
    }

    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
