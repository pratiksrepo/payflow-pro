using PayFlow.FraudService.DTOs;

namespace PayFlow.FraudService.Interfaces;

public interface IAnomalyDetectionService
{
    Task<bool> IsAnomalousAsync(
        Guid paymentId,
        decimal amount);
}