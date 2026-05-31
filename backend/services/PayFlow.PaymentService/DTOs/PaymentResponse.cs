namespace PayFlow.PaymentService.DTOs;

public class PaymentResponse
{
    public Guid PaymentId { get; set; }

    public string Status { get; set; } = string.Empty;

    public decimal Amount { get; set; }
}