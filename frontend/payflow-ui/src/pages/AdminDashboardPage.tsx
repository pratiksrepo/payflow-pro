import {
    Box,
    Grid,
    Paper,
    Typography,
    Button,
    Chip
}
from "@mui/material";

import {
    useState,
    useEffect
}
from "react";

import DownloadIcon
from "@mui/icons-material/Download";

import {
    exportPayments,
    getRecentPayments
}
from "../services/paymentService";

import {
    getRecentFraudChecks
}
from "../services/fraudService";

export default function AdminDashboardPage()
{
    const [
        totalPayments,
        setTotalPayments
    ] = useState(0);

    const [
        totalFraudChecks,
        setTotalFraudChecks
    ] = useState(0);

    const [
        recentPayments,
        setRecentPayments
    ] = useState<any[]>([]);

    const [
        recentFraudChecks,
        setRecentFraudChecks
    ] = useState<any[]>([]);

    useEffect(() =>
    {
        const loadData =
            async () =>
        {
            try
            {
                const payments =
                    await getRecentPayments();

                setRecentPayments(
                    payments
                );

                setTotalPayments(
                    payments.length
                );

                const fraudChecks =
                    await getRecentFraudChecks();

                setRecentFraudChecks(
                    fraudChecks
                );

                setTotalFraudChecks(
                    fraudChecks.length
                );
            }
            catch (error)
            {
                console.error(error);
            }
        };

        void loadData();
    }, []);

    const getStatusText =
        (status: number) =>
    {
        switch (status)
        {
            case 1:
                return "Initiated";

            case 2:
                return "Pending";

            case 3:
                return "Success";

            case 4:
                return "Failed";

            default:
                return "Unknown";
        }
    };

    return (
        <Box>

            <Typography
                variant="h4"
                sx={{
                    fontWeight: 700,
                    mb: 3
                }}
            >
                Admin Dashboard
            </Typography>

            <Button
                variant="contained"
                startIcon={
                    <DownloadIcon />
                }
                onClick={
                    exportPayments
                }
                sx={{
                    mb: 4
                }}
            >
                Export Payments Report
            </Button>

            <Grid
                container
                spacing={3}
            >

                <Grid
                    size={{
                        xs: 12,
                        md: 6
                    }}
                >
                    <Paper
                        sx={{
                            p: 3,
                            borderRadius: 4
                        }}
                    >
                        <Typography
                            color="text.secondary"
                        >
                            Recent Payments
                        </Typography>

                        <Typography
                            variant="h3"
                            fontWeight={700}
                        >
                            {totalPayments}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid
                    size={{
                        xs: 12,
                        md: 6
                    }}
                >
                    <Paper
                        sx={{
                            p: 3,
                            borderRadius: 4
                        }}
                    >
                        <Typography
                            color="text.secondary"
                        >
                            Recent Fraud Checks
                        </Typography>

                        <Typography
                            variant="h3"
                            fontWeight={700}
                        >
                            {totalFraudChecks}
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
                    variant="h5"
                    fontWeight={700}
                    sx={{
                        mb: 3
                    }}
                >
                    Recent Payments
                </Typography>

                {
                    recentPayments.map(
                        (payment: any) => (
                            <Box
                                key={payment.id}
                                sx={{
                                    display: "flex",
                                    justifyContent:
                                        "space-between",
                                    alignItems:
                                        "center",
                                    py: 1,
                                    borderBottom:
                                        "1px solid #eee"
                                }}
                            >
                                <Typography>
                                    ₹{payment.amount}
                                </Typography>

                                <Chip
                                    label={
                                        getStatusText(
                                            payment.status
                                        )
                                    }
                                    color={
                                        payment.status === 3
                                            ? "success"
                                            : payment.status === 4
                                            ? "error"
                                            : "warning"
                                    }
                                />
                            </Box>
                        ))
                }
            </Paper>

            <Paper
                sx={{
                    mt: 4,
                    p: 3,
                    borderRadius: 4
                }}
            >
                <Typography
                    variant="h5"
                    fontWeight={700}
                    sx={{
                        mb: 3
                    }}
                >
                    Recent Fraud Activity
                </Typography>

                {
                    recentFraudChecks.map(
                        (fraud: any) => (
                            <Box
                                key={fraud.id}
                                sx={{
                                    display: "flex",
                                    justifyContent:
                                        "space-between",
                                    alignItems:
                                        "center",
                                    py: 1,
                                    borderBottom:
                                        "1px solid #eee"
                                }}
                            >
                                <Typography>
                                    Score: {fraud.riskScore}
                                </Typography>

                                <Chip
                                    label={
                                        fraud.riskLevel
                                    }
                                    color={
                                        fraud.riskLevel ===
                                        "High"
                                            ? "error"
                                            : fraud.riskLevel ===
                                              "Medium"
                                            ? "warning"
                                            : "success"
                                    }
                                />
                            </Box>
                        ))
                }
            </Paper>

        </Box>
    );
}