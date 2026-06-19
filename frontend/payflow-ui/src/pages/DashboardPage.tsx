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

import PaymentsIcon
from "@mui/icons-material/Payments";

import CheckCircleIcon
from "@mui/icons-material/CheckCircle";

import {
    getWallet
}
from "../services/walletService";

import {
    getNotifications
}
from "../services/notificationService";

import {
    getPaymentsByUser
}
from "../services/paymentService";

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
    const [email, setEmail] =
        useState("");

    const [
        walletBalance,
        setWalletBalance
    ] =
        useState(0);

    const [
        notifications,
        setNotifications
    ] =
        useState<Notification[]>([]);

    const [
        totalPayments,
        setTotalPayments
    ] =
        useState(0);

    const [
        totalAmount,
        setTotalAmount
    ] =
        useState(0);

    const [
        successRate,
        setSuccessRate
    ] =
        useState(0);

    const [
        recentPayments,
        setRecentPayments
    ] =
        useState<any[]>([]);

    const [
        chartData,
        setChartData
    ] =
        useState<any[]>([]);

    const loadDashboardData =
        async () =>
    {
        try
        {
            const userId =
                Number(
                    getUserId()
                );

            if (!userId)
            {
                return;
            }

            setEmail(
                getEmail()
            );

            const wallet =
                await getWallet(
                    userId
                );

            setWalletBalance(
                wallet.balance
            );

            const notificationData =
                await getNotifications(
                    userId
                );

            setNotifications(
                notificationData
            );

            const payments =
                await getPaymentsByUser(
                    userId
                );

            setTotalPayments(
                payments.length
            );

            const amount =
                payments.reduce(
                    (
                        sum: number,
                        payment: any
                    ) =>
                        sum +
                        payment.amount,
                    0
                );

            setTotalAmount(
                amount
            );

            const success =
                payments.filter(
                    (
                        payment: any
                    ) =>
                        payment.status === 2
                ).length;

            const rate =
                payments.length > 0
                    ? Math.round(
                        (
                            success /
                            payments.length
                        ) * 100
                    )
                    : 0;

            setSuccessRate(
                rate
            );

            const latestPayments =
                payments.slice(
                    0,
                    5
                );

            setRecentPayments(
                latestPayments
            );

            setChartData(
                latestPayments.map(
                    (
                        payment: any,
                        index: number
                    ) => ({
                        name:
                            `P${index + 1}`,
                        amount:
                            payment.amount
                    })
                )
            );
        }
        catch (error)
        {
            console.error(
                error
            );
        }
    };

    useEffect(() =>
    {
        void loadDashboardData();
    }, []);

    return (
        <Box>

            <Typography
                variant="h4"
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
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            border:
                                "1px solid #E2E8F0"
                        }}
                    >
                        <PaymentsIcon />

                        <Typography
                            color="text.secondary"
                        >
                            Total Payments
                        </Typography>

                        <Typography
                            variant="h4"
                            fontWeight={700}
                        >
                            {totalPayments}
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
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            border:
                                "1px solid #E2E8F0"
                        }}
                    >
                        <TrendingUpIcon />

                        <Typography
                            color="text.secondary"
                        >
                            Total Amount
                        </Typography>

                        <Typography
                            variant="h4"
                            fontWeight={700}
                        >
                            ₹{totalAmount}
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
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            border:
                                "1px solid #E2E8F0"
                        }}
                    >
                        <AccountBalanceWalletIcon />

                        <Typography
                            color="text.secondary"
                        >
                            Wallet Balance
                        </Typography>

                        <Typography
                            variant="h4"
                            fontWeight={700}
                        >
                            ₹{walletBalance}
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
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            border:
                                "1px solid #E2E8F0"
                        }}
                    >
                        <CheckCircleIcon />

                        <Typography
                            color="text.secondary"
                        >
                            Success Rate
                        </Typography>

                        <Typography
                            variant="h4"
                            fontWeight={700}
                        >
                            {successRate}%
                        </Typography>
                    </Paper>
                </Grid>

            </Grid>

            <Paper
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
                        width: "100%",
                        height: 350
                    }}
                >
                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >
                        <AreaChart
                            data={chartData}
                        >
                            <XAxis
                                dataKey="name"
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
                    Recent Transactions
                </Typography>

                <List>

                    {
                        recentPayments.map(
                            (
                                payment
                            ) => (
                                <ListItem
                                    key={
                                        payment.id
                                    }
                                >
                                    <ListItemText
                                        primary={
                                            `₹${payment.amount}`
                                        }
                                        secondary={
                                            `${payment.merchantId} • ${payment.paymentMethod}`
                                        }
                                    />
                                </ListItem>
                            )
                        )
                    }

                </List>
            </Paper>

            <Paper
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
                            (
                                item
                            ) => (
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
                            )
                        )
                    }

                </List>
            </Paper>

        </Box>
    );
}