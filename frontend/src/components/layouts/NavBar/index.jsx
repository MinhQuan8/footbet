import React from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <AppBar className="navbar-root">
            <Toolbar className="navbar-toolbar">
                <Typography className="navbar-title">Football Bet</Typography>

                <div className="navbar-links">
                    <Button className="navbar-link" component={Link} to="/">
                        Home
                    </Button>
                    <Button className="navbar-link" component={Link} to="/leaderboard">
                        Leaderboard
                    </Button>
                </div>

                <div className="navbar-actions">
                    {!user && (
                        <Button className="navbar-action" component={Link} to="/login">
                            Login
                        </Button>
                    )}
                    {!user && (
                        <Button className="navbar-action" component={Link} to="/register">
                            Register
                        </Button>
                    )}
                    {user && (
                        <Button className="navbar-action" component={Link} to="/bets">
                            MyBets
                        </Button>
                    )}
                    {user && (
                        <Button className="navbar-action" component={Link} to="/profile">
                            Profile
                        </Button>
                    )}
                    {user && (
                        <Button className="navbar-action" onClick={logout}>
                            Logout
                        </Button>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
}
