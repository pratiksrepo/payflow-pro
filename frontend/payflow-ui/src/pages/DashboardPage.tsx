import {
    Box,
    Grid,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText
}
from "@mui/material";

import {
    useEffect,
    useState
}
from "react";

import AccountBalanceWalletIcon
from "@mui/icons-material/AccountBalanceWallet";

import NotificationsIcon
from "@mui/icons-material/Notifications";

import SecurityIcon
from "@mui/icons-material/Security";

import TrendingUpIcon
from "@mui/icons-material/TrendingUp";

import {
    getWallet
}
from "../services/walletService";

import {
    getNotifications
}
from "../services/notificationService";

import {
    getUserId,
    getEmail
}
from "../utils/jwtHelper";

import type {
    Notification
}
from "../types/Notification";

export default function DashboardPage()
{
    const [balance, setBalance] =
        useState<number>(0);

    const [email, setEmail] =
        useState<string>("");

    const [
        notifications,
        setNotifications
    ] = useState<Notification[]>([]);

    useEffect(() =>
    {
        const loadDashboard =
            async () =>
        {
            try
            {
                const userId =
                    getUserId();

                if (!userId)
                {
                    return;
                }

                setEmail(
                    getEmail());

                const wallet =
                    await getWallet(
                        userId);

                setBalance(
                    wallet.balance);

                const notificationData =
                    await getNotifications(
                        userId);

                setNotifications(
                    notificationData);
            }
            catch (error)
            {
                console.error(
                    "Dashboard Error:",
                    error);
            }
        };

        void loadDashboard();
    }, []);

    return (
        <Box>

            {/* Welcome Section */}

            <Box
                sx={{
                    mb: 4
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 700
                    }}
                >
                    Welcome Back 👋
                </Typography>

                <Typography
                    color="text.secondary"
                >
                    {email}
                </Typography>
            </Box>

            {/* Statistics Cards */}

            <Grid
                container
                spacing={3}
            >

                {/* Wallet */}

                <Grid
                    size={{
                        xs: 12,
                        md: 3
                    }}
                >
                    <Paper
                        elevation={4}
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            transition: "0.3s",
                            "&:hover":
                            {
                                transform:
                                    "translateY(-5px)"
                            }
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                mb: 2
                            }}
                        >
                            <AccountBalanceWalletIcon />

                            <Typography>
                                Wallet Balance
                            </Typography>
                        </Box>

                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700
                            }}
                        >
                            ₹{balance}
                        </Typography>
                    </Paper>
                </Grid>

                {/* Notifications */}

                <Grid
                    size={{
                        xs: 12,
                        md: 3
                    }}
                >
                    <Paper
                        elevation={4}
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            transition: "0.3s",
                            "&:hover":
                            {
                                transform:
                                    "translateY(-5px)"
                            }
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                mb: 2
                            }}
                        >
                            <NotificationsIcon />

                            <Typography>
                                Notifications
                            </Typography>
                        </Box>

                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700
                            }}
                        >
                            {notifications.length}
                        </Typography>
                    </Paper>
                </Grid>

                {/* Fraud Alerts */}

                <Grid
                    size={{
                        xs: 12,
                        md: 3
                    }}
                >
                    <Paper
                        elevation={4}
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            transition: "0.3s",
                            "&:hover":
                            {
                                transform:
                                    "translateY(-5px)"
                            }
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                mb: 2
                            }}
                        >
                            <SecurityIcon />

                            <Typography>
                                Fraud Alerts
                            </Typography>
                        </Box>

                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700
                            }}
                        >
                            0
                        </Typography>
                    </Paper>
                </Grid>

                {/* Success Rate */}

                <Grid
                    size={{
                        xs: 12,
                        md: 3
                    }}
                >
                    <Paper
                        elevation={4}
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            transition: "0.3s",
                            "&:hover":
                            {
                                transform:
                                    "translateY(-5px)"
                            }
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                mb: 2
                            }}
                        >
                            <TrendingUpIcon />

                            <Typography>
                                Success Rate
                            </Typography>
                        </Box>

                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700
                            }}
                        >
                            100%
                        </Typography>
                    </Paper>
                </Grid>

            </Grid>

            {/* Notifications Panel */}

            <Paper
                elevation={4}
                sx={{
                    mt: 4,
                    p: 3,
                    borderRadius: 4
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        mb: 2
                    }}
                >
                    Recent Notifications
                </Typography>

                {
                    notifications.length === 0
                        ? (
                            <Typography
                                color="text.secondary"
                            >
                                No notifications found
                            </Typography>
                        )
                        : (
                            <List>
                                {
                                    notifications.map(
                                        (item) => (
                                            <ListItem
                                                key={
                                                    item.id
                                                }
                                            >
                                                <ListItemText
                                                    primary={
                                                        item.title
                                                    }
                                                    secondary={
                                                        item.message
                                                    }
                                                />
                                            </ListItem>
                                        ))
                                }
                            </List>
                        )
                }
            </Paper>

        </Box>
    );
}