import React from "react";
import { Card, CardContent, Typography, Chip } from "@mui/material";

export default function BetCard({ bet }) {
    const placed = bet.placedAt ? new Date(bet.placedAt).toLocaleString() : "";
    return (
        <Card className="betCard-root">
            <CardContent className="betCard-content">
                <Typography className="betCard-title">
                    {bet.teams?.home} vs {bet.teams?.away}
                </Typography>

                <Typography className="betCard-line">Selection: {bet.selection}</Typography>
                <Typography className="betCard-line">Amount: {bet.amount}</Typography>
                <Typography className="betCard-line">Potential: {bet.payoutIfWin}</Typography>

                <div className="betCard-meta">
                    <Chip label={bet.status || "pending"} className="betCard-status" />
                    <Typography className="betCard-time">{placed}</Typography>
                </div>
            </CardContent>
        </Card>
    );
}
