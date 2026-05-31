using PayFlow.PaymentService.DTOs;
using PayFlow.PaymentService.Interfaces;
using PayFlow.PaymentService.Models;

namespace PayFlow.PaymentService.Services;

public class PaymentService : IPaymentService
{
    private readonly IPaymentRepository _repository;

    public PaymentService(
        IPaymentRepository repository)
    {
        _repository = repository;
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

        return new PaymentResponse
        {
            PaymentId = payment.Id,
            Amount = payment.Amount,
            Status = payment.Status.ToString()
        };
    }
}