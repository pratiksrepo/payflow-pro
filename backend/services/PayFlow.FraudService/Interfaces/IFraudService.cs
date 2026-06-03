using PayFlow.FraudService.DTOs;

namespace PayFlow.FraudService.Interfaces;

public interface IFraudService
{
    Task<FraudCheckResponse> CheckFraudAsync(
        FraudCheckRequest request);
}