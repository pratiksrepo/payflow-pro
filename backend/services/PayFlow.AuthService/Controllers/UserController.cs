using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace payflow.authservice.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        [Authorize]
        [HttpGet("profile")]
        public IActionResult GetProfile()
        {
            var email =
                User.FindFirst(ClaimTypes.Email)?.Value;

            var userId =
                User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var fullName =
                User.FindFirst(ClaimTypes.Name)?.Value;

            return Ok(new
            {
                UserId = userId,
                Email = email,
                FullName = fullName
            });
        }
    }
}