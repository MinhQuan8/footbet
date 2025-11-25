import React from "react";
import { Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";

export default function FixtureInfoTable({ fx, score }) {
    const kickoff = fx.fixture?.date ? new Date(fx.fixture.date).toLocaleString() : "";
    const league = fx.league?.name || "";
    const home = fx.teams?.home?.name || "Home";
    const away = fx.teams?.away?.name || "Away";
    const homeGoals = score?.home ?? "-";
    const awayGoals = score?.away ?? "-";
    const status = fx.fixture?.status?.short || fx.fixture?.status?.long || "NS";

    return (
        <div className="fixtureInfo-root">
            <Typography className="fixtureInfo-league">{league}</Typography>

            <Table className="fixtureInfo-table">
                <TableBody>
                    <TableRow>
                        <TableCell className="fixtureInfo-cell">Kickoff</TableCell>
                        <TableCell className="fixtureInfo-cell">{kickoff}</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell className="fixtureInfo-cell">Home</TableCell>
                        <TableCell className="fixtureInfo-cell">
                            {home} ({homeGoals})
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell className="fixtureInfo-cell">Away</TableCell>
                        <TableCell className="fixtureInfo-cell">
                            {away} ({awayGoals})
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell className="fixtureInfo-cell">Status</TableCell>
                        <TableCell className="fixtureInfo-cell">{status}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}
