namespace PayFlow.AuthService.Helpers;

public class ErrorResponse
{
    public bool Success => false;

    public string Message { get; set; } = string.Empty;

    public string? Details { get; set; }
}