import {
    Box,
    Grid,
    Paper,
    Typography,
    Button
}
from "@mui/material";

import DownloadIcon
from "@mui/icons-material/Download";

import {
    exportPayments
}
from "../services/paymentService";

export default function AdminDashboardPage()
{
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
                        md: 3
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
                            Total Users
                        </Typography>

                        <Typography
                            variant="h4"
                            fontWeight={700}
                        >
                            --
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
                        sx={{
                            p: 3,
                            borderRadius: 4
                        }}
                    >
                        <Typography
                            color="text.secondary"
                        >
                            Total Payments
                        </Typography>

                        <Typography
                            variant="h4"
                            fontWeight={700}
                        >
                            --
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
                        sx={{
                            p: 3,
                            borderRadius: 4
                        }}
                    >
                        <Typography
                            color="text.secondary"
                        >
                            Wallets
                        </Typography>

                        <Typography
                            variant="h4"
                            fontWeight={700}
                        >
                            --
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
                        sx={{
                            p: 3,
                            borderRadius: 4
                        }}
                    >
                        <Typography
                            color="text.secondary"
                        >
                            Fraud Checks
                        </Typography>

                        <Typography
                            variant="h4"
                            fontWeight={700}
                        >
                            --
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
                        mb: 2
                    }}
                >
                    Reports
                </Typography>

                <Typography
                    color="text.secondary"
                >
                    Download payment reports in Excel format.
                </Typography>
            </Paper>

        </Box>
    );
}