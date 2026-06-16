export interface CreatePaymentRequest
{
    userId: number;

    amount: number;

    merchantId: string;

    paymentMethod: string;
}