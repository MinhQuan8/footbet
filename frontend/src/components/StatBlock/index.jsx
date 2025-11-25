import React from "react";
import { Paper, Typography } from "@mui/material";

export default function StatBlock({ title, homeValue, awayValue }) {
    return (
        <Paper className="statBlock-root">
            <Typography className="statBlock-title">{title}</Typography>
            <div className="statBlock-row">
                <Typography className="statBlock-home">{homeValue}</Typography>
                <Typography className="statBlock-sep">-</Typography>
                <Typography className="statBlock-away">{awayValue}</Typography>
            </div>
        </Paper>
    );
}
