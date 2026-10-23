import React, { Suspense } from 'react';
import { apiClient, type ClientDto, type CashCollectionDto, type CashCollectionSummaryDto } from '@egp/api-client';
import { CashCollectionClientView } from './CashCollectionClientView';

export const dynamic = 'force-dynamic';

async function fetchClients(): Promise<ClientDto[]> {
  try {
    return await apiClient.clients.getAll({ next: { tags: ['clients'] } });
  } catch (err) {
    console.warn('[CashCollectionPage] Failed to fetch clients:', err);
    return [];
  }
}

async function fetchCollections(): Promise<CashCollectionDto[]> {
  try {
    return await apiClient.cashCollections.getAll(undefined, { cache: 'no-store' });
  } catch (err) {
    console.warn('[CashCollectionPage] Failed to fetch cash collections:', err);
    return [];
  }
}

async function fetchSummary(): Promise<CashCollectionSummaryDto> {
  try {
    return await apiClient.cashCollections.getSummary({ cache: 'no-store' });
  } catch (err) {
    console.warn('[CashCollectionPage] Failed to fetch cash collection summary:', err);
    return {
      totalCollectedToday: 0,
      totalCollectedThisMonth: 0,
      totalCollectedAllTime: 0,
      totalMarketDue: 0,
      totalVouchersCount: 0,
    };
  }
}

export default async function CashCollectionPage() {
  const [clients, collections, summary] = await Promise.all([
    fetchClients(),
    fetchCollections(),
    fetchSummary(),
  ]);

  return (
    <div className="admin-page-container">
      {/* Page Header */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1F2937', letterSpacing: '-0.02em', margin: 0 }}>
          Cash Collection &amp; Due Recovery
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#64748B', marginTop: '4px' }}>
          Collection of client dues, preparation of cash/bank receipt vouchers, and adjustment of discounts
        </p>
      </div>

      <Suspense fallback={<div style={{ color: '#94a3b8', padding: '2rem' }}>Loading cash collections...</div>}>
        <CashCollectionClientView
          initialCollections={collections}
          initialSummary={summary}
          clients={clients}
        />
      </Suspense>
    </div>
  );
}
