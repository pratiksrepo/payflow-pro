using PayFlow.PaymentService.Models;

namespace PayFlow.PaymentService.Helpers;

public static class PaymentStateValidator
{
    public static bool IsValidTransition(
        PaymentStatus currentStatus,
        PaymentStatus newStatus)
    {
        return currentStatus switch
        {
            PaymentStatus.Initiated =>
                newStatus == PaymentStatus.FraudCheck,

            PaymentStatus.FraudCheck =>
                newStatus == PaymentStatus.Pending
                || newStatus == PaymentStatus.Failed,

            PaymentStatus.Pending =>
                newStatus == PaymentStatus.Processing,

            PaymentStatus.Processing =>
                newStatus == PaymentStatus.Success
                || newStatus == PaymentStatus.Failed,

            _ => false
        };
    }
}