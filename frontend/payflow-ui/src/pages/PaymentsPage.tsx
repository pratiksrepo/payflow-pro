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
    useState,
    useEffect,
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

// import {
//     getPaymentsByUser
// }
//     from "../services/paymentService";

import type
{
    PaymentHistory
}
    from "../types/PaymentHistory";

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
}
    from "@mui/material";

import {
    getPaymentHistory
}
    from "../services/paymentService";

import type
{
    PaymentHistoryItem
}
    from "../types/PaymentHistoryItem";

import CommonPagination
    from "../components/CommonPagination";

import SearchBar
    from "../components/SearchBar";

import FilterPanel
    from "../components/FilterPanel";

import {
getPaymentsPaged
}
    from "../services/paymentService";

export default function PaymentsPage() {


    const [
        amount,
        setAmount
    ] = useState("");

    const [page, setPage] = useState(1);

    const [pageSize, setPageSize] = useState(10);

    const [totalPages, setTotalPages] = useState(1);

    const [search, setSearch] = useState("");

    const [status, setStatus] = useState("");

    const [sort, setSort] = useState("newest");

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
        paymentHistory,
        setPaymentHistory
    ] =
        useState<
            PaymentHistory[]
        >([]);

    const [
        paymentTimeline,
        setPaymentTimeline
    ] =
        useState<
            PaymentHistoryItem[]
        >([]);

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

    // const loadPaymentHistory =
    //     async () => {
    //         try {
    //             const result =
    //                 await getPaymentsByUser(
    //                     Number(
    //                         getUserId()
    //                     )
    //                 );

    //             setPaymentHistory(
    //                 result
    //             );
    //         }
    //         catch (error) {
    //             console.log(error);
    //         }
    //     };


    // useEffect(() => {
    //     void loadPaymentHistory();
    // }, []);


    const loadPagedPayments =
async () =>
{
    console.log({
    page,
    pageSize,
    search,
    status,
    sort
});
    const result =
        await getPaymentsPaged(
            Number(getUserId()),
            page,
            pageSize,
            search,
            status,
            sort);

setPaymentHistory(
    result.data
);

    setTotalPages(
        result.totalPages);

        console.log(result);
}

useEffect(() =>
{
    void loadPagedPayments();

},
[
    page,
    pageSize,
    search,
    status,
    sort
]);

    const handleCreatePayment =
        async () => {
            try {
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
                // await loadPaymentHistory();
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
            catch {
                setError(
                    "Payment failed"
                );
            }
        };

    const handleSearchPayment =
        async () => {
            try {
                const result =
                    await getPaymentById(
                        paymentId
                    );

                setPayment(result);
                const history =
                    await getPaymentHistory(
                        paymentId
                    );

                setPaymentTimeline(
                    history
                );
            }
            catch {
                alert(
                    "Payment Not Found"
                );
            }
        };

    const getStatusChip =
        (
            status: number
        ) => {
            switch (status) {
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

                            <Paper
                                sx={{
                                    p: 4,
                                    mt: 4,
                                    borderRadius: 4
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 700,
                                        mb: 4
                                    }}
                                >
                                    Payment Journey
                                </Typography>

                                <Box>

                                    {
                                        paymentTimeline.map(
                                            (
                                                item
                                            ) => (
                                                <Box
                                                    key={
                                                        item.id
                                                    }
                                                    sx={{
                                                        mb: 3,
                                                        pl: 2,
                                                        borderLeft:
                                                            "4px solid #4CAF50"
                                                    }}
                                                >

                                                    <Typography
                                                        fontWeight={700}
                                                    >
                                                        ✅ {
                                                            item.newStatus
                                                        }
                                                    </Typography>

                                                    <Typography
                                                        color="text.secondary"
                                                    >
                                                        {
                                                            new Date(
                                                                item.changedAt
                                                            )
                                                                .toLocaleString()
                                                        }
                                                    </Typography>

                                                    <Typography
                                                        color="text.secondary"
                                                    >
                                                        Changed By:
                                                        {
                                                            item.changedBy
                                                        }
                                                    </Typography>

                                                </Box>
                                            )
                                        )
                                    }

                                </Box>

                            </Paper>

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
                    Payment History
                </Typography>

                <TableContainer>
<SearchBar
    value={search}
    onChange={setSearch}
    onSearch={loadPagedPayments}
/>

<FilterPanel
    status={status}
    sort={sort}
    pageSize={pageSize}
    onStatusChange={setStatus}
    onSortChange={setSort}
    onPageSizeChange={setPageSize}
/>
                    <Table>

                        <TableHead>

                            <TableRow>

                                <TableCell>
                                    Amount
                                </TableCell>

                                <TableCell>
                                    Merchant
                                </TableCell>

                                <TableCell>
                                    Method
                                </TableCell>

                                <TableCell>
                                    Date
                                </TableCell>

                                <TableCell>
                                    Status
                                </TableCell>

                            </TableRow>

                        </TableHead>

                        <TableBody>

                            {
                                paymentHistory
                                    .map(
                                        (
                                            payment
                                        ) =>
                                        (
                                            <TableRow
                                                key={
                                                    payment.id
                                                }
                                            >

                                                <TableCell>
                                                    ₹
                                                    {
                                                        payment.amount
                                                    }
                                                </TableCell>

                                                <TableCell>
                                                    {
                                                        payment.merchantId
                                                    }
                                                </TableCell>

                                                <TableCell>
                                                    {
                                                        payment.paymentMethod
                                                    }
                                                </TableCell>
                                                <TableCell>
                                                    {
                                                        new Date(
                                                            payment.createdAt
                                                        ).toLocaleDateString()
                                                    }
                                                </TableCell>
                                                <TableCell>
                                                    {
                                                        payment.status === 2
                                                            ? "Pending"
                                                            : payment.status === 5
                                                                ? "Failed"
                                                                : payment.status === 3
                                                                    ? "Completed"
                                                                    : payment.status
                                                    }
                                                </TableCell>

                                            </TableRow>
                                        )
                                    )
                            }

                        </TableBody>

                    </Table>

                    <CommonPagination
    page={page}
    totalPages={totalPages}
    onChange={setPage}
/>

                </TableContainer>

            </Paper>

        </Box>
    );
}