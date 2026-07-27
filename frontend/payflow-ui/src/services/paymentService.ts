import axios from "axios";

import type {
    CreatePaymentRequest
} from "../types/CreatePaymentRequest";


export const createPayment =
    async (
        request: CreatePaymentRequest
    ) =>
{
    const response =
        await axios.post(
            "https://localhost:7056/api/Payment",
            request
        );

    return response.data;
};


export const getPaymentById =
    async (
        paymentId: string
    ) =>
{
    const response =
        await axios.get(
            `https://localhost:7056/api/Payment/${paymentId}`
        );

    return response.data;
};

export const getPaymentsByUser =
    async (
        userId: number
    ) =>
{
    const response =
        await axios.get(
            `https://localhost:7056/api/Payment/user/${userId}`
        );

    return response.data;
};


export const getPaymentHistory =
    async (
        paymentId: string
    ) =>
{
    const response =
        await axios.get(
            `https://localhost:7056/api/Payment/history/${paymentId}`
        );

    return response.data;
};


export async function exportPayments()
{
    const response =
        await axios.get(
            "https://localhost:7056/api/Payment/export",
            {
                responseType: "blob"
            });

    const url =
        window.URL.createObjectURL(
            new Blob([response.data])
        );

    const link =
        document.createElement("a");

    link.href = url;

    link.download =
        "PaymentReport.xlsx";

    document.body
        .appendChild(link);

    link.click();

    document.body
        .removeChild(link);

    window.URL
        .revokeObjectURL(url);
}

export const getRecentPayments =
    async () =>
{
    const response =
        await axios.get(
            "https://localhost:7056/api/Payment/recent"
        );

    return response.data;
};


export const getPaymentsPaged =
    async (
        userId: number,
        page: number,
        pageSize: number,
        search: string,
        status: string,
        sort: string
    ) =>
{
    const response =
        await axios.get(
            `https://localhost:7056/api/Payment/user/${userId}/paged`,
            {
                params:
                {
                    page,
                    pageSize,
                    search,
                    status,
                    sort
                }
            });

    return response.data;
};
