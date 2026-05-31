using PayFlow.PaymentService.Models;

namespace PayFlow.PaymentService.Interfaces;

public interface IPaymentRepository
{
    Task AddAsync(Payment payment);

    Task SaveChangesAsync();
}