export interface CreatePaymentRequest
{
    senderUserId: number;

    receiverUserId: number;

    amount: number;
}