using ClosedXML.Excel;
using PayFlow.PaymentService.Models;

namespace PayFlow.PaymentService.Reports;

public static class PaymentReportGenerator
{
    public static byte[] Generate(
        List<Payment> payments)
    {
        using var workbook =
            new XLWorkbook();

        var worksheet =
            workbook.Worksheets
                .Add("Payments");

        worksheet.Cell(1, 1)
            .Value = "Payment Id";

        worksheet.Cell(1, 2)
            .Value = "User Id";

        worksheet.Cell(1, 3)
            .Value = "Amount";

        worksheet.Cell(1, 4)
            .Value = "Merchant";

        worksheet.Cell(1, 5)
            .Value = "Method";

        worksheet.Cell(1, 6)
            .Value = "Status";

        worksheet.Cell(1, 7)
            .Value = "Created At";

        int row = 2;

        foreach (var payment in payments)
        {
            worksheet.Cell(row, 1)
                .Value = payment.Id.ToString();

            worksheet.Cell(row, 2)
                .Value = payment.UserId;

            worksheet.Cell(row, 3)
                .Value = payment.Amount;

            worksheet.Cell(row, 4)
                .Value = payment.MerchantId;

            worksheet.Cell(row, 5)
                .Value = payment.PaymentMethod;

            worksheet.Cell(row, 6)
                .Value = payment.Status.ToString();

            worksheet.Cell(row, 7)
                .Value = payment.CreatedAt;

            row++;
        }

        using var stream =
            new MemoryStream();

        workbook.SaveAs(stream);

        return stream.ToArray();
    }
}