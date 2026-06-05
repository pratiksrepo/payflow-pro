namespace PayFlow.SharedKernel.Events;

public class PaymentFailedEvent
    : DomainEvent
{
    public Guid PaymentId { get; set; }

    public string Reason
    {
        get;
        set;
    } = string.Empty;
}