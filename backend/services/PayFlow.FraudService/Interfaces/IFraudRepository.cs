using PayFlow.FraudService.DTOs;
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

    Task<List<FraudCheck>>
    GetFraudChecksAsync();

    Task<FraudDashboardResponse>
    GetDashboardAsync();

    Task<List<FraudCheck>>
GetRecentFraudChecksAsync();

    Task<List<FraudCheck>>
SearchFraudAsync(
    string search);

    Task<PagedResponse<FraudCheck>>
GetFraudPagedAsync(
    int page,
    int pageSize,
    string? search,
    string? riskLevel,
    string? sort);
}