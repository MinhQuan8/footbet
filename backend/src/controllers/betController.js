import { database } from "../config/firebase.js";
import { getFixtureData } from "../services/footballFixturesService.js";
import { processBet } from "../services/betService.js";

const placeBet = async (req, res) => {
    try {
        const DEFAULT_BET_ODDS = 2;
        const { userId, fixtureId, teamId, amount, odds } = req.body;
        if (!userId || !fixtureId || !teamId || !amount) return res.status(400).json({ error: "Missing data" });

        const userMoneyRef = database.ref(`users/${userId}/money`);
        const userTransactionsRef = database.ref(`users/${userId}/transactions`);
        const userBetsRef = database.ref(`users/${userId}/bets`);
        const globalBetsRef = database.ref("bets");
        const currentTime = Date.now();

        const userMoney = (await userMoneyRef.get()).val();
        if (userMoney < amount) return res.status(401).json({ error: "Not enough money" });

        const betId = globalBetsRef.push({
            userId,
            status: "pending",
            lastUpdate: currentTime
        }).key;

        await userMoneyRef.set(userMoney - amount);

        await userTransactionsRef.child(betId).set({
            amount: -amount,
            type: "bet",
            createdAt: currentTime
        });

        await userBetsRef.child(betId).set({
            fixtureId,
            teamId,
            amount,
            odds: odds || DEFAULT_BET_ODDS,
            status: "pending",
            createdAt: currentTime
        });

        res.json({ status: true, betId });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
};

const checkBets = async (req, res) => {
    try {
        const UPDATE_TIME_COOLDOWN = 15 * 60 * 1000;
        const databaseData = (await database.ref().get()).val();
        const globalBetsRef = database.ref("bets");
        const globalBets = databaseData.bets;
        const updatedBetsId = [];
        const processedBetsId = {};
        const currentTime = Date.now();

        for (let index = 0; index < Object.keys(globalBets).length; index++) {
            const betId = Object.keys(globalBets)[index];
            const betStatus = globalBets[betId].status;
            const betLastUpdate = globalBets[betId].lastUpdate;
            const betUserId = globalBets[betId].userId;
            const userBet = databaseData.users[betUserId].bets[betId];

            if (betStatus != "pending" || currentTime - betLastUpdate < UPDATE_TIME_COOLDOWN) continue;

            const { status, data } = await getFixtureData(userBet.fixtureId);
            if (!status) {
                res.status(404).json({ error: "Not found bet fixture" });
                continue;
            }

            updatedBetsId.push(betId);
            if (data[0].fixture.status.long != "Match Finished") continue;

            const { away, home } = data[0].goals;
            const { amount, odds, teamId } = userBet;

            const awayId = data[0].teams.away.id;
            const homeId = data[0].teams.home.id;
            const winTeam = away > home ? awayId : away < home ? homeId : "DRAW";

            console.log(winTeam);
            console.log(teamId);
            const isWinBet = teamId == winTeam;

            await processBet(betUserId, betId, amount, odds, isWinBet);
            processedBetsId[betId] = isWinBet;
        }

        const updateGlobalBets = {};
        updatedBetsId.forEach((betId) => {
            updateGlobalBets[`${betId}/lastUpdate`] = currentTime;
        });
        Object.keys(processedBetsId).forEach((betId) => {
            updateGlobalBets[`${betId}/status`] = processedBetsId[betId] ? "win" : "lose";
        });

        globalBetsRef.update(updateGlobalBets);

        res.json({ status: true });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
};

export { placeBet, checkBets };
