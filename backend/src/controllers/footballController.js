import { getCachedFixtures, getFixtureData, getFixtureLineups, getFixtureStatistics } from "../services/footballFixturesService.js";

const getFixtures = async (req, res) => {
    try {
        const date = new Date().toISOString().split("T")[0];
        const { source, fixtures } = await getCachedFixtures(date);

        res.json({ source, fixtures });
    } catch (error) {
        console.error("Error getFixtures:", error.message);
        res.status(500).json({ error: "Server error" });
    }
};

const getFixture = async (req, res) => {
    try {
        const { fixtureId } = req.body;
        const { status, data } = await getFixtureData(fixtureId);

        res.json({ status, data });
    } catch (error) {
        console.error("Error getStatistic:", error.message);
        res.status(500).json({ error: "Server error" });
    }
};

const getLineups = async (req, res) => {
    try {
        const { fixtureId } = req.body;
        const { status, lineups } = await getFixtureLineups(fixtureId);

        res.json({ status, lineups });
    } catch (error) {
        console.error("Error getStatistic:", error.message);
        res.status(500).json({ error: "Server error" });
    }
};

const getStatistics = async (req, res) => {
    try {
        const { fixtureId } = req.body;
        const { status, statistics } = await getFixtureStatistics(fixtureId);

        res.json({ status, statistics });
    } catch (error) {
        console.error("Error getStatistic:", error.message);
        res.status(500).json({ error: "Server error" });
    }
};

export { getFixtures, getFixture, getLineups, getStatistics };
