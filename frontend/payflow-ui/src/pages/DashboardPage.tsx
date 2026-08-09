import {
    Box,
    Grid,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
    Chip
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
    Cell,
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    Tooltip
}
from "recharts";

import {
    useEffect,
    useState
}
from "react";

import DashboardSection
    from "../components/DashboardSection";

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
    getEmail,
    getRole
}
from "../utils/jwtHelper";

import type {
    Notification
}
from "../types/Notification";

import {
    getFraudDashboard
}
from "../services/fraudService";

import PageHeader
    from "../components/PageHeader";


export default function DashboardPage() {

    const [
        email,
        setEmail
    ] =
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
    ] =
        useState<any>(null);


    const fraudPieData =
        [
            {
                name: "Safe",
                value:
                    fraudDashboard?.safeTransactions
                    ?? 0
            },
            {
                name: "Flagged",
                value:
                    fraudDashboard?.flaggedTransactions
                    ?? 0
            },
            {
                name: "High Risk",
                value:
                    fraudDashboard?.highRiskCount
                    ?? 0
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
                            name:
                                `P${index + 1}`,

                            amount:
                                p.amount
                        })
                    )
                );


            }
            catch (error) {

                console.error(
                    error
                );

            }

        };


    useEffect(
        () => {

            void loadDashboardData();

        },
        []
    );


    return (

        <Box
            sx={{
                width: "100%",
                maxWidth: "100%",
                overflowX: "hidden"
            }}
        >

            {/* =========================
                PAGE HEADER
            ========================== */}

            <PageHeader
                title="Dashboard"
                subtitle={
                    `Welcome back, ${role}! ` +
                    `Here's your business overview for today.`
                }
            />


            <Typography
                color="text.secondary"
                sx={{
                    mb: {
                        xs: 3,
                        sm: 4
                    },
                    fontSize: {
                        xs: "0.85rem",
                        sm: "0.95rem"
                    },
                    wordBreak: "break-word"
                }}
            >
                Signed as:- {email}
            </Typography>


            {/* =========================
                KPI CARDS
            ========================== */}

            <Grid
                container
                spacing={{
                    xs: 2,
                    sm: 3
                }}
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
                        sm: 6,
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
                        sm: 6,
                        md: 3
                    }}
                >

                    <DashboardCard
                        title="Wallet"
                        value={`₹${walletBalance}`}
                        subtitle="Current Balance"
                        icon={
                            <AccountBalanceWalletIcon />
                        }
                        color="#ed6c02"
                    />

                </Grid>


                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 3
                    }}
                >

                    <DashboardCard
                        title="Fraud Alerts"
                        value={
                            fraudDashboard?.highRiskCount
                            ?? 0
                        }
                        subtitle="High Risk"
                        icon={<SecurityIcon />}
                        color="#d32f2f"
                    />

                </Grid>

            </Grid>


            {/* =========================
                FRAUD ANALYTICS
            ========================== */}

            <Typography
                variant="h5"
                sx={{
                    fontWeight: 700,
                    mt: {
                        xs: 3,
                        sm: 4
                    },
                    mb: 2,
                    fontSize: {
                        xs: "1.35rem",
                        sm: "1.5rem"
                    }
                }}
            >
                Fraud Analytics
            </Typography>


            <Grid
                container
                spacing={{
                    xs: 2,
                    sm: 3
                }}
            >

                {/* Fraud Rate */}

                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 3
                    }}
                >

                    <Paper
                        sx={{
                            p: {
                                xs: 2,
                                sm: 3,
                                md: 4
                            },
                            borderRadius: 3,
                            height: "100%"
                        }}
                    >

                        <Typography
                            color="error"
                            sx={{
                                fontSize: {
                                    xs: "0.85rem",
                                    sm: "0.95rem"
                                }
                            }}
                        >
                            Fraud Rate
                        </Typography>


                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                mt: 1,
                                fontSize: {
                                    xs: "1.6rem",
                                    sm: "2rem",
                                    md: "2.2rem"
                                }
                            }}
                        >
                            {
                                fraudDashboard?.fraudRate
                                ?? 0
                            }%
                        </Typography>

                    </Paper>

                </Grid>


                {/* Safe */}

                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 3
                    }}
                >

                    <Paper
                        sx={{
                            p: {
                                xs: 2,
                                sm: 3,
                                md: 4
                            },
                            borderRadius: 3,
                            height: "100%"
                        }}
                    >

                        <Typography
                            sx={{
                                fontSize: {
                                    xs: "0.85rem",
                                    sm: "0.95rem"
                                }
                            }}
                        >
                            Safe Transactions
                        </Typography>


                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                mt: 1,
                                fontSize: {
                                    xs: "1.6rem",
                                    sm: "2rem",
                                    md: "2.2rem"
                                }
                            }}
                        >
                            {
                                fraudDashboard
                                    ?.safeTransactions
                                ?? 0
                            }
                        </Typography>

                    </Paper>

                </Grid>


                {/* Flagged */}

                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 3
                    }}
                >

                    <Paper
                        sx={{
                            p: {
                                xs: 2,
                                sm: 3,
                                md: 4
                            },
                            borderRadius: 3,
                            height: "100%"
                        }}
                    >

                        <Typography
                            sx={{
                                fontSize: {
                                    xs: "0.85rem",
                                    sm: "0.95rem"
                                }
                            }}
                        >
                            Flagged
                        </Typography>


                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                mt: 1,
                                fontSize: {
                                    xs: "1.6rem",
                                    sm: "2rem",
                                    md: "2.2rem"
                                }
                            }}
                        >
                            {
                                fraudDashboard
                                    ?.flaggedTransactions
                                ?? 0
                            }
                        </Typography>

                    </Paper>

                </Grid>


                {/* High Risk */}

                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 3
                    }}
                >

                    <Paper
                        sx={{
                            p: {
                                xs: 2,
                                sm: 3,
                                md: 4
                            },
                            borderRadius: 3,
                            height: "100%"
                        }}
                    >

                        <Typography
                            sx={{
                                fontSize: {
                                    xs: "0.85rem",
                                    sm: "0.95rem"
                                }
                            }}
                        >
                            High Risk
                        </Typography>


                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                mt: 1,
                                fontSize: {
                                    xs: "1.6rem",
                                    sm: "2rem",
                                    md: "2.2rem"
                                }
                            }}
                        >
                            {
                                fraudDashboard
                                    ?.highRiskCount
                                ?? 0
                            }
                        </Typography>

                    </Paper>

                </Grid>

            </Grid>


            {/* =========================
                PAYMENT ANALYTICS
            ========================== */}

            <Paper
                elevation={3}
                sx={{
                    p: {
                        xs: 2,
                        sm: 3,
                        md: 4
                    },
                    mt: {
                        xs: 3,
                        sm: 4
                    },
                    borderRadius: 3
                }}
            >

                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        mb: 3,
                        fontSize: {
                            xs: "1rem",
                            sm: "1.15rem"
                        }
                    }}
                >
                    Payment Analytics
                </Typography>


                <Box
                    sx={{
                        width: "100%",
                        height: {
                            xs: 250,
                            sm: 300,
                            md: 350
                        }
                    }}
                >

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <BarChart
                            data={chartData}
                            margin={{
                                top: 5,
                                right: 5,
                                left: -15,
                                bottom: 5
                            }}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="name"
                                tick={{
                                    fontSize: 12
                                }}
                            />

                            <YAxis
                                tick={{
                                    fontSize: 12
                                }}
                            />

                            <Tooltip />

                            <Legend />

                            <Bar
                                dataKey="amount"
                                radius={[
                                    8,
                                    8,
                                    0,
                                    0
                                ]}
                                fill="#1976d2"
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </Box>

            </Paper>


            {/* =========================
                WALLET GROWTH
            ========================== */}

            <Paper
                elevation={3}
                sx={{
                    p: {
                        xs: 2,
                        sm: 3,
                        md: 4
                    },
                    mt: {
                        xs: 3,
                        sm: 4
                    },
                    borderRadius: 3
                }}
            >

                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        mb: 3,
                        fontSize: {
                            xs: "1rem",
                            sm: "1.15rem"
                        }
                    }}
                >
                    Wallet Growth
                </Typography>


                <Box
                    sx={{
                        width: "100%",
                        height: {
                            xs: 230,
                            sm: 270,
                            md: 300
                        }
                    }}
                >

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <AreaChart
                            data={chartData}
                            margin={{
                                top: 5,
                                right: 5,
                                left: -15,
                                bottom: 5
                            }}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="name"
                                tick={{
                                    fontSize: 12
                                }}
                            />

                            <YAxis
                                tick={{
                                    fontSize: 12
                                }}
                            />

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


            {/* =========================
                FRAUD DISTRIBUTION
            ========================== */}

            <Paper
                elevation={3}
                sx={{
                    p: {
                        xs: 2,
                        sm: 3,
                        md: 4
                    },
                    mt: {
                        xs: 3,
                        sm: 4
                    },
                    borderRadius: 3
                }}
            >

                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        mb: 3,
                        fontSize: {
                            xs: "1rem",
                            sm: "1.15rem"
                        }
                    }}
                >
                    Fraud Distribution
                </Typography>


                {/* Recent Payments */}

                <DashboardSection
                    title="Recent Payments"
                >

                    <List dense>

                        {
                            recentPayments
                                .slice(0, 5)
                                .map(
                                    (
                                        payment
                                    ) => (

                                        <Box
                                            key={payment.id}
                                        >

                                            <ListItem
                                                sx={{
                                                    px: 0,
                                                    py: 1.5,
                                                    gap: 1
                                                }}
                                            >

                                                <ListItemText

                                                    primary={
                                                        `₹${payment.amount}`
                                                    }

                                                    secondary={
                                                        `${payment.paymentMethod} • ${payment.status}`
                                                    }

                                                    primaryTypographyProps={{
                                                        fontWeight: 600,
                                                        fontSize: {
                                                            xs: "0.9rem",
                                                            sm: "1rem"
                                                        }
                                                    }}

                                                    secondaryTypographyProps={{
                                                        fontSize: {
                                                            xs: "0.75rem",
                                                            sm: "0.85rem"
                                                        },
                                                        sx: {
                                                            wordBreak: "break-word"
                                                        }
                                                    }}

                                                    sx={{
                                                        minWidth: 0
                                                    }}

                                                />


                                                <Chip

                                                    label={
                                                        payment.status
                                                    }

                                                    size="small"

                                                    color={
                                                        payment.status ===
                                                        "Completed"
                                                            ?
                                                            "success"
                                                            :
                                                        payment.status ===
                                                        "Failed"
                                                            ?
                                                            "error"
                                                            :
                                                            "warning"
                                                    }

                                                    sx={{
                                                        flexShrink: 0
                                                    }}

                                                />

                                            </ListItem>


                                            <Divider />

                                        </Box>

                                    )
                                )
                        }

                    </List>

                </DashboardSection>


                {/* Recent Notifications */}

                <DashboardSection
                    title="Recent Notifications"
                >

                    <List dense>

                        {
                            notifications
                                .slice(0, 5)
                                .map(
                                    (
                                        notification
                                    ) => (

                                        <Box
                                            key={
                                                notification.id
                                            }
                                        >

                                            <ListItem
                                                sx={{
                                                    px: 0,
                                                    py: 1.5,
                                                    gap: 1
                                                }}
                                            >

                                                <ListItemText

                                                    primary={
                                                        notification.title
                                                    }

                                                    secondary={
                                                        notification.message
                                                    }

                                                    primaryTypographyProps={{
                                                        fontWeight: 600,
                                                        fontSize: {
                                                            xs: "0.9rem",
                                                            sm: "1rem"
                                                        }
                                                    }}

                                                    secondaryTypographyProps={{
                                                        fontSize: {
                                                            xs: "0.75rem",
                                                            sm: "0.85rem"
                                                        },
                                                        sx: {
                                                            wordBreak: "break-word"
                                                        }
                                                    }}

                                                    sx={{
                                                        minWidth: 0
                                                    }}

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

                                                    sx={{
                                                        flexShrink: 0
                                                    }}

                                                />

                                            </ListItem>


                                            <Divider />

                                        </Box>

                                    )
                                )
                        }

                    </List>

                </DashboardSection>


                {/* Fraud Pie Chart */}

                <Box
                    sx={{
                        width: "100%",
                        height: {
                            xs: 260,
                            sm: 300,
                            md: 320
                        },
                        mt: 2
                    }}
                >

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <PieChart>

                            <Pie

                                data={fraudPieData}

                                dataKey="value"

                                nameKey="name"

                                outerRadius="70%"

                                label

                            >

                                {
                                    fraudPieData.map(
                                        (
                                            _,
                                            index
                                        ) => (

                                            <Cell

                                                key={
                                                    index
                                                }

                                                fill={
                                                    CHART_COLORS[
                                                        index
                                                    ]
                                                }

                                            />

                                        )
                                    )
                                }

                            </Pie>


                            <Tooltip />

                            <Legend />

                        </PieChart>

                    </ResponsiveContainer>

                </Box>

            </Paper>

        </Box>

    );
}