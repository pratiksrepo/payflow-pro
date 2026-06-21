using PayFlow.PaymentService.Models;

namespace PayFlow.PaymentService.Interfaces;

public interface IPaymentRepository
{
    Task AddAsync(Payment payment);

    Task SaveChangesAsync();

    Task<Payment?> GetByIdAsync(Guid id);

    Task UpdateAsync(Payment payment);

    Task AddHistoryAsync(
        PaymentStateHistory history);

    Task<List<Payment>>
    GetPaymentsByUserAsync(
        int userId);


    Task<List<PaymentStateHistory>>
    GetHistoryByPaymentIdAsync(
        Guid paymentId);

    Task<List<Payment>>
    GetAllPaymentsAsync();
}