'use client';

import React, { useState } from 'react';
import { Plus, KeyRound, ShieldCheck } from 'lucide-react';
import { Button, Badge, DataTable, type Column } from '@egp/ui';
import type { TendererDto } from '@egp/api-client';
import { CreateTendererModal } from '../../components/tenderers/TendererModals';

export function TenderersClientView({ initialTenderers }: { initialTenderers: TendererDto[] }) {
  const [search, setSearch] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const filtered = initialTenderers.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.username.toLowerCase().includes(search.toLowerCase())
  );

  const columns: Column<TendererDto>[] = [
    {
      header: 'ID',
      accessorKey: 'id',
      width: '80px',
      cell: (t) => <span style={{ fontFamily: 'monospace', color: '#38bdf8' }}>#{t.id}</span>,
    },
    {
      header: 'Tenderer Name (Bidder)',
      accessorKey: 'name',
      cell: (t) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              backgroundColor: 'rgba(56, 189, 248, 0.15)',
              color: '#38bdf8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.8rem',
            }}
          >
            {t.name.slice(0, 2).toUpperCase()}
          </div>
          <span style={{ fontWeight: 600, color: '#f8fafc' }}>{t.name}</span>
        </div>
      ),
    },
    {
      header: 'Username',
      accessorKey: 'username',
      cell: (t) => <span style={{ fontFamily: 'monospace', color: '#94a3b8' }}>{t.username}</span>,
    },
    {
      header: 'Password Storage',
      cell: () => (
        <Badge variant="emerald" dot size="sm">
          AES-256 Encrypted
        </Badge>
      ),
    },
    {
      header: 'Created Date',
      cell: (t) => (
        <span style={{ color: '#64748b', fontSize: '0.825rem' }}>
          {new Date(t.createdAtUtc).toLocaleDateString()}
        </span>
      ),
    },
  ];

  return (
    <>
      <DataTable
        data={filtered}
        columns={columns}
        searchPlaceholder="Search tenderers by name or username..."
        searchValue={search}
        onSearchChange={setSearch}
        headerActions={
          <Button variant="primary" icon={<Plus size={16} />} onClick={() => setIsCreateOpen(true)}>
            Add Tenderer
          </Button>
        }
        emptyTitle="No tenderers registered"
        emptySubtitle="Register tenderer accounts to map to tender matrix records."
      />

      <CreateTendererModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
    </>
  );
}
