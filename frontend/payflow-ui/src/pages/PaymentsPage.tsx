import {
    Alert,
    Box,
    Button,
    Paper,
    Stack,
    TextField,
    Typography
}
from "@mui/material";

import {
    useState
}
from "react";

import {
    createPayment
}
from "../services/paymentService";

import {
    getUserId
}
from "../utils/jwtHelper";

export default function PaymentsPage()
{
    const [receiverUserId,
        setReceiverUserId] =
        useState("");

    const [amount,
        setAmount] =
        useState("");

    const [success,
        setSuccess] =
        useState("");

    const [error,
        setError] =
        useState("");

    const handleSubmit =
        async () =>
    {
        try
        {
            setSuccess("");
            setError("");

            await createPayment({
                senderUserId:
                    Number(
                        getUserId()
                    ),

                receiverUserId:
                    Number(
                        receiverUserId
                    ),

                amount:
                    Number(
                        amount
                    )
            });

            setSuccess(
                "Payment created successfully"
            );

            setReceiverUserId("");
            setAmount("");
        }
        catch
        {
            setError(
                "Payment failed"
            );
        }
    };

    return (
        <Box>

            <Typography
                variant="h4"
                sx={{
                    fontWeight: 700,
                    mb: 1
                }}
            >
                Create Payment
            </Typography>

            <Typography
                color="text.secondary"
                sx={{
                    mb: 4
                }}
            >
                Send money securely
            </Typography>

            <Paper
                sx={{
                    p: 4,
                    maxWidth: 600
                }}
            >

                <Stack
                    spacing={3}
                >

                    {
                        success &&
                        (
                            <Alert
                                severity="success"
                            >
                                {success}
                            </Alert>
                        )
                    }

                    {
                        error &&
                        (
                            <Alert
                                severity="error"
                            >
                                {error}
                            </Alert>
                        )
                    }

                    <TextField
                        label="Receiver User Id"
                        value={
                            receiverUserId
                        }
                        onChange={
                            (
                                e
                            ) =>
                                setReceiverUserId(
                                    e.target.value
                                )
                        }
                        fullWidth
                    />

                    <TextField
                        label="Amount"
                        type="number"
                        value={amount}
                        onChange={
                            (
                                e
                            ) =>
                                setAmount(
                                    e.target.value
                                )
                        }
                        fullWidth
                    />

                    <Button
                        variant="contained"
                        size="large"
                        onClick={
                            handleSubmit
                        }
                    >
                        Create Payment
                    </Button>

                </Stack>

            </Paper>

        </Box>
    );
}