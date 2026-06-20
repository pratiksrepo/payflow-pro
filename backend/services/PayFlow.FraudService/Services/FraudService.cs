using PayFlow.FraudService.DTOs;
using PayFlow.FraudService.Interfaces;
using PayFlow.FraudService.Models;
using PayFlow.SharedKernel.DTOs;

namespace PayFlow.FraudService.Services;

public class FraudService : IFraudService
{

    private readonly IFraudRepository _repository;

    private readonly
    IAnomalyDetectionService
        _anomalyDetectionService;


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

        var isAnomaly =
        await _anomalyDetectionService
        .IsAnomalousAsync(
            request.PaymentId,
            request.Amount);

        if (isAnomaly)
        {
            riskScore += 20;
        }

        riskScore = Math.Min(riskScore, 100);

        var fingerprints =
            await _repository
                .GetFingerprintsAsync();

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
    .AddAnomalyAsync(
        new AnomalyDetectionResult
        {
            Id = Guid.NewGuid(),

            PaymentId =
                request.PaymentId,

            Amount =
                request.Amount,

            AverageAmount =
                fingerprints.Any()
                    ? fingerprints.Average(
                        x => x.Amount)
                    : 0,

            IsAnomaly =
                isAnomaly,

            Reason =
                isAnomaly
                    ? "Amount exceeds average by 3x"
                    : "Normal",

            CreatedAt =
                DateTime.UtcNow
        });
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

    public FraudService(
    IFraudRepository repository,
    IAnomalyDetectionService
        anomalyDetectionService)
    {
        _repository = repository;

        _anomalyDetectionService =
            anomalyDetectionService;
    }


    public async Task<FraudDashboardResponse>
    GetDashboardAsync()
    {
        var checks =
            await _repository
                .GetFraudChecksAsync();

        var total =
            checks.Count;

        var fraud =
            checks.Count(
                x => x.IsFraudulent);

        var safe =
            total - fraud;

        return new FraudDashboardResponse
        {
            TotalTransactions =
                total,

            SafeTransactions =
                safe,

            FlaggedTransactions =
                fraud,

            FraudRate =
                total == 0
                    ? 0
                    : Math.Round(
                        (double)fraud /
                        total * 100,
                        2),

            HighRiskCount =
                checks.Count(
                    x => x.RiskLevel == "High"),

            MediumRiskCount =
                checks.Count(
                    x => x.RiskLevel == "Medium"),

            LowRiskCount =
                checks.Count(
                    x => x.RiskLevel == "Low")
        };
    }


}