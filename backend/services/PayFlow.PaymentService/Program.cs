using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.EntityFrameworkCore;
using PayFlow.ApiGateway.Middleware;
using PayFlow.MessageBus.Extensions;
using PayFlow.PaymentService.Data;
using PayFlow.PaymentService.Interfaces;
using PayFlow.PaymentService.Middleware;
using PayFlow.PaymentService.Repositories;
using PayFlow.PaymentService.Services;
using PayFlow.SharedKernel.Events;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

Console.WriteLine("========== RabbitMQ ==========");
Console.WriteLine(builder.Configuration["RabbitMQ:HostName"]);
Console.WriteLine(builder.Configuration["RabbitMQ:Port"]);
Console.WriteLine(builder.Configuration["RabbitMQ:UserName"]);
Console.WriteLine(builder.Configuration["RabbitMQ:Exchange"]);
Console.WriteLine("==============================");

#region Controllers

builder.Services.AddControllers();

#endregion

#region Health Checks

builder.Services
    .AddHealthChecks()
    .AddNpgSql(
        builder.Configuration.GetConnectionString("DefaultConnection")!,
        name: "postgres");

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

#region Http Client

builder.Services.AddHttpClient();

#endregion

#region Database

builder.Services.AddDbContext<PaymentDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")));

#endregion

#region Repositories

builder.Services.AddScoped<
    IPaymentRepository,
    PaymentRepository>();

#endregion

#region Business Services

builder.Services.AddScoped<
    IPaymentService,
    PaymentService>();

builder.Services.AddScoped<
    IEventPublisher,
    EventPublisher>();

#endregion

#region RabbitMQ

builder.Services.AddRabbitMQ(
    builder.Configuration);

#endregion

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<PaymentDbContext>();
    db.Database.Migrate();
}

#region Middleware Pipeline

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();

    app.UseSwaggerUI();
}


if (!app.Environment.IsProduction())
{
    app.UseHttpsRedirection();
}
app.UseMiddleware<CorrelationIdMiddleware>();

app.UseMiddleware<RequestLoggingMiddleware>();

app.UseMiddleware<GlobalExceptionMiddleware>();

app.UseCors("ReactPolicy");

// Ready for JWT in API Gateway
app.UseAuthentication();

app.UseAuthorization();

#endregion

#region Endpoints

app.MapControllers();

app.MapHealthChecks(
    "/health",
    new HealthCheckOptions
    {
        ResponseWriter = async (context, report) =>
        {
            context.Response.ContentType =
                "application/json";

            var response =
                new
                {
                    Status = report.Status.ToString(),

                    Checks = report.Entries.Select(x => new
                    {
                        Name = x.Key,
                        Status = x.Value.Status.ToString(),
                        Duration = x.Value.Duration.TotalMilliseconds
                    })
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

#endregion

app.Run();