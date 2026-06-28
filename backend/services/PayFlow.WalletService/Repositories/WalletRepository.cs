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
    public async Task UpdateAsync(
    Wallet wallet)
    {
        _context.Wallets.Update(wallet);

        await Task.CompletedTask;
    }

    public async Task AddTransactionAsync(
    WalletTransaction transaction)
    {
        await _context.WalletTransactions
            .AddAsync(transaction);
    }

    public async Task<List<WalletTransaction>>
    GetTransactionsAsync(
        Guid walletId)
    {
        return await _context
            .WalletTransactions
            .Where(x => x.WalletId == walletId)
            .OrderByDescending(
                x => x.CreatedAt)
            .ToListAsync();
    }

    public async Task<List<Wallet>>
SearchWalletsAsync(
    string search)
    {
        return await _context.Wallets
            .Where(x =>
                x.UserId
                    .ToString()
                    .Contains(search))
            .ToListAsync();
    }
}