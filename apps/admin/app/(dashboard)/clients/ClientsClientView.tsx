'use client';

import React, { useState } from 'react';
import { Plus, Sparkles, CheckCircle2, XCircle, AlertCircle, ShieldCheck, Pencil, FileText } from 'lucide-react';
import { Button, Badge, DataTable, MoneyDisplay, type Column } from '@egp/ui';
import type { ClientDto, ClientDetailDto } from '@egp/api-client';
import { CreateClientModal, EditClientModal, AddSubscriptionModal } from '@/components/clients/ClientModals';
import { ClientLedgerModal } from '@/components/clients/ClientLedgerModal';
import { getClientDetailAction } from '@/app/actions/clientActions';
import { formatLocalDate } from '@/lib/date-utils';

export function ClientsClientView({ initialClients }: { initialClients: ClientDto[] }) {
  const [search, setSearch] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<ClientDto | null>(null);
  const [selectedSubClient, setSelectedSubClient] = useState<{ id: number; name: string } | null>(null);
  const [selectedLedgerClient, setSelectedLedgerClient] = useState<ClientDetailDto | null>(null);
  const [loadingLedgerId, setLoadingLedgerId] = useState<number | null>(null);

  const filtered = initialClients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.toLowerCase().includes(search.toLowerCase())
  );

  const totalClients = initialClients.length;
  const purchasedCount = initialClients.filter((c) => c.hasPurchasedSolution).length;
  const totalChargeSum = initialClients.reduce((sum, c) => sum + (c.totalCharge || 0), 0);
  const totalPaymentSum = initialClients.reduce((sum, c) => sum + (c.totalPayment || 0), 0);
  const totalAdvanceSum = initialClients.reduce((sum, c) => sum + (c.currentAdvance || 0), 0);
  const totalDueSum = initialClients.reduce((sum, c) => sum + (c.currentDue || 0), 0);

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
        if (!c.openingBalance || c.openingBalance <= 0) {
          return <span style={{ color: '#94A3B8' }}>—</span>;
        }
        const isAdvance = c.openingBalanceType === 0;
        return (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <Badge variant={isAdvance ? 'emerald' : 'rose'} size="sm">
              {isAdvance ? 'Advance' : 'Due'}
            </Badge>
            <MoneyDisplay
              amount={c.openingBalance}
              type={isAdvance ? 'advance' : 'due'}
              size="sm"
            />
          </div>
        );
      },
    },
    {
      header: 'Charge',
      align: 'right',
      cell: (c) => (
        (c.totalCharge || 0) > 0 ? (
          <MoneyDisplay amount={c.totalCharge} type="neutral" size="sm" />
        ) : (
          <span style={{ color: '#94A3B8' }}>—</span>
        )
      ),
    },
    {
      header: 'Payment',
      align: 'right',
      cell: (c) => (
        (c.totalPayment || 0) > 0 ? (
          <MoneyDisplay amount={c.totalPayment} type="advance" size="sm" />
        ) : (
          <span style={{ color: '#94A3B8' }}>—</span>
        )
      ),
    },
    {
      header: 'Discount',
      align: 'right',
      cell: (c) => (
        (c.totalDiscount || 0) > 0 ? (
          <MoneyDisplay amount={c.totalDiscount} type="neutral" size="sm" />
        ) : (
          <span style={{ color: '#94A3B8' }}>—</span>
        )
      ),
    },
    {
      header: 'Advance',
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
      header: 'Due',
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
            ? formatLocalDate(c.solutionValidUptoUtc)
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
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
          <Button
            size="sm"
            variant="ghost"
            icon={<FileText size={14} />}
            isLoading={loadingLedgerId === c.id}
            onClick={async () => {
              setLoadingLedgerId(c.id);
              try {
                const res = await getClientDetailAction(c.id);
                if (res.success && res.data) {
                  setSelectedLedgerClient(res.data);
                }
              } finally {
                setLoadingLedgerId(null);
              }
            }}
            title="View Ledger Statement"
          >
            Ledger
          </Button>
          <Button
            size="sm"
            variant="ghost"
            icon={<Pencil size={14} />}
            onClick={() => setEditingClient(c)}
            title="Edit Client Information"
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="outline"
            icon={<Sparkles size={14} />}
            onClick={() => setSelectedSubClient({ id: c.id, name: c.name })}
          >
            {c.hasPurchasedSolution ? 'Renew Solution' : 'Add Solution'}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      {/* Metric Cards */}
      <div className="kpi-cards-grid">
        <div style={{ padding: '1.25rem', backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-sm)' }}>
          <span style={{ fontSize: '0.875rem', color: '#64748B', fontWeight: 500 }}>Total Registered Clients</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1F2937', marginTop: '0.25rem', fontVariantNumeric: 'tabular-nums' }}>{totalClients}</div>
          <div style={{ fontSize: '0.75rem', color: '#047857', marginTop: '0.25rem', fontWeight: 500 }}>
            {purchasedCount} active solution subscriptions
          </div>
        </div>

        <div style={{ padding: '1.25rem', backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-sm)' }}>
          <span style={{ fontSize: '0.875rem', color: '#64748B', fontWeight: 500 }}>Total Payments</span>
          <div style={{ marginTop: '0.25rem' }}>
            <MoneyDisplay amount={totalPaymentSum} type="advance" size="lg" />
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.25rem' }}>
            Total cash collected from clients
          </div>
        </div>

        <div style={{ padding: '1.25rem', backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-sm)' }}>
          <span style={{ fontSize: '0.875rem', color: '#64748B', fontWeight: 500 }}>Total Available Advance</span>
          <div style={{ marginTop: '0.25rem' }}>
            <MoneyDisplay amount={totalAdvanceSum} type="advance" size="lg" />
          </div>
          <div style={{ fontSize: '0.75rem', color: '#047857', marginTop: '0.25rem', fontWeight: 500 }}>
            Remaining advance credit available
          </div>
        </div>

        <div style={{ padding: '1.25rem', backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-sm)' }}>
          <span style={{ fontSize: '0.875rem', color: '#64748B', fontWeight: 500 }}>Total Outstanding Due</span>
          <div style={{ marginTop: '0.25rem' }}>
            <MoneyDisplay amount={totalDueSum} type="due" size="lg" />
          </div>
          <div style={{ fontSize: '0.75rem', color: '#BE123C', marginTop: '0.25rem', fontWeight: 500 }}>
            Accumulated due across all clients
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
      <EditClientModal
        isOpen={!!editingClient}
        onClose={() => setEditingClient(null)}
        client={editingClient}
      />

      {selectedSubClient && (
        <AddSubscriptionModal
          isOpen={true}
          onClose={() => setSelectedSubClient(null)}
          clientId={selectedSubClient.id}
          clientName={selectedSubClient.name}
        />
      )}

      <ClientLedgerModal
        isOpen={!!selectedLedgerClient}
        client={selectedLedgerClient}
        onClose={() => setSelectedLedgerClient(null)}
      />
    </>
  );
}
