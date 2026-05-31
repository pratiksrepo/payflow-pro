using Microsoft.AspNetCore.Mvc;
using PayFlow.PaymentService.DTOs;
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
}