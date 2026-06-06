using Microsoft.EntityFrameworkCore;
using PayFlow.WalletService.Data;
using PayFlow.WalletService.Interfaces;
using PayFlow.WalletService.Models;

namespace PayFlow.WalletService.Repositories;

public class WalletRepository
    : IWalletRepository
{
    private readonly WalletDbContext
        _context;

    public WalletRepository(
        WalletDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(
        Wallet wallet)
    {
        await _context.Wallets
            .AddAsync(wallet);
    }

    public async Task<Wallet?>
        GetByUserIdAsync(
        int userId)
    {
        return await _context.Wallets
            .FirstOrDefaultAsync(
                x => x.UserId == userId);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}