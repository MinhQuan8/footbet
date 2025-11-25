import React, { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function RegisterPage() {
    const { register } = useAuth();
    const nav = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const handle = async () => {
        try {
            const cred = await register(email, pass);
            const uid = cred.user.uid;
            const res = await api.post("/auth/register", { name, email, pass, id: uid });

            if (!res.data.status) alert("Register failed");
            nav("/");
        } catch (err) {
            console.log(err);
            alert("Register failed");
        } finally {
        }
    };

    return (
        <Container className="register-root">
            <Typography className="register-title">Register</Typography>

            <TextField className="register-email" type="text" value={name} onChange={(e) => setName(e.target.value)} label="Name" />
            <TextField className="register-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} label="Email" />
            <TextField className="register-pass" type="password" value={pass} onChange={(e) => setPass(e.target.value)} label="Password" />

            <div className="register-actions">
                <Button className="register-submit" onClick={handle}>
                    Register
                </Button>
            </div>
        </Container>
    );
}
