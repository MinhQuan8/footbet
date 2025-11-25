import { database } from "../config/firebase.js";
import { apiFootball } from "../config/apiFootball.js";

const getCachedFixtures = async (date) => {
    const CACHE_TIME_COOLDOWN = 5 * 60 * 1000;
    const ref = database.ref("fixtures_cache/");
    const snapshot = await ref.get();
    const cache = snapshot.val();
    const now = Date.now();

    if (cache && now - cache.lastUpdated < CACHE_TIME_COOLDOWN) return { source: "cache", fixtures: cache.fixtures };

    const apiResponse = await apiFootball.get("/fixtures", {
        params: { date, timezone: "Asia/Ho_Chi_Minh" }
    });
    const fixtures = apiResponse.data.response;

    if (!fixtures) return { source: "cache", fixtures: cache.fixtures };

    await ref.set({ fixtures, lastUpdated: now });
    return { source: "api", fixtures };
};

const getFixtureData = async (fixtureId) => {
    const apiResponse = await apiFootball.get("/fixtures", {
        params: { id: fixtureId }
    });
    const fixturesData = apiResponse.data.response;

    if (!fixturesData) return { status: false, data: null };
    return { status: true, data: fixturesData };
};

const getFixtureLineups = async (fixtureId) => {
    const apiResponse = await apiFootball.get("/fixtures/lineups", {
        params: { fixture: fixtureId }
    });
    const fixturesLineups = apiResponse.data.response;

    if (!fixturesLineups) return { status: false, lineups: null };
    return { status: true, lineups: fixturesLineups };
};

const getFixtureStatistics = async (fixtureId) => {
    const apiResponse = await apiFootball.get("/fixtures/statistics", {
        params: { fixture: fixtureId }
    });

    const fixtureStatistics = apiResponse.data.response;

    if (!fixtureStatistics) return { status: false, statistics: null };
    return { status: true, statistics: fixtureStatistics };
};

export { getCachedFixtures, getFixtureData, getFixtureLineups, getFixtureStatistics };
