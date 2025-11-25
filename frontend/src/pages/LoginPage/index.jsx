import React, { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
    const nav = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const handle = async () => {
        try {
            await login(email, pass);
            nav("/");
        } catch (err) {
            alert("Login failed");
        } finally {
        }
    };

    return (
        <Container className="login-root">
            <Typography className="login-title">Login</Typography>

            <TextField className="login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} label="Email" />
            <TextField className="login-pass" type="password" value={pass} onChange={(e) => setPass(e.target.value)} label="Password" />

            <div className="login-actions">
                <Button className="login-submit" onClick={handle}>
                    Login
                </Button>
                <Button className="login-link" component={Link} to="/register">
                    Create account
                </Button>
            </div>
        </Container>
    );
}
