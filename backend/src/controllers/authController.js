import { database } from "../config/firebase.js";

const registerUser = async (req, res) => {
    try {
        const INITIAL_MONEY = 1000;
        const { id, name, email, pass } = req.body;
        if (!id || !name || !email || !pass) return res.status(400).json({ error: "Missing data" });

        const userRef = database.ref(`users/${id}`);
        await userRef.set({
            name,
            email,
            pass,
            money: INITIAL_MONEY,
            createdAt: Date.now()
        });

        res.json({ status: true });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
};

export { registerUser };
