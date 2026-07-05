using PayFlow.MessageBus.Events;

namespace PayFlow.FraudService.Consumers;

public class PaymentCreatedConsumer
{
    public async Task ConsumeAsync(
        PaymentCreatedEvent payment)
    {
        Console.ForegroundColor = ConsoleColor.Red;

        Console.WriteLine(
            $"Fraud Consumer Received Payment : {payment.PaymentId}");

        Console.ResetColor();

        await Task.CompletedTask;
    }
}