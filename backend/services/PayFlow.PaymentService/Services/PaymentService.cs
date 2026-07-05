using PayFlow.PaymentService.DTOs;
using PayFlow.PaymentService.Helpers;
using PayFlow.PaymentService.Interfaces;
using PayFlow.PaymentService.Models;
using PayFlow.SharedKernel.DTOs;
//using PayFlow.SharedKernel.Events;
using System.Net.Http.Json;
using PayFlow.PaymentService.Reports;
using PayFlow.MessageBus.Interfaces;
using PayFlow.MessageBus.Events;

namespace PayFlow.PaymentService.Services;

public class PaymentService : IPaymentService
{
    private readonly IPaymentRepository _repository;

    private readonly IHttpClientFactory _httpClientFactory;

    //private readonly IEventPublisher _eventPublisher;
    private readonly IMessageBus
_messageBus;

    private readonly ILogger<PaymentService> _logger;


    private async Task<FraudCheckResponse?>
        CheckFraudAsync(
        Payment payment)
    {
        var client =
            _httpClientFactory
                .CreateClient();

        var response =
            await client.PostAsJsonAsync(
                "https://localhost:7169/api/fraud/check",
                new FraudCheckRequest
                {
                    PaymentId = payment.Id,
                    Amount = payment.Amount,
                    PaymentMethod =
                        payment.PaymentMethod
                });

        if (!response.IsSuccessStatusCode)
            return null;

        return await response.Content
            .ReadFromJsonAsync<
                FraudCheckResponse>();
    }

    private async Task<
    DebitWalletResponse?>
    DebitWalletAsync(
    Payment payment)
    {
        var client =
            _httpClientFactory
                .CreateClient();

        var response =
            await client.PostAsJsonAsync(
                "https://localhost:7224/api/wallet/debit",
                new DebitWalletRequest
                {
                    UserId =
                        payment.UserId,

                    Amount =
                        payment.Amount
                });

        if (!response
            .IsSuccessStatusCode)
        {
            return null;
        }

        return await response
            .Content
            .ReadFromJsonAsync<
                DebitWalletResponse>();
    }

    private async Task
    SendNotificationAsync(
    int userId,
    string title,
    string message)
    {
        var client =
            _httpClientFactory
                .CreateClient();

        await client.PostAsJsonAsync(
            "https://localhost:7136/api/notification",
            new CreateNotificationRequest
            {
                UserId = userId,
                Title = title,
                Message = message,
                Type = "Payment"
            });
    }

    public async Task<PaymentResponse>
        CreatePaymentAsync(
        CreatePaymentRequest request)
    {
        var payment = new Payment
        {
            Id = Guid.NewGuid(),
            UserId = request.UserId,
            Amount = request.Amount,
            MerchantId = request.MerchantId,
            PaymentMethod = request.PaymentMethod,
            Status = PaymentStatus.Initiated,
            CreatedAt = DateTime.UtcNow
        };

        await _repository.AddAsync(payment);

        await _repository.SaveChangesAsync();

        //    await _eventPublisher
        //.PublishAsync(
        //    new PaymentCreatedEvent
        //    {
        //        PaymentId =
        //            payment.Id,

        //        UserId =
        //            payment.UserId,

        //        Amount =
        //            payment.Amount,

        //        PaymentMethod =
        //            payment.PaymentMethod
        //    });

        await _messageBus.PublishAsync(

    "payment.created",

    new PaymentCreatedEvent
    {
        PaymentId = payment.Id,

        UserId = payment.UserId,

        Amount = payment.Amount,

        MerchantId = payment.MerchantId,

        PaymentMethod = payment.PaymentMethod,

        CreatedAt = DateTime.UtcNow
    });

        var fraudResult =
            await CheckFraudAsync(payment);

        if (fraudResult != null)
        {
            _logger.LogWarning(
    $"RiskScore={fraudResult.RiskScore}, Fraud={fraudResult.IsFraudulent}");

            if (fraudResult.IsFraudulent)
            {
                payment.Status =
                    PaymentStatus.Failed;

                await SendNotificationAsync(
                    payment.UserId,
                    "Payment Failed",
                    $"Payment {payment.Id} failed fraud validation");
            }
            else
            {
                var walletResult =
                    await DebitWalletAsync(
                        payment);

                if (walletResult == null ||
                    !walletResult.Success)
                {

                    _logger.LogWarning(
    "WALLET FAILURE BRANCH");

                    payment.Status =
                        PaymentStatus.Failed;

                    await SendNotificationAsync(
                        payment.UserId,
                        "Payment Failed",
                        "Insufficient wallet balance");

                }
                else
                {
                    payment.Status =
                        PaymentStatus.Pending;
                    await SendNotificationAsync(
                    payment.UserId,
                    "Payment Created",
                    $"Payment {payment.Id} created successfully");
                }
            }



            await _repository
                .UpdateAsync(payment);

            await _repository
                .AddHistoryAsync(
                    new PaymentStateHistory
                    {
                        PaymentId =
                            payment.Id,

                        OldStatus =
                            "Initiated",

                        NewStatus =
                            payment.Status
                                .ToString(),

                        ChangedAt =
                            DateTime.UtcNow
                    });

            await _repository
                .SaveChangesAsync();

            await _repository.AddAuditLogAsync(
                new AuditLog
                {
                    UserId = request.UserId,
                    Action = "Payment Created",
                    Description =
                        $"Payment ₹{request.Amount} created"
                });

            await _repository.SaveChangesAsync();
        }

        return new PaymentResponse
        {
            PaymentId = payment.Id,
            Amount = payment.Amount,
            Status = payment.Status.ToString()
        };


    }

