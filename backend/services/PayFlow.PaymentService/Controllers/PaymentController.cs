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
                .GetPaymentsByUserAsync(userId);

        return Ok(payments);
    }


    [HttpGet("history/{paymentId}")]
    public async Task<IActionResult>
    GetHistory(
    Guid paymentId)
    {
        var history =
            await _service
                .GetPaymentHistoryAsync(
                    paymentId);

        return Ok(history);
    }

    [HttpGet("export")]
    public async Task<IActionResult>
    ExportPayments()
    {
        var file =
            await _service
                .ExportPaymentsAsync();

        return File(
            file,
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "PaymentReport.xlsx");
    }


    [HttpGet("recent")]
    public async Task<IActionResult>
GetRecentPayments()
    {
        var payments =
            await _service
                .GetRecentPaymentsAsync();

        return Ok(payments);
    }


    [HttpGet("auditlogs")]
    public async Task<IActionResult>
GetAuditLogs()
    {
        var logs =
            await _service
                .GetAuditLogsAsync();

        return Ok(logs);
    }

    [HttpGet("search")]
    public async Task<IActionResult> SearchPayments(
    [FromQuery] string search)
    {
        var result =
            await _service
                .SearchPaymentsAsync(search);

        return Ok(result);
    }


    [HttpGet("user/{userId}/paged")]
    public async Task<IActionResult>
GetUserPaymentsPaged(
    int userId,
    int page = 1,
    int pageSize = 10,
    string? search = null,
    string? status = null,
    string? sort = "newest")
    {
        var result =
            await _service
                .GetPaymentsPagedAsync(
                    userId,
                    page,
                    pageSize,
                    search,
                    status,
                    sort);

        return Ok(result);
    }

    [HttpGet("auditlogs/paged")]
    public async Task<IActionResult>
GetAuditLogsPaged(
    int page = 1,
    int pageSize = 10,
    string? search = null,
    string? action = null,
    string? sort = "newest")
    {
        var result =
            await _service
                .GetAuditLogsPagedAsync(
                    page,
                    pageSize,
                    search,
                    action,
                    sort);

        return Ok(result);
    }


    [HttpGet("test-error")]
    public IActionResult TestError()
    {
        throw new Exception("Testing Middleware");
    }

}