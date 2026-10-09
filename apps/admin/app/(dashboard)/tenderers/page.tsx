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
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em' }}>
          e-GP Tenderer Accounts
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.25rem' }}>
          Manage tenderer bidders (KB, BA, AMIR, etc.) and accounts. Credentials are encrypted using server-side AES-256.
        </p>
      </div>

      <Suspense fallback={<div style={{ color: '#94a3b8', padding: '2rem' }}>Loading tenderers...</div>}>
        <TenderersClientView initialTenderers={tenderers} />
      </Suspense>
    </div>
  );
}
