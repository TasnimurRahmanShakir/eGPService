import React, { Suspense } from 'react';
import { apiClient, type ClientDto } from '@egp/api-client';
import { ClientsClientView } from './ClientsClientView';

export const dynamic = 'force-dynamic';

async function fetchClients(): Promise<ClientDto[]> {
  try {
    return await apiClient.clients.getAll({ next: { tags: ['clients'] } });
  } catch (err) {
    console.error('Failed to fetch clients from .NET API:', err);
    return [];
  }
}

export default async function ClientsPage() {
  const clients = await fetchClients();

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Page Header */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em' }}>
          Client Management
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.25rem' }}>
          Manage client procurement firms, track opening balances (Advance vs Due), and monitor software solution purchases.
        </p>
      </div>

      <Suspense fallback={<div style={{ color: '#94a3b8', padding: '2rem' }}>Loading clients...</div>}>
        <ClientsClientView initialClients={clients} />
      </Suspense>
    </div>
  );
}
