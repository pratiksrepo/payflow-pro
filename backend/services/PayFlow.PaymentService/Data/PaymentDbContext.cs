using Microsoft.EntityFrameworkCore;
using PayFlow.PaymentService.Models;

namespace PayFlow.PaymentService.Data;

public class PaymentDbContext : DbContext
{
    public PaymentDbContext(
        DbContextOptions<PaymentDbContext> options)
        : base(options)
    {
    }

    public DbSet<Payment> Payments =>
        Set<Payment>();
}