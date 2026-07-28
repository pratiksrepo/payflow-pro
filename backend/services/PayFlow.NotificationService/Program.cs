using Microsoft.EntityFrameworkCore;
using PayFlow.ApiGateway.Middleware;
using PayFlow.MessageBus.Extensions;
using PayFlow.NotificationService.Consumers;
using PayFlow.NotificationService.Data;
using PayFlow.NotificationService.HostedServices;
using PayFlow.NotificationService.Interfaces;
using PayFlow.NotificationService.Middleware;
using PayFlow.NotificationService.Repositories;
using PayFlow.NotificationService.Services;


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
                "http://localhost:5173",
                "https://payflow-pro-ui.onrender.com")
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


builder.Services.AddScoped<PaymentCreatedConsumer>();

builder.Services.AddHostedService<RabbitMQBackgroundService>();

Console.WriteLine("========== RabbitMQ ==========");
Console.WriteLine(builder.Configuration["RabbitMQ:HostName"]);
Console.WriteLine(builder.Configuration["RabbitMQ:Port"]);
Console.WriteLine(builder.Configuration["RabbitMQ:UserName"]);
Console.WriteLine(builder.Configuration["RabbitMQ:Exchange"]);
Console.WriteLine("==============================");

builder.Services.AddRabbitMQ(builder.Configuration);

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<NotificationDbContext>();
    db.Database.Migrate();
}

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("ReactPolicy");

if (!app.Environment.IsProduction())
{
    app.UseHttpsRedirection();
}
app.UseMiddleware<CorrelationIdMiddleware>();

app.UseMiddleware<RequestLoggingMiddleware>();

app.UseMiddleware<GlobalExceptionMiddleware>();

app.UseAuthorization();

app.MapControllers();

app.MapHealthChecks("/health");

app.Run();
