using PayFlow.FraudService.Interfaces;

namespace PayFlow.FraudService.Services;

public class AnomalyDetectionService
    : IAnomalyDetectionService
{
    private readonly IFraudRepository
        _repository;

    public AnomalyDetectionService(
        IFraudRepository repository)
    {
        _repository = repository;
    }

    public async Task<bool>
        IsAnomalousAsync(
        Guid paymentId,
        decimal amount)
    {
        var fingerprints =
            await _repository
                .GetFingerprintsAsync();

        if (!fingerprints.Any())
            return false;

        var averageAmount =
            fingerprints
                .Average(x => x.Amount);

        return amount >
            averageAmount * 3;
    }
}