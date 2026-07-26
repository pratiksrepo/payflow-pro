namespace PayFlow.MessageBus.Events;

public class PaymentCreatedEvent
{
    public Guid PaymentId { get; set; }

    public int UserId { get; set; }

    public decimal Amount { get; set; }

    public string MerchantId { get; set; } = string.Empty;

    public string PaymentMethod { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; }
}