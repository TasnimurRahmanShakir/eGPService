import React, { Suspense } from 'react';
import type { TenderSaleDto, TenderSaleSummaryDto } from '@egp/api-client';
import { TenderSalesClientView } from './TenderSalesClientView';
import { requireAdminRole } from '@/lib/auth-guard';
import { getAuthorizedApiClient } from '@/lib/api';

export const dynamic = 'force-dynamic';

export default async function TenderSalesPage() {
  await requireAdminRole();
  const api = await getAuthorizedApiClient();

  const defaultSummary: TenderSaleSummaryDto = {
    totalCount: 0,
    totalSell: 0,
    totalInvest: 0,
    totalProfit: 0,
    totalPaid: 0,
    totalDue: 0,
  };

  const [sales, summary] = await Promise.all([
    api.tenderSales.getAll(undefined, { cache: 'no-store' }).catch(() => [] as TenderSaleDto[]),
    api.tenderSales.getSummary({ cache: 'no-store' }).catch(() => defaultSummary),
  ]);

  return (
    <div className="admin-page-container">
      {/* Page Header */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1F2937', letterSpacing: '-0.02em', margin: 0 }}>
          Tender Sales
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#64748B', marginTop: '4px' }}>
          Tender purchase/sell transactions, investments, profits, and client receivables.
        </p>
      </div>

      <Suspense fallback={<div style={{ color: '#94a3b8', padding: '2rem' }}>Loading sales directory...</div>}>
        <TenderSalesClientView
          initialSales={sales}
          initialSummary={summary}
        />
      </Suspense>
    </div>
  );
}
