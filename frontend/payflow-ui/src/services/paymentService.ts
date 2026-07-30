import apiClient from "./apiClient";


import type {
    CreatePaymentRequest
} from "../types/CreatePaymentRequest";


export const createPayment =
    async (
        request: CreatePaymentRequest
    ) =>
{
    const response =
        await apiClient.post("/Payment", request);

    return response.data;
};


export const getPaymentById =
    async (
        paymentId: string
    ) =>
{
    const response =
        await apiClient.get(`/Payment/${paymentId}`);

    return response.data;
};

export const getPaymentsByUser =
    async (
        userId: number
    ) =>
{
    const response =
        await apiClient.get(`/Payment/user/${userId}`);

    return response.data;
};


export const getPaymentHistory =
    async (
        paymentId: string
    ) =>
{
    const response =
        await apiClient.get(`/Payment/history/${paymentId}`);

    return response.data;
};


export async function exportPayments()
{
    const response =
        await 
        apiClient.get(
            "/Payment/export",
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
        await 
        apiClient.get("/Payment/recent");

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
        await 
        apiClient.get(`/Payment/user/${userId}/paged`, {
            params: {
                page,
                    pageSize,
                    search,
                    status,
                    sort
                }
            });

    return response.data;
};
