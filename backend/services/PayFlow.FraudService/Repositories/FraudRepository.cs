using Microsoft.EntityFrameworkCore;
using PayFlow.FraudService.Data;
using PayFlow.FraudService.Interfaces;
using PayFlow.FraudService.Models;

namespace PayFlow.FraudService.Repositories;

public class FraudRepository : IFraudRepository
{
    private readonly FraudDbContext _context;

    public FraudRepository(
        FraudDbContext context)
    {
        _context = context;
    }

    public async Task AddFraudCheckAsync(
        FraudCheck fraudCheck)
    {
        await _context.FraudChecks
            .AddAsync(fraudCheck);
    }

    public async Task AddFingerprintAsync(
        TransactionFingerprint fingerprint)
    {
        await _context.TransactionFingerprints
            .AddAsync(fingerprint);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }


    public async Task AddAnomalyAsync(
    AnomalyDetectionResult anomaly)
    {
        await _context
            .AnomalyDetectionResults
            .AddAsync(anomaly);
    }


    public async Task<
    List<TransactionFingerprint>>
    GetFingerprintsAsync()
    {
        return await _context
            .TransactionFingerprints
            .ToListAsync();
    }
}