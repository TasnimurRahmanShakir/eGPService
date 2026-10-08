import React, { Suspense } from 'react';
import { apiClient, type AuditLogDto } from '@egp/api-client';
import { AuditLogsClientView } from './AuditLogsClientView';

export const dynamic = 'force-dynamic';

async function fetchAuditLogs(): Promise<AuditLogDto[]> {
  try {
    return await apiClient.auditLogs.getLogs({ pageNumber: 1, pageSize: 100 }, { next: { revalidate: 0 } });
  } catch (err) {
    console.error('Failed to fetch audit logs from .NET API:', err);
    return [];
  }
}

export default async function AuditLogsPage() {
  const logs = await fetchAuditLogs();

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em' }}>
          Central Audit Trail Explorer
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.25rem' }}>
          Complete, non-JSON relational audit trail capturing property-level diffs, action summaries, and client context metadata (IP, OS, Device, User).
        </p>
      </div>

      <Suspense fallback={<div style={{ color: '#94a3b8', padding: '2rem' }}>Loading audit trail...</div>}>
        <AuditLogsClientView initialLogs={logs} />
      </Suspense>
    </div>
  );
}
