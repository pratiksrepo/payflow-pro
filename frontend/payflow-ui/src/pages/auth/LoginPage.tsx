import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography
} from "@mui/material";

import { useState } from "react";

import { login }
from "../../services/authService";

export default function LoginPage()
{
    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const handleLogin =
        async () =>
    {
        try
        {
            const result =
                await login({
                    email,
                    password
                });

localStorage.setItem(
    "token",
    result.data.accessToken);

localStorage.setItem(
    "refreshToken",
    result.data.refreshToken);

            alert(
                "Login Success");
        }
catch (error: unknown)
{
    console.log(error);

    alert("Invalid Login");
}
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f4f7fb"
            }}
        >
            <Card
                sx={{
                    width: 450,
                    p: 2,
                    boxShadow: 5,
                    borderRadius: 3
                }}
            >
                <CardContent>

                    <Typography
                        variant="h4"
                        gutterBottom
                        fontWeight="bold"
                    >
                        PayFlow Pro
                    </Typography>

                    <Typography
                        color="text.secondary"
                        mb={3}
                    >
                        Sign in to continue
                    </Typography>

                    <TextField
                        label="Email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) =>
                            setEmail(
                                e.target.value)}
                    />

                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value)}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{ mt: 3 }}
                        onClick={handleLogin}
                    >
                        Login
                    </Button>

                </CardContent>
            </Card>
        </Box>
    );
}