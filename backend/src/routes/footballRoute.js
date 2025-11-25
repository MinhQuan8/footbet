import express from "express";
import { getFixtures, getFixture, getStatistics, getLineups } from "../controllers/footballController.js";

const router = express.Router();
router.get("/fixtures", getFixtures);
router.post("/fixtures/data", getFixture);
router.post("/fixtures/lineups", getLineups);
router.post("/fixtures/statistics", getStatistics);

export default router;
