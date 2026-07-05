using Microsoft.EntityFrameworkCore;
using PayFlow.FraudService.Consumers;
using PayFlow.FraudService.Data;
using PayFlow.FraudService.HostedServices;
using PayFlow.FraudService.Interfaces;
using PayFlow.FraudService.Middleware;
using PayFlow.FraudService.Repositories;
using PayFlow.FraudService.Services;
using PayFlow.MessageBus.Extensions;

var builder = WebApplication.CreateBuilder(args);

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

builder.Services.AddDbContext<FraudDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<
    IFraudService,
    FraudService>();

builder.Services.AddScoped<
    IFraudRepository,
    FraudRepository>();

builder.Services.AddScoped<
    IAnomalyDetectionService,
    AnomalyDetectionService>();

builder.Services.AddHttpClient();

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "ReactPolicy",
        policy =>
        {
            policy
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

builder.Services.AddRabbitMQ(builder.Configuration);

builder.Services.AddScoped<PaymentCreatedConsumer>();

builder.Services.AddHostedService<RabbitMQBackgroundService>();

var app = builder.Build();

app.UseCors(
    "ReactPolicy");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseMiddleware<RequestLoggingMiddleware>();

app.UseMiddleware<GlobalExceptionMiddleware>();

app.UseAuthorization();

app.MapControllers();

app.MapHealthChecks("/health");

app.Run();
