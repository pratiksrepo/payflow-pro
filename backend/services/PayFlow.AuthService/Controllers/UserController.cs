using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace payflow.authservice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
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
    }
}