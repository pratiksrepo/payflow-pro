using Microsoft.EntityFrameworkCore;
using PayFlow.PaymentService.Data;
using PayFlow.PaymentService.DTOs;
using PayFlow.PaymentService.Interfaces;
using PayFlow.PaymentService.Models;

namespace PayFlow.PaymentService.Repositories;

public class PaymentRepository : IPaymentRepository
{
    private readonly PaymentDbContext _context;

    public PaymentRepository(
        PaymentDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(
        Payment payment)
    {
        await _context.Payments.AddAsync(payment);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }

    public async Task<Payment?> GetByIdAsync(
        Guid id)
    {
        return await _context.Payments
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public Task UpdateAsync(
        Payment payment)
    {
        _context.Payments.Update(payment);

        return Task.CompletedTask;
    }

    public async Task AddHistoryAsync(
        PaymentStateHistory history)
    {
        await _context.PaymentStateHistories
            .AddAsync(history);
    }

    public async Task<List<Payment>>
    GetPaymentsByUserAsync(
        int userId)
    {
        return await _context.Payments
            .Where(x => x.UserId == userId)
            .OrderByDescending(x => x.CreatedAt)
            .ToListAsync();
    }

    public async Task<List<PaymentStateHistory>>
    GetHistoryByPaymentIdAsync(
        Guid paymentId)
    {
        return await _context
            .PaymentStateHistories
            .Where(x =>
                x.PaymentId == paymentId)
            .OrderBy(x =>
                x.ChangedAt)
            .ToListAsync();
    }


    public async Task<List<Payment>>
    GetAllPaymentsAsync()
    {
        return await _context
            .Payments
            .OrderByDescending(
                p => p.CreatedAt)
            .ToListAsync();
    }

    public async Task AddAuditLogAsync(
    AuditLog log)
    {
        await _context.AuditLogs
            .AddAsync(log);
    }

    public async Task<List<AuditLog>>
GetAuditLogsAsync()
    {
        return await _context.AuditLogs
            .OrderByDescending(
                x => x.CreatedAt)
            .ToListAsync();
    }

    public async Task<List<Payment>>
SearchPaymentsAsync(string search)
    {
        return await _context.Payments
            .Where(x =>
                x.MerchantId.Contains(search) ||
                x.PaymentMethod.Contains(search))
            .ToListAsync();
    }
    public async Task<PagedResponse<Payment>>
GetPaymentsPagedAsync(
    int userId,
    int page,
    int pageSize,
    string? search,
    string? status,
    string? sort)
    {
        IQueryable<Payment> query =
            _context.Payments
                .Where(x => x.UserId == userId);

        if (!string.IsNullOrWhiteSpace(search))
        {
            query = query.Where(x =>
                x.MerchantId.Contains(search) ||
                x.PaymentMethod.Contains(search));
        }

        if (!string.IsNullOrWhiteSpace(status))
        {
            if (Enum.TryParse<PaymentStatus>(
                status,
                true,
                out var paymentStatus))
            {
                query = query.Where(x =>
                    x.Status == paymentStatus);
            }
        }

        query =
            sort == "oldest"
                ? query.OrderBy(x => x.CreatedAt)
                : query.OrderByDescending(x => x.CreatedAt);

        var totalRecords =
            await query.CountAsync();

        var data =
            await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

        return new PagedResponse<Payment>
        {
            Data = data,
            TotalRecords = totalRecords,
            Page = page,
            PageSize = pageSize
        };
    }

    public async Task<PagedResponse<AuditLog>>
GetAuditLogsPagedAsync(
    int page,
    int pageSize,
    string? search,
    string? action,
    string? sort)
    {
        IQueryable<AuditLog> query =
            _context.AuditLogs;

        //---------------------------------

        if (!string.IsNullOrWhiteSpace(search))
        {
            query =
                query.Where(x =>

                    x.Description.Contains(search)

                    ||

                    x.Action.Contains(search)

                    ||

                    x.UserId
                        .ToString()
                        .Contains(search));
        }

        //---------------------------------

        if (!string.IsNullOrWhiteSpace(action))
        {
            query =
                query.Where(x =>
                    x.Action == action);
        }

        //---------------------------------

        query =
            sort == "oldest"

            ?

            query.OrderBy(
                x => x.CreatedAt)

            :

            query.OrderByDescending(
                x => x.CreatedAt);

        //---------------------------------

        var totalRecords =
            await query.CountAsync();

        //---------------------------------

        var data =
            await query

                .Skip(
                    (page - 1)
                    * pageSize)

                .Take(pageSize)

                .ToListAsync();

        //---------------------------------

        return new PagedResponse<AuditLog>
        {
            Data = data,

            Page = page,

            PageSize = pageSize,

            TotalRecords =
                totalRecords
        };
    }

}