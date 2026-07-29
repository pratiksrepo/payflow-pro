using AuthService.Models;
using BCrypt.Net;
using Microsoft.EntityFrameworkCore;
using PayFlow.AuthService.DTOs;
using PayFlow.AuthService.Interfaces;


namespace PayFlow.AuthService.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;

    private readonly TokenService _tokenService;

    private readonly EmailService _emailService;

    private readonly ILogger<AuthService> _logger;

    public AuthService(
        IUserRepository userRepository,
        TokenService tokenService,
        EmailService emailService,
        ILogger<AuthService> logger)
    {
        _userRepository = userRepository;
        _tokenService = tokenService;
        _emailService = emailService;
        _logger = logger;
    }

    public async Task<string> RegisterAsync(
        RegisterRequest request)
    {
        var existingUser =
            await _userRepository.GetByEmailAsync(
                request.Email);

        if (existingUser != null)
            return "User already exists";

        //var user = new User
        //{
        //    FullName = request.FullName,
        //    Email = request.Email,
        //    PasswordHash =
        //        BCrypt.Net.BCrypt.HashPassword(
        //            request.Password),

        //    Role = "User",

        //    VerificationToken =
        //        Guid.NewGuid().ToString()
        //};

        var user = new User
        {
            FullName = request.FullName,
            Email = request.Email,
            PasswordHash =
        BCrypt.Net.BCrypt.HashPassword(request.Password),

            Role = "User",

            EmailVerified = true,

            VerificationToken = null
        };

        await _userRepository.AddUserAsync(user);

        await _userRepository.SaveChangesAsync();

        await _emailService.SendEmailAsync(
            user.Email,
            "Verify Your Email",
            $"Your verification token is: {user.VerificationToken}"
        );

        _logger.LogInformation(
    "Email verified for {Email}.",
    user.Email);

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


        _logger.LogWarning(
    "Failed login attempt for {Email}.",
    request.Email);

        if (!validPassword)
            return null; 



        //if (!user.EmailVerified)
        //    return null;

        var accessToken =
            _tokenService.CreateAccessToken(user);

        var refreshToken =
            _tokenService.GenerateRefreshToken();

        user.RefreshTokens.Add(new RefreshToken
        {
            Token = refreshToken,
            Expires = DateTime.UtcNow.AddDays(7),
            UserId = user.Id
        });

        await _userRepository.SaveChangesAsync();

        _logger.LogInformation(
            "User {Email} logged in successfully.",
            user.Email);

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

    public async Task<List<User>>
GetAllUsersAsync()
    {
        return await _userRepository
            .GetAllUsersAsync();
    }


    public async Task<List<User>>
SearchUsersAsync(string search)
    {
        return await _userRepository
            .SearchUsersAsync(search);
    }
}