import { database } from "../config/firebase.js";

const processBet = async (userId, betId, betAmount, betOdds, isWin) => {
    const userRef = database.ref(`users/${userId}`);
    const userTransactionRef = database.ref(`users/${userId}/transaction`);
    const userData = (await userRef.get()).val();
    const updateUserData = {};
    const winMoney = betAmount * betOdds;
    const currentTime = Date.now();

    updateUserData[`bets/${betId}/status`] = isWin ? "win" : "lose";
    if (isWin) {
        updateUserData.money = userData.money + winMoney;
        updateUserData[`transactions/${userTransactionRef.push().key}`] = {
            amount: +winMoney,
            type: "winBet",
            createdAt: currentTime
        };
    }

    await userRef.update(updateUserData);
};

export { processBet };
