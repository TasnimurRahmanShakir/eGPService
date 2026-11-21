import React, { Suspense } from 'react';
import type { ClientDto, CashCollectionDto, CashCollectionSummaryDto } from '@egp/api-client';
import { CashCollectionClientView } from './CashCollectionClientView';
import { requireAdminRole } from '@/lib/auth-guard';
import { getAuthorizedApiClient } from '@/lib/api';

export const dynamic = 'force-dynamic';

export default async function CashCollectionPage() {
  await requireAdminRole();
  const api = await getAuthorizedApiClient();

  const defaultSummary: CashCollectionSummaryDto = {
    totalCollectedToday: 0,
    totalCollectedThisMonth: 0,
    totalCollectedAllTime: 0,
    totalMarketDue: 0,
    totalVouchersCount: 0,
  };

  const [clients, collections, summary] = await Promise.all([
    api.clients.getAll({ next: { tags: ['clients'] } }).catch(() => [] as ClientDto[]),
    api.cashCollections.getAll(undefined, { cache: 'no-store' }).catch(() => [] as CashCollectionDto[]),
    api.cashCollections.getSummary({ cache: 'no-store' }).catch(() => defaultSummary),
  ]);

  return (
    <div className="admin-page-container">
      {/* Page Header */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1F2937', letterSpacing: '-0.02em', margin: 0 }}>
          Cash Collection &amp; Due Settlement
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#64748B', marginTop: '4px' }}>
          ক্লায়েন্টদের থেকে সংগৃহীত পেমেন্ট ও এডভান্স রিকভারির ভাউচার হিসাব ও ফিল্টারিং
        </p>
      </div>

      <Suspense fallback={<div style={{ color: '#94a3b8', padding: '2rem' }}>Loading cash collection matrix...</div>}>
        <CashCollectionClientView
          clients={clients}
          initialCollections={collections}
          initialSummary={summary}
        />
      </Suspense>
    </div>
  );
}
