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

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    Tooltip
}
from "recharts";

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

const chartData = [
    { month: "Jan", amount: 1200 },
    { month: "Feb", amount: 2100 },
    { month: "Mar", amount: 1800 },
    { month: "Apr", amount: 2800 },
    { month: "May", amount: 3200 },
    { month: "Jun", amount: 4200 }
];

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
                console.error(error);
            }
        };

        void loadDashboard();
    }, []);

    return (
        <Box>

            <Typography
                variant="h3"
                sx={{
                    fontWeight: 700,
                    mb: 1
                }}
            >
                Welcome Back 👋
            </Typography>

            <Typography
                color="text.secondary"
                sx={{
                    mb: 4
                }}
            >
                {email}
            </Typography>

            <Grid
                container
                spacing={3}
            >
                <Grid
                    size={{
                        xs: 12,
                        md: 3
                    }}
                >
                    <Paper
                        elevation={2}
                        sx={{
                            p: 3,
                            borderRadius: 4
                        }}
                    >
                        <AccountBalanceWalletIcon />

                        <Typography>
                            Wallet Balance
                        </Typography>

                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700
                            }}
                        >
                            ₹{balance}
                        </Typography>

                        <Typography
                            color="success.main"
                        >
                            +12% this month
                        </Typography>
                    </Paper>
                </Grid>

                <Grid
                    size={{
                        xs: 12,
                        md: 3
                    }}
                >
                    <Paper
                        elevation={2}
                        sx={{
                            p: 3,
                            borderRadius: 4
                        }}
                    >
                        <NotificationsIcon />

                        <Typography>
                            Notifications
                        </Typography>

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

                <Grid
                    size={{
                        xs: 12,
                        md: 3
                    }}
                >
                    <Paper
                        elevation={2}
                        sx={{
                            p: 3,
                            borderRadius: 4
                        }}
                    >
                        <SecurityIcon />

                        <Typography>
                            Fraud Alerts
                        </Typography>

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

                <Grid
                    size={{
                        xs: 12,
                        md: 3
                    }}
                >
                    <Paper
                        elevation={2}
                        sx={{
                            p: 3,
                            borderRadius: 4
                        }}
                    >
                        <TrendingUpIcon />

                        <Typography>
                            Success Rate
                        </Typography>

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

            <Paper
                elevation={2}
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
                        mb: 3
                    }}
                >
                    Transaction Analytics
                </Typography>

                <Box
                    sx={{
                        height: 300
                    }}
                >
                    <ResponsiveContainer>
                        <AreaChart
                            data={chartData}
                        >
                            <XAxis
                                dataKey="month"
                            />

                            <Tooltip />

                            <Area
                                type="monotone"
                                dataKey="amount"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </Box>
            </Paper>

            <Paper
                elevation={2}
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

                <List>
                    {
                        notifications.map(
                            (item) => (
                                <ListItem
                                    key={item.id}
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
            </Paper>

        </Box>
    );
}