export interface Payment
{
    id: string;

    userId: number;

    amount: number;

    merchantId: string;

    paymentMethod: string;

    currency: string;

    status: number;

    createdAt: string;
}