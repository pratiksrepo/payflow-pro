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
            "https://localhost:7009/api/Payment",
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
            `https://localhost:7009/api/Payment/${paymentId}`
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
            `https://localhost:7009/api/Payment/user/${userId}`
        );

    return response.data;
};


