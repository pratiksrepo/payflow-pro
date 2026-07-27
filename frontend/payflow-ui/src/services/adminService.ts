import axios from "axios";

export const getAdminStats =
async () =>
{
    const [
        users,
        payments,
        wallets,
        fraud
    ] = await Promise.all([
        axios.get(
            "https://localhost:7056/api/User/admin/stats"
        ),
        axios.get(
            "https://localhost:7056/api/Payment/admin/stats"
        ),
        axios.get(
            "https://localhost:7056/api/Wallet/admin/stats"
        ),
        axios.get(
            "https://localhost:7056/api/Fraud/admin/stats"
        )
    ]);

    return {
        totalUsers:
            users.data.totalUsers,

        totalPayments:
            payments.data.totalPayments,

        totalWallets:
            wallets.data.totalWallets,

        totalFraudChecks:
            fraud.data.totalFraudChecks
    };
};