namespace PayFlow.FraudService.DTOs;

public class FraudCheckRequest
{
    public Guid PaymentId { get; set; }

    public decimal Amount { get; set; }

    public string PaymentMethod { get; set; } = string.Empty;
}