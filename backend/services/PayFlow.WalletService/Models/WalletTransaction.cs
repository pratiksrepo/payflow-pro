namespace PayFlow.WalletService.Models;

public class WalletTransaction
{
    public Guid Id { get; set; }

    public Guid WalletId { get; set; }

    public decimal Amount { get; set; }

    public string Type { get; set; }
        = string.Empty;

    public DateTime CreatedAt
    {
        get;
        set;
    } = DateTime.UtcNow;
}