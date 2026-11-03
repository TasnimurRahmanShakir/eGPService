import React, { Suspense } from 'react';
import { apiClient, type ClientDto, type InvoiceDto } from '@egp/api-client';
import { InvoicesClientView } from './InvoicesClientView';

export const dynamic = 'force-dynamic';

async function fetchClients(): Promise<ClientDto[]> {
  try {
    return await apiClient.clients.getAll({ next: { tags: ['clients'] } });
  } catch (err) {
    console.warn('[InvoicesPage] Failed to fetch clients:', err);
    return [];
  }
}

async function fetchInvoices(): Promise<InvoiceDto[]> {
  try {
    return await apiClient.invoices.getAll(undefined, { cache: 'no-store' });
  } catch (err) {
    console.warn('[InvoicesPage] Failed to fetch invoices:', err);
    return [];
  }
}

export default async function InvoicesPage() {
  const [clients, invoices] = await Promise.all([
    fetchClients(),
    fetchInvoices(),
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
        <InvoicesClientView
          initialInvoices={invoices}
          clients={clients}
        />
      </Suspense>
    </div>
  );
}
