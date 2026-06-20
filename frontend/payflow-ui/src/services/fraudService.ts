import axios from "axios";

export const getFraudDashboard =
    async () =>
{
    const response =
        await axios.get(
            "https://localhost:7169/api/fraud/dashboard"
        );

    return response.data;
};