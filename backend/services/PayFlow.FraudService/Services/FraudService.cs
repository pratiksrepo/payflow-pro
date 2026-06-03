using PayFlow.FraudService.DTOs;
using PayFlow.FraudService.Interfaces;
using PayFlow.FraudService.Models;

namespace PayFlow.FraudService.Services;

public class FraudService : IFraudService
{

    private readonly IFraudRepository _repository;

    public FraudService(
    IFraudRepository repository)
    {
        _repository = repository;
    }

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

        var fraudCheck =
    new FraudCheck
    {
        Id = Guid.NewGuid(),
        PaymentId = request.PaymentId,
        Amount = request.Amount,
        PaymentMethod = request.PaymentMethod,
        RiskScore = riskScore,
        RiskLevel = riskLevel,
        IsFraudulent = riskScore >= 70,
        CheckedAt = DateTime.UtcNow
    };

        await _repository
            .AddFraudCheckAsync(
                fraudCheck);
        var fingerprint =
    new TransactionFingerprint
    {
        Id = Guid.NewGuid(),
        PaymentId = request.PaymentId,
        Amount = request.Amount,
        PaymentMethod = request.PaymentMethod,

        HourOfDay =
            DateTime.UtcNow.Hour,

        DayOfWeek =
            (int)DateTime.UtcNow.DayOfWeek,

        RiskScore = riskScore,

        RiskLevel = riskLevel,

        CreatedAt =
            DateTime.UtcNow
    };

        await _repository
            .AddFingerprintAsync(
                fingerprint);

        await _repository
            .SaveChangesAsync();

        return await Task.FromResult(
            new FraudCheckResponse
            {
                RiskScore = riskScore,
                RiskLevel = riskLevel,
                IsFraudulent = riskScore >= 70
            });


    }


}