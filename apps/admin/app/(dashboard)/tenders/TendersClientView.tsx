'use client';

import React, { useState, useOptimistic, useMemo, useTransition } from 'react';
import { Plus, Search, X, Calendar as CalendarIcon, RefreshCw } from 'lucide-react';
import { Button, MoneyDisplay } from '@egp/ui';
import type { TenderDto, ClientDto, TendererDto, TendererMappingDto, TenderClosingIndexDto } from '@egp/api-client';
import { toast } from 'sonner';
import {
  CreateTenderModal,
  EditTenderModal,
  AddClientToTenderModal,
  AddTendererModal,
  EditTendererModal,
} from '@/components/tenders/TenderModals';
import { TenderExcelMatrix } from '@/components/tenders/TenderExcelMatrix';
import { TenderDateDictionaryList } from '@/components/tenders/TenderDateDictionaryList';
import {
  removeTendererAction,
  removeClientFromTenderAction,
  fetchTendersByDateAction,
  fetchTenderClosingIndexAction,
} from '@/app/actions/tenderActions';

export function TendersClientView({
  initialClosingIndex = [],
  initialTenders = [],
  defaultDate,
  clients,
  tenderers,
}: {
  initialClosingIndex?: TenderClosingIndexDto[];
  initialTenders: TenderDto[];
  defaultDate?: string;
  clients?: ClientDto[];
  tenderers?: TendererDto[];
}) {
  const [closingIndex, setClosingIndex] = useState<TenderClosingIndexDto[]>(initialClosingIndex);
  const [selectedDate, setSelectedDate] = useState<string | null>(defaultDate ?? null);
  const [tenders, setTenders] = useState<TenderDto[]>(initialTenders);

  const [search, setSearch] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingTender, setEditingTender] = useState<TenderDto | null>(null);
  const [addingClientFor, setAddingClientFor] = useState<TenderDto | null>(null);
  const [addingTendererFor, setAddingTendererFor] = useState<{
    tender: TenderDto;
    clientId?: number;
  } | null>(null);
  const [editingTenderer, setEditingTenderer] = useState<{
    tenderId: number;
    mapping: TendererMappingDto;
  } | null>(null);

  const [isPending, startTransition] = useTransition();

  // Optimistic updates for instant UI response on payments
  const [optimisticTenders, setOptimisticTenders] = useOptimistic(
    tenders,
    (state, update: { tenderId: number; clientId?: number; tendererId?: number; amountPaid: number }) =>
      state.map((t) => {
        if (t.id !== update.tenderId) return t;

        const updatedClients = (t.clients || []).map((c) => {
          if (update.clientId && c.clientId === update.clientId) {
            const updatedClientTenderers = (c.tenderers || []).map((m) => {
              if (update.tendererId && m.tendererId === update.tendererId) {
                return {
                  ...m,
                  totalPaid: m.totalPaid + update.amountPaid,
                  dueAmount: Math.max(0, m.dueAmount - update.amountPaid),
                };
              }
              return m;
            });

            return {
              ...c,
              totalPaidAmount: c.totalPaidAmount + update.amountPaid,
              totalDueAmount: Math.max(0, c.totalDueAmount - update.amountPaid),
              tenderers: updatedClientTenderers,
            };
          }
          return c;
        });

        const updatedTenderers = (t.tenderers || []).map((m) => {
          if (update.tendererId && m.tendererId === update.tendererId) {
            return {
              ...m,
              totalPaid: m.totalPaid + update.amountPaid,
              dueAmount: Math.max(0, m.dueAmount - update.amountPaid),
            };
          }
          return m;
        });

        return {
          ...t,
          totalPaid: t.totalPaid + update.amountPaid,
          dueAmount: Math.max(0, t.dueAmount - update.amountPaid),
          clients: updatedClients,
          tenderers: updatedTenderers,
        };
      })
  );

  // On-demand fetch when user clicks a date in the dictionary index
  const handleSelectDate = (date: string | null) => {
    setSelectedDate(date);
    startTransition(async () => {
      const data = await fetchTendersByDateAction(date ?? undefined);
      setTenders(data);
    });
  };

  // Refresh both current list and the 30-day index on modifications
  const refreshData = () => {
    startTransition(async () => {
      const [newIndex, newTenders] = await Promise.all([
        fetchTenderClosingIndexAction(30),
        fetchTendersByDateAction(selectedDate ?? undefined),
      ]);
      setClosingIndex(newIndex);
      setTenders(newTenders);
    });
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return optimisticTenders;

    return optimisticTenders.filter((t) => {
      const matchTender =
        (t.tenderId || '').toLowerCase().includes(q) ||
        (t.clientName || '').toLowerCase().includes(q) ||
        (t.department || '').toLowerCase().includes(q) ||
        (t.appCode || '').toLowerCase().includes(q);

      const matchClients = (t.clients || []).some((c) =>
        (c.clientName || '').toLowerCase().includes(q)
      );

      const matchTenderer = (t.tenderers || []).some(
        (m) =>
          (m.tendererName || '').toLowerCase().includes(q) ||
          (m.username || '').toLowerCase().includes(q)
      );

      return matchTender || matchClients || matchTenderer;
    });
  }, [optimisticTenders, search]);

  const totalCharge = optimisticTenders.reduce((sum, t) => sum + t.chargeAmount, 0);
  const totalPaid = optimisticTenders.reduce((sum, t) => sum + t.totalPaid, 0);
  const totalDue = optimisticTenders.reduce((sum, t) => sum + t.dueAmount, 0);

  const formattedSelectedDate = useMemo(() => {
    if (!selectedDate) return 'All Active Tenders';
    const dateObj = new Date(selectedDate + 'T00:00:00Z');
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    });
  }, [selectedDate]);


  const handleRemoveClient = (tenderId: number, clientId: number, clientName: string) => {
    const targetTender = optimisticTenders.find((t) => t.id === tenderId);
    const client = targetTender?.clients?.find((c) => c.clientId === clientId);
    if (client && client.totalPaidAmount > 0) {
      toast.error(`Cannot remove client "${clientName}" because payments (৳${client.totalPaidAmount.toLocaleString()}) have already been recorded.`);
      return;
    }

    if (
      !window.confirm(
        `Are you sure you want to remove client "${clientName}" from this tender? Any uncollected license charges will be reversed from the client ledger.`
      )
    ) {
      return;
    }

    startTransition(async () => {
      const res = await removeClientFromTenderAction(tenderId, clientId);
      if (res.success) {
        toast.success(res.message || 'Client removed successfully.');
        refreshData();
      } else {
        toast.error(res.message || 'Failed to remove client.');
      }
    });
  };

  const handleRemoveTenderer = (
    tenderId: number,
    tendererId: number,
    tendererName: string,
    clientId?: number
  ) => {
    const targetTender = optimisticTenders.find((t) => t.id === tenderId);
    const mapping = targetTender?.tenderers?.find((m) => m.tendererId === tendererId);
    if (mapping && (mapping.totalPaid > 0 || mapping.chargeAmount !== mapping.dueAmount)) {
      toast.error(`Cannot remove license "${tendererName}" because payments (৳${mapping.totalPaid.toLocaleString()}) have already been recorded.`);
      return;
    }

    if (
      !window.confirm(
        `Are you sure you want to remove license "${tendererName}" from this tender? Any uncollected charges will be refunded to the client.`
      )
    ) {
      return;
    }

    startTransition(async () => {
      const res = await removeTendererAction(tenderId, tendererId, clientId);
      if (res.success) {
        toast.success(res.message || 'License removed successfully.');
        refreshData();
      } else {
        toast.error(res.message || 'Failed to remove license.');
      }
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: '1.25rem',
        width: '100%',
        alignItems: 'flex-start',
      }}
    >
      {/* Master Left Sidebar: 30-Day Chronological Date Dictionary List */}
      <TenderDateDictionaryList
        indexItems={closingIndex}
        selectedDate={selectedDate}
        onSelectDate={handleSelectDate}
        isLoading={isPending}
      />

      {/* Detail Right Section: Content & SpreadSheet Matrix */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          flex: 1,
          minWidth: 0,
        }}
      >
        {/* Selected Date Summary & Header Bar */}
        <div
          style={{
            padding: '1rem 1.25rem',
            backgroundColor: 'var(--surface, #FFFFFF)',
            border: '1px solid var(--border, #E2E8F0)',
            borderRadius: 'var(--radius-card, 10px)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <CalendarIcon size={20} style={{ color: 'var(--primary, #4F46E5)' }} />
              <h2
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: '#0F172A',
                  letterSpacing: '-0.02em',
                  margin: 0,
                }}
              >
                {formattedSelectedDate}
              </h2>

              {selectedDate && (
                <button
                  type="button"
                  onClick={() => handleSelectDate(null)}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: '#4F46E5',
                    backgroundColor: '#EEF2FF',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    border: '1px solid #C7D2FE',
                    cursor: 'pointer',
                  }}
                >
                  View All Dates
                </button>
              )}
            </div>

            <div style={{ fontSize: '0.8125rem', color: '#64748B' }}>
              {isPending ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <RefreshCw size={13} style={{ animation: 'spin 1s linear infinite' }} />
                  Loading tenders for this date...
                </span>
              ) : (
                <span>
                  Showing <strong>{filtered.length}</strong> {filtered.length === 1 ? 'tender' : 'tenders'} closing on this date
                </span>
              )}
            </div>
          </div>

          <Button
            variant="primary"
            icon={<Plus size={16} />}
            onClick={() => setIsCreateOpen(true)}
            className="tenders-control-btn"
          >
            New Tender
          </Button>
        </div>

        {/* Financial Metric Cards for the Selected Scope */}
        <div className="kpi-cards-grid">
          <div
            style={{
              padding: '1.25rem',
              backgroundColor: 'var(--surface, #FFFFFF)',
              borderRadius: 'var(--radius-card, 10px)',
              border: '1px solid var(--border, #E2E8F0)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <span style={{ fontSize: '0.875rem', color: 'var(--muted-foreground, #64748B)', fontWeight: 500 }}>
              Tenders in View
            </span>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--foreground, #1F2937)', marginTop: '0.25rem', fontVariantNumeric: 'tabular-nums' }}>
              {optimisticTenders.length}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground, #64748B)', marginTop: '0.25rem' }}>
              {selectedDate ? 'Closing on selected date' : 'All registered tenders'}
            </div>
          </div>

          <div
            style={{
              padding: '1.25rem',
              backgroundColor: 'var(--surface, #FFFFFF)',
              borderRadius: 'var(--radius-card, 10px)',
              border: '1px solid var(--border, #E2E8F0)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <span style={{ fontSize: '0.875rem', color: 'var(--muted-foreground, #64748B)', fontWeight: 500 }}>Total Charge</span>
            <div style={{ marginTop: '0.25rem' }}>
              <MoneyDisplay amount={totalCharge} size="lg" />
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground, #64748B)', marginTop: '0.25rem' }}>
              Total mapped charges
            </div>
          </div>

          <div
            style={{
              padding: '1.25rem',
              backgroundColor: 'var(--surface, #FFFFFF)',
              borderRadius: 'var(--radius-card, 10px)',
              border: '1px solid var(--border, #E2E8F0)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <span style={{ fontSize: '0.875rem', color: 'var(--muted-foreground, #64748B)', fontWeight: 500 }}>Total Collected</span>
            <div style={{ marginTop: '0.25rem' }}>
              <MoneyDisplay amount={totalPaid} type="advance" size="lg" />
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--success, #047857)', marginTop: '0.25rem', fontWeight: 500 }}>
              Confirmed payments
            </div>
          </div>

          <div
            style={{
              padding: '1.25rem',
              backgroundColor: 'var(--surface, #FFFFFF)',
              borderRadius: 'var(--radius-card, 10px)',
              border: '1px solid var(--border, #E2E8F0)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <span style={{ fontSize: '0.875rem', color: 'var(--muted-foreground, #64748B)', fontWeight: 500 }}>Outstanding Due</span>
            <div style={{ marginTop: '0.25rem' }}>
              <MoneyDisplay amount={totalDue} type="due" size="lg" />
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--danger, #BE123C)', marginTop: '0.25rem', fontWeight: 500 }}>
              Receivable balance
            </div>
          </div>
        </div>

        {/* Search Control Bar */}
        <div className="tenders-control-bar">
          <div className="tenders-search-container">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search tenders by Ref ID, Client name, Department, or License..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="search-clear-btn"
                title="Clear search"
                aria-label="Clear search"
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        <div className="mobile-scroll-hint">
          <span>⇄ Swipe horizontally to inspect all spreadsheet matrix columns</span>
        </div>

        {/* Table View or Smooth Loading Skeleton */}
        {isPending ? (
          <div
            style={{
              padding: '4rem 2rem',
              textAlign: 'center',
              backgroundColor: '#FFFFFF',
              borderRadius: '10px',
              border: '1px solid #E2E8F0',
              boxShadow: 'var(--shadow-sm)',
              color: '#64748B',
            }}
          >
            <div
              style={{
                display: 'inline-block',
                width: '32px',
                height: '32px',
                border: '3px solid #E2E8F0',
                borderTopColor: '#4F46E5',
                borderRadius: '50%',
                animation: 'spin 0.7s linear infinite',
              }}
            />
            <div style={{ marginTop: '1rem', fontSize: '0.9375rem', fontWeight: 600, color: '#1E293B' }}>
              Loading tenders for {formattedSelectedDate}...
            </div>
            <div style={{ fontSize: '0.8125rem', color: '#94A3B8', marginTop: '4px' }}>
              Fetching on-demand data from server with zero pre-fetch overhead.
            </div>
          </div>
        ) : (
          <TenderExcelMatrix
            tenders={filtered}
            onEditTender={(t) => setEditingTender(t)}
            onAddClient={(t) => setAddingClientFor(t)}
            onRemoveClient={handleRemoveClient}
            onAddTenderer={(t, clientId) => setAddingTendererFor({ tender: t, clientId })}
            onEditTenderer={(tenderId, mapping) => setEditingTenderer({ tenderId, mapping })}
            onRemoveTenderer={handleRemoveTenderer}
          />
        )}

        {/* Modals */}
        <CreateTenderModal
          isOpen={isCreateOpen}
          onClose={() => {
            setIsCreateOpen(false);
            refreshData();
          }}
        />

        <EditTenderModal
          isOpen={!!editingTender}
          onClose={() => {
            setEditingTender(null);
            refreshData();
          }}
          tender={editingTender}
        />

        <AddClientToTenderModal
          isOpen={!!addingClientFor}
          onClose={() => {
            setAddingClientFor(null);
            refreshData();
          }}
          tender={addingClientFor}
        />

        <AddTendererModal
          isOpen={!!addingTendererFor}
          onClose={() => {
            setAddingTendererFor(null);
            refreshData();
          }}
          tender={addingTendererFor?.tender ?? null}
          defaultClientId={addingTendererFor?.clientId}
        />

        {editingTenderer && (
          <EditTendererModal
            isOpen={true}
            onClose={() => {
              setEditingTenderer(null);
              refreshData();
            }}
            tenderId={editingTenderer.tenderId}
            mapping={editingTenderer.mapping}
          />
        )}

      </div>
    </div>
  );
}
