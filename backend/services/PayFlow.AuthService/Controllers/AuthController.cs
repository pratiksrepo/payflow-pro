using Microsoft.AspNetCore.Mvc;

namespace PayFlow.AuthService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    [HttpGet("health")]
    public IActionResult Health()
    {
        return Ok("Auth Service Running");
    }
}