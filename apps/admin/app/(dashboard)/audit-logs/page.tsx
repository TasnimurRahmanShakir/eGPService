import React, { Suspense } from 'react';
import { apiClient, type AuditLogDto } from '@egp/api-client';
import { AuditLogsClientView } from './AuditLogsClientView';
import { requireAdminRole } from '@/lib/auth-guard';

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
  await requireAdminRole();
  const logs = await fetchAuditLogs();

  return (
    <div className="admin-page-container">
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1F2937', letterSpacing: '-0.02em' }}>
          Audit Trail Explorer
        </h1>
      </div>

      <Suspense fallback={<div style={{ color: '#94a3b8', padding: '2rem' }}>Loading audit trail...</div>}>
        <AuditLogsClientView initialLogs={logs} />
      </Suspense>
    </div>
  );
}
