using Microsoft.EntityFrameworkCore;
using PayFlow.MessageBus.Extensions;
using PayFlow.WalletService.Consumers;
using PayFlow.WalletService.Data;
using PayFlow.WalletService.HostedServices;
using PayFlow.WalletService.Interfaces;
using PayFlow.WalletService.Middleware;
using PayFlow.WalletService.Repositories;
using PayFlow.WalletService.Services;
using PayFlow.ApiGateway.Middleware;

var builder = WebApplication.CreateBuilder(args);

Console.WriteLine("==================================");
Console.WriteLine("RabbitMQ Configuration");
Console.WriteLine("Host     : " + builder.Configuration["RabbitMQ:HostName"]);
Console.WriteLine("Port     : " + builder.Configuration["RabbitMQ:Port"]);
Console.WriteLine("User     : " + builder.Configuration["RabbitMQ:UserName"]);
Console.WriteLine("Exchange : " + builder.Configuration["RabbitMQ:Exchange"]);
Console.WriteLine("==================================");

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
    WalletDbContext>(
    options =>
        options.UseNpgsql(
            builder.Configuration
                .GetConnectionString(
                    "DefaultConnection")));

builder.Services.AddScoped<
    IWalletRepository,
    WalletRepository>();

builder.Services.AddScoped<
    IWalletService,
    WalletService>();

builder.Services.AddScoped<PaymentCreatedConsumer>();

builder.Services.AddHostedService<RabbitMQBackgroundService>();

builder.Services.AddRabbitMQ(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseMiddleware<CorrelationIdMiddleware>();

app.UseMiddleware<RequestLoggingMiddleware>();

app.UseMiddleware<GlobalExceptionMiddleware>();

app.UseCors(
    "ReactPolicy");

app.UseAuthorization();

app.MapControllers();

app.MapHealthChecks("/health");

app.Run();
