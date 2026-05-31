using PayFlow.PaymentService.DTOs;

namespace PayFlow.PaymentService.Interfaces;

public interface IPaymentService
{
    Task<PaymentResponse> CreatePaymentAsync(
        CreatePaymentRequest request);
}