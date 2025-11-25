import React, { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import api from "./../../services/api";
import component from "./../../components";

const { BetForm, LoadingSpinner } = component;

export default function FixturePage() {
    const { fixtureId } = useParams();
    const [fixture, setFixture] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        async function load() {
            setLoading(true);
            try {
                if (!mounted) return;

                const res = await api.get("/fixtures");
                setFixture(res.data.fixtures.find((fixture) => fixture.fixture.id == fixtureId) || {});
            } catch (err) {
                console.error(err);
            } finally {
                if (mounted) setLoading(false);
            }
        }
        load();
        return () => (mounted = false);
    }, [fixtureId]);

    if (loading)
        return (
            <div className="fixture-loading">
                <LoadingSpinner />
            </div>
        );

    if (Object.keys(fixture).length === 0)
        return (
            <Container className="fixture-root">
                <Typography className="fixture-empty">Fixture not found</Typography>
            </Container>
        );

    return (
        <Container className="fixture-root">
            <Typography className="fixture-title">
                {fixture.teams.home.name} vs {fixture.teams.away.name}
            </Typography>

            <BetForm fixture={fixture} />
        </Container>
    );
}
