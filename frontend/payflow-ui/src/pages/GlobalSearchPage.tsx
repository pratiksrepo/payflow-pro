import {
    Box,
    Grid,
    Paper,
    Typography,
    TextField,
    Button,
    Stack,
    Divider,
    CircularProgress,
    List,
    ListItem,
    Chip
}
    from "@mui/material";

import SearchIcon
    from "@mui/icons-material/Search";

import GroupIcon
    from "@mui/icons-material/Group";

import PaymentsIcon
    from "@mui/icons-material/Payments";

import AccountBalanceWalletIcon
    from "@mui/icons-material/AccountBalanceWallet";

import GppMaybeIcon
    from "@mui/icons-material/GppMaybe";

import {
    useState
}
    from "react";

import axios from "axios";
import EmptyState from "../components/EmptyState";

export default function GlobalSearchPage() {
    const [
        keyword,
        setKeyword
    ] = useState("");

    const [
        loading,
        setLoading
    ] = useState(false);

    const [
        users,
        setUsers
    ] = useState<any[]>([]);

    const [
        payments,
        setPayments
    ] = useState<any[]>([]);

    const [
        wallets,
        setWallets
    ] = useState<any[]>([]);

    const [
        fraudChecks,
        setFraudChecks
    ] = useState<any[]>([]);

    const searchAll =
        async () => {
            if (
                keyword.trim() === ""
            ) {
                setUsers([]);
                setPayments([]);
                setWallets([]);
                setFraudChecks([]);
                return;
            }

            setLoading(true);

            try {
                const token =
                    localStorage.getItem(
                        "accessToken"
                    );

                const config =
                {
                    headers:
                    {
                        Authorization:
                            `Bearer ${token}`
                    }
                };

                const [
                    usersResult,
                    paymentsResult,
                    walletsResult,
                    fraudResult
                ] =
                    await Promise.all([
                        axios.get(
                            `https://localhost:7093/api/User/search?search=${keyword}`,
                            config
                        ),

                        axios.get(
                            `https://localhost:7009/api/Payment/search?search=${keyword}`,
                            config
                        ),

                        axios.get(
                            `https://localhost:7224/api/Wallet/search?search=${keyword}`,
                            config
                        ),

                        axios.get(
                            `https://localhost:7169/api/Fraud/search?search=${keyword}`,
                            config
                        )
                    ]);

                setUsers(
                    usersResult.data
                );

                setPayments(
                    paymentsResult.data
                );

                setWallets(
                    walletsResult.data
                );

                setFraudChecks(
                    fraudResult.data
                );
            }
            catch (error) {
                console.error(error);
            }
            finally {
                setLoading(false);
            }
        };

    return (
        <Box>

            <Typography
                variant="h4"
                fontWeight={700}
            >
                Global Search
            </Typography>

            <Typography
                color="text.secondary"
                sx={{
                    mb: 3
                }}
            >
                Search Users, Payments,
                Wallets and Fraud Records
            </Typography>

            <Stack
                direction="row"
                spacing={2}
                sx={{
                    mb: 4
                }}
            >
                <TextField
                    fullWidth
                    label="Search..."
                    value={keyword}
                    onChange={(e) =>
                        setKeyword(
                            e.target.value
                        )
                    }
                    onKeyDown={(e) => {
                        if (
                            e.key === "Enter"
                        ) {
                            void searchAll();
                        }
                    }}
                />

                <Button
                    variant="contained"
                    startIcon={
                        <SearchIcon />
                    }
                    onClick={searchAll}
                >
                    Search
                </Button>
            </Stack>

            {
                loading &&
                <Box
                    sx={{
                        display: "flex",
                        justifyContent:
                            "center",
                        mb: 4
                    }}
                >
                    <CircularProgress />
                </Box>
            }

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
                            Users
                        </Typography>

                        <Typography
                            variant="h3"
                            fontWeight={700}
                        >
                            {users.length}
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
                            Payments
                        </Typography>

                        <Typography
                            variant="h3"
                            fontWeight={700}
                        >
                            {payments.length}
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
                            variant="h3"
                            fontWeight={700}
                        >
                            {wallets.length}
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
                            variant="h3"
                            fontWeight={700}
                        >
                            {fraudChecks.length}
                        </Typography>
                    </Paper>
                </Grid>

            </Grid>

            <Grid
                container
                spacing={3}
                sx={{
                    mt: 1
                }}
            >
                {/* Users */}

                <Grid
                    size={{
                        xs: 12,
                        md: 6
                    }}
                >
                    <Paper
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            height: "100%"
                        }}
                    >
                        <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            mb={2}
                        >
                            <GroupIcon />

                            <Typography
                                variant="h6"
                                fontWeight={700}
                            >
                                Users
                            </Typography>
                        </Stack>

                        <Divider
                            sx={{
                                mb: 2
                            }}
                        />

                        {
                            users.length === 0 ?
                                // <Typography
                                //     color="text.secondary"
                                // >
                                //     No Users Found
                                // </Typography>

                                <EmptyState

                                    title="No Users Found"

                                    message="No Users Found"

                                />
                                :
                                <List>

                                    {
                                        users.map(
                                            (user: any) => (

                                                <ListItem
                                                    key={user.id}
                                                >
                                                    <Box>

                                                        <Typography
                                                            fontWeight={700}
                                                        >
                                                            {user.fullName}
                                                        </Typography>

                                                        <Typography
                                                            variant="body2"
                                                        >
                                                            {user.email}
                                                        </Typography>

                                                        <Chip
                                                            label={user.role}
                                                            color={
                                                                user.role === "Admin"
                                                                    ? "error"
                                                                    : "primary"
                                                            }
                                                            size="small"
                                                            sx={{
                                                                mt: 1
                                                            }}
                                                        />

                                                    </Box>

                                                </ListItem>

                                            ))
                                    }

                                </List>
                        }

                    </Paper>

                </Grid>





                {/* Payments */}

                <Grid
                    size={{
                        xs: 12,
                        md: 6
                    }}
                >
                    <Paper
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            height: "100%"
                        }}
                    >
                        <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            mb={2}
                        >
                            <PaymentsIcon />

                            <Typography
                                variant="h6"
                                fontWeight={700}
                            >
                                Payments
                            </Typography>
                        </Stack>

                        <Divider
                            sx={{
                                mb: 2
                            }}
                        />

                        {
                            payments.length === 0 ?
                                // <Typography
                                //     color="text.secondary"
                                // >
                                //     No Payments Found
                                // </Typography>
                                <EmptyState

                                    title="No Payments Found"

                                    message="No Payments Found"

                                />
                                :
                                <List>

                                    {
                                        payments.map(
                                            (payment: any) => (

                                                <ListItem
                                                    key={payment.id}
                                                >

                                                    <Box>

                                                        <Typography
                                                            fontWeight={700}
                                                        >
                                                            ₹{payment.amount}
                                                        </Typography>

                                                        <Typography
                                                            variant="body2"
                                                        >
                                                            Merchant :
                                                            {" "}
                                                            {payment.merchantId}
                                                        </Typography>

                                                        <Typography
                                                            variant="body2"
                                                        >
                                                            Method :
                                                            {" "}
                                                            {payment.paymentMethod}
                                                        </Typography>

                                                        <Chip
                                                            label={payment.status}
                                                            color={
                                                                payment.status === "Completed"
                                                                    ? "success"
                                                                    : payment.status === "Failed"
                                                                        ? "error"
                                                                        : "warning"
                                                            }
                                                            size="small"
                                                            sx={{
                                                                mt: 1
                                                            }}
                                                        />

                                                    </Box>

                                                </ListItem>

                                            ))
                                    }

                                </List>
                        }

                    </Paper>

                </Grid>





                {/* Wallet */}

                <Grid
                    size={{
                        xs: 12,
                        md: 6
                    }}
                >
                    <Paper
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            height: "100%"
                        }}
                    >
                        <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            mb={2}
                        >
                            <AccountBalanceWalletIcon />

                            <Typography
                                variant="h6"
                                fontWeight={700}
                            >
                                Wallets
                            </Typography>
                        </Stack>

                        <Divider
                            sx={{
                                mb: 2
                            }}
                        />

                        {
                            wallets.length === 0 ?
                                // <Typography
                                //     color="text.secondary"
                                // >
                                //     No Wallet Found
                                // </Typography>
                                <EmptyState

                                    title="No Wallets Found"

                                    message="No Wallet Found"

                                />
                                :
                                <List>

                                    {
                                        wallets.map(
                                            (wallet: any) => (

                                                <ListItem
                                                    key={wallet.id}
                                                >

                                                    <Box>

                                                        <Typography
                                                            fontWeight={700}
                                                        >
                                                            Balance :
                                                            {" "}
                                                            ₹{wallet.balance}
                                                        </Typography>

                                                        <Typography
                                                            variant="body2"
                                                        >
                                                            User Id :
                                                            {" "}
                                                            {wallet.userId}
                                                        </Typography>

                                                    </Box>

                                                </ListItem>

                                            ))
                                    }

                                </List>
                        }

                    </Paper>

                </Grid>





                {/* Fraud */}

                <Grid
                    size={{
                        xs: 12,
                        md: 6
                    }}
                >
                    <Paper
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            height: "100%"
                        }}
                    >
                        <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            mb={2}
                        >
                            <GppMaybeIcon />

                            <Typography
                                variant="h6"
                                fontWeight={700}
                            >
                                Fraud Checks
                            </Typography>
                        </Stack>

                        <Divider
                            sx={{
                                mb: 2
                            }}
                        />

                        {
                            fraudChecks.length === 0 ?
                                // <Typography
                                //     color="text.secondary"
                                // >
                                //     No Fraud Records Found
                                // </Typography>
                                <EmptyState

                                    title="No Fraud Records Found"

                                    message="Try another search keyword."

                                />
                                :
                                <List>

                                    {
                                        fraudChecks.map(
                                            (fraud: any) => (

                                                <ListItem
                                                    key={fraud.id}
                                                >

                                                    <Box>

                                                        <Typography
                                                            fontWeight={700}
                                                        >
                                                            Score :
                                                            {" "}
                                                            {fraud.riskScore}
                                                        </Typography>

                                                        <Chip
                                                            label={fraud.riskLevel}
                                                            color={
                                                                fraud.riskLevel === "High"
                                                                    ? "error"
                                                                    : fraud.riskLevel === "Medium"
                                                                        ? "warning"
                                                                        : "success"
                                                            }
                                                            sx={{
                                                                mt: 1
                                                            }}
                                                        />

                                                    </Box>

                                                </ListItem>

                                            ))
                                    }

                                </List>
                        }

                    </Paper>

                </Grid>

            </Grid>

        </Box>
    );
}