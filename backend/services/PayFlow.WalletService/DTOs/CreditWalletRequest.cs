namespace PayFlow.WalletService.DTOs;

public class CreditWalletRequest
{
    public int UserId { get; set; }

    public decimal Amount { get; set; }
}