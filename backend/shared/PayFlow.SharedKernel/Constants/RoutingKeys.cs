namespace PayFlow.SharedKernel.Constants;

public static class RoutingKeys
{
    public const string PaymentCreated = "payment.created";

    public const string PaymentCompleted = "payment.completed";

    public const string PaymentFailed = "payment.failed";

    public const string WalletCredited = "wallet.credited";

    public const string WalletDebited = "wallet.debited";

    public const string FraudChecked = "fraud.checked";

    public const string NotificationCreated = "notification.created";
}