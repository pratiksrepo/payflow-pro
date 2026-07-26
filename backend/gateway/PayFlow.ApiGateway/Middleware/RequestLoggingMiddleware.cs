using System.Diagnostics;

namespace PayFlow.ApiGateway.Middleware;

public class RequestLoggingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<RequestLoggingMiddleware> _logger;

    public RequestLoggingMiddleware(
        RequestDelegate next,
        ILogger<RequestLoggingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var stopwatch = Stopwatch.StartNew();

        await _next(context);

        stopwatch.Stop();

        var correlationId =
            context.Items["X-Correlation-ID"]?.ToString();

        _logger.LogInformation(
            """
            ===============================
            CorrelationId : {CorrelationId}
            Method        : {Method}
            Path          : {Path}
            StatusCode    : {StatusCode}
            Duration(ms)  : {Duration}
            ===============================
            """,
            correlationId,
            context.Request.Method,
            context.Request.Path,
            context.Response.StatusCode,
            stopwatch.ElapsedMilliseconds);
    }
}