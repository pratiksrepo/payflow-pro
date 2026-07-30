import apiClient from "./apiClient";

export const getFraudDashboard =
    async () =>
{
    const response =
        await 
        apiClient.get("/Fraud/dashboard");

    return response.data;
};

export const getRecentFraudChecks =
    async () =>
{
    const response =
        await 
        apiClient.get("/Fraud/recent");

    return response.data;
};