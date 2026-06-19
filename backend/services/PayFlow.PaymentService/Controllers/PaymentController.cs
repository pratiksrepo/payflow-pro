using Microsoft.AspNetCore.Mvc;
using PayFlow.PaymentService.DTOs;
using PayFlow.SharedKernel.DTOs;
using PayFlow.PaymentService.Interfaces;

namespace PayFlow.PaymentService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PaymentController : ControllerBase
{
    private readonly IPaymentService _service;

    public PaymentController(
        IPaymentService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<IActionResult>
        CreatePayment(CreatePaymentRequest request)
    {
        var result =
            await _service
                .CreatePaymentAsync(request);

        return Ok(result);
    }

    [HttpPut("status")]
    public async Task<IActionResult>
    UpdateStatus(
    UpdatePaymentStatusRequest request)
    {
        var success =
            await _service
                .UpdateStatusAsync(request);

        if (!success)
        {
            return BadRequest(
                "Invalid payment state transition");
        }

        return Ok("Status Updated");
    }


    [HttpGet("{id}")]
    public async Task<IActionResult>
    GetPayment(Guid id)
    {
        var payment =
            await _service.GetByIdAsync(id);

        if (payment == null)
            return NotFound();

        return Ok(payment);
    }

    [HttpGet("user/{userId}")]
    public async Task<IActionResult>
        GetUserPayments(
        int userId)
    {
        var payments =
            await _service
                .GetPaymentsByUserAsync(
                    userId);

        return Ok(payments);
    }
}