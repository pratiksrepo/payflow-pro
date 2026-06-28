using PayFlow.NotificationService.DTOs;
using PayFlow.NotificationService.Models;

namespace PayFlow.NotificationService.Interfaces;

public interface INotificationService
{
    Task CreateAsync(
        CreateNotificationRequest request);

    Task<List<NotificationResponse>>
        GetByUserIdAsync(
            int userId);

    Task<PagedResponse<Notification>>
GetNotificationsPagedAsync(
    int userId,
    int page,
    int pageSize,
    string? search,
    bool? isRead,
    string? sort);
}