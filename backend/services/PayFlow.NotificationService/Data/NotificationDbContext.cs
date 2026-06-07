using Microsoft.EntityFrameworkCore;
using PayFlow.NotificationService.Models;

namespace PayFlow.NotificationService.Data;

public class NotificationDbContext
    : DbContext
{
    public NotificationDbContext(
        DbContextOptions<
            NotificationDbContext>
        options)
        : base(options)
    {
    }

    public DbSet<Notification>
        Notifications =>
            Set<Notification>();
}