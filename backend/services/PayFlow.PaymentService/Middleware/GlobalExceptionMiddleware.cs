using System.Text.Json;

namespace PayFlow.PaymentService.Middleware;

public class GlobalExceptionMiddleware
{
    private readonly RequestDelegate _next;

    private readonly ILogger<GlobalExceptionMiddleware> _logger;

    public GlobalExceptionMiddleware(
        RequestDelegate next,
        ILogger<GlobalExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(
        HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(
                ex,
                "Unhandled exception occurred.");

            context.Response.StatusCode =
                StatusCodes.Status500InternalServerError;

            context.Response.ContentType =
                "application/json";

            var response =
                new
                {
                    Success = false,
                    Message = "An unexpected error occurred.",
                    Timestamp = DateTime.UtcNow
                };

            await context.Response.WriteAsync(
                JsonSerializer.Serialize(response));
        }
    }
}