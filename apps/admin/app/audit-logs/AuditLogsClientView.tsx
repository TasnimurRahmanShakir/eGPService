'use client';

import React, { useState, useTransition } from 'react';
import { History, Shield, Monitor, Smartphone, Globe, Eye, ChevronLeft, ChevronRight, RefreshCw, Clock, Laptop } from 'lucide-react';
import { Badge, DataTable, type Column, Modal, Button } from '@egp/ui';
import type { AuditLogDto } from '@egp/api-client';
import { fetchAuditLogsAction } from '@/app/actions/auditActions';

const PAGE_SIZE = 15;

export function AuditLogsClientView({ initialLogs }: { initialLogs: AuditLogDto[] }) {
  const [logs, setLogs] = useState<AuditLogDto[]>(initialLogs);
  const [search, setSearch] = useState('');
  const [selectedModule, setSelectedModule] = useState<string>('ALL');
  const [selectedLog, setSelectedLog] = useState<AuditLogDto | null>(null);

  // Cursor pagination state
  // cursorStack stores the cursor used for each prior page
  const [cursorStack, setCursorStack] = useState<(number | undefined)[]>([]);
  const [currentCursor, setCurrentCursor] = useState<number | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  const modules = ['ALL', 'Tenders', 'Clients', 'TendererMappings', 'System'];

  const loadPage = (cursor: number | undefined, nextStack: (number | undefined)[], module = selectedModule) => {
    startTransition(async () => {
      const res = await fetchAuditLogsAction({
        moduleName: module === 'ALL' ? undefined : module,
        cursor,
        pageSize: PAGE_SIZE,
      });
      if (res.success) {
        setLogs(res.data);
        setCurrentCursor(cursor);
        setCursorStack(nextStack);
      }
    });
  };

  const handleNextPage = () => {
    if (logs.length === 0) return;
    const nextCursor = logs[logs.length - 1].id;
    loadPage(nextCursor, [...cursorStack, currentCursor]);
  };

  const handlePrevPage = () => {
    if (cursorStack.length === 0) return;
    const newStack = [...cursorStack];
    const prevCursor = newStack.pop();
    loadPage(prevCursor, newStack);
  };

  const handleModuleChange = (mod: string) => {
    setSelectedModule(mod);
    loadPage(undefined, [], mod);
  };

  const handleRefresh = () => {
    loadPage(currentCursor, cursorStack, selectedModule);
  };

  const hasNext = logs.length === PAGE_SIZE;
  const hasPrev = cursorStack.length > 0;
  const currentPageNumber = cursorStack.length + 1;

  const filtered = logs.filter((l) => {
    const term = search.toLowerCase();
    return (
      l.actionMessage.toLowerCase().includes(term) ||
      l.moduleName.toLowerCase().includes(term) ||
      l.performedBy.toLowerCase().includes(term) ||
      l.ipAddress.includes(term) ||
      l.recordId.toString().includes(term)
    );
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
      header: 'Timestamp',
      width: '160px',
      cell: (l) => {
        const d = new Date(l.timestampUtc);
        return (
          <div style={{ fontSize: '0.8rem', fontFamily: 'monospace' }}>
            <div style={{ color: 'var(--foreground, #1F2937)', fontWeight: 600 }}>{d.toLocaleDateString()}</div>
            <div style={{ color: 'var(--muted-foreground, #64748B)', fontSize: '0.75rem' }}>{d.toLocaleTimeString()}</div>
          </div>
        );
      },
    },
    {
      header: 'Module & Entity',
      width: '170px',
      cell: (l) => (
        <div>
          <span style={{ fontWeight: 600, color: 'var(--foreground, #1F2937)' }}>{l.moduleName}</span>
          <span
            style={{
              fontFamily: 'monospace',
              color: 'var(--primary, #0F766E)',
              fontSize: '0.75rem',
              marginLeft: '0.35rem',
              padding: '0.1rem 0.35rem',
              background: '#F0FDFA',
              borderRadius: '4px',
              border: '1px solid #CCFBF1',
            }}
          >
            #{l.recordId}
          </span>
        </div>
      ),
    },
    {
      header: 'Action',
      width: '100px',
      align: 'center',
      cell: (l) => (
        <Badge variant={getActionBadgeVariant(l.actionType)} size="sm">
          {l.actionType}
        </Badge>
      ),
    },
    {
      header: 'Summary',
      cell: (l) => (
        <div
          style={{
            color: 'var(--foreground, #334155)',
            fontSize: '0.84rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: '380px',
          }}
          title={l.actionMessage}
        >
          {l.actionMessage}
        </div>
      ),
    },
    {
      header: 'Performed By',
      width: '150px',
      cell: (l) => (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
          <Shield size={13} style={{ color: 'var(--primary, #0F766E)' }} />
          <span style={{ fontFamily: 'monospace', color: 'var(--primary, #0F766E)', fontSize: '0.8rem', fontWeight: 600 }}>
            {l.performedBy}
          </span>
        </div>
      ),
    },
    {
      header: 'Details',
      width: '100px',
      align: 'center',
      cell: (l) => (
        <button
          onClick={() => setSelectedLog(l)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem',
            padding: '0.35rem 0.65rem',
            borderRadius: '6px',
            fontSize: '0.785rem',
            fontWeight: 600,
            cursor: 'pointer',
            border: '1px solid var(--border, #E2E8F0)',
            backgroundColor: '#FFFFFF',
            color: 'var(--foreground, #1F2937)',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--primary, #0F766E)';
            e.currentTarget.style.color = 'var(--primary, #0F766E)';
            e.currentTarget.style.backgroundColor = '#F0FDFA';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#E2E8F0';
            e.currentTarget.style.color = '#1F2937';
            e.currentTarget.style.backgroundColor = '#FFFFFF';
          }}
        >
          <Eye size={13} />
          Inspect
        </button>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Top Filter and Actions Toolbar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        {/* Module filter chips */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--muted-foreground, #64748B)', fontWeight: 600, marginRight: '0.25rem' }}>
            Module:
          </span>
          {modules.map((mod) => (
            <button
              key={mod}
              onClick={() => handleModuleChange(mod)}
              style={{
                padding: '0.3rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.785rem',
                fontWeight: 600,
                cursor: 'pointer',
                border: selectedModule === mod ? '1px solid #99F6E4' : '1px solid #E2E8F0',
                backgroundColor: selectedModule === mod ? '#F0FDFA' : '#FFFFFF',
                color: selectedModule === mod ? '#0F766E' : '#64748B',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                transition: 'all 0.15s ease',
              }}
            >
              {mod}
            </button>
          ))}
        </div>

        {/* Refresh button */}
        <button
          onClick={handleRefresh}
          disabled={isPending}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.35rem 0.75rem',
            borderRadius: '6px',
            fontSize: '0.8rem',
            fontWeight: 500,
            cursor: isPending ? 'not-allowed' : 'pointer',
            border: '1px solid #E2E8F0',
            backgroundColor: '#FFFFFF',
            color: '#475569',
          }}
        >
          <RefreshCw size={13} className={isPending ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Main Table */}
      <DataTable
        data={filtered}
        columns={columns}
        searchPlaceholder="Filter current batch by message, record ID, or user..."
        searchValue={search}
        onSearchChange={setSearch}
        isLoading={isPending}
        emptyTitle="No audit records found"
        emptySubtitle="No database events found matching this filter or cursor position."
      />

      {/* Cursor Pagination Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.75rem 1.25rem',
          backgroundColor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '8px',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.825rem', color: '#64748B' }}>
          <span>
            Batch Page <strong style={{ color: '#1F2937' }}>{currentPageNumber}</strong>
          </span>
          <span style={{ color: '#CBD5E1' }}>•</span>
          <span>
            Showing <strong style={{ color: '#1F2937' }}>{logs.length}</strong> records (Limit {PAGE_SIZE})
          </span>
          {currentCursor && (
            <>
              <span style={{ color: '#CBD5E1' }}>•</span>
              <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#0F766E', backgroundColor: '#F0FDFA', padding: '0.15rem 0.4rem', borderRadius: '4px' }}>
                Cursor &lt; #{currentCursor}
              </span>
            </>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={handlePrevPage}
            disabled={!hasPrev || isPending}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.45rem 0.85rem',
              borderRadius: '6px',
              fontSize: '0.815rem',
              fontWeight: 600,
              cursor: !hasPrev || isPending ? 'not-allowed' : 'pointer',
              border: '1px solid #CBD5E1',
              backgroundColor: !hasPrev || isPending ? '#F8FAFC' : '#FFFFFF',
              color: !hasPrev || isPending ? '#94A3B8' : '#1F2937',
              transition: 'all 0.15s ease',
            }}
          >
            <ChevronLeft size={15} />
            Previous
          </button>

          <button
            onClick={handleNextPage}
            disabled={!hasNext || isPending}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.45rem 0.85rem',
              borderRadius: '6px',
              fontSize: '0.815rem',
              fontWeight: 600,
              cursor: !hasNext || isPending ? 'not-allowed' : 'pointer',
              border: '1px solid #CBD5E1',
              backgroundColor: !hasNext || isPending ? '#F8FAFC' : '#FFFFFF',
              color: !hasNext || isPending ? '#94A3B8' : '#1F2937',
              transition: 'all 0.15s ease',
            }}
          >
            Next
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      {/* Inspect Modal */}
      {selectedLog && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedLog(null)}
          title={`Audit Log Event #${selectedLog.id}`}
          subtitle={`${selectedLog.moduleName} • Action: ${selectedLog.actionType}`}
          maxWidth="640px"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Header Highlights */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '0.75rem',
                backgroundColor: '#F8FAFC',
                padding: '0.85rem',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
              }}
            >
              <div>
                <span style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 600 }}>Action</span>
                <div style={{ marginTop: '0.2rem' }}>
                  <Badge variant={getActionBadgeVariant(selectedLog.actionType)} size="sm">
                    {selectedLog.actionType}
                  </Badge>
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 600 }}>Record ID</span>
                <div style={{ marginTop: '0.2rem', fontFamily: 'monospace', fontWeight: 700, color: '#0F766E' }}>
                  #{selectedLog.recordId}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 600 }}>Actor</span>
                <div style={{ marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Shield size={13} style={{ color: '#0F766E' }} />
                  <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', fontWeight: 600, color: '#1F2937' }}>
                    {selectedLog.performedBy}
                  </span>
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 600 }}>Time (UTC)</span>
                <div style={{ marginTop: '0.2rem', fontSize: '0.785rem', fontFamily: 'monospace', color: '#475569' }}>
                  {new Date(selectedLog.timestampUtc).toLocaleString()}
                </div>
              </div>
            </div>

            {/* Action Message */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.4rem' }}>
                Event Description
              </label>
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '6px',
                  padding: '0.85rem 1rem',
                  fontSize: '0.875rem',
                  color: '#1F2937',
                  lineHeight: 1.5,
                  wordBreak: 'break-word',
                }}
              >
                {selectedLog.actionMessage}
              </div>
            </div>

            {/* Client Context Information */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.4rem' }}>
                Network & Client Environment
              </label>
              <div
                style={{
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '6px',
                  padding: '0.85rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  fontSize: '0.825rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#64748B', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Globe size={13} /> Client IP
                  </span>
                  <span style={{ fontFamily: 'monospace', fontWeight: 600, color: '#1F2937' }}>
                    {selectedLog.ipAddress || 'Unknown'}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#64748B', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Laptop size={13} /> Operating System
                  </span>
                  <span style={{ color: '#1F2937', fontWeight: 500 }}>
                    {selectedLog.osInfo || 'Unknown'}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#64748B', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Monitor size={13} /> Device
                  </span>
                  <span style={{ color: '#1F2937', fontWeight: 500 }}>
                    {selectedLog.deviceInfo || 'Unknown'}
                  </span>
                </div>

                {selectedLog.userAgent && (
                  <div style={{ marginTop: '0.25rem', borderTop: '1px solid #E2E8F0', paddingTop: '0.5rem' }}>
                    <span style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>
                      Raw User Agent
                    </span>
                    <pre
                      style={{
                        margin: 0,
                        padding: '0.5rem',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E2E8F0',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontFamily: 'monospace',
                        color: '#475569',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-all',
                        maxHeight: '80px',
                        overflowY: 'auto',
                      }}
                    >
                      {selectedLog.userAgent}
                    </pre>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <Button variant="secondary" onClick={() => setSelectedLog(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

