import React, { Suspense } from 'react';
import { apiClient, type ClientDto } from '@egp/api-client';
import { ClientsClientView } from './ClientsClientView';

export const dynamic = 'force-dynamic';

async function fetchClients(): Promise<ClientDto[]> {
  try {
    return await apiClient.clients.getAll({ next: { tags: ['clients'] } });
  } catch (err) {
    console.warn('[ClientsPage] Backend API is currently unreachable. Showing empty clients list.');
    return [];
  }
}

export default async function ClientsPage() {
  const clients = await fetchClients();

  return (
    <div className="admin-page-container">
      {/* Page Header */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1F2937', letterSpacing: '-0.02em' }}>
          Client Management
        </h1>
      </div>

      <Suspense fallback={<div style={{ color: '#94a3b8', padding: '2rem' }}>Loading clients...</div>}>
        <ClientsClientView initialClients={clients} />
      </Suspense>
    </div>
  );
}
