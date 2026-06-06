namespace PayFlow.PaymentService.DTOs;

public class DebitWalletRequest
{
    public int UserId { get; set; }

    public decimal Amount { get; set; }
}