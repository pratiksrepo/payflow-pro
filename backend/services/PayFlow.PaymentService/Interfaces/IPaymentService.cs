using PayFlow.PaymentService.DTOs;
using PayFlow.PaymentService.Models;

namespace PayFlow.PaymentService.Interfaces;

public interface IPaymentService
{
    Task<PaymentResponse> CreatePaymentAsync(
        CreatePaymentRequest request);

    Task<bool> UpdateStatusAsync(
    UpdatePaymentStatusRequest request);

    Task<Payment?> GetByIdAsync(Guid id);

    Task<List<Payment>>
        GetPaymentsByUserAsync(
            int userId);

    Task<List<PaymentStateHistory>>
    GetPaymentHistoryAsync(
        Guid paymentId);
}