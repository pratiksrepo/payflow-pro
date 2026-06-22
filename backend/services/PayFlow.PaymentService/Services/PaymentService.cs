using PayFlow.PaymentService.DTOs;
using PayFlow.PaymentService.Helpers;
using PayFlow.PaymentService.Interfaces;
using PayFlow.PaymentService.Models;
using PayFlow.SharedKernel.DTOs;
using PayFlow.SharedKernel.Events;
using System.Net.Http.Json;
using PayFlow.PaymentService.Reports;

namespace PayFlow.PaymentService.Services;

public class PaymentService : IPaymentService
{
    private readonly IPaymentRepository _repository;

    private readonly IHttpClientFactory _httpClientFactory;

    private readonly IEventPublisher _eventPublisher;


    private async Task<FraudCheckResponse?>
        CheckFraudAsync(
        Payment payment)
    {
        var client =
            _httpClientFactory
                .CreateClient();

        var response =
            await client.PostAsJsonAsync(
                "https://localhost:7169/api/fraud/check",
                new FraudCheckRequest
                {
                    PaymentId = payment.Id,
                    Amount = payment.Amount,
                    PaymentMethod =
                        payment.PaymentMethod
                });

        if (!response.IsSuccessStatusCode)
            return null;

        return await response.Content
            .ReadFromJsonAsync<
                FraudCheckResponse>();
    }

    private async Task<
    DebitWalletResponse?>
    DebitWalletAsync(
    Payment payment)
    {
        var client =
            _httpClientFactory
                .CreateClient();

        var response =
            await client.PostAsJsonAsync(
                "https://localhost:7224/api/wallet/debit",
                new DebitWalletRequest
                {
                    UserId =
                        payment.UserId,

                    Amount =
                        payment.Amount
                });

        if (!response
            .IsSuccessStatusCode)
        {
            return null;
        }

        return await response
            .Content
            .ReadFromJsonAsync<
                DebitWalletResponse>();
    }

    private async Task
    SendNotificationAsync(
    int userId,
    string title,
    string message)
    {
        var client =
            _httpClientFactory
                .CreateClient();

        await client.PostAsJsonAsync(
            "https://localhost:7136/api/notification",
            new CreateNotificationRequest
            {
                UserId = userId,
                Title = title,
                Message = message,
                Type = "Payment"
            });
    }

    public async Task<PaymentResponse>
        CreatePaymentAsync(
        CreatePaymentRequest request)
    {
        var payment = new Payment
        {
            Id = Guid.NewGuid(),
            UserId = request.UserId,
            Amount = request.Amount,
            MerchantId = request.MerchantId,
            PaymentMethod = request.PaymentMethod,
            Status = PaymentStatus.Initiated,
            CreatedAt = DateTime.UtcNow
        };

        await _repository.AddAsync(payment);

        await _repository.SaveChangesAsync();

        await _eventPublisher
    .PublishAsync(
        new PaymentCreatedEvent
        {
            PaymentId =
                payment.Id,

            UserId =
                payment.UserId,

            Amount =
                payment.Amount,

            PaymentMethod =
                payment.PaymentMethod
        });

        var fraudResult =
            await CheckFraudAsync(payment);

        if (fraudResult != null)
        {
            Console.WriteLine(
    $"RiskScore={fraudResult.RiskScore}, Fraud={fraudResult.IsFraudulent}");

            if (fraudResult.IsFraudulent)
            {
                payment.Status =
                    PaymentStatus.Failed;

                await SendNotificationAsync(
                    payment.UserId,
                    "Payment Failed",
                    $"Payment {payment.Id} failed fraud validation");
            }
            else
            {
                var walletResult =
                    await DebitWalletAsync(
                        payment);

                if (walletResult == null ||
                    !walletResult.Success)
                {

                    Console.WriteLine(
    "WALLET FAILURE BRANCH");

                    payment.Status =
                        PaymentStatus.Failed;

                    await SendNotificationAsync(
                        payment.UserId,
                        "Payment Failed",
                        "Insufficient wallet balance");

                }
                else
                {
                    payment.Status =
                        PaymentStatus.Pending;
                    await SendNotificationAsync(
                    payment.UserId,
                    "Payment Created",
                    $"Payment {payment.Id} created successfully");
                }
            }



            await _repository
                .UpdateAsync(payment);

            await _repository
                .AddHistoryAsync(
                    new PaymentStateHistory
                    {
                        PaymentId =
                            payment.Id,

                        OldStatus =
                            "Initiated",

                        NewStatus =
                            payment.Status
                                .ToString(),

                        ChangedAt =
                            DateTime.UtcNow
                    });

            await _repository
                .SaveChangesAsync();
        }

        return new PaymentResponse
        {
            PaymentId = payment.Id,
            Amount = payment.Amount,
            Status = payment.Status.ToString()
        };
    }

    public async Task<bool>
        UpdateStatusAsync(
        UpdatePaymentStatusRequest request)
    {
        var payment =
            await _repository.GetByIdAsync(
                request.PaymentId);

        if (payment == null)
            return false;

        var oldStatus =
            payment.Status.ToString();

        var newStatus =
            Enum.Parse<PaymentStatus>(
                request.Status);

        if (!PaymentStateValidator
            .IsValidTransition(
                payment.Status,
                newStatus))
        {
            return false;
        }

        payment.Status = newStatus;

        await _repository.UpdateAsync(
            payment);

        await _repository.AddHistoryAsync(
            new PaymentStateHistory
            {
                PaymentId = payment.Id,
                OldStatus = oldStatus,
                NewStatus = request.Status,
                ChangedAt = DateTime.UtcNow
            });

        await _repository.SaveChangesAsync();

        return true;
    }

    public async Task<Payment?>
        GetByIdAsync(Guid id)
    {
        return await _repository
            .GetByIdAsync(id);
    }

    public PaymentService(
    IPaymentRepository repository,
    IHttpClientFactory httpClientFactory,
    IEventPublisher eventPublisher)
    {
        _repository = repository;

        _httpClientFactory =
            httpClientFactory;

        _eventPublisher =
            eventPublisher;
    }


    public async Task<List<Payment>>
    GetPaymentsByUserAsync(
        int userId)
    {
        return await _repository
            .GetPaymentsByUserAsync(
                userId);
    }

    public async Task<List<PaymentStateHistory>>
    GetPaymentHistoryAsync(
        Guid paymentId)
    {
        return await _repository
            .GetHistoryByPaymentIdAsync(
                paymentId);
    }


    public async Task<byte[]>
    ExportPaymentsAsync()
    {
        var payments =
            await _repository
                .GetAllPaymentsAsync();

        return PaymentReportGenerator
            .Generate(payments);
    }

    public async Task<List<Payment>>
GetRecentPaymentsAsync()
    {
        var payments =
            await _repository
                .GetAllPaymentsAsync();

        return payments
            .Take(5)
            .ToList();
    }


}