import {
    Box,
    Grid,
    Paper,
    Typography
}
from "@mui/material";

import {
    useEffect,
    useState
}
from "react";

import {
    getWallet
}
from "../services/walletService";

import {
    getUserId
}
from "../utils/jwtHelper";

export default function WalletPage()
{
    const [balance, setBalance] =
        useState<number>(0);

    useEffect(() =>
    {
        const loadWallet =
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

                const wallet =
                    await getWallet(
                        userId
                    );

                setBalance(
                    wallet.balance
                );
            }
            catch (error)
            {
                console.error(
                    error
                );
            }
        };

        void loadWallet();

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
                Wallet
            </Typography>

            <Typography
                color="text.secondary"
                sx={{
                    mb: 4
                }}
            >
                Manage your wallet
                balance and funds.
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
                    <Paper
                        sx={{
                            p: 3
                        }}
                    >
                        <Typography
                            color="text.secondary"
                        >
                            Current Balance
                        </Typography>

                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 700,
                                mt: 1
                            }}
                        >
                            ₹{balance}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid
                    size={{
                        xs: 12,
                        md: 4
                    }}
                >
                    <Paper
                        sx={{
                            p: 3
                        }}
                    >
                        <Typography
                            color="text.secondary"
                        >
                            Total Credits
                        </Typography>

                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                mt: 1
                            }}
                        >
                            ₹15,000
                        </Typography>
                    </Paper>
                </Grid>

                <Grid
                    size={{
                        xs: 12,
                        md: 4
                    }}
                >
                    <Paper
                        sx={{
                            p: 3
                        }}
                    >
                        <Typography
                            color="text.secondary"
                        >
                            Total Debits
                        </Typography>

                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                mt: 1
                            }}
                        >
                            ₹5,000
                        </Typography>
                    </Paper>
                </Grid>

            </Grid>

        </Box>
    );
}