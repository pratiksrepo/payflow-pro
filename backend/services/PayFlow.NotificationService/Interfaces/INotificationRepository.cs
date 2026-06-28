using PayFlow.NotificationService.Models;

namespace PayFlow.NotificationService.Interfaces;

public interface INotificationRepository
{
    Task AddAsync(Notification notification);

    Task<List<Notification>>
        GetByUserIdAsync(int userId);

    Task SaveChangesAsync();

    Task<DTOs.PagedResponse<Notification>>
    GetNotificationsPagedAsync(
        int userId,
        int page,
        int pageSize,
        string? search,
        bool? isRead,
        string? sort);
}