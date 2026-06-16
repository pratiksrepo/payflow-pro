import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
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
    createPayment,
    getPaymentById
}
from "../services/paymentService";

import {
    getUserId
}
from "../utils/jwtHelper";

import type
{
    Payment
}
from "../types/Payment";

export default function PaymentsPage()
{
    const [
        amount,
        setAmount
    ] = useState("");

    const [
    createdPayment,
    setCreatedPayment
] = useState<{
    paymentId: string;
    status: string;
    amount: number;
} | null>(null);

    const [
        merchantId,
        setMerchantId
    ] = useState("");

    const [
        paymentMethod,
        setPaymentMethod
    ] = useState("UPI");

    const [
        success,
        setSuccess
    ] = useState("");

    const [
        error,
        setError
    ] = useState("");

    const [
        paymentId,
        setPaymentId
    ] = useState("");

    const [
        payment,
        setPayment
    ] =
        useState<Payment | null>(
            null
        );

    const handleCreatePayment =
        async () =>
    {
        try
        {
            setSuccess("");
            setError("");

const result =
    await createPayment({
        userId:
            Number(
                getUserId()
            ),

        amount:
            Number(
                amount
            ),

        merchantId,

        paymentMethod
    });

setCreatedPayment(result);
setPaymentId(
    result.paymentId
);
            setSuccess(
                "Payment created successfully"
            );

            

            setAmount("");
            setMerchantId("");
            setPaymentMethod("UPI");
        }
        catch
        {
            setError(
                "Payment failed"
            );
        }
    };

    const handleSearchPayment =
        async () =>
    {
        try
        {
            const result =
                await getPaymentById(
                    paymentId
                );

            setPayment(result);
        }
        catch
        {
            alert(
                "Payment Not Found"
            );
        }
    };

    const getStatusChip =
        (
            status: number
        ) =>
    {
        switch (status)
        {
            case 1:
                return (
                    <Chip
                        label="Pending"
                        color="warning"
                    />
                );

            case 2:
                return (
                    <Chip
                        label="Success"
                        color="success"
                    />
                );

            case 3:
                return (
                    <Chip
                        label="Failed"
                        color="error"
                    />
                );

            default:
                return (
                    <Chip
                        label="Unknown"
                    />
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
                Payments
            </Typography>

            <Typography
                color="text.secondary"
                mb={4}
            >
                Create and track payments
            </Typography>

            <Paper
                sx={{
                    p: 4,
                    mb: 4,
                    borderRadius: 4
                }}
            >
                <Typography
                    variant="h5"
                    fontWeight={700}
                    mb={3}
                >
                    Create Payment
                </Typography>

                <Stack spacing={3}>

                    {
                        success &&
                        (
                            <Alert severity="success">
                                {success}
                            </Alert>
                        )


                    }

                                            {
    createdPayment &&
    (
        <Alert
            severity="info"
        >
            <Typography
                fontWeight={700}
            >
                Payment Created
            </Typography>

            Payment ID:
            {" "}
            {
                createdPayment.paymentId
            }

            <br />

            Status:
            {" "}
            {
                createdPayment.status
            }

            <br />

            Amount:
            {" "}
            ₹
            {
                createdPayment.amount
            }
        </Alert>
    )
}

                    {
                        error &&
                        (
                            <Alert severity="error">
                                {error}
                            </Alert>
                        )
                    }

                    <TextField
                        label="Amount"
                        type="number"
                        value={amount}
                        onChange={
                            (e) =>
                                setAmount(
                                    e.target.value
                                )
                        }
                        fullWidth
                    />

                    <TextField
                        label="Merchant Id"
                        value={merchantId}
                        onChange={
                            (e) =>
                                setMerchantId(
                                    e.target.value
                                )
                        }
                        fullWidth
                    />

                    <TextField
                        label="Payment Method"
                        value={
                            paymentMethod
                        }
                        onChange={
                            (e) =>
                                setPaymentMethod(
                                    e.target.value
                                )
                        }
                        fullWidth
                    />

                    <Button
                        variant="contained"
                        size="large"
                        onClick={
                            handleCreatePayment
                        }
                    >
                        Create Payment
                    </Button>

                </Stack>

            </Paper>

            <Paper
                sx={{
                    p: 4,
                    mb: 4,
                    borderRadius: 4
                }}
            >
                <Typography
                    variant="h5"
                    fontWeight={700}
                    mb={3}
                >
                    Track Payment
                </Typography>

                <Stack spacing={3}>

                    <TextField
                        label="Payment Id"
                        value={paymentId}
                        onChange={
                            (e) =>
                                setPaymentId(
                                    e.target.value
                                )
                        }
                        fullWidth
                    />

                    <Button
                        variant="contained"
                        onClick={
                            handleSearchPayment
                        }
                    >
                        Search Payment
                    </Button>

                </Stack>

            </Paper>

            {
                payment &&
                (
                    <Card
                        sx={{
                            borderRadius: 4
                        }}
                    >
                        <CardContent>

                            <Typography
                                variant="h5"
                                fontWeight={700}
                                mb={3}
                            >
                                Payment Details
                            </Typography>

                            <Divider
                                sx={{
                                    mb: 3
                                }}
                            />

                            <Stack spacing={2}>

                                <Typography>
                                    <strong>ID:</strong>
                                    {" "}
                                    {payment.id}
                                </Typography>

                                <Typography>
                                    <strong>User:</strong>
                                    {" "}
                                    {payment.userId}
                                </Typography>

                                <Typography>
                                    <strong>Amount:</strong>
                                    {" "}
                                    ₹{payment.amount}
                                </Typography>

                                <Typography>
                                    <strong>Merchant:</strong>
                                    {" "}
                                    {payment.merchantId}
                                </Typography>

                                <Typography>
                                    <strong>Method:</strong>
                                    {" "}
                                    {payment.paymentMethod}
                                </Typography>

                                <Typography>
                                    <strong>Currency:</strong>
                                    {" "}
                                    {payment.currency}
                                </Typography>

                                <Box>
                                    {
                                        getStatusChip(
                                            payment.status
                                        )
                                    }
                                </Box>

                                <Typography>
                                    <strong>Created:</strong>
                                    {" "}
                                    {
                                        new Date(
                                            payment.createdAt
                                        )
                                        .toLocaleString()
                                    }
                                </Typography>

                            </Stack>

                        </CardContent>

                    </Card>
                )
            }

        </Box>
    );
}