using PayFlow.FraudService.Models;

namespace PayFlow.FraudService.Interfaces;

public interface IFraudRepository
{
    Task AddFraudCheckAsync(
        FraudCheck fraudCheck);

    Task AddFingerprintAsync(
        TransactionFingerprint fingerprint);

    Task SaveChangesAsync();
}