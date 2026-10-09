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
} from '../../components/tenders/TenderModals';
import { TenderExcelMatrix } from '../../components/tenders/TenderExcelMatrix';
import { removeTendererAction } from '../actions/tenderActions';

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
            backgroundColor: 'rgba(15, 23, 42, 0.7)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 500 }}>Total Tenders</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f8fafc', marginTop: '0.25rem' }}>
            {optimisticTenders.length}
          </div>
        </div>

        <div
          style={{
            padding: '1.25rem',
            backgroundColor: 'rgba(15, 23, 42, 0.7)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 500 }}>Total Charge</span>
          <div style={{ marginTop: '0.25rem' }}>
            <MoneyDisplay amount={totalCharge} size="lg" />
          </div>
        </div>

        <div
          style={{
            padding: '1.25rem',
            backgroundColor: 'rgba(15, 23, 42, 0.7)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 500 }}>Total Collected (Paid)</span>
          <div style={{ marginTop: '0.25rem' }}>
            <MoneyDisplay amount={totalPaid} type="advance" size="lg" />
          </div>
        </div>

        <div
          style={{
            padding: '1.25rem',
            backgroundColor: 'rgba(15, 23, 42, 0.7)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 500 }}>Total Outstanding Due</span>
          <div style={{ marginTop: '0.25rem' }}>
            <MoneyDisplay amount={totalDue} type="due" size="lg" />
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
              color: '#64748b',
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
              backgroundColor: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              color: '#f8fafc',
              fontSize: '0.85rem',
              outline: 'none',
            }}
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
