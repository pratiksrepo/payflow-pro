using PayFlow.FraudService.DTOs;
using PayFlow.FraudService.Interfaces;
using PayFlow.FraudService.Models;
using PayFlow.SharedKernel.DTOs;

namespace PayFlow.FraudService.Services;

public class FraudService : IFraudService
{
    private readonly IFraudRepository _repository;

    private readonly IAnomalyDetectionService _anomalyDetectionService;

    private readonly ILogger<FraudService> _logger;

    public FraudService(
        IFraudRepository repository,
        IAnomalyDetectionService anomalyDetectionService,
        ILogger<FraudService> logger)
    {
        _repository = repository;

        _anomalyDetectionService =
            anomalyDetectionService;

        _logger = logger;
    }

    public async Task<FraudCheckResponse>
        CheckFraudAsync(
        FraudCheckRequest request)
    {
        _logger.LogInformation(
            "Fraud check started for Payment {PaymentId}. Amount={Amount}",
            request.PaymentId,
            request.Amount);

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
            _logger.LogWarning(
                "Anomaly detected for Payment {PaymentId}.",
                request.PaymentId);

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

        await _repository.AddAnomalyAsync(
            new AnomalyDetectionResult
            {
                Id = Guid.NewGuid(),

                PaymentId = request.PaymentId,

                Amount = request.Amount,

                AverageAmount =
                    fingerprints.Any()
                        ? fingerprints.Average(x => x.Amount)
                        : 0,

                IsAnomaly = isAnomaly,

                Reason =
                    isAnomaly
                        ? "Amount exceeds average by 3x"
                        : "Normal",

                CreatedAt = DateTime.UtcNow
            });

        await _repository
            .AddFraudCheckAsync(fraudCheck);

        var fingerprint =
            new TransactionFingerprint
            {
                Id = Guid.NewGuid(),
                PaymentId = request.PaymentId,
                Amount = request.Amount,
                PaymentMethod = request.PaymentMethod,

                HourOfDay = DateTime.UtcNow.Hour,

                DayOfWeek =
                    (int)DateTime.UtcNow.DayOfWeek,

                RiskScore = riskScore,

                RiskLevel = riskLevel,

                CreatedAt = DateTime.UtcNow
            };

        await _repository
            .AddFingerprintAsync(
                fingerprint);

        await _repository.SaveChangesAsync();

        _logger.LogInformation(
            "Fraud check completed for Payment {PaymentId}. RiskScore={RiskScore}, RiskLevel={RiskLevel}, Fraud={Fraud}",
            request.PaymentId,
            riskScore,
            riskLevel,
            riskScore >= 70);

        return new FraudCheckResponse
        {
            RiskScore = riskScore,
            RiskLevel = riskLevel,
            IsFraudulent = riskScore >= 70
        };
    }

    public async Task<FraudDashboardResponse>
        GetDashboardAsync()
    {
        var checks =
            await _repository.GetFraudChecksAsync();

        var total = checks.Count;

        var fraud =
            checks.Count(x => x.IsFraudulent);

        var safe = total - fraud;

        _logger.LogInformation(
            "Fraud dashboard requested.");

        return new FraudDashboardResponse
        {
            TotalTransactions = total,

            SafeTransactions = safe,

            FlaggedTransactions = fraud,

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

    public async Task<List<FraudCheck>>
        GetRecentFraudChecksAsync()
    {
        _logger.LogInformation(
            "Recent fraud checks requested.");

        return await _repository
            .GetRecentFraudChecksAsync();
    }

    public async Task<List<FraudCheck>>
        SearchFraudAsync(
            string search)
    {
        _logger.LogInformation(
            "Fraud search executed. Search={Search}",
            search);

        return await _repository
            .SearchFraudAsync(search);
    }

    public async Task<PagedResponse<FraudCheck>>
        GetFraudPagedAsync(
            int page,
            int pageSize,
            string? search,
            string? riskLevel,
            string? sort)
    {
        _logger.LogInformation(
            "Fraud pagination requested. Page={Page}, Search={Search}, RiskLevel={RiskLevel}",
            page,
            search,
            riskLevel);

        return await _repository
            .GetFraudPagedAsync(
                page,
                pageSize,
                search,
                riskLevel,
                sort);
    }
}