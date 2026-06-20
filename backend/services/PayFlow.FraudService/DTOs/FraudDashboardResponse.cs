namespace PayFlow.FraudService.DTOs;

public class FraudDashboardResponse
{
    public int TotalTransactions { get; set; }

    public int SafeTransactions { get; set; }

    public int FlaggedTransactions { get; set; }

    public double FraudRate { get; set; }

    public int HighRiskCount { get; set; }

    public int MediumRiskCount { get; set; }

    public int LowRiskCount { get; set; }
}