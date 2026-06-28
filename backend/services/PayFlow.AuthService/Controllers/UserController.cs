using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PayFlow.AuthService.Interfaces;
using PayFlow.AuthService.Services;
using System.Security.Claims;

namespace payflow.authservice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly IAuthService _authService;

        public UserController(
    IAuthService authService)
        {
            _authService = authService;
        }

        //[HttpGet("profile")]
        //[Authorize]
        //public IActionResult GetProfile()
        //{
        //    var email = User.FindFirst(ClaimTypes.Email)?.Value;

        //    return Ok(new
        //    {
        //        Message = "Protected API Accessed Successfully",
        //        Email = email
        //    });
        //}

        [Authorize]
        [HttpGet("profile")]
        public IActionResult Profile()
        {
            return Ok("Authorized user");
        }


        [Authorize(Roles = "Admin")]
        [HttpGet("all")]
        public async Task<IActionResult>
        GetAllUsers()
        {
            var users =
                await _authService
                    .GetAllUsersAsync();

            return Ok(users);
        }


        [Authorize(Roles = "Admin")]
        [HttpGet("search")]
        public async Task<IActionResult> SearchUsers(
    [FromQuery] string search)
        {
            var users =
                await _authService
                    .SearchUsersAsync(search);

            return Ok(users);
        }


    }
}