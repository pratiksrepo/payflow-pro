using PayFlow.NotificationService.DTOs;
using PayFlow.NotificationService.Interfaces;
using PayFlow.NotificationService.Models;

namespace PayFlow.NotificationService.Services;

public class NotificationService : INotificationService
{
    private readonly INotificationRepository _repository;

    private readonly ILogger<NotificationService> _logger;

    public NotificationService(
        INotificationRepository repository,
        ILogger<NotificationService> logger)
    {
        _repository = repository;
        _logger = logger;
    }

    public async Task CreateAsync(
        CreateNotificationRequest request)
    {
        var notification = new Notification
        {
            Id = Guid.NewGuid(),

            UserId = request.UserId,

            Title = request.Title,

            Message = request.Message,

            Type = request.Type
        };

        await _repository.AddAsync(notification);

        await _repository.SaveChangesAsync();

        _logger.LogInformation(
            "Notification created for User {UserId}. Type={Type}, Title={Title}",
            request.UserId,
            request.Type,
            request.Title);
    }

    public async Task<List<NotificationResponse>>
        GetByUserIdAsync(
            int userId)
    {
        var notifications =
            await _repository.GetByUserIdAsync(userId);

        _logger.LogInformation(
            "Fetched notifications for User {UserId}. Count={Count}",
            userId,
            notifications.Count);

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
        _logger.LogInformation(
            "Notification search for User {UserId}. Page={Page}, Search={Search}",
            userId,
            page,
            search);

        return await _repository
            .GetNotificationsPagedAsync(
                userId,
                page,
                pageSize,
                search,
                isRead,
                sort);
    }
}