using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using PayFlow.ApiGateway.Middleware;
using Yarp.ReverseProxy;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHealthChecks();

#region Reverse Proxy

builder.Services
    .AddReverseProxy()
    .LoadFromConfig(
        builder.Configuration.GetSection("ReverseProxy"))

    .ConfigureHttpClient((context, handler) =>
    {
        handler.SslOptions.RemoteCertificateValidationCallback =
            (_, _, _, _) => true;
    });

#endregion

#region Health Checks

builder.Services.AddHealthChecks();

#endregion

#region CORS

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "ReactPolicy",
        policy =>
        {
            policy
                .WithOrigins(
                "http://localhost:5173",
                "https://payflow-pro-ui.onrender.com")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

#endregion

#region Swagger

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

#endregion

var app = builder.Build();

    app.UseSwagger();

    app.UseSwaggerUI();

if (!app.Environment.IsProduction())
{
    app.UseHttpsRedirection();
}
app.UseMiddleware<CorrelationIdMiddleware>();

app.UseMiddleware<GlobalExceptionMiddleware>();

app.UseMiddleware<RequestLoggingMiddleware>();

app.UseCors("ReactPolicy");

app.MapReverseProxy();

app.MapHealthChecks(
    "/health",
    new HealthCheckOptions
    {
        ResponseWriter = async (context, report) =>
        {
            context.Response.ContentType = "application/json";

            var response = new
            {
                Status = report.Status.ToString(),
                Time = DateTime.UtcNow
            };

            await context.Response.WriteAsync(
                JsonSerializer.Serialize(
                    response,
                    new JsonSerializerOptions
                    {
                        WriteIndented = true
                    }));
        }
    });

app.Run();