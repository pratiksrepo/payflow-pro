import {
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Paper,
    Stack,
    TextField,
    Typography
}
    from "@mui/material";

import {
    useEffect,
    useState
}
    from "react";

import {
    getUserId
}
    from "../utils/jwtHelper";

import {
    getWallet,
    creditWallet
}
    from "../services/walletService";


export default function WalletPage() {
    const [
        balance,
        setBalance
    ] =
        useState(0);

    const [
        open,
        setOpen
    ] =
        useState(false);

    const [
        amount,
        setAmount
    ] =
        useState("");

    const [
        loading,
        setLoading
    ] =
        useState(false);

    const [
        addingMoney,
        setAddingMoney
    ] =
        useState(false);


    const loadWallet =
        async () => {
            try {
                setLoading(true);

                const userId =
                    Number(
                        getUserId()
                    );

                const wallet =
                    await getWallet(
                        userId
                    );

                setBalance(
                    wallet.balance
                );
            }
            catch (error) {
                console.error(
                    "Failed to load wallet:",
                    error
                );
            }
            finally {
                setLoading(false);
            }
        };


    useEffect(
        () => {
            void loadWallet();
        },
        []
    );


    const handleAddMoney =
        async () => {
            const numericAmount =
                Number(amount);

            if (
                !amount ||
                numericAmount <= 0
            ) {
                alert(
                    "Please enter a valid amount."
                );

                return;
            }

            try {
                setAddingMoney(true);

                const userId =
                    Number(
                        getUserId()
                    );

                await creditWallet(
                    userId,
                    numericAmount
                );

                await loadWallet();

                setAmount("");

                setOpen(false);

                alert(
                    "Money Added Successfully"
                );
            }
            catch (error) {
                console.error(
                    "Failed to add money:",
                    error
                );

                alert(
                    "Failed To Add Money"
                );
            }
            finally {
                setAddingMoney(false);
            }
        };


    const handleCloseDialog =
        () => {
            if (addingMoney) {
                return;
            }

            setOpen(false);

            setAmount("");
        };


    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: "100%",
                overflowX: "hidden"
            }}
        >

            {/* ============================= */}
            {/* PAGE HEADER */}
            {/* ============================= */}

            <Box
                sx={{
                    mb: {
                        xs: 2.5,
                        sm: 3
                    }
                }}
            >

                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        fontSize: {
                            xs: "1.6rem",
                            sm: "2rem",
                            md: "2.2rem"
                        }
                    }}
                >
                    Wallet
                </Typography>

                <Typography
                    color="text.secondary"
                    sx={{
                        mt: 0.5,
                        fontSize: {
                            xs: "0.9rem",
                            sm: "1rem"
                        }
                    }}
                >
                    Manage your wallet
                </Typography>

            </Box>


            {/* ============================= */}
            {/* WALLET SUMMARY */}
            {/* ============================= */}

            <Grid
                container
                spacing={{
                    xs: 2,
                    sm: 2.5,
                    md: 3
                }}
            >

                {/* CURRENT BALANCE */}

                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 4
                    }}
                >

                    <Card
                        sx={{
                            height: "100%",
                            borderRadius: 3
                        }}
                    >

                        <CardContent
                            sx={{
                                p: {
                                    xs: 2.5,
                                    sm: 3
                                }
                            }}
                        >

                            <Typography
                                color="text.secondary"
                                sx={{
                                    fontSize: {
                                        xs: "0.85rem",
                                        sm: "0.95rem"
                                    }
                                }}
                            >
                                Current Balance
                            </Typography>

                            {
                                loading ?

                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            mt: 2
                                        }}
                                    >
                                        <CircularProgress
                                            size={28}
                                        />
                                    </Box>

                                    :

                                    <Typography
                                        sx={{
                                            fontWeight: 700,
                                            mt: 1,
                                            fontSize: {
                                                xs: "2rem",
                                                sm: "2.4rem",
                                                md: "2.8rem"
                                            },
                                            wordBreak: "break-word"
                                        }}
                                    >
                                        ₹
                                        {balance.toLocaleString(
                                            "en-IN"
                                        )}
                                    </Typography>
                            }

                        </CardContent>

                    </Card>

                </Grid>


                {/* TOTAL CREDITS */}

                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 4
                    }}
                >

                    <Card
                        sx={{
                            height: "100%",
                            borderRadius: 3
                        }}
                    >

                        <CardContent
                            sx={{
                                p: {
                                    xs: 2.5,
                                    sm: 3
                                }
                            }}
                        >

                            <Typography
                                color="text.secondary"
                                sx={{
                                    fontSize: {
                                        xs: "0.85rem",
                                        sm: "0.95rem"
                                    }
                                }}
                            >
                                Total Credits
                            </Typography>

                            <Typography
                                sx={{
                                    fontWeight: 700,
                                    mt: 1,
                                    fontSize: {
                                        xs: "2rem",
                                        sm: "2.4rem",
                                        md: "2.8rem"
                                    }
                                }}
                            >
                                ₹15,000
                            </Typography>

                        </CardContent>

                    </Card>

                </Grid>


                {/* TOTAL DEBITS */}

                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 4
                    }}
                >

                    <Card
                        sx={{
                            height: "100%",
                            borderRadius: 3
                        }}
                    >

                        <CardContent
                            sx={{
                                p: {
                                    xs: 2.5,
                                    sm: 3
                                }
                            }}
                        >

                            <Typography
                                color="text.secondary"
                                sx={{
                                    fontSize: {
                                        xs: "0.85rem",
                                        sm: "0.95rem"
                                    }
                                }}
                            >
                                Total Debits
                            </Typography>

                            <Typography
                                sx={{
                                    fontWeight: 700,
                                    mt: 1,
                                    fontSize: {
                                        xs: "2rem",
                                        sm: "2.4rem",
                                        md: "2.8rem"
                                    }
                                }}
                            >
                                ₹5,000
                            </Typography>

                        </CardContent>

                    </Card>

                </Grid>

            </Grid>


            {/* ============================= */}
            {/* WALLET ACTIONS */}
            {/* ============================= */}

            <Paper
                sx={{
                    mt: {
                        xs: 2.5,
                        sm: 3,
                        md: 4
                    },
                    p: {
                        xs: 2.5,
                        sm: 3,
                        md: 4
                    },
                    borderRadius: 3
                }}
            >

                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 700,
                        mb: {
                            xs: 2,
                            sm: 2.5
                        },
                        fontSize: {
                            xs: "1.25rem",
                            sm: "1.5rem"
                        }
                    }}
                >
                    Wallet Actions
                </Typography>


                <Stack
                    direction={{
                        xs: "column",
                        sm: "row"
                    }}
                    spacing={2}
                    sx={{
                        width: "100%"
                    }}
                >

                    {/* ADD MONEY */}

                    <Button
                        variant="contained"
                        onClick={() => setOpen(true)}
                        sx={{
                            width: {
                                xs: "100%",
                                sm: "auto"
                            }
                        }}
                    >
                        Add Money
                    </Button>


                    {/* REFRESH */}

                    <Button
                        variant="outlined"
                        onClick={loadWallet}
                        sx={{
                            width: {
                                xs: "100%",
                                sm: "auto"
                            }
                        }}
                    >
                        Refresh Balance
                    </Button>

                </Stack>

            </Paper>


            {/* ============================= */}
            {/* ADD MONEY DIALOG */}
            {/* ============================= */}

            <Dialog
                open={open}
                fullWidth
                maxWidth="xs"
                onClose={
                    handleCloseDialog
                }
            >

                <DialogTitle
                    sx={{
                        fontWeight: 700
                    }}
                >
                    Add Money
                </DialogTitle>


                <DialogContent>

                    <TextField
                        fullWidth
                        autoFocus
                        type="number"
                        label="Amount"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={
                            (e) => {
                                setAmount(
                                    e.target.value
                                );
                            }
                        }
                        disabled={addingMoney}
                        inputProps={{
                            min: 1
                        }}
                        sx={{
                            mt: 1
                        }}
                    />

                </DialogContent>


                <DialogActions
                    sx={{
                        px: {
                            xs: 2,
                            sm: 3
                        },
                        pb: {
                            xs: 2,
                            sm: 2
                        },
                        gap: 1
                    }}
                >

                    <Button
                        onClick={
                            handleCloseDialog
                        }
                        disabled={addingMoney}
                    >
                        Cancel
                    </Button>


                    <Button
                        variant="contained"
                        onClick={
                            () =>
                                void handleAddMoney()
                        }
                        disabled={
                            addingMoney ||
                            !amount ||
                            Number(amount) <= 0
                        }
                    >

                        {
                            addingMoney
                                ?
                                "Adding..."
                                :
                                "Add"
                        }

                    </Button>

                </DialogActions>

            </Dialog>

        </Box>
    );
}