namespace PayFlow.SharedKernel.Events;

public class PaymentSucceededEvent
    : DomainEvent
{
    public Guid PaymentId { get; set; }

    public decimal Amount
    {
        get;
        set;
    }
}