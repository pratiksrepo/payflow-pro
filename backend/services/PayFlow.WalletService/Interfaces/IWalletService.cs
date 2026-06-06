using PayFlow.WalletService.DTOs;

namespace PayFlow.WalletService.Interfaces;

public interface IWalletService
{
    Task<WalletResponse>
        CreateWalletAsync(
            CreateWalletRequest request);

    Task<bool>
        CreditAsync(
            CreditWalletRequest request);

    Task<DebitWalletResponse>
        DebitAsync(
            DebitWalletRequest request);

    Task<WalletResponse?>
        GetWalletAsync(
            int userId);
}