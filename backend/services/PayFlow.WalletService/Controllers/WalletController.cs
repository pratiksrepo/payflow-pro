using Microsoft.AspNetCore.Mvc;
using PayFlow.WalletService.DTOs;
using PayFlow.WalletService.Interfaces;

namespace PayFlow.WalletService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WalletController : ControllerBase
{
    private readonly IWalletService _walletService;

    public WalletController(
        IWalletService walletService)
    {
        _walletService = walletService;
    }

    [HttpPost("create")]
    public async Task<IActionResult>
        CreateWallet(
        CreateWalletRequest request)
    {
        var result =
            await _walletService
                .CreateWalletAsync(
                    request);

        return Ok(result);
    }

    [HttpPost("credit")]
    public async Task<IActionResult>
        CreditWallet(
        CreditWalletRequest request)
    {
        var result =
            await _walletService
                .CreditAsync(request);

        if (!result)
            return BadRequest(
                "Wallet not found");

        return Ok(
            "Amount credited");
    }

    [HttpPost("debit")]
    public async Task<IActionResult>
        DebitWallet(
        DebitWalletRequest request)
    {
        var result =
            await _walletService
                .DebitAsync(request);

        if (!result.Success)
        {
            return BadRequest(
                result);
        }

        return Ok(result);
    }

    [HttpGet("{userId}")]
    public async Task<IActionResult>
        GetWallet(
        int userId)
    {
        var wallet =
            await _walletService
                .GetWalletAsync(
                    userId);

        if (wallet == null)
            return NotFound();

        return Ok(wallet);
    }

    [HttpGet("search")]
    public async Task<IActionResult> SearchWallets(
    [FromQuery] string search)
    {
        var result =
            await _walletService
                .SearchWalletsAsync(search);

        return Ok(result);
    }

}