namespace PayFlow.PaymentService.DTOs;

public class PagedResponse<T>
{
    public List<T> Data { get; set; }
        = new();

    public int TotalRecords { get; set; }

    public int Page { get; set; }

    public int PageSize { get; set; }

    public int TotalPages =>
        (int)Math.Ceiling(
            (double)TotalRecords /
            PageSize);

    public bool HasPrevious =>
        Page > 1;

    public bool HasNext =>
        Page < TotalPages;
}