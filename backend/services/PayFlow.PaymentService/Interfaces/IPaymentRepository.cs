using PayFlow.PaymentService.DTOs;
using PayFlow.PaymentService.Models;

namespace PayFlow.PaymentService.Interfaces;

public interface IPaymentRepository
{
    Task AddAsync(Payment payment);

    Task SaveChangesAsync();

    Task<Payment?> GetByIdAsync(Guid id);

    Task UpdateAsync(Payment payment);

    Task AddHistoryAsync(
        PaymentStateHistory history);

    Task<List<Payment>>
    GetPaymentsByUserAsync(
        int userId);


    Task<List<PaymentStateHistory>>
    GetHistoryByPaymentIdAsync(
        Guid paymentId);

    Task<List<Payment>>
    GetAllPaymentsAsync();

    Task AddAuditLogAsync(
    AuditLog log);

    Task<List<AuditLog>>
    GetAuditLogsAsync();

    Task<PagedResponse<Payment>>
    GetPaymentsPagedAsync(
        int userId,
        int page,
        int pageSize,
        string? search,
        string? status,
        string? sort);

    Task<List<Payment>>
SearchPaymentsAsync(
    string search);

    Task<PagedResponse<AuditLog>>
GetAuditLogsPagedAsync(
    int page,
    int pageSize,
    string? search,
    string? action,
    string? sort);
}