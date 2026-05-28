using BCrypt.Net;
using PayFlow.AuthService.DTOs;
using PayFlow.AuthService.Interfaces;
using PayFlow.AuthService.Models;

namespace PayFlow.AuthService.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;

    private readonly TokenService _tokenService;

    private readonly EmailService _emailService;

    public AuthService(
        IUserRepository userRepository,
        TokenService tokenService,
        EmailService emailService)
    {
        _userRepository = userRepository;
        _tokenService = tokenService;
        _emailService = emailService;
    }

    public async Task<string> RegisterAsync(
        RegisterRequest request)
    {
        var existingUser =
            await _userRepository.GetByEmailAsync(
                request.Email);

        if (existingUser != null)
            return "User already exists";

        var user = new User
        {
            FullName = request.FullName,
            Email = request.Email,
            PasswordHash =
                BCrypt.Net.BCrypt.HashPassword(
                    request.Password),

            Role = "User",

            VerificationToken =
                Guid.NewGuid().ToString()
        };

        await _userRepository.AddUserAsync(user);

        await _userRepository.SaveChangesAsync();

        await _emailService.SendEmailAsync(
            user.Email,
            "Verify Your Email",
            $"Your verification token is: {user.VerificationToken}"
        );

        return "User registered successfully";
    }

    public async Task<AuthResponse?> LoginAsync(
        LoginRequest request)
    {
        var user =
            await _userRepository.GetByEmailAsync(
                request.Email);

        if (user == null)
            return null;

        bool validPassword =
            BCrypt.Net.BCrypt.Verify(
                request.Password,
                user.PasswordHash);

        if (!validPassword)
            return null;

        if (!user.EmailVerified)
            return null;

        var accessToken =
            _tokenService.CreateAccessToken(user);

        var refreshToken =
            _tokenService.GenerateRefreshToken();

        return new AuthResponse
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken
        };
    }

    public async Task<bool> VerifyEmailAsync(
        string token)
    {
        var user =
            await _userRepository
                .GetByVerificationTokenAsync(token);

        if (user == null)
            return false;

        user.EmailVerified = true;

        user.VerificationToken = null;

        await _userRepository.SaveChangesAsync();

        return true;
    }
}