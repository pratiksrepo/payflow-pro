using PayFlow.MessageBus.Events;
using PayFlow.WalletService.DTOs;
using PayFlow.WalletService.Interfaces;

namespace PayFlow.WalletService.Consumers;

public class PaymentCreatedConsumer
{
    private readonly IWalletService _walletService;
    private readonly ILogger<PaymentCreatedConsumer> _logger;

    public PaymentCreatedConsumer(
        IWalletService walletService, ILogger<PaymentCreatedConsumer> logger)
    {
        _walletService = walletService;
        _logger = logger;
    }

    public async Task ConsumeAsync(
        PaymentCreatedEvent payment)
    {
        _logger.LogError(
            $"Wallet Consumer Received Payment {payment.PaymentId}");

        await _walletService.DebitAsync(

            new DebitWalletRequest
            {
                UserId = payment.UserId,
                Amount = payment.Amount
            }

        );

        _logger.LogError(
            "Wallet Updated Successfully");
    }
}