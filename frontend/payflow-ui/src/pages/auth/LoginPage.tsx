import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography
}
from "@mui/material";

import { useState } from "react";

import { login }
from "../../services/authService";

export default function LoginPage()
{
    const [
        email,
        setEmail
    ] = useState("");

    const [
        password,
        setPassword
    ] = useState("");

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
                    "accessToken",
                    result.data.accessToken
                );

                localStorage.setItem(
                    "refreshToken",
                    result.data.refreshToken
                );

                window.location.href =
                    "/dashboard";
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
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f4f7fb",
                px: {
                    xs: 2,
                    sm: 3
                },
                py: {
                    xs: 3,
                    sm: 4
                },
                boxSizing: "border-box"
            }}
        >

            <Card
                sx={{
                    width: "100%",
                    maxWidth: 450,
                    p: {
                        xs: 1,
                        sm: 2
                    },
                    boxShadow: 5,
                    borderRadius: {
                        xs: 2,
                        sm: 3
                    }
                }}
            >

                <CardContent
                    sx={{
                        p: {
                            xs: 2,
                            sm: 3
                        },
                        "&:last-child": {
                            pb: {
                                xs: 2,
                                sm: 3
                            }
                        }
                    }}
                >

                    <Typography
                        variant="h4"
                        gutterBottom
                        sx={{
                            fontWeight: "bold",
                            fontSize: {
                                xs: "1.8rem",
                                sm: "2.125rem"
                            }
                        }}
                    >
                        PayFlow Pro
                    </Typography>

                    <Typography
                        color="text.secondary"
                        sx={{
                            mb: 3,
                            fontSize: {
                                xs: "0.9rem",
                                sm: "1rem"
                            }
                        }}
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
                                e.target.value
                            )
                        }
                        size="medium"
                    />

                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                        size="medium"
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{
                            mt: 3,
                            py: 1.4
                        }}
                        onClick={handleLogin}
                    >
                        Login
                    </Button>

                </CardContent>

            </Card>

        </Box>
    );
}