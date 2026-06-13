import {
    Box,
    Drawer,
    List,
    ListItemButton,
    ListItemText,
    Toolbar,
    Typography,
    AppBar,
    Button
} from "@mui/material";

import { Outlet }
from "react-router-dom";

import DashboardIcon
from "@mui/icons-material/Dashboard";

import AccountBalanceWalletIcon
from "@mui/icons-material/AccountBalanceWallet";

import PaymentsIcon
from "@mui/icons-material/Payments";

import SecurityIcon
from "@mui/icons-material/Security";

import NotificationsIcon
from "@mui/icons-material/Notifications";

const drawerWidth = 240;

export default function DashboardLayout()
{
    const logout = () =>
    {
        localStorage.clear();

        window.location.href = "/";
    };

    return (
        <Box
            sx={{
                display: "flex"
            }}
        >
            <AppBar
                position="fixed"
                sx={{
                    zIndex: 1201
                }}
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

                    <Button
                        color="inherit"
                        onClick={logout}
                    >
                        Logout
                    </Button>

                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper":
                    {
                        width: drawerWidth,
                        boxSizing:
                            "border-box"
                    }
                }}
            >
                <Toolbar />

<List>

    <ListItemButton>
        <DashboardIcon sx={{ mr: 2 }} />
        <ListItemText
            primary="Dashboard" />
    </ListItemButton>

    <ListItemButton>
        <PaymentsIcon sx={{ mr: 2 }} />
        <ListItemText
            primary="Payments" />
    </ListItemButton>

    <ListItemButton>
        <AccountBalanceWalletIcon sx={{ mr: 2 }} />
        <ListItemText
            primary="Wallet" />
    </ListItemButton>

    <ListItemButton>
        <SecurityIcon sx={{ mr: 2 }} />
        <ListItemText
            primary="Fraud Monitoring" />
    </ListItemButton>

    <ListItemButton>
        <NotificationsIcon sx={{ mr: 2 }} />
        <ListItemText
            primary="Notifications" />
    </ListItemButton>

</List>

            </Drawer>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3
                }}
            >
                <Toolbar />

                <Outlet />

            </Box>
        </Box>
    );
}