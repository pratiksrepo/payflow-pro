namespace PayFlow.FraudService.Models;

public class FraudCheck
{
    public Guid Id { get; set; }

    public Guid PaymentId { get; set; }

    public decimal Amount { get; set; }

    public string PaymentMethod { get; set; } = string.Empty;

    public int RiskScore { get; set; }

    public string RiskLevel { get; set; } = string.Empty;

    public bool IsFraudulent { get; set; }

    public DateTime CheckedAt { get; set; }
}