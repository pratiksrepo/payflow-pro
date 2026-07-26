namespace PayFlow.ApiGateway.Middleware;

public class CorrelationIdMiddleware
{
    private const string HeaderName = "X-Correlation-ID";

    private readonly RequestDelegate _next;

    public CorrelationIdMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        string correlationId;

        if (context.Request.Headers.TryGetValue(HeaderName, out var existing))
        {
            correlationId = existing!;
        }
        else
        {
            correlationId = Guid.NewGuid().ToString();

            context.Request.Headers[HeaderName] = correlationId;
        }

        context.Response.Headers[HeaderName] = correlationId;

        context.Items[HeaderName] = correlationId;

        await _next(context);
    }
}