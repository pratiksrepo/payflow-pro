namespace PayFlow.SharedKernel.Events;

public interface IEventPublisher
{
    Task PublishAsync(
        DomainEvent domainEvent);
}