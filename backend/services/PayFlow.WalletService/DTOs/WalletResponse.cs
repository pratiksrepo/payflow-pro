namespace PayFlow.WalletService.DTOs;

public class WalletResponse
{
    public Guid WalletId { get; set; }

    public decimal Balance { get; set; }
}