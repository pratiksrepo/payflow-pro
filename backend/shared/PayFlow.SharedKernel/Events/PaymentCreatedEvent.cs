namespace PayFlow.SharedKernel.Events;

public class PaymentCreatedEvent
    : DomainEvent
{
    public Guid PaymentId { get; set; }

    public int UserId { get; set; }

    public decimal Amount { get; set; }

    public string PaymentMethod
    {
        get;
        set;
    } = string.Empty;
}