import React, { useState } from "react";
import { Paper, Typography, RadioGroup, FormControlLabel, Radio, TextField, Button } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

export default function BetForm({ fixture }) {
    const { user } = useAuth();
    const [selection, setSelection] = useState("home");
    const [amount, setAmount] = useState("");

    const homeName = fixture.teams?.home?.name || "Home";
    const awayName = fixture.teams?.away?.name || "Away";

    const handleSubmit = async () => {
        if (!user) return alert("Please login");
        const betAmount = Number(amount);
        if (!betAmount || betAmount <= 0) return alert("Invalid amount");

        try {
            const res = await api.post("/bet", {
                userId: user.uid,
                fixtureId: fixture.fixture.id,
                teamId: fixture.teams[selection].id,
                amount: +betAmount
            });

            if (!res.data.status) alert("Failed to place bet");

            alert("Bet placed");
            setAmount("");
        } catch (err) {
            console.error(err);
            alert("Failed to place bet");
        }
    };

    return (
        <Paper className="betForm-root">
            <Typography className="betForm-title">Place Bet</Typography>

            <RadioGroup value={selection} onChange={(e) => setSelection(e.target.value)} className="betForm-select">
                <FormControlLabel value="home" control={<Radio />} label={homeName} className="betForm-option" />
                <FormControlLabel value="away" control={<Radio />} label={awayName} className="betForm-option" />
            </RadioGroup>

            <TextField className="betForm-amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} label="Amount" />

            <div className="betForm-actions">
                <Button className="betForm-submit" onClick={handleSubmit}>
                    Place Bet
                </Button>
            </div>
        </Paper>
    );
}
