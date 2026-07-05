using Microsoft.EntityFrameworkCore;
using PayFlow.MessageBus.Extensions;
using PayFlow.NotificationService.Consumers;
using PayFlow.NotificationService.Data;
using PayFlow.NotificationService.HostedServices;
using PayFlow.NotificationService.Interfaces;
using PayFlow.NotificationService.Middleware;
using PayFlow.NotificationService.Repositories;
using PayFlow.NotificationService.Services;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services
    .AddHealthChecks()
    .AddNpgSql(
        builder.Configuration.GetConnectionString("DefaultConnection")!,
        name: "postgres");

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "ReactPolicy",
        policy =>
        {
            policy
                .WithOrigins(
                    "http://localhost:5173")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<
    NotificationDbContext>(
    options =>
        options.UseNpgsql(
            builder.Configuration
                .GetConnectionString(
                    "DefaultConnection")));

builder.Services.AddScoped<
    INotificationRepository,
    NotificationRepository>();

builder.Services.AddScoped<
    INotificationService,
    NotificationService>();

builder.Services.AddRabbitMQ(builder.Configuration);

builder.Services.AddScoped<PaymentCreatedConsumer>();

builder.Services.AddHostedService<RabbitMQBackgroundService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("ReactPolicy");

app.UseHttpsRedirection();

app.UseMiddleware<RequestLoggingMiddleware>();

app.UseMiddleware<GlobalExceptionMiddleware>();

app.UseAuthorization();

app.MapControllers();

app.MapHealthChecks("/health");

app.Run();
