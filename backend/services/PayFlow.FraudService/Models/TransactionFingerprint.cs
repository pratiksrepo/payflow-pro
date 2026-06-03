namespace PayFlow.FraudService.Models;

public class TransactionFingerprint
{
    public Guid Id { get; set; }

    public Guid PaymentId { get; set; }

    public decimal Amount { get; set; }

    public string PaymentMethod { get; set; } = string.Empty;

    public int HourOfDay { get; set; }

    public int DayOfWeek { get; set; }

    public int RiskScore { get; set; }

    public string RiskLevel { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; }
}