//using Microsoft.Extensions.Configuration;
//using Microsoft.Extensions.DependencyInjection;
//using PayFlow.MessageBus.Configurations;
//using PayFlow.MessageBus.Interfaces;
//using PayFlow.MessageBus.Publishers;


//namespace PayFlow.MessageBus.Extensions;

//public static class RabbitMQExtensions
//{
//    public static IServiceCollection
//        AddRabbitMQ(

//        this IServiceCollection services,

//        IConfiguration configuration)

//    {
//        var settings =
//            configuration

//            .GetSection("RabbitMQ")

//            .Get<RabbitMQSettings>()

//            ?? new RabbitMQSettings();

//        services.AddSingleton(settings);

//        services.AddSingleton<IMessageBus,
//            RabbitMQPublisher>();

//        return services;
//    }
//}



using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PayFlow.MessageBus.Configurations;
using PayFlow.MessageBus.Interfaces;
using PayFlow.MessageBus.Publishers;

namespace PayFlow.MessageBus.Extensions;

public static class RabbitMQExtensions
{
    public static IServiceCollection AddRabbitMQ(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.Configure<RabbitMQSettings>(
            configuration.GetSection("RabbitMQ"));

        services.AddSingleton(sp =>
            sp.GetRequiredService<
                Microsoft.Extensions.Options.IOptions<RabbitMQSettings>>().Value);

        services.AddSingleton<IMessageBus, RabbitMQPublisher>();

        return services;
    }
}