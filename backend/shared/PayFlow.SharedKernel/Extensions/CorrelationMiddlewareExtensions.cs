using PayFlow.SharedKernel.Middleware;
using Microsoft.AspNetCore.Builder;
namespace PayFlow.SharedKernel.Extensions;

public static class CorrelationMiddlewareExtensions
{
    public static IApplicationBuilder
        UseCorrelationId(
        this IApplicationBuilder app)
    {
        return app.UseMiddleware<
            CorrelationIdMiddleware>();
    }
}