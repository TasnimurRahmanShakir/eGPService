'use client';

import React, { useState } from 'react';
import { Plus, Sparkles, CheckCircle2, XCircle, AlertCircle, ShieldCheck } from 'lucide-react';
import { Button, Badge, DataTable, MoneyDisplay, type Column } from '@egp/ui';
import type { ClientDto } from '@egp/api-client';
import { CreateClientModal, AddSubscriptionModal } from '../../components/clients/ClientModals';

export function ClientsClientView({ initialClients }: { initialClients: ClientDto[] }) {
  const [search, setSearch] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedSubClient, setSelectedSubClient] = useState<{ id: number; name: string } | null>(null);

  const filtered = initialClients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.toLowerCase().includes(search.toLowerCase())
  );

  const totalClients = initialClients.length;
  const purchasedCount = initialClients.filter((c) => c.hasPurchasedSolution).length;
  const totalDueSum = initialClients.reduce((sum, c) => sum + (c.currentDue || 0), 0);
  const totalAdvanceSum = initialClients.reduce((sum, c) => sum + (c.currentAdvance || 0), 0);

  const columns: Column<ClientDto>[] = [
    {
      header: 'Client ID',
      accessorKey: 'id',
      width: '100px',
      cell: (c) => <span style={{ fontFamily: 'monospace', color: '#0F766E', fontWeight: 600 }}>#{c.id}</span>,
    },
    {
      header: 'Client / Firm Name',
      accessorKey: 'name',
      cell: (c) => (
        <div>
          <div style={{ fontWeight: 600, color: '#1F2937' }}>{c.name}</div>
          <div style={{ fontSize: '0.775rem', color: '#64748B' }}>{c.phone || 'No phone'}</div>
        </div>
      ),
    },
    {
      header: 'Email',
      accessorKey: 'email',
      cell: (c) => <span style={{ color: '#64748B' }}>{c.email || '—'}</span>,
    },
    {
      header: 'Opening Balance',
      cell: (c) => {
        const isAdvance = c.openingBalanceType === 0;
        return (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <Badge variant={isAdvance ? 'emerald' : 'rose'} size="sm">
              {isAdvance ? 'Advance' : 'Due'}
            </Badge>
            <MoneyDisplay
              amount={c.openingBalance}
              type={isAdvance ? 'advance' : 'due'}
            />
          </div>
        );
      },
    },
    {
      header: 'Current Advance',
      align: 'right',
      cell: (c) => (
        c.currentAdvance > 0 ? (
          <MoneyDisplay amount={c.currentAdvance} type="advance" size="sm" />
        ) : (
          <span style={{ color: '#94A3B8' }}>—</span>
        )
      ),
    },
    {
      header: 'Current Due',
      align: 'right',
      cell: (c) => (
        c.currentDue > 0 ? (
          <MoneyDisplay amount={c.currentDue} type="due" size="sm" />
        ) : (
          <Badge variant="emerald" size="sm">Clear</Badge>
        )
      ),
    },
    {
      header: 'Solution Purchased?',
      cell: (c) => {
        if (c.hasPurchasedSolution) {
          const validDate = c.solutionValidUptoUtc
            ? new Date(c.solutionValidUptoUtc).toLocaleDateString()
            : null;
          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
              <Badge variant="emerald" dot size="sm">
                Purchased (Active)
              </Badge>
              {validDate && (
                <span style={{ fontSize: '0.725rem', color: '#64748B' }}>
                  Valid upto {validDate}
                </span>
              )}
            </div>
          );
        }
        return (
          <Badge variant="slate" size="sm">
            Not Purchased
          </Badge>
        );
      },
    },
    {
      header: 'Actions',
      align: 'right',
      cell: (c) => (
        <Button
          size="sm"
          variant="outline"
          icon={<Sparkles size={14} />}
          onClick={() => setSelectedSubClient({ id: c.id, name: c.name })}
        >
          {c.hasPurchasedSolution ? 'Renew Solution' : 'Add Solution'}
        </Button>
      ),
    },
  ];

  return (
    <>
      {/* Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div style={{ padding: '1.25rem', backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-sm)' }}>
          <span style={{ fontSize: '0.875rem', color: '#64748B', fontWeight: 500 }}>Total Registered Clients</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1F2937', marginTop: '0.25rem', fontVariantNumeric: 'tabular-nums' }}>{totalClients}</div>
          <div style={{ fontSize: '0.75rem', color: '#047857', marginTop: '0.25rem', fontWeight: 500 }}>
            {purchasedCount} active solution subscriptions
          </div>
        </div>

        <div style={{ padding: '1.25rem', backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-sm)' }}>
          <span style={{ fontSize: '0.875rem', color: '#64748B', fontWeight: 500 }}>Total Available Advance (Ledger)</span>
          <div style={{ marginTop: '0.25rem' }}>
            <MoneyDisplay amount={totalAdvanceSum} type="advance" size="lg" />
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.25rem' }}>
            Available balance for upcoming tender charges
          </div>
        </div>

        <div style={{ padding: '1.25rem', backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-sm)' }}>
          <span style={{ fontSize: '0.875rem', color: '#64748B', fontWeight: 500 }}>Total Outstanding Due (Ledger)</span>
          <div style={{ marginTop: '0.25rem' }}>
            <MoneyDisplay amount={totalDueSum} type="due" size="lg" />
          </div>
          <div style={{ fontSize: '0.75rem', color: '#BE123C', marginTop: '0.25rem', fontWeight: 500 }}>
            Accumulated due across all tenders & subscriptions
          </div>
        </div>
      </div>

      {/* Reusable Data Table */}
      <DataTable
        data={filtered}
        columns={columns}
        searchPlaceholder="Search clients by name, phone or email..."
        searchValue={search}
        onSearchChange={setSearch}
        headerActions={
          <Button variant="primary" icon={<Plus size={16} />} onClick={() => setIsCreateOpen(true)}>
            Add Client
          </Button>
        }
        emptyTitle="No clients found"
        emptySubtitle="Register your first procurement client to track tenders and opening balances."
      />

      {/* Modals */}
      <CreateClientModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />

      {selectedSubClient && (
        <AddSubscriptionModal
          isOpen={true}
          onClose={() => setSelectedSubClient(null)}
          clientId={selectedSubClient.id}
          clientName={selectedSubClient.name}
        />
      )}
    </>
  );
}
