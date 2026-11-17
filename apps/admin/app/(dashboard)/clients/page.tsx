import React, { Suspense } from 'react';
import type { ClientDto } from '@egp/api-client';
import { ClientsClientView } from './ClientsClientView';
import { getAuthorizedApiClient } from '@/lib/api';
import { getCurrentSession } from '@/lib/auth-guard';

export const dynamic = 'force-dynamic';

export default async function ClientsPage() {
  const session = await getCurrentSession();
  const userRole = session?.role || 'SuperAdmin';
  const api = await getAuthorizedApiClient();

  let clients: ClientDto[] = [];
  try {
    clients = await api.clients.getAll({ next: { tags: ['clients'] } });
  } catch (err) {
    console.warn('[ClientsPage] Backend API is currently unreachable. Showing empty clients list.');
  }

  return (
    <div className="admin-page-container">
      {/* Page Header */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1F2937', letterSpacing: '-0.02em' }}>
          Client Management
        </h1>
      </div>

      <Suspense fallback={<div style={{ color: '#94a3b8', padding: '2rem' }}>Loading clients...</div>}>
        <ClientsClientView initialClients={clients} userRole={userRole} />
      </Suspense>
    </div>
  );
}
