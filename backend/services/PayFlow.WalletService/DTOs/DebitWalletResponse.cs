namespace PayFlow.WalletService.DTOs;

public class DebitWalletResponse
{
    public bool Success { get; set; }

    public string Message { get; set; }
        = string.Empty;

    public decimal RemainingBalance
    {
        get;
        set;
    }
}