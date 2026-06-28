using PayFlow.PaymentService.DTOs;
using PayFlow.PaymentService.Models;

namespace PayFlow.PaymentService.Interfaces;

public interface IPaymentService
{
    Task<PaymentResponse> CreatePaymentAsync(
        CreatePaymentRequest request);

    Task<bool> UpdateStatusAsync(
    UpdatePaymentStatusRequest request);

    Task<Payment?> GetByIdAsync(Guid id);

    Task<List<Payment>>
    GetPaymentsByUserAsync(
        int userId);

    Task<List<PaymentStateHistory>>
    GetPaymentHistoryAsync(
        Guid paymentId);

    Task<byte[]>
    ExportPaymentsAsync();

    Task<List<Payment>>
GetRecentPaymentsAsync();

    Task<List<AuditLog>>
GetAuditLogsAsync();

    Task<List<Payment>>
SearchPaymentsAsync(string search);

    Task<PagedResponse<Payment>>
    GetPaymentsPagedAsync(
        int userId,
        int page,
        int pageSize,
        string? search,
        string? status,
        string? sort);

    Task<PagedResponse<AuditLog>>
GetAuditLogsPagedAsync(
    int page,
    int pageSize,
    string? search,
    string? action,
    string? sort);
}