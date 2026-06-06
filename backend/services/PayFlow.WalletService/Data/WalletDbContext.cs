using Microsoft.EntityFrameworkCore;
using PayFlow.WalletService.Models;

namespace PayFlow.WalletService.Data;

public class WalletDbContext
    : DbContext
{
    public WalletDbContext(
        DbContextOptions<WalletDbContext>
            options)
        : base(options)
    {
    }

    public DbSet<Wallet> Wallets =>
        Set<Wallet>();

    public DbSet<WalletTransaction>
        WalletTransactions =>
            Set<WalletTransaction>();
}