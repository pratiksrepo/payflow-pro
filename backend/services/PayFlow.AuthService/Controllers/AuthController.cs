using AuthService.DTOs;
using AuthService.Models;
//using Azure.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PayFlow.AuthService.Data;
using PayFlow.AuthService.DTOs;
using PayFlow.AuthService.Helpers;
using PayFlow.AuthService.Interfaces;

using PayFlow.AuthService.Services;
using System.Security.Claims;


namespace PayFlow.AuthService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    private readonly EmailService _emailService;

    private readonly AuthDbContext _context;

    private readonly TokenService _tokenService;

    private readonly ILogger<AuthController> _logger;


    public AuthController(
        IAuthService authService,
        EmailService emailService,
        AuthDbContext context,
        TokenService tokenService,
        ILogger<AuthController> logger)
    {
        _authService = authService;
        _emailService = emailService;
        _context = context;
        _tokenService = tokenService;
        _logger = logger;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(
       RegisterRequest request)
    {
        var result =
            await _authService.RegisterAsync(request);

        if (result == "User already exists")
        {
            return BadRequest(result);
        }

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = result
        });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(
       LoginRequest request)
    {
        var response =
            await _authService.LoginAsync(request);

        if (response == null)
        {
            return Unauthorized(
                "Invalid credentials or email not verified");
        }

        return Ok(new ApiResponse<AuthResponse>
        {
            Success = true,
            Message = "Login successful",
            Data = response
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

        storedToken.IsRevoked = true;

        var newRefreshToken =
            _tokenService.GenerateRefreshToken();

        var refreshTokenEntity =
            new RefreshToken
            {
                Token = newRefreshToken,
                Expires = DateTime.UtcNow.AddDays(7),
                UserId = storedToken.UserId
            };

        _context.RefreshTokens.Add(
            refreshTokenEntity);

        await _context.SaveChangesAsync();

        var newAccessToken =
            _tokenService.CreateAccessToken(
                storedToken.User);

        return Ok(new AuthResponse
        {
            AccessToken = newAccessToken,
            RefreshToken = newRefreshToken
        });
    }

    [HttpGet("verify-email")]
    public async Task<IActionResult> VerifyEmail(
       string token)
    {
        var verified =
            await _authService.VerifyEmailAsync(token);

        if (!verified)
        {
            return BadRequest("Invalid token");
        }

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


    [Authorize]
    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        var userId =
            User.FindFirst(
                ClaimTypes.NameIdentifier
            )?.Value;

        _logger.LogError(
            $"AUDIT : User {userId} logged out");

        return Ok("Logged out");
    }
}