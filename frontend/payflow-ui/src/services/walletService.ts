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

export async function creditWallet(
    userId: number,
    amount: number
)
{
    console.log({
        UserId: userId,
        Amount: amount
    });

    const response =
        await walletApi.post(
            "/Wallet/credit",
            {
                UserId: userId,
                Amount: amount
            }
        );

    return response.data;
}