using PayFlow.WalletService.DTOs;
using PayFlow.WalletService.Interfaces;
using PayFlow.WalletService.Models;

namespace PayFlow.WalletService.Services;

public class WalletService
    : IWalletService
{
    private readonly IWalletRepository
        _repository;

    private readonly ILogger<WalletService> _logger;

    public WalletService(
        IWalletRepository repository,
        ILogger<WalletService> logger)
    {
        _repository = repository;
        _logger = logger;
    }

    public async Task<WalletResponse>
        CreateWalletAsync(
            CreateWalletRequest request)
    {
        var wallet = new Wallet
        {
            Id = Guid.NewGuid(),
            UserId = request.UserId,
            Balance =
                request.InitialBalance
        };

        await _repository.AddAsync(
            wallet);

        await _repository.SaveChangesAsync();

        return new WalletResponse
        {
            WalletId = wallet.Id,
            Balance = wallet.Balance
        };
    }

    public async Task<bool>
        CreditAsync(
        CreditWalletRequest request)
    {
        var wallet =
            await _repository
                .GetByUserIdAsync(
                    request.UserId);

        if (wallet == null)
            return false;

        wallet.Balance += request.Amount;

        await _repository.UpdateAsync(
            wallet);

        await _repository
            .AddTransactionAsync(
                new WalletTransaction
                {
                    Id = Guid.NewGuid(),
                    WalletId = wallet.Id,
                    Amount = request.Amount,
                    Type = "Credit"
                });

        await _repository
            .SaveChangesAsync();

        _logger.LogError(
    $"AUDIT : Wallet credited ₹{request.Amount} for User {request.UserId}");

        return true;
    }

    public async Task<DebitWalletResponse>
     DebitAsync(
     DebitWalletRequest request)
    {
        var wallet =
            await _repository
                .GetByUserIdAsync(
                    request.UserId);

        if (wallet == null)
        {
            return new DebitWalletResponse
            {
                Success = false,
                Message = "Wallet not found"
            };
        }

        if (wallet.Balance <
            request.Amount)
        {
            return new DebitWalletResponse
            {
                Success = false,
                Message =
                    "Insufficient balance"
            };
        }

        wallet.Balance -= request.Amount;

        await _repository
            .UpdateAsync(wallet);

        await _repository
            .AddTransactionAsync(
                new WalletTransaction
                {
                    Id = Guid.NewGuid(),
                    WalletId = wallet.Id,
                    Amount = request.Amount,
                    Type = "Debit"
                });

        await _repository
            .SaveChangesAsync();

        _logger.LogError(
    $"AUDIT : Wallet debited ₹{request.Amount} for User {request.UserId}");

        return new DebitWalletResponse
        {
            Success = true,
            Message = "Debited",

            RemainingBalance =
                wallet.Balance
        };
    }

    public async Task<WalletResponse?>
        GetWalletAsync(
        int userId)
    {
        var wallet =
            await _repository
                .GetByUserIdAsync(
                    userId);

        if (wallet == null)
            return null;

        return new WalletResponse
        {
            WalletId = wallet.Id,
            Balance = wallet.Balance
        };
    }

    public async Task<List<Wallet>>
SearchWalletsAsync(
    string search)
    {
        return await _repository
            .SearchWalletsAsync(search);
    }
}