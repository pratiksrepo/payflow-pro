using Microsoft.EntityFrameworkCore;
using PayFlow.AuthService.Data;
using PayFlow.AuthService.DTOs;


namespace PayFlow.AuthService.Services;

public class AuthManager
{
    private readonly AuthDbContext _context;
    private readonly TokenService _tokenService;

    public AuthManager(
        AuthDbContext context,
        TokenService tokenService)
    {
        _context = context;
        _tokenService = tokenService;
    }

    public async Task<AuthResponse?> RegisterAsync(RegisterRequest request)
    {
        var exists = await _context.Users
            .AnyAsync(x => x.Email == request.Email);

        if (exists)
            return null;

        var user = new User
        {
            FullName = request.FullName,
            Email = request.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password)
        };

        _context.Users.Add(user);

        await _context.SaveChangesAsync();

        var token = _tokenService.CreateAccessToken(user);

        return new AuthResponse
        {
            AccessToken = token,
            Email = user.Email
        };
    }

    public async Task<AuthResponse?> LoginAsync(LoginRequest request)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(x => x.Email == request.Email);

        if (user == null)
            return null;

        var valid = BCrypt.Net.BCrypt.Verify(
            request.Password,
            user.PasswordHash
        );

        if (!valid)
            return null;

        var token = _tokenService.CreateAccessToken(user);

        return new AuthResponse
        {
            AccessToken = token,
            Email = user.Email
        };
    }
}