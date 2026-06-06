namespace PayFlow.WalletService.Models;

public class Wallet
{
    public Guid Id { get; set; }

    public int UserId { get; set; }

    public decimal Balance { get; set; }

    public DateTime CreatedAt { get; set; }
        = DateTime.UtcNow;
}