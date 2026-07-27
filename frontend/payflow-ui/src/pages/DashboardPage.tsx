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
    BarChart,
    Bar,
    YAxis,
    CartesianGrid,
    Legend,
    PieChart,
    Pie,
    Cell
}
    from "recharts";

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

import DashboardSection
    from "../components/DashboardSection";

import {
    Divider,
    Chip
}
    from "@mui/material";

import AccountBalanceWalletIcon
    from "@mui/icons-material/AccountBalanceWallet";


import PaymentsIcon
    from "@mui/icons-material/Payments";



import DashboardCard
    from "../components/DashboardCard";

import PeopleIcon
    from "@mui/icons-material/People";

import SecurityIcon
    from "@mui/icons-material/Security";


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
import { getFraudDashboard } from "../services/fraudService";

import {
    getRole
}
    from "../utils/jwtHelper";
import PageHeader from "../components/PageHeader";

export default function DashboardPage() {
    const [email, setEmail] =
        useState("");

    const CHART_COLORS =
        [
            "#1976d2",
            "#2e7d32",
            "#ed6c02",
            "#d32f2f"
        ];



    const [
        walletBalance,
        setWalletBalance
    ] =
        useState(0);

    const role =
        getRole();

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

    const [
        fraudDashboard,
        setFraudDashboard
    ] = useState<any>(null);

    const fraudPieData =
        [
            {
                name: "Safe",
                value: fraudDashboard?.safeTransactions ?? 0
            },
            {
                name: "Flagged",
                value: fraudDashboard?.flaggedTransactions ?? 0
            },
            {
                name: "High Risk",
                value: fraudDashboard?.highRiskCount ?? 0
            }
        ];



    const loadDashboardData =
        async () => {
            try {

                const userId =
                    Number(
                        getUserId()
                    );

                if (!userId) {
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



                const fraud =
                    await getFraudDashboard();

                setFraudDashboard(
                    fraud
                );

                setChartData(
                    latestPayments.map(
                        (
                            p: any,
                            index: number
                        ) => ({
                            name: `P${index + 1}`,
                            amount: p.amount
                        })
                    )
                );

                console.log(
                    "Chart Loaded",
                    latestPayments
                );
            }
            catch (error) {
                console.error(
                    error
                );
            }
        };

    useEffect(() => {
        void loadDashboardData();
    }, []);

    return (

        <Box>

            {/* <Typography
                variant="h4"
                sx={{
                    fontWeight: 700,
                    mb: 1
                }}
            >
                Welcome Back 👋

                {
                    role === "Admin"
                        ? " Admin"
                        : ""
                }
            </Typography> */}

            <PageHeader
                title="Dashboard"
                subtitle={`Welcome back, ${role}! Here's your business overview for today.`}
            />

            <Typography
                color="text.secondary"
                sx={{
                    mb: 4
                }}
            >
                Signed as:- {email}

            </Typography>

            <Grid
                container
                spacing={3}
            >

                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 3
                    }}
                >

                    <DashboardCard

                        title="Users"

                        value={totalPayments}
                        subtitle="Registered Users"

                        icon={<PeopleIcon />}

                        color="#1976d2"

                        trend={12}

                    />

                </Grid>

                <Grid
                    size={{
                        xs: 12,
                        md: 3
                    }}
                >

                    <DashboardCard

                        title="Payments"

                        value={totalPayments}
                        subtitle="Transactions"

                        icon={<PaymentsIcon />}

                        color="#2e7d32"

                    />

                </Grid>

                <Grid
                    size={{
                        xs: 12,
                        md: 3
                    }}
                >

                    <DashboardCard

                        title="Wallet"

                        value={`₹${walletBalance}`}

                        subtitle="Current Balance"

                        icon={<AccountBalanceWalletIcon />}

                        color="#ed6c02"

                    />

                </Grid>

                <Grid
                    size={{
                        xs: 12,
                        md: 3
                    }}
                >

                    <DashboardCard

                        title="Fraud Alerts"

                        value={
                            fraudDashboard?.highRiskCount ?? 0
                        }

                        subtitle="High Risk"

                        icon={<SecurityIcon />}

                        color="#d32f2f"

                    />

                </Grid>

            </Grid>

            <Typography
                variant="h5"
                sx={{
                    fontWeight: 700,
                    mt: 4,
                    mb: 2,

                }}
            >
                Fraud Analytics
            </Typography>

            <Grid
                container
                spacing={3}
            >
                <Grid size={{ xs: 12, md: 3 }}>
                    <Paper
                        sx={{
                            p: 3,
                            mt: 4,
                            borderRadius: 4
                        }}
                    >
                        <Typography color="error">
                            Fraud Rate
                        </Typography>

                        <Typography
                            variant="h4"
                            fontWeight={700}
                        >
                            {fraudDashboard?.fraudRate ?? 0}%
                        </Typography>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <Paper
                        sx={{
                            p: 3,
                            mt: 4,
                            borderRadius: 4
                        }}
                    >
                        <Typography>
                            Safe Transactions
                        </Typography>

                        <Typography
                            variant="h4"
                            fontWeight={700}
                        >
                            {fraudDashboard?.safeTransactions ?? 0}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <Paper
                        sx={{
                            p: 3,
                            mt: 4,
                            borderRadius: 4
                        }}
                    >
                        <Typography>
                            Flagged
                        </Typography>

                        <Typography
                            variant="h4"
                            fontWeight={700}
                        >
                            {fraudDashboard?.flaggedTransactions ?? 0}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <Paper
                        sx={{
                            p: 3,
                            mt: 4,
                            borderRadius: 4
                        }}
                    >
                        <Typography>
                            High Risk
                        </Typography>

                        <Typography
                            variant="h4"
                            fontWeight={700}
                        >
                            {fraudDashboard?.highRiskCount ?? 0}
                        </Typography>
                    </Paper>
                </Grid>

            </Grid>

            <Paper

                elevation={3}

                sx={{
                    p: 3,
                    mt: 4,
                    borderRadius: 4
                }}

            >

                <Typography

                    variant="h6"

                    fontWeight={700}

                    mb={3}

                >

                    Payment Analytics

                </Typography>

                <Box
                    sx={{
                        width: "100%",
                        height: 350
                    }}
                >

                    <ResponsiveContainer>

                        <BarChart
                            data={chartData}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="name"
                            />

                            <YAxis />

                            <Tooltip />

                            <Legend />

                            <Bar

                                dataKey="amount"

                                radius={[8, 8, 0, 0]}

                                fill="#1976d2"

                            />

                        </BarChart>

                    </ResponsiveContainer>

                </Box>

            </Paper>

            <Paper

                elevation={3}

                sx={{
                    mt: 4,
                    p: 3,
                    borderRadius: 4
                }}

            >

                <Typography

                    variant="h6"

                    fontWeight={700}

                    mb={3}

                >

                    Wallet Growth

                </Typography>

                <Box
                    sx={{
                        width: "100%",
                        height: 300
                    }}
                >

                    <ResponsiveContainer>

                        <AreaChart
                            data={chartData}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="name"
                            />

                            <YAxis />

                            <Tooltip />

                            <Area

                                type="monotone"

                                dataKey="amount"

                                stroke="#2e7d32"

                                fill="#81c784"

                            />

                        </AreaChart>

                    </ResponsiveContainer>

                </Box>

            </Paper>

            <Paper

                elevation={3}

                sx={{
                    mt: 4,
                    p: 3,
                    borderRadius: 4
                }}

            >

                <Typography

                    variant="h6"

                    fontWeight={700}

                    mb={3}

                >

                    Fraud Distribution

                </Typography>

                <DashboardSection

                    title="Recent Payments"

                >

                    <List dense>

                        {

                            recentPayments

                                .slice(0, 5)

                                .map(

                                    payment =>

                                        <>

                                            <ListItem>

                                                <ListItemText

                                                    primary={`₹${payment.amount}`}

                                                    secondary={

                                                        `${payment.paymentMethod}
• ${payment.status}`

                                                    }

                                                />

                                                <Chip

                                                    label={payment.status}

                                                    size="small"

                                                    color={

                                                        payment.status === "Completed"

                                                            ?

                                                            "success"

                                                            :

                                                            payment.status === "Failed"

                                                                ?

                                                                "error"

                                                                :

                                                                "warning"

                                                    }

                                                />

                                            </ListItem>

                                            <Divider />

                                        </>

                                )

                        }

                    </List>

                </DashboardSection>

                <DashboardSection

                    title="Recent Notifications"

                >

                    <List dense>

                        {

                            notifications

                                .slice(0, 5)

                                .map(

                                    notification =>

                                        <>

                                            <ListItem>

                                                <ListItemText

                                                    primary={notification.title}

                                                    secondary={notification.message}

                                                />

                                                <Chip

                                                    label={

                                                        notification.isRead

                                                            ?

                                                            "Read"

                                                            :

                                                            "Unread"

                                                    }

                                                    size="small"

                                                    color={

                                                        notification.isRead

                                                            ?

                                                            "success"

                                                            :

                                                            "warning"

                                                    }

                                                />

                                            </ListItem>

                                            <Divider />

                                        </>

                                )

                        }

                    </List>

                </DashboardSection>

                <Box
                    sx={{
                        width: "100%",
                        height: 320
                    }}
                >

                    <ResponsiveContainer>

                        <PieChart>

                            <Pie

                                data={fraudPieData}

                                dataKey="value"

                                nameKey="name"

                                outerRadius={110}

                                label

                            >

                                {

                                    fraudPieData.map(

                                        (
                                            _,
                                            index
                                        ) =>

                                            <Cell

                                                key={index}

                                                fill={
                                                    CHART_COLORS[index]
                                                }

                                            />

                                    )

                                }

                            </Pie>

                            <Tooltip />

                            <Legend />

                        </PieChart>

                    </ResponsiveContainer>

                </Box>

            </Paper>


            <Paper
                sx={{
                    p: 3,
                    mt: 4,
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
                        notifications.slice(0, 5).map(
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