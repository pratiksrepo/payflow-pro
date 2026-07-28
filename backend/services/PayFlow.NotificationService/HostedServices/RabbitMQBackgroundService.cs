using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using PayFlow.MessageBus.Configurations;
using PayFlow.MessageBus.Events;
using PayFlow.NotificationService.Consumers;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Text.Json;

namespace PayFlow.NotificationService.HostedServices;

public class RabbitMQBackgroundService : BackgroundService
{
    private readonly IServiceScopeFactory _scopeFactory;

    private readonly RabbitMQSettings _settings;

    private readonly ILogger<RabbitMQBackgroundService> _logger;

    public RabbitMQBackgroundService(
        IServiceScopeFactory scopeFactory,
        IOptions<RabbitMQSettings> options,
            ILogger<RabbitMQBackgroundService> logger)

    {
        _scopeFactory = scopeFactory;

        _settings = options.Value;

        _logger = logger;

    }

    protected override async Task ExecuteAsync(
        CancellationToken stoppingToken)
    {
        try
        {
            _logger.LogInformation(
                "RabbitMQ Background Service Started.");

            var factory = new ConnectionFactory
            {
                HostName = _settings.HostName,
                Port = _settings.Port,
                UserName = _settings.UserName,
                Password = _settings.Password,
                VirtualHost = _settings.VirtualHost
            };

            IConnection? connection = null;

            while (connection == null && !stoppingToken.IsCancellationRequested)
            {
                try
                {
                    _logger.LogInformation("Trying to connect to RabbitMQ...");

                    connection = await factory.CreateConnectionAsync();

                    _logger.LogInformation("Connected to RabbitMQ.");
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "RabbitMQ not ready. Retrying in 5 seconds...");

                    await Task.Delay(5000, stoppingToken);
                }
            }

            var channel = await connection!.CreateChannelAsync();

            await channel.ExchangeDeclareAsync(
                _settings.Exchange,
                ExchangeType.Topic,
                durable: true);

            await channel.ExchangeDeclareAsync(
                "payflow.dlx",
                ExchangeType.Fanout,
                durable: true);

            await channel.QueueDeclareAsync(

                "notification.payment.created.queue",

                durable: true,

                exclusive: false,

                autoDelete: false,

                arguments: new Dictionary<string, object?>
                {
        { "x-dead-letter-exchange", "payflow.dlx" }
                });

            await channel.QueueDeclareAsync(

                "notification.deadletter.queue",

                durable: true,

                exclusive: false,

                autoDelete: false

            );

            await channel.QueueBindAsync(

                "notification.deadletter.queue",

                "payflow.dlx",

                ""

            );

            await channel.QueueBindAsync(

                "notification.payment.created.queue",

                _settings.Exchange,

                "payment.created");

            var consumer =
                new AsyncEventingBasicConsumer(channel);

            consumer.ReceivedAsync += async (_, ea) =>
            {
                try
                {
                    var json =
                        Encoding.UTF8.GetString(
                            ea.Body.ToArray());

                    var payment =
                        JsonSerializer.Deserialize
                        <PaymentCreatedEvent>(json);

                    if (payment != null)
                    {
                        using var scope =
                            _scopeFactory.CreateScope();

                        var consumer =
                            scope.ServiceProvider
                                .GetRequiredService
                                <PaymentCreatedConsumer>();

                        await consumer.ConsumeAsync(
                            payment);
                    }

                    await channel.BasicAckAsync(
                        ea.DeliveryTag,
                        false);
                }

                catch (Exception ex)
                {
                    Console.ForegroundColor =
                        ConsoleColor.Red;

                    _logger.LogError(
                        ex,
                        "Error while processing notification message.");

                    Console.ResetColor();

                    await channel.BasicNackAsync(

                        ea.DeliveryTag,

                        false,

                        false

                    );
                }
            };

            await channel.BasicConsumeAsync(
                "notification.payment.created.queue",
                autoAck: false,
                consumer);

            await Task.Delay(
                Timeout.Infinite,
                stoppingToken);
        }
        catch (Exception ex)
        {
            Console.ForegroundColor = ConsoleColor.Red;

            _logger.LogCritical(
                ex,
                "RabbitMQ Background Service failed to start.");

            _logger.LogError(ex, "Unexpected error occurred.");
            Console.ResetColor();

            return;
        }
    }
}