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
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";

import {
    useState,
    useEffect,
} from "react";

import {
    createPayment,
    getPaymentById,
    getPaymentHistory,
    getPaymentsPaged,
} from "../services/paymentService";

import {
    getUserId
} from "../utils/jwtHelper";

import type {
    Payment
} from "../types/Payment";

import type {
    PaymentHistory
} from "../types/PaymentHistory";

import type {
    PaymentHistoryItem
} from "../types/PaymentHistoryItem";

import CommonPagination
    from "../components/CommonPagination";

import SearchBar
    from "../components/SearchBar";

import FilterPanel
    from "../components/FilterPanel";


export default function PaymentsPage() {

    const [
        amount,
        setAmount
    ] = useState("");

    const [
        page,
        setPage
    ] = useState(1);

    const [
        pageSize,
        setPageSize
    ] = useState(10);

    const [
        totalPages,
        setTotalPages
    ] = useState(1);

    const [
        search,
        setSearch
    ] = useState("");

    const [
        status,
        setStatus
    ] = useState("");

    const [
        sort,
        setSort
    ] = useState("newest");

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


    /*
     * ================================
     * LOAD PAGED PAYMENT HISTORY
     * ================================
     */

    const loadPagedPayments =
        async () => {

            try {

                console.log({
                    page,
                    pageSize,
                    search,
                    status,
                    sort
                });

                const result =
                    await getPaymentsPaged(
                        Number(
                            getUserId()
                        ),
                        page,
                        pageSize,
                        search,
                        status,
                        sort
                    );

                setPaymentHistory(
                    result.data
                );

                setTotalPages(
                    result.totalPages
                );

                console.log(result);

            }
            catch (error) {

                console.log(
                    "Failed to load payments",
                    error
                );

            }
        };


    useEffect(() => {

        void loadPagedPayments();

    }, [
        page,
        pageSize,
        search,
        status,
        sort
    ]);


    /*
     * ================================
     * CREATE PAYMENT
     * ================================
     */

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

                setCreatedPayment(
                    result
                );

                setPaymentId(
                    result.paymentId
                );

                setSuccess(
                    "Payment created successfully"
                );

                setAmount("");

                setMerchantId("");

                setPaymentMethod(
                    "UPI"
                );

            }
            catch {

                setError(
                    "Payment failed"
                );

            }
        };


    /*
     * ================================
     * SEARCH PAYMENT
     * ================================
     */

    const handleSearchPayment =
        async () => {

            try {

                const result =
                    await getPaymentById(
                        paymentId
                    );

                setPayment(
                    result
                );

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


    /*
     * ================================
     * STATUS CHIP
     * ================================
     */

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
                            size="small"
                        />
                    );

                case 2:

                    return (
                        <Chip
                            label="Success"
                            color="success"
                            size="small"
                        />
                    );

                case 3:

                    return (
                        <Chip
                            label="Failed"
                            color="error"
                            size="small"
                        />
                    );

                default:

                    return (
                        <Chip
                            label="Unknown"
                            size="small"
                        />
                    );
            }
        };


    /*
     * ================================
     * UI
     * ================================
     */

    return (

        <Box
            sx={{
                width: "100%",
                maxWidth: "100%",
                overflow: "hidden",
            }}
        >

            {/* ================================
                PAGE HEADER
            ================================= */}

            <Box
                sx={{
                    mb: {
                        xs: 3,
                        sm: 4
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
                    Payments
                </Typography>

                <Typography
                    color="text.secondary"
                    sx={{
                        mt: 1
                    }}
                >
                    Create and track payments
                </Typography>

            </Box>


            {/* ================================
                CREATE PAYMENT
            ================================= */}

            <Paper
                sx={{
                    p: {
                        xs: 2,
                        sm: 3,
                        md: 4
                    },

                    borderRadius: {
                        xs: 2,
                        sm: 3
                    },

                    mb: {
                        xs: 2,
                        sm: 3,
                        md: 4
                    }
                }}
            >

                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 700,

                        mb: {
                            xs: 2,
                            sm: 3
                        },

                        fontSize: {
                            xs: "1.25rem",
                            sm: "1.5rem"
                        }
                    }}
                >
                    Create Payment
                </Typography>


                <Stack
                    spacing={{
                        xs: 2,
                        sm: 3
                    }}
                >

                    {/* SUCCESS */}

                    {
                        success && (

                            <Alert
                                severity="success"
                            >
                                {success}
                            </Alert>

                        )
                    }


                    {/* CREATED PAYMENT */}

                    {
                        createdPayment && (

                            <Alert
                                severity="info"
                                sx={{
                                    overflowWrap:
                                        "anywhere"
                                }}
                            >

                                <Typography
                                    fontWeight={700}
                                    sx={{
                                        mb: 1
                                    }}
                                >
                                    Payment Created
                                </Typography>

                                <Box>
                                    Payment ID:{" "}
                                    {
                                        createdPayment.paymentId
                                    }
                                </Box>

                                <Box>
                                    Status:{" "}
                                    {
                                        createdPayment.status
                                    }
                                </Box>

                                <Box>
                                    Amount: ₹
                                    {
                                        createdPayment.amount
                                    }
                                </Box>

                            </Alert>

                        )
                    }


                    {/* ERROR */}

                    {
                        error && (

                            <Alert
                                severity="error"
                            >
                                {error}
                            </Alert>

                        )
                    }


                    {/* AMOUNT */}

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


                    {/* MERCHANT */}

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


                    {/* PAYMENT METHOD */}

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


                    {/* CREATE */}

                    <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        onClick={
                            handleCreatePayment
                        }
                        sx={{
                            py: 1.3
                        }}
                    >
                        Create Payment
                    </Button>

                </Stack>

            </Paper>


            {/* ================================
                TRACK PAYMENT
            ================================= */}

            <Paper
                sx={{
                    p: {
                        xs: 2,
                        sm: 3,
                        md: 4
                    },

                    borderRadius: {
                        xs: 2,
                        sm: 3
                    },

                    mb: {
                        xs: 2,
                        sm: 3,
                        md: 4
                    }
                }}
            >

                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 700,

                        mb: {
                            xs: 2,
                            sm: 3
                        },

                        fontSize: {
                            xs: "1.25rem",
                            sm: "1.5rem"
                        }
                    }}
                >
                    Track Payment
                </Typography>


                <Stack
                    spacing={2}
                >

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
                        fullWidth
                        onClick={
                            handleSearchPayment
                        }
                        sx={{
                            py: 1.2
                        }}
                    >
                        Search Payment
                    </Button>

                </Stack>

            </Paper>


            {/* ================================
                PAYMENT DETAILS
            ================================= */}

            {
                payment && (

                    <Card
                        sx={{
                            borderRadius: {
                                xs: 2,
                                sm: 3
                            },

                            mb: {
                                xs: 2,
                                sm: 3,
                                md: 4
                            }
                        }}
                    >

                        <CardContent
                            sx={{
                                p: {
                                    xs: 2,
                                    sm: 3,
                                    md: 4
                                }
                            }}
                        >

                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 700,

                                    mb: {
                                        xs: 2,
                                        sm: 3
                                    },

                                    fontSize: {
                                        xs: "1.25rem",
                                        sm: "1.5rem"
                                    }
                                }}
                            >
                                Payment Details
                            </Typography>


                            {/* PAYMENT JOURNEY */}

                            <Paper
                                sx={{
                                    p: {
                                        xs: 2,
                                        sm: 3,
                                        md: 4
                                    },

                                    borderRadius: {
                                        xs: 2,
                                        sm: 3
                                    },

                                    mb: 3
                                }}
                            >

                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 700,
                                        mb: 3
                                    }}
                                >
                                    Payment Journey
                                </Typography>


                                <Box
                                    sx={{
                                        width: "100%",
                                        overflow: "hidden"
                                    }}
                                >

                                    {
                                        paymentTimeline.length === 0 ? (

                                            <Typography
                                                color="text.secondary"
                                            >
                                                No payment journey
                                                information available.
                                            </Typography>

                                        ) : (

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

                                                            pl: {
                                                                xs: 1.5,
                                                                sm: 2
                                                            },

                                                            pr: 1,

                                                            borderLeft:
                                                                "4px solid #4CAF50",

                                                            overflowWrap:
                                                                "anywhere"
                                                        }}
                                                    >

                                                        <Typography
                                                            fontWeight={700}
                                                        >
                                                            ✅{" "}
                                                            {
                                                                item.newStatus
                                                            }
                                                        </Typography>


                                                        <Typography
                                                            color="text.secondary"
                                                            variant="body2"
                                                            sx={{
                                                                mt: 0.5
                                                            }}
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
                                                            variant="body2"
                                                        >
                                                            Changed By:{" "}
                                                            {
                                                                item.changedBy
                                                            }
                                                        </Typography>

                                                    </Box>

                                                )
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


                            {/* PAYMENT INFORMATION */}

                            <Stack
                                spacing={2}
                            >

                                <Typography
                                    sx={{
                                        overflowWrap:
                                            "anywhere"
                                    }}
                                >
                                    <strong>
                                        ID:
                                    </strong>{" "}
                                    {
                                        payment.id
                                    }
                                </Typography>


                                <Typography>
                                    <strong>
                                        User:
                                    </strong>{" "}
                                    {
                                        payment.userId
                                    }
                                </Typography>


                                <Typography>
                                    <strong>
                                        Amount:
                                    </strong>{" "}
                                    ₹
                                    {
                                        payment.amount
                                    }
                                </Typography>


                                <Typography
                                    sx={{
                                        overflowWrap:
                                            "anywhere"
                                    }}
                                >
                                    <strong>
                                        Merchant:
                                    </strong>{" "}
                                    {
                                        payment.merchantId
                                    }
                                </Typography>


                                <Typography>
                                    <strong>
                                        Method:
                                    </strong>{" "}
                                    {
                                        payment.paymentMethod
                                    }
                                </Typography>


                                <Typography>
                                    <strong>
                                        Currency:
                                    </strong>{" "}
                                    {
                                        payment.currency
                                    }
                                </Typography>


                                <Box>
                                    {
                                        getStatusChip(
                                            payment.status
                                        )
                                    }
                                </Box>


                                <Typography>
                                    <strong>
                                        Created:
                                    </strong>{" "}
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


            {/* ================================
                PAYMENT HISTORY
            ================================= */}

            <Paper
                sx={{
                    p: {
                        xs: 2,
                        sm: 3,
                        md: 4
                    },

                    borderRadius: {
                        xs: 2,
                        sm: 3
                    }
                }}
            >

                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 700,

                        mb: {
                            xs: 2,
                            sm: 3
                        },

                        fontSize: {
                            xs: "1.25rem",
                            sm: "1.5rem"
                        }
                    }}
                >
                    Payment History
                </Typography>


                {/* SEARCH */}

                <Box
                    sx={{
                        mb: 2
                    }}
                >

                    <SearchBar
                        value={search}

                        onChange={(value) => {

                            setPage(1);

                            setSearch(value);

                        }}

                        onSearch={
                            loadPagedPayments
                        }
                    />

                </Box>


                {/* FILTERS */}

                <Box
                    sx={{
                        mb: 2
                    }}
                >

                    <FilterPanel

                        status={status}

                        sort={sort}

                        pageSize={pageSize}

                        onStatusChange={(value) => {

                            setPage(1);

                            setStatus(value);

                        }}

                        onSortChange={(value) => {

                            setPage(1);

                            setSort(value);

                        }}

                        onPageSizeChange={(value) => {

                            setPage(1);

                            setPageSize(value);

                        }}

                    />

                </Box>


                {/* RESPONSIVE TABLE */}

                <TableContainer
                    component={Paper}
                    variant="outlined"
                    sx={{
                        width: "100%",
                        overflowX: "auto",

                        "& table": {
                            minWidth: 650
                        }
                    }}
                >

                    <Table
                        size="small"
                    >

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
                                paymentHistory.length === 0 ? (

                                    <TableRow>

                                        <TableCell
                                            colSpan={5}
                                            align="center"
                                        >

                                            <Typography
                                                color="text.secondary"
                                                sx={{
                                                    py: 4
                                                }}
                                            >
                                                No payments found.
                                            </Typography>

                                        </TableCell>

                                    </TableRow>

                                ) : (

                                    paymentHistory.map(
                                        (
                                            payment
                                        ) => (

                                            <TableRow
                                                hover
                                                key={
                                                    payment.id
                                                }
                                            >

                                                <TableCell
                                                    sx={{
                                                        whiteSpace:
                                                            "nowrap"
                                                    }}
                                                >
                                                    ₹
                                                    {
                                                        payment.amount
                                                    }
                                                </TableCell>


                                                <TableCell
                                                    sx={{
                                                        maxWidth: 180,
                                                        overflowWrap:
                                                            "anywhere"
                                                    }}
                                                >
                                                    {
                                                        payment.merchantId
                                                    }
                                                </TableCell>


                                                <TableCell
                                                    sx={{
                                                        whiteSpace:
                                                            "nowrap"
                                                    }}
                                                >
                                                    {
                                                        payment.paymentMethod
                                                    }
                                                </TableCell>


                                                <TableCell
                                                    sx={{
                                                        whiteSpace:
                                                            "nowrap"
                                                    }}
                                                >
                                                    {
                                                        new Date(
                                                            payment.createdAt
                                                        )
                                                            .toLocaleDateString()
                                                    }
                                                </TableCell>


                                                <TableCell
                                                    sx={{
                                                        whiteSpace:
                                                            "nowrap"
                                                    }}
                                                >

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

                                )
                            }

                        </TableBody>

                    </Table>

                </TableContainer>


                {/* PAGINATION */}

                <CommonPagination

                    page={page}

                    totalPages={totalPages}

                    onChange={setPage}

                />

            </Paper>

        </Box>
    );
}