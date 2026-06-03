using PayFlow.FraudService.DTOs;
using PayFlow.FraudService.Interfaces;

namespace PayFlow.FraudService.Services;

public class FraudService : IFraudService
{
    public async Task<FraudCheckResponse>
        CheckFraudAsync(
        FraudCheckRequest request)
    {
        int riskScore;

        if (request.Amount > 50000)
        {
            riskScore = 90;
        }
        else if (request.Amount > 10000)
        {
            riskScore = 60;
        }
        else
        {
            riskScore = 20;
        }

        var riskLevel =
            riskScore switch
            {
                <= 30 => "Low",
                <= 70 => "Medium",
                _ => "High"
            };

        return await Task.FromResult(
            new FraudCheckResponse
            {
                RiskScore = riskScore,
                RiskLevel = riskLevel,
                IsFraudulent = riskScore >= 70
            });
    }
}