using AuthService.Models;
using Microsoft.EntityFrameworkCore;
using PayFlow.AuthService.Models;

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