import React, { Suspense } from 'react';
import { apiClient, type TendererDto } from '@egp/api-client';
import { TenderersClientView } from './TenderersClientView';

export const dynamic = 'force-dynamic';

async function fetchTenderers(): Promise<TendererDto[]> {
  try {
    return await apiClient.tenderers.getAll({ next: { tags: ['tenderers'] } });
  } catch (err) {
    console.warn('[TenderersPage] Backend API is currently unreachable. Showing empty tenderers list.');
    return [];
  }
}

export default async function TenderersPage() {
  const tenderers = await fetchTenderers();

  return (
    <div className="admin-page-container">
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1F2937', letterSpacing: '-0.02em' }}>
          e-GP License Accounts
        </h1>
      </div>

      <Suspense fallback={<div style={{ color: '#94a3b8', padding: '2rem' }}>Loading licenses...</div>}>
        <TenderersClientView initialTenderers={tenderers} />
      </Suspense>
    </div>
  );
}
