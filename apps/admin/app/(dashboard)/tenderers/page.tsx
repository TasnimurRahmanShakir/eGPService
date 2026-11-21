import React, { Suspense } from 'react';
import type { TendererDto } from '@egp/api-client';
import { TenderersClientView } from './TenderersClientView';
import { getAuthorizedApiClient } from '@/lib/api';

export const dynamic = 'force-dynamic';

export default async function TenderersPage() {
  const api = await getAuthorizedApiClient();
  let tenderers: TendererDto[] = [];
  try {
    tenderers = await api.tenderers.getAll({ next: { tags: ['tenderers'] } });
  } catch (err) {
    console.warn('[TenderersPage] Backend API is currently unreachable. Showing empty tenderers list:', err);
  }

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
