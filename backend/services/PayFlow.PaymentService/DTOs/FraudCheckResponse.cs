namespace PayFlow.PaymentService.DTOs;

public class FraudCheckResponse
{
    public int RiskScore { get; set; }

    public string RiskLevel { get; set; } = string.Empty;

    public bool IsFraudulent { get; set; }
}