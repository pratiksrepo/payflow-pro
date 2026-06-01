namespace PayFlow.PaymentService.DTOs;

public class UpdatePaymentStatusRequest
{
    public Guid PaymentId { get; set; }

    public string Status { get; set; } = string.Empty;
}