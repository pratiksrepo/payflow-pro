namespace PayFlow.PaymentService.Models;

public enum PaymentStatus
{
    Initiated,
    FraudCheck,
    Pending,
    Processing,
    Success,
    Failed,
    RefundInitiated,
    Refunded
}