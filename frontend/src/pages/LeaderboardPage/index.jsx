import React, { useEffect, useState } from "react";
import { Container, Typography, Grid } from "@mui/material";
import { database } from "../../utils/firebaseConfig";
import { ref, onValue, off } from "firebase/database";
import component from "../../components";

const { LoadingSpinner, LeaderboardCard } = component;

export default function LeaderboardPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const usersRef = ref(database, "users");
        const listener = onValue(usersRef, (snap) => {
            const rawUsers = snap.val();
            const users = Object.keys(rawUsers).map((id) => ({ id, ...rawUsers[id] }));
            users.sort((a, b) => (+b.money || 0) - (+a.money || 0));

            setUsers(users);
            setLoading(false);
        });

        return () => off(usersRef, "value", listener);
    }, []);

    return (
        <Container className="leaderboard-root">
            <Typography className="leaderboard-title">Leaderboard</Typography>

            {loading ? (
                <div className="leaderboard-loading">
                    <LoadingSpinner />
                </div>
            ) : (
                <Grid container spacing={2} className="leaderboard-grid">
                    {users.length === 0 && <Typography className="leaderboard-empty">No users</Typography>}
                    {users.map((u, idx) => (
                        <Grid item xs={12} md={6} key={u.uid} className="leaderboard-item">
                            <LeaderboardCard rank={idx + 1} user={u} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
}
