using Microsoft.AspNetCore.Mvc;
using PayFlow.SharedKernel.DTOs;
using PayFlow.FraudService.Interfaces;

namespace PayFlow.FraudService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FraudController : ControllerBase
{
    private readonly IFraudService _fraudService;

    public FraudController(
        IFraudService fraudService)
    {
        _fraudService = fraudService;
    }

    [HttpPost("check")]
    public async Task<IActionResult> CheckFraud(
        FraudCheckRequest request)
    {
        var result =
            await _fraudService.CheckFraudAsync(
                request);

        return Ok(result);
    }


    [HttpGet("dashboard")]
    public async Task<IActionResult>
    Dashboard()
    {
        var result =
            await _fraudService
                .GetDashboardAsync();

        return Ok(result);
    }
}