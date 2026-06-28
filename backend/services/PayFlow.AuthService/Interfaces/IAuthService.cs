using PayFlow.AuthService.DTOs;

namespace PayFlow.AuthService.Interfaces;

public interface IAuthService
{
    Task<string> RegisterAsync(RegisterRequest request);

    Task<AuthResponse?> LoginAsync(
        LoginRequest request);

    Task<bool> VerifyEmailAsync(string token);

    Task<List<User>>
GetAllUsersAsync();


    Task<List<User>>
SearchUsersAsync(string search);
}