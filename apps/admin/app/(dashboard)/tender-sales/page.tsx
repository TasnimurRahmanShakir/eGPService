import React, { Suspense } from 'react';
import { apiClient, type TenderSaleDto, type TenderSaleSummaryDto } from '@egp/api-client';
import { TenderSalesClientView } from './TenderSalesClientView';

export const dynamic = 'force-dynamic';

async function fetchSales(): Promise<TenderSaleDto[]> {
  try {
    return await apiClient.tenderSales.getAll(undefined, { cache: 'no-store' });
  } catch (err) {
    console.warn('[TenderSalesPage] Failed to fetch tender sales:', err);
    return [];
  }
}

async function fetchSummary(): Promise<TenderSaleSummaryDto> {
  try {
    return await apiClient.tenderSales.getSummary({ cache: 'no-store' });
  } catch (err) {
    console.warn('[TenderSalesPage] Failed to fetch tender sale summary:', err);
    return {
      totalCount: 0,
      totalSell: 0,
      totalInvest: 0,
      totalProfit: 0,
      totalPaid: 0,
      totalDue: 0,
    };
  }
}

export default async function TenderSalesPage() {
  const [sales, summary] = await Promise.all([
    fetchSales(),
    fetchSummary(),
  ]);

  return (
    <div className="admin-page-container">
      {/* Page Header */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1F2937', letterSpacing: '-0.02em', margin: 0 }}>
          Tender Sales
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#64748B', marginTop: '4px' }}>
          Record and track tender sales, investments, commissions, profit margins, and collections
        </p>
      </div>

      <Suspense fallback={<div style={{ color: '#94a3b8', padding: '2rem' }}>Loading tender sales...</div>}>
        <TenderSalesClientView
          initialSales={sales}
          initialSummary={summary}
        />
      </Suspense>
    </div>
  );
}

