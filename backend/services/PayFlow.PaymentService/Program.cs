using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.EntityFrameworkCore;
using PayFlow.MessageBus.Extensions;
using PayFlow.PaymentService.Data;
using PayFlow.PaymentService.Interfaces;
using PayFlow.PaymentService.Repositories;
using PayFlow.PaymentService.Services;
using PayFlow.SharedKernel.Events;
using PayFlow.PaymentService.Middleware;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactPolicy",
        policy =>
        {
            policy
                .WithOrigins(
                    "http://localhost:5173")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

builder.Services.AddHttpClient();

builder.Services.AddScoped<
    IPaymentRepository,
    PaymentRepository>();

builder.Services.AddScoped<
    IPaymentService,
    PaymentService>();

// Add services to the container.

builder.Services.AddControllers();

builder.Services
    .AddHealthChecks()

    .AddNpgSql(
        builder.Configuration.GetConnectionString("DefaultConnection")!,
        name: "postgres");

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<PaymentDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<
    IEventPublisher,
    EventPublisher>();

builder.Services.AddRabbitMQ(
    builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseHttpsRedirection();

app.UseMiddleware<RequestLoggingMiddleware>();

app.UseMiddleware<GlobalExceptionMiddleware>();

app.UseAuthorization();

app.UseCors("ReactPolicy");

app.UseAuthorization();

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
                    Status =
                        report.Status.ToString(),

                    Checks =
                        report.Entries.Select(
                            x => new
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

app.Run();
