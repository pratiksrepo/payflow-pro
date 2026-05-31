using AuthService.Models;
using Microsoft.EntityFrameworkCore;


namespace PayFlow.AuthService.Data;

public class AuthDbContext : DbContext
{
    public AuthDbContext(DbContextOptions<AuthDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; }

    public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();

}