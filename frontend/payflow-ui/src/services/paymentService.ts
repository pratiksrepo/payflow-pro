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