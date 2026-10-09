import React, { Suspense } from 'react';
import { apiClient, type AuditLogDto } from '@egp/api-client';
import { AuditLogsClientView } from './AuditLogsClientView';

export const dynamic = 'force-dynamic';

async function fetchAuditLogs(): Promise<AuditLogDto[]> {
  try {
    return await apiClient.auditLogs.getLogs({ pageSize: 15 }, { next: { revalidate: 0 } });
  } catch (err) {
    console.warn('[AuditLogsPage] Backend API is currently unreachable. Showing empty audit trail.');
    return [];
  }
}

export default async function AuditLogsPage() {
  const logs = await fetchAuditLogs();

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1F2937', letterSpacing: '-0.02em' }}>
          Central Audit Trail Explorer
        </h1>
        <p style={{ color: '#64748B', fontSize: '0.875rem', marginTop: '0.25rem' }}>
          Real-time relational audit trail with cursor pagination and detailed inspection.
        </p>
      </div>

      <Suspense fallback={<div style={{ color: '#94a3b8', padding: '2rem' }}>Loading audit trail...</div>}>
        <AuditLogsClientView initialLogs={logs} />
      </Suspense>
    </div>
  );
}
