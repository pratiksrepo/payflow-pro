namespace PayFlow.PaymentService.Models;

public class AuditLog
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public string Action { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; }
        = DateTime.UtcNow;
}