import React, { Suspense } from 'react';
import { apiClient, type TenderDto } from '@egp/api-client';
import { TendersClientView } from './TendersClientView';

export const dynamic = 'force-dynamic';

async function getTenders(): Promise<TenderDto[]> {
  try {
    return await apiClient.tenders.getAll(undefined, { next: { tags: ['tenders'] } });
  } catch (err) {
    console.warn('[TendersPage] Backend API is unreachable. Showing empty tenders list.');
    return [];
  }
}

export default async function TendersPage() {
  const tenders = await getTenders();

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em' }}>
          Tenders & Bid Management (Excel Matrix)
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.25rem' }}>
          Full replication of the procurement spreadsheet matrix with status flags, less percentage, charges, dynamic due calculation and optimistic payments.
        </p>
      </div>

      <Suspense fallback={<div style={{ color: '#94a3b8', padding: '2rem' }}>Loading tender matrix...</div>}>
        <TendersClientView initialTenders={tenders} />
      </Suspense>
    </div>
  );
}
