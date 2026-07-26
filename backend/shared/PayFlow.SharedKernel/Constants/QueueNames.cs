namespace PayFlow.SharedKernel.Constants;

public static class QueueNames
{
    public const string NotificationPaymentCreated =
        "notification.payment.created.queue";

    public const string WalletPaymentCreated =
        "wallet.payment.created.queue";

    public const string FraudPaymentCreated =
        "fraud.payment.created.queue";
}