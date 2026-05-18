using Microsoft.AspNetCore.Mvc;
using PayFlow.AuthService.DTOs;
using PayFlow.AuthService.Services;

namespace PayFlow.AuthService.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly AuthManager _authService;

    public AuthController(AuthManager authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest request)
    {
        var result = await _authService.RegisterAsync(request);

        if (result == null)
            return BadRequest("User already exists");

        return Ok(result);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        var result = await _authService.LoginAsync(request);

        if (result == null)
            return Unauthorized();

        return Ok(result);
    }
}