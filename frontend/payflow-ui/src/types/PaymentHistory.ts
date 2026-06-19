export interface PaymentHistory
{
    id: string;

    userId: number;

    amount: number;

    merchantId: string;

    paymentMethod: string;

    status: number;

    createdAt: string;
}