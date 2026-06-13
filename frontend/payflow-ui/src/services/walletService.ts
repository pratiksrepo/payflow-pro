import axios from "axios";

const walletApi = axios.create({
    baseURL: "https://localhost:7224/api"
});

export async function getWallet(
    userId: number)
{
    const response =
        await walletApi.get(
            `/wallet/${userId}`);

    console.log(
        "Wallet Response:",
        response.data);

    return response.data;
}