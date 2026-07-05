using Microsoft.EntityFrameworkCore;
using PayFlow.WalletService.Data;
using PayFlow.WalletService.HostedServices;
using PayFlow.WalletService.Interfaces;
using PayFlow.WalletService.Middleware;
using PayFlow.WalletService.Repositories;
using PayFlow.WalletService.Services;

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

builder.Services.AddHostedService<RabbitMQBackgroundService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseMiddleware<RequestLoggingMiddleware>();

app.UseMiddleware<GlobalExceptionMiddleware>();

app.UseCors(
    "ReactPolicy");

app.UseAuthorization();

app.MapControllers();

app.MapHealthChecks("/health");

app.Run();
