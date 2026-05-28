using Microsoft.EntityFrameworkCore;
using PayFlow.AuthService.Data;
using PayFlow.AuthService.Interfaces;
using PayFlow.AuthService.Models;

namespace PayFlow.AuthService.Repositories;

public class UserRepository : IUserRepository
{
    private readonly AuthDbContext _context;

    public UserRepository(AuthDbContext context)
    {
        _context = context;
    }

    public async Task<User?> GetByEmailAsync(
        string email)
    {
        return await _context.Users
            .FirstOrDefaultAsync(x =>
                x.Email == email);
    }

    public async Task<User?> GetByVerificationTokenAsync(
        string token)
    {
        return await _context.Users
            .FirstOrDefaultAsync(x =>
                x.VerificationToken == token);
    }

    public async Task AddUserAsync(User user)
    {
        await _context.Users.AddAsync(user);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}