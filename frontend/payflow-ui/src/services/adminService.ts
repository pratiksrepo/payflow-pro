import apiClient from "./apiClient";

export const getAdminStats =
    async () => {
        const [
            users,
            payments,
            wallets,
            fraud
        ] = await
                Promise.all([
                    apiClient.get("/User/admin/stats"),
                    apiClient.get("/Payment/admin/stats"),
                    apiClient.get("/Wallet/admin/stats"),
                    apiClient.get("/Fraud/admin/stats"),
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