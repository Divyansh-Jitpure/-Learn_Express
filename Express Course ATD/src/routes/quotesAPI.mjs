import { Router } from "express";
import { codingQuotes } from "../codingQotes.mjs";

const router = Router();

// Coding Quotes API
function getRandomNumber() {
  return Math.floor(Math.random() * 201);
}

router.get("/api/quotes", (request, response) => {
  const quote = codingQuotes[getRandomNumber()].quote;
  response.send({ quote });
});

export default router;
