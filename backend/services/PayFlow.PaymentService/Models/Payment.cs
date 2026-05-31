namespace PayFlow.PaymentService.Models;

public class Payment
{
    public Guid Id { get; set; }

    public int UserId { get; set; }

    public decimal Amount { get; set; }

    public string MerchantId { get; set; } = string.Empty;

    public string PaymentMethod { get; set; } = string.Empty;

    public string Currency { get; set; } = "INR";

    public PaymentStatus Status { get; set; }

    public DateTime CreatedAt { get; set; }
}