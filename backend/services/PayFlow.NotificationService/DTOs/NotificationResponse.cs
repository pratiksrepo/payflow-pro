namespace PayFlow.NotificationService.DTOs;

public class NotificationResponse
{
    public Guid Id { get; set; }

    public string Title { get; set; }
        = string.Empty;

    public string Message { get; set; }
        = string.Empty;

    public string Type { get; set; }
        = string.Empty;

    public DateTime CreatedAt
    {
        get;
        set;
    }
}