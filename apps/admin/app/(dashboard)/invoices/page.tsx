import React, { Suspense } from 'react';
import type { ClientDto, InvoiceDto } from '@egp/api-client';
import { InvoicesClientView } from './InvoicesClientView';
import { requireAdminRole } from '@/lib/auth-guard';
import { getAuthorizedApiClient } from '@/lib/api';

export const dynamic = 'force-dynamic';

export default async function InvoicesPage() {
  await requireAdminRole();
  const api = await getAuthorizedApiClient();

  const [clients, invoices] = await Promise.all([
    api.clients.getAll({ next: { tags: ['clients'] } }).catch(() => [] as ClientDto[]),
    api.invoices.getAll(undefined, { cache: 'no-store' }).catch(() => [] as InvoiceDto[]),
  ]);

  return (
    <div className="admin-page-container">
      {/* Page Header */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1F2937', letterSpacing: '-0.02em', margin: 0 }}>
          Client Invoices &amp; Billing
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#64748B', marginTop: '4px' }}>
          টেন্ডার প্রতি লাইসেন্স চার্জ ও ওপেনিং ব্যালেন্সের স্বয়ংক্রিয় ইনভয়েস ট্র্যাকিং ও প্রিন্ট
        </p>
      </div>

      <Suspense fallback={<div style={{ color: '#94a3b8', padding: '2rem' }}>Loading invoices...</div>}>
        <InvoicesClientView clients={clients} initialInvoices={invoices} />
      </Suspense>
    </div>
  );
}
