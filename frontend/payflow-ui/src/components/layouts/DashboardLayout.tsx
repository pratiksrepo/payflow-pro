import {
    AppBar,
    Avatar,
    Badge,
    Box,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
}
    from "@mui/material";

import {
    Outlet,
    useLocation,
    useNavigate
}
    from "react-router-dom";

import DashboardIcon
    from "@mui/icons-material/Dashboard";

import PaymentsIcon
    from "@mui/icons-material/Payments";

import AccountBalanceWalletIcon
    from "@mui/icons-material/AccountBalanceWallet";

import NotificationsIcon
    from "@mui/icons-material/Notifications";

import LogoutIcon
    from "@mui/icons-material/Logout";

import AdminPanelSettingsIcon
    from "@mui/icons-material/AdminPanelSettings";
import { getRole } from "../../utils/jwtHelper";

const drawerWidth = 260;

export default function DashboardLayout() {
    const navigate =
        useNavigate();

    const location =
        useLocation();

    const logout = () => {
        localStorage.clear();

        navigate("/");
    };

    const role =
        getRole();
console.log(getRole());

    return (
        
        <Box
            sx={{
                display: "flex",
                minHeight: "100vh",
                backgroundColor:
                    "background.default"
            }}
        >
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    backgroundColor:
                        "background.paper",

                    color:
                        "text.primary",

                    borderBottom:
                        "1px solid #E2E8F0",

                    zIndex: 1300
                }}
            >
                <Toolbar>

                    <Typography
                        variant="h5"
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

                    <Avatar
                        sx={{
                            ml: 2
                        }}
                    >
                        {
                            getRole() === "Admin"
                                ? "A"
                                : "U"
                        }
                    </Avatar>

                    <IconButton
                        sx={{
                            ml: 2
                        }}
                        onClick={logout}
                    >
                        <LogoutIcon />
                    </IconButton>

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
                            "border-box",

                        backgroundColor:
                            "background.paper",

                        borderRight:
                            "1px solid #E2E8F0"
                    }
                }}
            >
                <Toolbar />

                <List
                    sx={{
                        mt: 2,
                        px: 2
                    }}
                >
                    <ListItemButton
                        selected={
                            location.pathname ===
                            "/dashboard/payments"
                        }
                        onClick={() =>
                            navigate("/dashboard/payments")
                        }
                        sx={{
                            borderRadius: 3,
                            mb: 1
                        }}
                    >
                        <ListItemIcon>
                            <PaymentsIcon />
                        </ListItemIcon>

                        <ListItemText
                            primary="Payments"
                        />
                    </ListItemButton>

                    <ListItemButton
                        selected={
                            location.pathname ===
                            "/dashboard/wallet"
                        }
                        onClick={() =>
                            navigate("/dashboard/wallet")
                        }
                        sx={{
                            borderRadius: 3,
                            mb: 1
                        }}
                    >
                        <ListItemIcon>
                            <AccountBalanceWalletIcon />
                        </ListItemIcon>

                        <ListItemText
                            primary="Wallet"
                        />
                    </ListItemButton>

                    <ListItemButton
                        selected={
                            location.pathname ===
                            "/dashboard/notifications"
                        }
                        onClick={() =>
                            navigate("/dashboard/notifications")
                        }
                        sx={{
                            borderRadius: 3
                        }}
                    >
                        <ListItemIcon>
                            <NotificationsIcon />
                        </ListItemIcon>

                        <ListItemText
                            primary="Notifications"
                        />
                    </ListItemButton>


                    {
                        role === "Admin" && (

                            <ListItemButton
                                selected={
                                    location.pathname ===
                                    "/dashboard/admin"
                                }
                                onClick={() =>
                                    navigate("/dashboard/admin")
                                }
                                sx={{
                                    borderRadius: 3,
                                    mt: 1
                                }}
                            >
                                <ListItemIcon>
                                    <AdminPanelSettingsIcon />
                                </ListItemIcon>

                                <ListItemText
                                    primary="Admin"
                                />
                            </ListItemButton>

                        )
                    }
                </List>
            </Drawer>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 4,
                    mt: "64px"
                }}
            >
                <Outlet />
            </Box>

        </Box>
    );
}