namespace PayFlow.AuthService.Models;

public class User
{
    public int Id { get; set; }

    public string FullName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string PasswordHash { get; set; } = string.Empty;

    public string Role { get; set; } = "User";

    public bool EmailVerified { get; set; } = false;

    public string? VerificationToken { get; set; }

    public string? PasswordResetToken { get; set; }

    public DateTime? PasswordResetTokenExpires { get; set; }

}