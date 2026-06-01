using Microsoft.EntityFrameworkCore;
using PayFlow.PaymentService.Data;
using PayFlow.PaymentService.Interfaces;
using PayFlow.PaymentService.Models;

namespace PayFlow.PaymentService.Repositories;

public class PaymentRepository : IPaymentRepository
{
    private readonly PaymentDbContext _context;

    public PaymentRepository(
        PaymentDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(
        Payment payment)
    {
        await _context.Payments.AddAsync(payment);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }

    public async Task<Payment?> GetByIdAsync(
        Guid id)
    {
        return await _context.Payments
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public Task UpdateAsync(
        Payment payment)
    {
        _context.Payments.Update(payment);

        return Task.CompletedTask;
    }

    public async Task AddHistoryAsync(
        PaymentStateHistory history)
    {
        await _context.PaymentStateHistories
            .AddAsync(history);
    }
}