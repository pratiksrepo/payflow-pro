import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Badge,
    Avatar,
    Menu,
    MenuItem
}
from "@mui/material";

import NotificationsIcon
from "@mui/icons-material/Notifications";

import {
    useState
}
from "react";

import {
    getEmail
}
from "../../utils/jwtHelper";

export default function AppHeader()
{
    const [
        anchorEl,
        setAnchorEl
    ] = useState<null | HTMLElement>(
        null);

    const handleMenuOpen =
        (
            event:
            React.MouseEvent<HTMLElement>
        ) =>
    {
        setAnchorEl(
            event.currentTarget);
    };

    const handleClose = () =>
    {
        setAnchorEl(null);
    };

    const handleLogout = () =>
    {
        localStorage.clear();

        window.location.href =
            "/";
    };

    return (
        <AppBar
            position="fixed"
            color="inherit"
            elevation={1}
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

                <IconButton>
                    <Badge
                        badgeContent={4}
                        color="error"
                    >
                        <NotificationsIcon />
                    </Badge>
                </IconButton>

                <IconButton
                    onClick={
                        handleMenuOpen
                    }
                >
                    <Avatar>
                        {
                            getEmail()
                            ?.charAt(0)
                            ?.toUpperCase()
                        }
                    </Avatar>
                </IconButton>

                <Menu
                    anchorEl={anchorEl}
                    open={
                        Boolean(anchorEl)
                    }
                    onClose={
                        handleClose
                    }
                >
                    <MenuItem>
                        {getEmail()}
                    </MenuItem>

                    <MenuItem
                        onClick={
                            handleLogout
                        }
                    >
                        Logout
                    </MenuItem>
                </Menu>

            </Toolbar>
        </AppBar>
    );
}