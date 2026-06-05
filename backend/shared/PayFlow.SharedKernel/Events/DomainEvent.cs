namespace PayFlow.SharedKernel.Events;

public abstract class DomainEvent
{
    public Guid Id { get; set; }
        = Guid.NewGuid();

    public DateTime OccurredOn
    {
        get;
        set;
    } = DateTime.UtcNow;
}