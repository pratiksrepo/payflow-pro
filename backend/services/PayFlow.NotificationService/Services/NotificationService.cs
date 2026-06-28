using PayFlow.NotificationService.DTOs;
using PayFlow.NotificationService.Interfaces;
using PayFlow.NotificationService.Models;

namespace PayFlow.NotificationService.Services;

public class NotificationService
    : INotificationService
{
    private readonly
        INotificationRepository
        _repository;

    public NotificationService(
        INotificationRepository
            repository)
    {
        _repository = repository;
    }

    public async Task CreateAsync(
        CreateNotificationRequest request)
    {
        var notification =
            new Notification
            {
                Id = Guid.NewGuid(),

                UserId =
                    request.UserId,

                Title =
                    request.Title,

                Message =
                    request.Message,

                Type =
                    request.Type
            };

        await _repository
            .AddAsync(notification);

        await _repository
            .SaveChangesAsync();
    }

    public async Task<
        List<NotificationResponse>>
        GetByUserIdAsync(
            int userId)
    {
        var notifications =
            await _repository
                .GetByUserIdAsync(
                    userId);

        return notifications
            .Select(x =>
                new NotificationResponse
                {
                    Id = x.Id,
                    Title = x.Title,
                    Message = x.Message,
                    Type = x.Type,
                    CreatedAt = x.CreatedAt
                })
            .ToList();
    }

    public async Task<PagedResponse<Notification>>
GetNotificationsPagedAsync(
    int userId,
    int page,
    int pageSize,
    string? search,
    bool? isRead,
    string? sort)
    {
        return await
            _repository
                .GetNotificationsPagedAsync(
                    userId,
                    page,
                    pageSize,
                    search,
                    isRead,
                    sort);
    }
}