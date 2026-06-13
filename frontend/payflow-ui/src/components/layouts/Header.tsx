import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Button
}
from "@mui/material";

import {
    getEmail
}
from "../../utils/jwtHelper";

export default function Header()
{
    const handleLogout = () =>
    {
        localStorage.clear();

        window.location.href =
            "/login";
    };

    return (
        <AppBar
            position="static"
            elevation={1}
            color="inherit"
        >
            <Toolbar>

                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700
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
                        mr: 3
                    }}
                >
                    {getEmail()}
                </Typography>

                <Button
                    variant="contained"
                    onClick={handleLogout}
                >
                    Logout
                </Button>

            </Toolbar>
        </AppBar>
    );
}