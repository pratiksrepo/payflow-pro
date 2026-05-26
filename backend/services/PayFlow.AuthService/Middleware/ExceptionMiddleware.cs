using System.Net;
using System.Text.Json;
using PayFlow.AuthService.Helpers;

namespace PayFlow.AuthService.Middleware;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;

    private readonly ILogger<ExceptionMiddleware> _logger;

    public ExceptionMiddleware(
        RequestDelegate next,
        ILogger<ExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);

            context.Response.ContentType =
                "application/json";

            context.Response.StatusCode =
                (int)HttpStatusCode.InternalServerError;

            var response = new ErrorResponse
            {
                Message = "Internal Server Error",
                Details = ex.Message
            };

            var json = JsonSerializer.Serialize(response);

            await context.Response.WriteAsync(json);
        }
    }
}