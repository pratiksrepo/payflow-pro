import { useState } from "react";

import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Button,
    IconButton
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import Sidebar from "./Sidebar";

import {
    getEmail
} from "../../utils/jwtHelper";

export default function Header() {

    const [drawerOpen, setDrawerOpen] =
        useState(false);

    const handleLogout = () => {

        localStorage.clear();

        window.location.href = "/login";
    };

    return (
        <>

            <AppBar
                position="sticky"
                elevation={1}
                color="inherit"
            >

                <Toolbar>

                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={() =>
                            setDrawerOpen(true)
                        }
                        sx={{
                            mr: 2
                        }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            whiteSpace: "nowrap"
                        }}
                    >
                        PayFlow Pro
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1
                        }}
                    />

                    <Typography
                        sx={{
                            mr: 2,
                            display: {
                                xs: "none",
                                sm: "block"
                            },
                            maxWidth: 250,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap"
                        }}
                    >
                        {getEmail()}
                    </Typography>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>

                </Toolbar>

            </AppBar>

            <Sidebar
                open={drawerOpen}
                onClose={() =>
                    setDrawerOpen(false)
                }
            />

        </>
    );
}