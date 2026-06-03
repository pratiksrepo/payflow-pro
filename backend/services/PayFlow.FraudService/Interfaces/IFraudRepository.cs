using PayFlow.FraudService.Models;

namespace PayFlow.FraudService.Interfaces;

public interface IFraudRepository
{
    Task AddFraudCheckAsync(
        FraudCheck fraudCheck);

    Task AddFingerprintAsync(
        TransactionFingerprint fingerprint);

    Task SaveChangesAsync();

    Task AddAnomalyAsync(
    AnomalyDetectionResult anomaly);

    Task<List<TransactionFingerprint>>
        GetFingerprintsAsync();
}