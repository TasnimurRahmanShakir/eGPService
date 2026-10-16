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
    <div className="admin-page-container">
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1F2937', letterSpacing: '-0.02em' }}>
          Tenders &amp; Bid Management
        </h1>
      </div>

      <Suspense fallback={<div style={{ color: '#94a3b8', padding: '2rem' }}>Loading tender matrix...</div>}>
        <TendersClientView initialTenders={tenders} />
      </Suspense>
    </div>
  );
}
