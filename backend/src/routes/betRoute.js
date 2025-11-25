import express from "express";
import { checkBets, placeBet } from "../controllers/betController.js";

const router = express.Router();
router.post("/bet", placeBet);
router.get("/bet/check", checkBets);

export default router;
