using PayFlow.NotificationService.DTOs;

namespace PayFlow.NotificationService.Interfaces;

public interface INotificationService
{
    Task CreateAsync(
        CreateNotificationRequest request);

    Task<List<NotificationResponse>>
        GetByUserIdAsync(
            int userId);
}