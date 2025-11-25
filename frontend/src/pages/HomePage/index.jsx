import React, { useEffect, useState } from "react";
import { Container, Typography, Grid } from "@mui/material";
import api from "./../../services/api";
import component from "./../../components";

const { FixtureCard, LoadingSpinner } = component;

export default function HomePage() {
    const [fixtures, setFixtures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [source, setSource] = useState("");

    useEffect(() => {
        let mounted = true;
        async function load() {
            setLoading(true);
            try {
                if (!mounted) return;

                const res = await api.get("/fixtures");
                setFixtures(res.data.fixtures || []);
                setSource(res.data.source || "");
            } catch (err) {
                console.error(err);
            } finally {
                if (mounted) setLoading(false);
            }
        }
        load();
        return () => (mounted = false);
    }, []);

    return (
        <Container className="homePage-root">
            <Typography className="homePage-title">Today's Fixtures</Typography>
            <Typography className="homePage-source">Source: {source}</Typography>

            {loading ? (
                <div className="homePage-loading">
                    <LoadingSpinner />
                </div>
            ) : (
                <Grid container spacing={2} className="homePage-grid">
                    {fixtures.length === 0 && <Typography className="homePage-empty">No fixtures</Typography>}
                    {fixtures.map((fx) => (
                        <Grid item xs={12} md={6} lg={4} key={fx.fixture.id} className="homePage-item">
                            <FixtureCard fixture={fx} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
}
