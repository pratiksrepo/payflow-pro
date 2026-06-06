using PayFlow.WalletService.Models;

namespace PayFlow.WalletService.Interfaces;

public interface IWalletRepository
{
    Task AddAsync(Wallet wallet);

    Task<Wallet?> GetByUserIdAsync(
        int userId);

    Task SaveChangesAsync();
}