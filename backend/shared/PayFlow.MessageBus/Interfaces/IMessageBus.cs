namespace PayFlow.MessageBus.Interfaces;

public interface IMessageBus
{
    Task PublishAsync<T>(
        string routingKey,
        T message);
}