using AuthService.DTOs;
using AuthService.Models;
using AuthService.Services;
using Azure.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PayFlow.AuthService.Data;
using PayFlow.AuthService.DTOs;
using PayFlow.AuthService.Helpers;
using PayFlow.AuthService.Models;
using PayFlow.AuthService.Services;

namespace PayFlow.AuthService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthDbContext _context;

    private readonly TokenService _tokenService;

    private readonly EmailService _emailService;


    public AuthController(
        AuthDbContext context,
        TokenService tokenService,
        EmailService emailService)
    {
        _context = context;
        _tokenService = tokenService;
        _emailService = emailService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest request)
    {
        var exists = await _context.Users
            .AnyAsync(u => u.Email == request.Email);

        if (exists)
        {
            return BadRequest("User already exists");
        }

        var user = new User
        {
            FullName = request.FullName,
            Email = request.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
            Role = "User",
            VerificationToken = Guid.NewGuid().ToString()
        };

        _context.Users.Add(user);

        await _context.SaveChangesAsync();

        await _emailService.SendEmailAsync(
            user.Email,
            "Verify Your Email",
            $"Your verification token is: {user.VerificationToken}"
        );

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "User registered successfully"
        });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(x => x.Email == request.Email);

        if (user == null)
            return Unauthorized("Invalid email or password");

        bool validPassword = BCrypt.Net.BCrypt.Verify(
            request.Password,
            user.PasswordHash
        );

        if (!user.EmailVerified)
        {
            return Unauthorized("Please verify your email first");
        }

        if (!validPassword)
            return Unauthorized("Invalid email or password");

        var accessToken = _tokenService.CreateAccessToken(user);

        var refreshToken = _tokenService.GenerateRefreshToken();

        var refreshTokenEntity = new RefreshToken
        {
            Token = refreshToken,
            Expires = DateTime.UtcNow.AddDays(7),
            UserId = user.Id
        };

        _context.RefreshTokens.Add(refreshTokenEntity);

        await _context.SaveChangesAsync();

        return Ok(new AuthResponse
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken
        });
    }

    [Authorize(Roles = "Admin")]
    [HttpGet("admin")]
    public IActionResult AdminOnly()
    {
        return Ok("Welcome Admin");
    }


    [Authorize(Roles = "User")]
    [HttpGet("user")]
    public IActionResult UserOnly()
    {
        return Ok("Welcome User");
    }


    [HttpPost("refresh")]
    public async Task<IActionResult> RefreshToken(
    RefreshTokenRequestDto request)
    {
        var storedToken = await _context.RefreshTokens
            .Include(x => x.User)
            .FirstOrDefaultAsync(x =>
                x.Token == request.RefreshToken);

        if (storedToken == null)
            return Unauthorized("Invalid refresh token");

        if (storedToken.IsRevoked)
            return Unauthorized("Token revoked");

        if (storedToken.Expires < DateTime.UtcNow)
            return Unauthorized("Token expired");

        var newAccessToken =
            _tokenService.CreateAccessToken(storedToken.User);

        return Ok(new AuthResponse
        {
            AccessToken = newAccessToken,
            RefreshToken = storedToken.Token
        });
    }

    [HttpGet("verify-email")]
    public async Task<IActionResult> VerifyEmail(string token)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(x =>
                x.VerificationToken == token);

        if (user == null)
            return BadRequest("Invalid token");

        user.EmailVerified = true;

        user.VerificationToken = null;

        await _context.SaveChangesAsync();

        return Ok("Email verified successfully");
    }


    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword(
    ForgotPasswordDto request)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(x =>
                x.Email == request.Email);

        if (user == null)
            return Ok("If account exists, reset email sent");

        user.PasswordResetToken = Guid.NewGuid().ToString();

        user.PasswordResetTokenExpires =
            DateTime.UtcNow.AddHours(1);

        await _context.SaveChangesAsync();

        await _emailService.SendEmailAsync(
            user.Email,
            "Password Reset",
            $"Your reset token is: {user.PasswordResetToken}"
        );

        return Ok("Reset email sent");
    }


    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword(
    ResetPasswordDto request)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(x =>
                x.PasswordResetToken == request.Token);

        if (user == null)
            return BadRequest("Invalid token");

        if (user.PasswordResetTokenExpires < DateTime.UtcNow)
            return BadRequest("Token expired");

        user.PasswordHash =
            BCrypt.Net.BCrypt.HashPassword(
                request.NewPassword
            );

        user.PasswordResetToken = null;

        user.PasswordResetTokenExpires = null;

        await _context.SaveChangesAsync();

        return Ok("Password reset successful");
    }

    [HttpGet("test-error")]
    public IActionResult TestError()
    {
        throw new Exception("Test exception middleware");
    }
}