

namespace PayFlow.AuthService.Interfaces;

public interface IUserRepository
{
    Task<User?> GetByEmailAsync(string email);

    Task<User?> GetByVerificationTokenAsync(
        string token);

    Task AddUserAsync(User user);

    Task SaveChangesAsync();
}