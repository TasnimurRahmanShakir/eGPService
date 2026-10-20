import React, { Suspense } from 'react';
import { apiClient, type TenderDto, type TenderClosingIndexDto } from '@egp/api-client';
import { TendersClientView } from './TendersClientView';

export const dynamic = 'force-dynamic';

async function getInitialClosingIndex(): Promise<TenderClosingIndexDto[]> {
  try {
    return await apiClient.tenders.getClosingIndex(30, { cache: 'no-store' });
  } catch (err) {
    console.warn('[TendersPage] Failed to load closing index from backend.');
    return [];
  }
}

async function getInitialTenders(dateStr: string): Promise<TenderDto[]> {
  try {
    return await apiClient.tenders.getAll(undefined, dateStr, { cache: 'no-store' });
  } catch (err) {
    console.warn('[TendersPage] Backend API is unreachable for date tenders.');
    return [];
  }
}

export default async function TendersPage() {
  const now = new Date();
  const todayStr = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().split('T')[0];

  // Zero full-pre-fetch: only fetch 30-day lightweight summary (~1.5KB) and today's tenders
  const [closingIndex, initialTenders] = await Promise.all([
    getInitialClosingIndex(),
    getInitialTenders(todayStr),
  ]);

  return (
    <div className="admin-page-container">
      <div style={{ marginBottom: '0.5rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1F2937', letterSpacing: '-0.02em' }}>
          Tenders &amp; Bid Management
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#64748B', marginTop: '0.25rem' }}>
          Track daily closing deadlines, participant clients, and license submissions.
        </p>
      </div>

      <Suspense fallback={<div style={{ color: '#94a3b8', padding: '2rem' }}>Loading tender matrix...</div>}>
        <TendersClientView
          initialClosingIndex={closingIndex}
          initialTenders={initialTenders}
          defaultDate={todayStr}
        />
      </Suspense>
    </div>
  );
}
