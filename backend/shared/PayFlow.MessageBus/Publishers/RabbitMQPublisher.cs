using Microsoft.Extensions.Logging;
using PayFlow.MessageBus.Configurations;
using PayFlow.MessageBus.Interfaces;
using PayFlow.MessageBus.Serialization;
using RabbitMQ.Client;

namespace PayFlow.MessageBus.Publishers;

/// <summary>
/// Publishes integration events to RabbitMQ.
/// </summary>
public class RabbitMQPublisher
    : IMessageBus
{
    private readonly RabbitMQSettings
        _settings;

    private readonly ILogger<RabbitMQPublisher> _logger;


    /// <summary>
    /// Publishes a message using the specified routing key.
    /// </summary>
    public RabbitMQPublisher(
        RabbitMQSettings settings,
        ILogger<RabbitMQPublisher> logger)
    {
        _settings = settings;
        _logger = logger;
    }

    public async Task PublishAsync<T>(
        string routingKey,
        T message)
    {

        try
        {
            var factory = new ConnectionFactory
            {
                HostName = _settings.HostName,
                Port = _settings.Port,
                UserName = _settings.UserName,
                Password = _settings.Password,
                VirtualHost = _settings.VirtualHost,

                Ssl = new SslOption
                {
                    Enabled = true
                }
            };

            using var connection =
                await factory.CreateConnectionAsync();

            using var channel =
                await connection.CreateChannelAsync();

            await channel.ExchangeDeclareAsync(

                exchange:
                    _settings.Exchange,

                type:
                    ExchangeType.Topic,

                durable: true,

                autoDelete: false

            );

            var body =
                JsonSerializerHelper
                    .Serialize(message);

            _logger.LogInformation(
            "Publishing event '{RoutingKey}' to exchange '{Exchange}'.",
            routingKey,
            _settings.Exchange);

            await channel.BasicPublishAsync(

                exchange:
                    _settings.Exchange,

                routingKey:
                    routingKey,

                mandatory: false,

                body:
                    body

            );

            _logger.LogInformation(
            "Successfully published event '{RoutingKey}'.",
            routingKey);
        }
        catch (Exception ex)
        {
            _logger.LogError(
                ex,
                "Failed to publish event '{RoutingKey}'.",
                routingKey);

            throw;
        }


    }
}