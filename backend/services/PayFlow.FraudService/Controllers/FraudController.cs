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

    [HttpGet("recent")]
    public async Task<IActionResult>
GetRecentFraudChecks()
    {
        var result =
            await _fraudService
                .GetRecentFraudChecksAsync();

        return Ok(result);
    }

    [HttpGet("search")]
    public async Task<IActionResult> SearchFraud(
    [FromQuery] string search)
    {
        var result =
            await _fraudService
                .SearchFraudAsync(search);

        return Ok(result);
    }

    [HttpGet("paged")]
    public async Task<IActionResult>
GetFraudPaged(
    int page = 1,
    int pageSize = 10,
    string? search = null,
    string? riskLevel = null,
    string? sort = "newest")
    {
        var result =
            await _fraudService
                .GetFraudPagedAsync(
                    page,
                    pageSize,
                    search,
                    riskLevel,
                    sort);

        return Ok(result);
    }
}