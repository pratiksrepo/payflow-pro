using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace PayFlow.NotificationService.Data;

public class NotificationDbContextFactory
    : IDesignTimeDbContextFactory<
        NotificationDbContext>
{
    public NotificationDbContext
        CreateDbContext(
        string[] args)
    {
        var optionsBuilder =
            new DbContextOptionsBuilder<
                NotificationDbContext>();

        optionsBuilder.UseNpgsql(
            "Host=localhost;Port=5433;Database=PayFlowNotificationDb;Username=postgres;Password=postgres");

        return new NotificationDbContext(
            optionsBuilder.Options);
    }
}