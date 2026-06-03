namespace PayFlow.FraudService.Models;

public class AnomalyDetectionResult
{
    public Guid Id { get; set; }

    public Guid PaymentId { get; set; }

    public decimal Amount { get; set; }

    public decimal AverageAmount { get; set; }

    public bool IsAnomaly { get; set; }

    public string Reason { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; }
}