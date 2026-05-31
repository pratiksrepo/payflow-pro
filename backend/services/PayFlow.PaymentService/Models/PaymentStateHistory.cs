namespace PayFlow.PaymentService.Models;

public class PaymentStateHistory
{
    public int Id { get; set; }

    public Guid PaymentId { get; set; }

    public string OldStatus { get; set; } = string.Empty;

    public string NewStatus { get; set; } = string.Empty;

    public DateTime ChangedAt { get; set; }

    public string ChangedBy { get; set; } = "System";
}