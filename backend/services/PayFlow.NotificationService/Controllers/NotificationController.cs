using Microsoft.AspNetCore.Mvc;
using PayFlow.NotificationService.DTOs;
using PayFlow.NotificationService.Interfaces;

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
}