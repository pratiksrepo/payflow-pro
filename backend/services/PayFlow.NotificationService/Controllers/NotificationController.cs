using Microsoft.AspNetCore.Mvc;
using PayFlow.NotificationService.DTOs;
using PayFlow.NotificationService.Interfaces;
using PayFlow.NotificationService.Services;

namespace PayFlow.NotificationService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NotificationController
    : ControllerBase
{
    private readonly
        INotificationService
        _service;

    public NotificationController(
        INotificationService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<IActionResult>
        Create(
        CreateNotificationRequest request)
    {
        await _service.CreateAsync(
            request);

        return Ok();
    }

    [HttpGet("{userId}")]
    public async Task<IActionResult>
        Get(
        int userId)
    {
        return Ok(
            await _service
                .GetByUserIdAsync(
                    userId));
    }

    [HttpGet("user/{userId}/paged")]
    public async Task<IActionResult>
GetNotificationsPaged(
    int userId,
    int page = 1,
    int pageSize = 10,
    string? search = null,
    bool? isRead = null,
    string? sort = "newest")
    {
        var result =
            await _service
                .GetNotificationsPagedAsync(
                    userId,
                    page,
                    pageSize,
                    search,
                    isRead,
                    sort);

        return Ok(result);
    }
}