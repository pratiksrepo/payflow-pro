namespace PayFlow.WalletService.DTOs;

public class CreateWalletRequest
{
    public int UserId { get; set; }

    public decimal InitialBalance
    {
        get;
        set;
    }
}