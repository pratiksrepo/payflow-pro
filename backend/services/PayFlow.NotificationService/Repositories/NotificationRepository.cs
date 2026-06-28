using Microsoft.EntityFrameworkCore;
using PayFlow.NotificationService.Data;
using PayFlow.NotificationService.Interfaces;
using PayFlow.NotificationService.Models;

namespace PayFlow.NotificationService.Repositories;

public class NotificationRepository
    : INotificationRepository
{
    private readonly NotificationDbContext
        _context;

    public NotificationRepository(
        NotificationDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(
        Notification notification)
    {
        await _context.Notifications
            .AddAsync(notification);
    }

    public async Task<List<Notification>>
        GetByUserIdAsync(int userId)
    {
        return await _context.Notifications
            .Where(x => x.UserId == userId)
            .OrderByDescending(
                x => x.CreatedAt)
            .ToListAsync();
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }

    public async Task<DTOs.PagedResponse<Notification>>
GetNotificationsPagedAsync(
    int userId,
    int page,
    int pageSize,
    string? search,
    bool? isRead,
    string? sort)
    {
        IQueryable<Notification> query =
            _context.Notifications
                .Where(x =>
                    x.UserId == userId);

        //---------------------------------------

        if (!string.IsNullOrWhiteSpace(search))
        {
            query =
                query.Where(x =>

                    x.Title.Contains(search)

                    ||

                    x.Message.Contains(search)

                );
        }

        //---------------------------------------

        if (isRead.HasValue)
        {
            query =
                query.Where(x =>
                    x.IsRead ==
                    isRead.Value);
        }

        //---------------------------------------

        query =
            sort == "oldest"

            ?

            query.OrderBy(
                x => x.CreatedAt)

            :

            query.OrderByDescending(
                x => x.CreatedAt);

        //---------------------------------------

        var totalRecords =
            await query.CountAsync();

        //---------------------------------------

        var data =
            await query

                .Skip(
                    (page - 1)
                    * pageSize)

                .Take(pageSize)

                .ToListAsync();

        //---------------------------------------

        return new DTOs.PagedResponse<Notification>
        {
            Data = data,

            Page = page,

            PageSize = pageSize,

            TotalRecords =
                totalRecords
        };
    }
}