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
}