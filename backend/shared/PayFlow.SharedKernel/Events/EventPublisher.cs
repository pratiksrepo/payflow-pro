using PayFlow.SharedKernel.Events;

namespace PayFlow.PaymentService.Services;

public class EventPublisher
    : IEventPublisher
{
    public Task PublishAsync(
        DomainEvent domainEvent)
    {
        Console.WriteLine(
            $"EVENT: {domainEvent.GetType().Name}");

        return Task.CompletedTask;
    }
}