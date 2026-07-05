using PayFlow.MessageBus.Events;
using PayFlow.NotificationService.DTOs;
using PayFlow.NotificationService.Interfaces;

namespace PayFlow.NotificationService.Consumers;

public class PaymentCreatedConsumer
{
    private readonly INotificationService _notificationService;

    public PaymentCreatedConsumer(
        INotificationService notificationService)
    {
        _notificationService = notificationService;
    }

    public async Task ConsumeAsync(
        PaymentCreatedEvent payment)
    {
        await _notificationService.CreateAsync(
            new CreateNotificationRequest
            {
                UserId = payment.UserId,

                Title = "Payment Created",

                Message =
                    $"Payment ₹{payment.Amount} created successfully.",

                Type = "Payment"
            });
    }
}