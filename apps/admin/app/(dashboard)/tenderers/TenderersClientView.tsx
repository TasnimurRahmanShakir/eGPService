'use client';

import React, { useState } from 'react';
import { Plus, KeyRound, ShieldCheck, Eye, EyeOff, Pencil, Copy, Check } from 'lucide-react';
import { Button, Badge, DataTable, type Column } from '@egp/ui';
import type { TendererDto } from '@egp/api-client';
import { CreateTendererModal, EditTendererModal } from '@/components/tenderers/TendererModals';
import { formatLocalDate } from '@/lib/date-utils';

export function TenderersClientView({ initialTenderers }: { initialTenderers: TendererDto[] }) {
  const [search, setSearch] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingTenderer, setEditingTenderer] = useState<TendererDto | null>(null);
  const [visiblePasswords, setVisiblePasswords] = useState<Record<number, boolean>>({});
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const togglePasswordVisibility = (id: number) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCopyPassword = (id: number, pwd?: string) => {
    if (!pwd) return;
    navigator.clipboard.writeText(pwd);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

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
      cell: (t) => <span style={{ fontFamily: 'monospace', color: '#0F766E', fontWeight: 600 }}>#{t.id}</span>,
    },
    {
      header: 'License Name (Bidder)',
      accessorKey: 'name',
      cell: (t) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              backgroundColor: '#F0FDFA',
              color: '#0F766E',
              border: '1px solid #99F6E4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.8rem',
            }}
          >
            {t.name.slice(0, 2).toUpperCase()}
          </div>
          <span style={{ fontWeight: 600, color: '#1F2937' }}>{t.name}</span>
        </div>
      ),
    },
    {
      header: 'Username',
      accessorKey: 'username',
      cell: (t) => <span style={{ fontFamily: 'monospace', color: '#64748B' }}>{t.username}</span>,
    },
    {
      header: 'Password Storage',
      cell: (t) => {
        const isVisible = !!visiblePasswords[t.id];
        return (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
            {isVisible ? (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  backgroundColor: '#F1F5F9',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  border: '1px solid #E2E8F0',
                }}
              >
                <code
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.825rem',
                    color: '#0F172A',
                    fontWeight: 600,
                  }}
                >
                  {t.password || '—'}
                </code>
                {t.password && (
                  <button
                    type="button"
                    onClick={() => handleCopyPassword(t.id, t.password)}
                    title={copiedId === t.id ? 'Copied!' : 'Copy password'}
                    style={{
                      border: 'none',
                      background: 'none',
                      color: copiedId === t.id ? '#16A34A' : '#64748B',
                      cursor: 'pointer',
                      padding: '2px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {copiedId === t.id ? <Check size={12} /> : <Copy size={12} />}
                  </button>
                )}
              </div>
            ) : (
              <Badge variant="emerald" dot size="sm">
                AES-256 Encrypted
              </Badge>
            )}

            <button
              type="button"
              onClick={() => togglePasswordVisibility(t.id)}
              title={isVisible ? 'Hide password' : 'Show password'}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #CBD5E1',
                backgroundColor: '#FFFFFF',
                color: isVisible ? '#64748B' : '#0F766E',
                cursor: 'pointer',
                padding: '3px 6px',
                borderRadius: '5px',
                fontSize: '0.75rem',
                gap: '3px',
                transition: 'all 0.15s ease',
              }}
            >
              {isVisible ? <EyeOff size={13} /> : <Eye size={13} />}
              <span style={{ fontSize: '0.725rem', fontWeight: 600 }}>
                {isVisible ? 'Hide' : 'Show'}
              </span>
            </button>
          </div>
        );
      },
    },
    {
      header: 'Created Date',
      cell: (t) => (
        <span style={{ color: '#64748b', fontSize: '0.825rem' }} suppressHydrationWarning>
          {formatLocalDate(t.createdAtUtc)}
        </span>
      ),
    },
    {
      header: 'Actions',
      align: 'right',
      cell: (t) => (
        <Button
          size="sm"
          variant="ghost"
          icon={<Pencil size={14} />}
          onClick={() => setEditingTenderer(t)}
          title="Edit License Information"
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <>
      <DataTable
        data={filtered}
        columns={columns}
        searchPlaceholder="Search licenses by name or username..."
        searchValue={search}
        onSearchChange={setSearch}
        headerActions={
          <Button variant="primary" icon={<Plus size={16} />} onClick={() => setIsCreateOpen(true)}>
            Add License
          </Button>
        }
        emptyTitle="No licenses registered"
        emptySubtitle="Register license accounts to map to tender matrix records."
      />

      <CreateTendererModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
      <EditTendererModal
        isOpen={!!editingTenderer}
        onClose={() => setEditingTenderer(null)}
        tenderer={editingTenderer}
      />
    </>
  );
}
