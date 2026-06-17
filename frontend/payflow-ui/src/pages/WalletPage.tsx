import {
    Box,
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Paper,
    TextField,
    Typography
}
    from "@mui/material";

import {
    useEffect,
    useState
}
    from "react";

// import {
//     getWallet
// }
//     from "../services/walletService";

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
    ] = useState(0);

    const [
        open,
        setOpen
    ] = useState(false);

    const [
        amount,
        setAmount
    ] = useState("");

    const loadWallet =
        async () => {
            try {
                const wallet =
                    await getWallet(
                        Number(
                            getUserId()
                        )
                    );

                setBalance(
                    wallet.balance
                );
            }
            catch (error) {
                console.log(error);
            }
        };

    useEffect(() => {
        void loadWallet();
    }, []);

    const addMoney =
        async () => {
console.log(
    JSON.stringify(
        {
            userId:
                Number(
                    getUserId()
                ),
            amount:
                Number(
                    amount
                )
        }
    )
);
            try {
await creditWallet(
    Number(getUserId()),
    Number(amount)
);

                await loadWallet();

                setAmount("");

                setOpen(false);

                alert(
                    "Money Added Successfully"
                );
            }
            catch {
                alert(
                    "Failed To Add Money"
                );
            }
        };

    return (
        <Box>

            <Typography
                variant="h4"
                fontWeight={700}
                mb={1}
            >
                Wallet
            </Typography>

            <Typography
                color="text.secondary"
                mb={4}
            >
                Manage your wallet
            </Typography>

            <Grid
                container
                spacing={3}
            >

                <Grid
                    size={{
                        xs: 12,
                        md: 4
                    }}
                >
                    <Card>
                        <CardContent>

                            <Typography
                                color="text.secondary"
                            >
                                Current Balance
                            </Typography>

                            <Typography
                                variant="h3"
                                fontWeight={700}
                                mt={1}
                            >
                                ₹{balance}
                            </Typography>

                        </CardContent>
                    </Card>
                </Grid>

                <Grid
                    size={{
                        xs: 12,
                        md: 4
                    }}
                >
                    <Card>
                        <CardContent>

                            <Typography
                                color="text.secondary"
                            >
                                Total Credits
                            </Typography>

                            <Typography
                                variant="h4"
                                fontWeight={700}
                                mt={1}
                            >
                                ₹15000
                            </Typography>

                        </CardContent>
                    </Card>
                </Grid>

                <Grid
                    size={{
                        xs: 12,
                        md: 4
                    }}
                >
                    <Card>
                        <CardContent>

                            <Typography
                                color="text.secondary"
                            >
                                Total Debits
                            </Typography>

                            <Typography
                                variant="h4"
                                fontWeight={700}
                                mt={1}
                            >
                                ₹5000
                            </Typography>

                        </CardContent>
                    </Card>
                </Grid>

            </Grid>

            <Paper
                sx={{
                    p: 4,
                    mt: 4,
                    borderRadius: 4
                }}
            >

                <Typography
                    variant="h5"
                    fontWeight={700}
                    mb={3}
                >
                    Wallet Actions
                </Typography>

                <Button
                    variant="contained"
                    onClick={() =>
                        setOpen(true)
                    }
                >
                    Add Money
                </Button>

                <Button
                    variant="outlined"
                    sx={{
                        ml: 2
                    }}
                    onClick={
                        loadWallet
                    }
                >
                    Refresh Balance
                </Button>

            </Paper>

            <Dialog
                open={open}
                onClose={() =>
                    setOpen(false)
                }
            >

                <DialogTitle>
                    Add Money
                </DialogTitle>

                <DialogContent>

                    <TextField
                        fullWidth
                        type="number"
                        label="Amount"
                        value={amount}
                        onChange={
                            (e) =>
                                setAmount(
                                    e.target.value
                                )
                        }
                        sx={{
                            mt: 2
                        }}
                    />

                </DialogContent>

                <DialogActions>

                    <Button
                        onClick={() =>
                            setOpen(false)
                        }
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        onClick={addMoney}
                    >
                        Add
                    </Button>

                </DialogActions>

            </Dialog>

        </Box>
    );
}