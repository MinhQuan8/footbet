import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

export default function LeaderboardCard({ rank, user }) {
    return (
        <Card className="leaderboardCard-root">
            <CardContent className="leaderboardCard-content">
                <div className="leaderboardCard-row">
                    <Typography className="leaderboardCard-rank">#{rank}</Typography>
                    <div className="leaderboardCard-info">
                        <Typography className="leaderboardCard-name">{user.name || user.email}</Typography>
                        <Typography className="leaderboardCard-balance">Coins: {user.money ?? 0}</Typography>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
