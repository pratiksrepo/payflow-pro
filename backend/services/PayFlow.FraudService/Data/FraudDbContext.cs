using Microsoft.EntityFrameworkCore;
using PayFlow.FraudService.Models;

namespace PayFlow.FraudService.Data;

public class FraudDbContext : DbContext
{
    public FraudDbContext(
        DbContextOptions<FraudDbContext> options)
        : base(options)
    {
    }

    public DbSet<FraudCheck> FraudChecks =>
        Set<FraudCheck>();
}