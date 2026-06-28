using PayFlow.FraudService.DTOs;
using PayFlow.FraudService.Models;
using PayFlow.SharedKernel.DTOs;

namespace PayFlow.FraudService.Interfaces;

public interface IFraudService
{
    Task<FraudCheckResponse> CheckFraudAsync(
        FraudCheckRequest request);

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