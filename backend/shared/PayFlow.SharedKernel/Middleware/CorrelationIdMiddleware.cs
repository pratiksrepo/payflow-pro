namespace PayFlow.SharedKernel.Middleware;
using Microsoft.AspNetCore.Http;

public class CorrelationIdMiddleware
{
    private readonly RequestDelegate _next;

    public CorrelationIdMiddleware(
        RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(
        HttpContext context)
    {
        const string header = "X-Correlation-Id";

        if (!context.Request.Headers.TryGetValue(
            header,
            out var correlationId))
        {
            correlationId =
                Guid.NewGuid().ToString();

            context.Request.Headers[header] =
                correlationId;
        }

        context.Response.Headers[header] =
            correlationId.ToString();

        await _next(context);
    }
}