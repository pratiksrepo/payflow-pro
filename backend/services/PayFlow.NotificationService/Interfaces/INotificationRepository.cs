using PayFlow.NotificationService.Models;

namespace PayFlow.NotificationService.Interfaces;

public interface INotificationRepository
{
    Task AddAsync(Notification notification);

    Task<List<Notification>>
        GetByUserIdAsync(int userId);

    Task SaveChangesAsync();
}