    public async Task<bool>
        UpdateStatusAsync(
        UpdatePaymentStatusRequest request)
    {
        var payment =
            await _repository.GetByIdAsync(
                request.PaymentId);

        if (payment == null)
            return false;

        var oldStatus =
            payment.Status.ToString();

        var newStatus =
            Enum.Parse<PaymentStatus>(
                request.Status);

        if (!PaymentStateValidator
            .IsValidTransition(
                payment.Status,
                newStatus))
        {
            return false;
        }

        payment.Status = newStatus;

        await _repository.UpdateAsync(
            payment);

        await _repository.AddAuditLogAsync(
    new AuditLog
    {
        UserId = payment.UserId,
        Action = "Payment Updated",
        Description =
            $"Status changed to {payment.Status}"
    });

        await _repository.SaveChangesAsync();

        await _repository.AddHistoryAsync(
            new PaymentStateHistory
            {
                PaymentId = payment.Id,
                OldStatus = oldStatus,
                NewStatus = request.Status,
                ChangedAt = DateTime.UtcNow
            });

        await _repository.SaveChangesAsync();

        return true;
    }

    public async Task<Payment?>
        GetByIdAsync(Guid id)
    {
        return await _repository
            .GetByIdAsync(id);
    }

    //public PaymentService(
    //IPaymentRepository repository,
    //IHttpClientFactory httpClientFactory,
    //IEventPublisher eventPublisher)
    //{
    //    _repository = repository;

    //    _httpClientFactory =
    //        httpClientFactory;

    //    _eventPublisher =
    //        eventPublisher;
    //}

    public PaymentService(
    IPaymentRepository repository,
    IHttpClientFactory httpClientFactory,
    IMessageBus messageBus)
    {
        _repository = repository;

        _httpClientFactory = httpClientFactory;

        _messageBus = messageBus;
    }

    public async Task<List<Payment>>
    GetPaymentsByUserAsync(
        int userId)
    {
        return await _repository
            .GetPaymentsByUserAsync(userId);
    }

    public async Task<List<PaymentStateHistory>>
    GetPaymentHistoryAsync(
        Guid paymentId)
    {
        return await _repository
            .GetHistoryByPaymentIdAsync(
                paymentId);
    }


    public async Task<byte[]>
    ExportPaymentsAsync()
    {
        var payments =
            await _repository
                .GetAllPaymentsAsync();

        await _repository.AddAuditLogAsync(
            new AuditLog
            {
                UserId = 0,
                Action = "Admin Report",
                Description =
                    "Payment report exported"
            });

        await _repository.SaveChangesAsync();

        return PaymentReportGenerator
            .Generate(payments);
    }

    public async Task<List<Payment>>
GetRecentPaymentsAsync()
    {
        var payments =
            await _repository
                .GetAllPaymentsAsync();

        return payments
            .Take(5)
            .ToList();
    }


    public async Task<List<AuditLog>>
GetAuditLogsAsync()
    {
        return await _repository
            .GetAuditLogsAsync();
    }

    public async Task<List<Payment>>
SearchPaymentsAsync(string search)
    {
        return await _repository
            .SearchPaymentsAsync(search);
    }


    public async Task<PagedResponse<Payment>>
    GetPaymentsPagedAsync(
        int userId,
        int page,
        int pageSize,
        string? search,
        string? status,
        string? sort)
    {
        return await _repository
            .GetPaymentsPagedAsync(
                userId,
                page,
                pageSize,
                search,
                status,
                sort);
    }

    public async Task<PagedResponse<AuditLog>>
GetAuditLogsPagedAsync(
    int page,
    int pageSize,
    string? search,
    string? action,
    string? sort)
    {
        return await
            _repository
                .GetAuditLogsPagedAsync(
                    page,
                    pageSize,
                    search,
                    action,
                    sort);
    }

}