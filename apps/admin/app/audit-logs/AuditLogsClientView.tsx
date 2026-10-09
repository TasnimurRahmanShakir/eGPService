'use client';

import React, { useState } from 'react';
import { History, Shield, Monitor, Smartphone, Globe } from 'lucide-react';
import { Badge, DataTable, type Column } from '@egp/ui';
import type { AuditLogDto } from '@egp/api-client';

export function AuditLogsClientView({ initialLogs }: { initialLogs: AuditLogDto[] }) {
  const [search, setSearch] = useState('');
  const [selectedModule, setSelectedModule] = useState<string>('ALL');

  const modules = ['ALL', ...Array.from(new Set(initialLogs.map((l) => l.moduleName)))];

  const filtered = initialLogs.filter((l) => {
    const matchesSearch =
      l.actionMessage.toLowerCase().includes(search.toLowerCase()) ||
      l.moduleName.toLowerCase().includes(search.toLowerCase()) ||
      l.performedBy.toLowerCase().includes(search.toLowerCase()) ||
      l.ipAddress.includes(search);
    const matchesModule = selectedModule === 'ALL' || l.moduleName === selectedModule;
    return matchesSearch && matchesModule;
  });

  const getActionBadgeVariant = (action: string) => {
    switch (action.toUpperCase()) {
      case 'CREATE':
        return 'emerald';
      case 'UPDATE':
        return 'sky';
      case 'DELETE':
        return 'rose';
      default:
        return 'slate';
    }
  };

  const columns: Column<AuditLogDto>[] = [
    {
      header: 'Timestamp (UTC)',
      width: '170px',
      cell: (l) => {
        const d = new Date(l.timestampUtc);
        return (
          <div style={{ fontSize: '0.785rem', fontFamily: 'monospace' }}>
            <div style={{ color: '#1F2937', fontWeight: 600 }}>{d.toLocaleDateString()}</div>
            <div style={{ color: '#64748B' }}>{d.toLocaleTimeString()}</div>
          </div>
        );
      },
    },
    {
      header: 'Module & Entity',
      cell: (l) => (
        <div>
          <span style={{ fontWeight: 600, color: '#1F2937' }}>{l.moduleName}</span>
          <span style={{ fontFamily: 'monospace', color: '#64748B', fontSize: '0.75rem', marginLeft: '0.35rem' }}>
            #{l.recordId}
          </span>
        </div>
      ),
    },
    {
      header: 'Action',
      align: 'center',
      cell: (l) => (
        <Badge variant={getActionBadgeVariant(l.actionType)} size="sm">
          {l.actionType}
        </Badge>
      ),
    },
    {
      header: 'Audit Action Message (No JSON)',
      cell: (l) => (
        <div style={{ color: '#334155', fontSize: '0.85rem' }}>
          {l.actionMessage}
        </div>
      ),
    },
    {
      header: 'Context Metadata',
      cell: (l) => (
        <div style={{ fontSize: '0.75rem', color: '#64748B', display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
          <span>IP: {l.ipAddress}</span>
          <span style={{ color: '#64748B' }}>{l.osInfo} • {l.deviceInfo}</span>
        </div>
      ),
    },
    {
      header: 'Performed By',
      cell: (l) => (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
          <Shield size={14} style={{ color: '#0F766E' }} />
          <span style={{ fontFamily: 'monospace', color: '#0F766E', fontSize: '0.825rem', fontWeight: 600 }}>
            {l.performedBy}
          </span>
        </div>
      ),
    },
  ];

  return (
    <>
      {/* Module filter chips */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>Filter Module:</span>
        {modules.map((mod) => (
          <button
            key={mod}
            onClick={() => setSelectedModule(mod)}
            style={{
              padding: '0.3rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '0.785rem',
              fontWeight: 600,
              cursor: 'pointer',
              border: selectedModule === mod ? '1px solid #99F6E4' : '1px solid #E2E8F0',
              backgroundColor: selectedModule === mod ? '#F0FDFA' : '#FFFFFF',
              color: selectedModule === mod ? '#0F766E' : '#64748B',
              boxShadow: 'var(--shadow-sm, 0 1px 2px 0 rgba(0, 0, 0, 0.05))',
              transition: 'all 0.15s ease',
            }}
          >
            {mod}
          </button>
        ))}
      </div>

      <DataTable
        data={filtered}
        columns={columns}
        searchPlaceholder="Search audit events by message, entity or IP..."
        searchValue={search}
        onSearchChange={setSearch}
        emptyTitle="No audit records found"
        emptySubtitle="Any database creates, updates or deletes performed by the system will be tracked here in real-time."
      />
    </>
  );
}
