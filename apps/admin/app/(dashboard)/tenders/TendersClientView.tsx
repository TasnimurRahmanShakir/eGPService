'use client';

import React, { useState, useOptimistic, useMemo, useTransition } from 'react';
import { Plus, Search } from 'lucide-react';
import { Button, MoneyDisplay } from '@egp/ui';
import type { TenderDto, ClientDto, TendererDto, TendererMappingDto } from '@egp/api-client';
import { toast } from 'sonner';
import {
  CreateTenderModal,
  EditTenderModal,
  AddTendererModal,
  EditTendererModal,
  RecordPaymentModal,
} from '@/components/tenders/TenderModals';
import { TenderExcelMatrix } from '@/components/tenders/TenderExcelMatrix';
import { removeTendererAction } from '@/app/actions/tenderActions';

export function TendersClientView({
  initialTenders,
  clients,
  tenderers,
}: {
  initialTenders: TenderDto[];
  clients?: ClientDto[];
  tenderers?: TendererDto[];
}) {
  const [search, setSearch] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingTender, setEditingTender] = useState<TenderDto | null>(null);
  const [addingTendererFor, setAddingTendererFor] = useState<TenderDto | null>(null);
  const [editingTenderer, setEditingTenderer] = useState<{
    tenderId: number;
    mapping: TendererMappingDto;
  } | null>(null);
  const [paymentData, setPaymentData] = useState<{
    tender: TenderDto;
    tendererId?: number;
    tendererName?: string;
    dueAmount: number;
  } | null>(null);

  const [, startTransition] = useTransition();

  const [optimisticTenders] = useOptimistic(
    initialTenders,
    (state, update: { tenderId: number; tendererId?: number; amountPaid: number }) =>
      state.map((t) => {
        if (t.id !== update.tenderId) return t;

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
          tenderers: updatedTenderers,
        };
      })
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return optimisticTenders;

    return optimisticTenders.filter((t) => {
      const matchTender =
        (t.tenderId || '').toLowerCase().includes(q) ||
        (t.clientName || '').toLowerCase().includes(q) ||
        (t.department || '').toLowerCase().includes(q) ||
        (t.appCode || '').toLowerCase().includes(q);

      const matchTenderer = (t.tenderers || []).some(
        (m) =>
          (m.tendererName || '').toLowerCase().includes(q) ||
          (m.username || '').toLowerCase().includes(q)
      );

      return matchTender || matchTenderer;
    });
  }, [optimisticTenders, search]);

  const totalCharge = optimisticTenders.reduce((sum, t) => sum + t.chargeAmount, 0);
  const totalPaid = optimisticTenders.reduce((sum, t) => sum + t.totalPaid, 0);
  const totalDue = optimisticTenders.reduce((sum, t) => sum + t.dueAmount, 0);

  const handleOpenPayment = (tender: TenderDto, tendererId?: number, specificDue?: number, tendererName?: string) => {
    setPaymentData({
      tender,
      tendererId,
      tendererName,
      dueAmount: specificDue !== undefined ? specificDue : tender.dueAmount,
    });
  };

  const handleRemoveTenderer = (tenderId: number, tendererId: number, tendererName: string) => {
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
      const res = await removeTendererAction(tenderId, tendererId);
      if (res.success) {
        toast.success(res.message || 'License removed successfully.');
      } else {
        toast.error(res.message || 'Failed to remove license.');
      }
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Financial Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div
          style={{
            padding: '1.25rem',
            backgroundColor: 'var(--surface, #FFFFFF)',
            borderRadius: 'var(--radius-card, 10px)',
            border: '1px solid var(--border, #E2E8F0)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <span style={{ fontSize: '0.875rem', color: 'var(--muted-foreground, #64748B)', fontWeight: 500 }}>Total Tenders</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--foreground, #1F2937)', marginTop: '0.25rem', fontVariantNumeric: 'tabular-nums' }}>
            {optimisticTenders.length}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground, #64748B)', marginTop: '0.25rem' }}>
            Registered tenders
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
            Remaining amount
          </div>
        </div>
      </div>

      {/* Control bar: Search + Action */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div style={{ position: 'relative', minWidth: '320px', flex: '1', maxWidth: '480px' }}>
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '0.85rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--muted-foreground, #64748B)',
            }}
          />
          <input
            type="text"
            placeholder="Search tenders by ID, Client, License (KB, BA), Department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '0.65rem 0.85rem 0.65rem 2.4rem',
              backgroundColor: 'var(--input-bg, #FFFFFF)',
              border: '1px solid var(--input-border, #CBD5E1)',
              borderRadius: 'var(--radius-control, 8px)',
              color: 'var(--foreground, #1F2937)',
              fontSize: '0.875rem',
              outline: 'none',
            }}
            className="egp-input"
          />
        </div>

        <Button
          variant="primary"
          icon={<Plus size={16} />}
          onClick={() => setIsCreateOpen(true)}
        >
          New Tender
        </Button>
      </div>

      {/* Read-Only Excel Spreadsheet Matrix Table (Separated from form logic) */}
      <TenderExcelMatrix
        tenders={filtered}
        onRecordPayment={handleOpenPayment}
        onEditTender={(t) => setEditingTender(t)}
        onAddTenderer={(t) => setAddingTendererFor(t)}
        onEditTenderer={(tenderId, mapping) => setEditingTenderer({ tenderId, mapping })}
        onRemoveTenderer={handleRemoveTenderer}
      />

      {/* Modals */}
      <CreateTenderModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />

      <EditTenderModal
        isOpen={!!editingTender}
        onClose={() => setEditingTender(null)}
        tender={editingTender}
      />

      <AddTendererModal
        isOpen={!!addingTendererFor}
        onClose={() => setAddingTendererFor(null)}
        tender={addingTendererFor}
      />

      {editingTenderer && (
        <EditTendererModal
          isOpen={true}
          onClose={() => setEditingTenderer(null)}
          tenderId={editingTenderer.tenderId}
          mapping={editingTenderer.mapping}
        />
      )}

      {paymentData && (
        <RecordPaymentModal
          isOpen={true}
          onClose={() => setPaymentData(null)}
          tenderId={paymentData.tender.id}
          tenderRef={paymentData.tender.tenderId}
          tendererId={paymentData.tendererId}
          tendererName={paymentData.tendererName}
          dueAmount={paymentData.dueAmount}
        />
      )}
    </div>
  );
}
