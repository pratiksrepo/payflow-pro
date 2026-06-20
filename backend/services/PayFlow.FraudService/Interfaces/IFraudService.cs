using PayFlow.FraudService.DTOs;
using PayFlow.SharedKernel.DTOs;

namespace PayFlow.FraudService.Interfaces;

public interface IFraudService
{
    Task<FraudCheckResponse> CheckFraudAsync(
        FraudCheckRequest request);

    Task<FraudDashboardResponse>
    GetDashboardAsync();
}