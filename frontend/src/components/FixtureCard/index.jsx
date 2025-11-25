import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function FixtureCard({ fixture }) {
    const home = fixture.teams?.home?.name || "Home";
    const away = fixture.teams?.away?.name || "Away";
    const date = fixture.fixture?.date ? new Date(fixture.fixture.date).toLocaleString() : "";

    return (
        <Card className="fixtureCard-root">
            <CardContent className="fixtureCard-content">
                <Typography className="fixtureCard-league">{fixture.league?.name}</Typography>

                <div className="fixtureCard-row">
                    <Typography className="fixtureCard-team">{home}</Typography>
                    <Typography className="fixtureCard-vs">vs</Typography>
                    <Typography className="fixtureCard-team">{away}</Typography>
                </div>

                <Typography className="fixtureCard-time">{date}</Typography>

                <div className="fixtureCard-actions">
                    <Button className="fixtureCard-button" component={Link} to={`/fixture/${fixture.fixture.id}`}>
                        Details & Bet
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
