using System.Net.Http.Json;
using PayFlow.PaymentService.DTOs;
using PayFlow.PaymentService.Helpers;
using PayFlow.PaymentService.Interfaces;
using PayFlow.PaymentService.Models;

namespace PayFlow.PaymentService.Services;

public class PaymentService : IPaymentService
{
    private readonly IPaymentRepository _repository;

    private readonly IHttpClientFactory _httpClientFactory;

    public PaymentService(
        IPaymentRepository repository,
        IHttpClientFactory httpClientFactory)
    {
        _repository = repository;

        _httpClientFactory = httpClientFactory;
    }

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

        var fraudResult =
            await CheckFraudAsync(payment);

        if (fraudResult != null)
        {
            if (fraudResult.RiskScore >= 90)
            {
                payment.Status =
                    PaymentStatus.Failed;
            }
            else
            {
                payment.Status =
                    PaymentStatus.Pending;
            }

            await _repository.UpdateAsync(
                payment);

            await _repository.AddHistoryAsync(
                new PaymentStateHistory
                {
                    PaymentId = payment.Id,
                    OldStatus = "Initiated",
                    NewStatus =
                        payment.Status.ToString(),
                    ChangedAt =
                        DateTime.UtcNow
                });

            await _repository.SaveChangesAsync();
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
}