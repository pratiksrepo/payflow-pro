namespace PayFlow.PaymentService.DTOs;

public class CreatePaymentRequest
{
    public int UserId { get; set; }

    public decimal Amount { get; set; }

    public string MerchantId { get; set; } = string.Empty;

    public string PaymentMethod { get; set; } = string.Empty;
}