export interface PaymentHistoryItem
{
    id: number;

    oldStatus: string;

    newStatus: string;

    changedAt: string;

    changedBy: string;
}