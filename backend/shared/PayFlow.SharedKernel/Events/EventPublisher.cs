using Microsoft.Extensions.Logging;
using PayFlow.SharedKernel.Events;

namespace PayFlow.PaymentService.Services;

public class EventPublisher
    : IEventPublisher
{
    private readonly ILogger<EventPublisher> _logger;

    public EventPublisher(
    ILogger<EventPublisher> logger)
    {
    _logger = logger;
    }

    public Task PublishAsync(
        DomainEvent domainEvent)
    {
        _logger.LogError(
            $"EVENT: {domainEvent.GetType().Name}");

        return Task.CompletedTask;
    }
}