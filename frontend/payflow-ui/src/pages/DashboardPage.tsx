import {
    Box,
    Paper,
    Typography,
        List,
    ListItem,
    ListItemText
} from "@mui/material";

import {
    useEffect,
    useState
} from "react";

import {
    getWallet
} from "../services/walletService";


import {
    getUserId,
    getEmail
}
from "../utils/jwtHelper";

import {
    getNotifications
}
from "../services/notificationService";

export default function DashboardPage() {
const [email, setEmail] =
    useState("");

const [balance, setBalance] =
    useState(0);

const [
    notifications,
    setNotifications
] = useState<any[]>([]);

const loadDashboard =
    async () =>
{

    console.log(
    "USER ID:",
    getUserId());

console.log(
    "EMAIL:",
    getEmail());

    console.log(
    getUserId());
    
    try
    {
        const userId =
            getUserId();

        if (!userId)
        {
            return;
        }

        setEmail(
            getEmail());

        const wallet =
            await getWallet(
                userId);

        setBalance(
            wallet.balance);

        const notificationsData =
            await getNotifications(
                userId);

        setNotifications(
            notificationsData);
    }
    catch (error)
    {
        console.error(error);
    }
};

useEffect(() =>
{
    void loadDashboard();
}, []);




    return (
        <>
<Box
    sx={{
        mb: 4
    }}
>
    <Typography
        variant="h4"
        sx={{
            fontWeight: 700
        }}
    >
        Dashboard
    </Typography>

    <Typography
        color="text.secondary"
    >
        Welcome back,
        {email}
    </Typography>
</Box>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit,minmax(280px,1fr))",
                    gap: 3
                }}
            >
                {/* Total Payments */}

                <Paper
                    elevation={3}
                    sx={{
                        p: 3,
                        borderRadius: 3
                    }}
                >
                    <Typography
                        color="text.secondary"
                    >
                        Total Payments
                    </Typography>

                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700
                        }}
                    >
                        ₹12,50,000
                    </Typography>
                </Paper>

                {/* Wallet Balance */}

                <Paper
                    elevation={3}
                    sx={{
                        p: 3,
                        borderRadius: 3
                    }}
                >
                    <Typography
                        color="text.secondary"
                    >
                        Wallet Balance
                    </Typography>

                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700
                        }}
                    >
                        ₹{balance}
                    </Typography>
                </Paper>

                {/* Fraud Alerts */}

                <Paper
                    elevation={3}
                    sx={{
                        p: 3,
                        borderRadius: 3
                    }}
                >
                    <Typography
                        color="text.secondary"
                    >
                        Fraud Alerts
                    </Typography>

                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700
                        }}
                    >
                        3
                    </Typography>
                </Paper>

                {/* Success Rate */}

                <Paper
                    elevation={3}
                    sx={{
                        p: 3,
                        borderRadius: 3
                    }}
                >
                    <Typography
                        color="text.secondary"
                    >
                        Success Rate
                    </Typography>

                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700
                        }}
                    >
                        98.7%
                    </Typography>
                </Paper>

            </Box>

            <Box
    sx={{
        mt: 4
    }}
>
    <Paper
        elevation={3}
        sx={{
            p: 3,
            borderRadius: 3
        }}
    >
        <Typography
            variant="h6"
            sx={{
                mb: 2
            }}
        >
            Recent Notifications
        </Typography>

        <List>
            {
                notifications.map(
                    (notification) => (
                        <ListItem
                            key={
                                notification.id
                            }
                        >
                            <ListItemText
                                primary={
                                    notification.title
                                }
                                secondary={
                                    notification.message
                                }
                            />
                        </ListItem>
                    ))
            }
        </List>
    </Paper>
</Box>
        </>
    );
}