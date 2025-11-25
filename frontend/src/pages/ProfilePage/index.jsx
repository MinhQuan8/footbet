import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Card, CardContent } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { database } from "../../utils/firebaseConfig";
import { ref, onValue } from "firebase/database";

export default function ProfilePage() {
    const { user, logout } = useAuth();
    const [userData, setUserData] = useState({});
    const [userName, setUserName] = useState("");
    const [userMoney, setUserMoney] = useState(0);
    const [userBets, setUserBets] = useState([]);

    useEffect(() => {
        if (!user) return;

        const userDataRef = ref(database, `users/${user.uid}`);
        onValue(userDataRef, (snap) => {
            setUserData(snap.val());
        });
    }, [user]);

    useEffect(() => {
        if (Object.keys(userData).length === 0) return;

        setUserName(userData.name);
        setUserMoney(userData.money);
        setUserBets(Object.values(userData.bets));
    }, [userData]);

    if (!user)
        return (
            <Container className="profile-root">
                <Typography className="profile-login">Please login</Typography>
            </Container>
        );

    return (
        <Container className="profile-root">
            <Typography className="profile-title">Profile</Typography>
            <Typography className="profile-line">Name: {userName}</Typography>
            <Typography className="profile-line">Email: {user.email}</Typography>
            <Typography className="profile-line">Money: {userMoney}</Typography>

            <div className="profile-actions">
                <Button className="profile-button" onClick={logout}>
                    Logout
                </Button>
            </div>

            <Typography className="profileBetsTitle">My Bets</Typography>

            {userBets.length === 0 && <Typography className="profileNoBets">You have no bets yet.</Typography>}

            {userBets.map((bet, index) => (
                <Card className="profileBetCard" key={index}>
                    <CardContent className="profileBetCardContent">
                        <Typography className="profileBetFixture">Fixture: {bet.fixtureId}</Typography>

                        <Typography className="profileBetTeam">Bet On: {bet.teamId}</Typography>

                        <Typography className="profileBetAmount">Amount: {bet.amount}</Typography>

                        <Typography className="profileBetResult">Result: {bet.status}</Typography>
                    </CardContent>
                </Card>
            ))}
        </Container>
    );
}
