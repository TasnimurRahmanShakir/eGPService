'use client';

import React, { useState, useOptimistic } from 'react';
import { Plus, CreditCard, Filter, Check, Minus } from 'lucide-react';
import { Button, Badge, DataTable, MoneyDisplay, type Column } from '@egp/ui';
import type { TenderDto, ClientDto, TendererDto } from '@egp/api-client';
import { CreateTenderModal, RecordPaymentModal } from '../../components/tenders/TenderModals';

export function TendersClientView({
  initialTenders,
  clients,
  tenderers,
}: {
  initialTenders: TenderDto[];
  clients: ClientDto[];
  tenderers: TendererDto[];
}) {
  const [search, setSearch] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [paymentTender, setPaymentTender] = useState<TenderDto | null>(null);

  const [optimisticTenders, setOptimisticTenders] = useOptimistic(
    initialTenders,
    (state, update: { tenderId: number; amountPaid: number }) =>
      state.map((t) =>
        t.id === update.tenderId
          ? {
            ...t,
            totalPaid: t.totalPaid + update.amountPaid,
            dueAmount: Math.max(0, t.dueAmount - update.amountPaid),
          }
          : t
      )
  );

  const filtered = optimisticTenders.filter(
    (t) =>
      t.tenderId.toLowerCase().includes(search.toLowerCase()) ||
      t.clientName.toLowerCase().includes(search.toLowerCase()) ||
      t.department.toLowerCase().includes(search.toLowerCase()) ||
      t.appCode.toLowerCase().includes(search.toLowerCase())
  );

  const totalCharge = optimisticTenders.reduce((sum, t) => sum + t.chargeAmount, 0);
  const totalPaid = optimisticTenders.reduce((sum, t) => sum + t.totalPaid, 0);
  const totalDue = optimisticTenders.reduce((sum, t) => sum + t.dueAmount, 0);

  const renderStatus = (val: boolean | null | undefined) => {
    if (val === true) {
      return (
        <Badge variant="emerald" size="sm">
          OK
        </Badge>
      );
    }
    if (val === false) {
      return (
        <Badge variant="rose" size="sm">
          No
        </Badge>
      );
    }
    return (
      <span style={{ color: '#475569', fontSize: '0.8rem', fontWeight: 600 }}>NA</span>
    );
  };

  const columns: Column<TenderDto>[] = [
    {
      header: 'Client',
      accessorKey: 'clientName',
      cell: (t) => (
        <div>
          <span style={{ fontWeight: 700, color: '#38bdf8' }}>{t.clientName}</span>
          <div style={{ fontSize: '0.725rem', color: '#64748b' }}>Client ID #{t.clientId}</div>
        </div>
      ),
    },
    {
      header: 'Tender ID',
      accessorKey: 'tenderId',
      cell: (t) => (
        <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#f8fafc', fontSize: '0.925rem' }}>
          {t.tenderId}
        </span>
      ),
    },
    {
      header: 'Closing Date & Time',
      cell: (t) => {
        const d = new Date(t.closingDateTimeUtc);
        return (
          <div style={{ fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
            <div style={{ color: '#f8fafc' }}>{d.toLocaleDateString()}</div>
            <div style={{ color: '#94a3b8' }}>{d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          </div>
        );
      },
    },
    {
      header: 'Department',
      accessorKey: 'department',
      cell: (t) => <span style={{ color: '#cbd5e1', fontSize: '0.825rem' }}>{t.department}</span>,
    },
    {
      header: 'Submit',
      align: 'center',
      cell: (t) => renderStatus(t.submitStatus),
    },
    {
      header: 'Fill',
      align: 'center',
      cell: (t) => renderStatus(t.fillStatus),
    },
    {
      header: 'Map',
      align: 'center',
      cell: (t) => renderStatus(t.mapStatus),
    },
    {
      header: 'Rate',
      align: 'center',
      cell: (t) => renderStatus(t.rateStatus),
    },
    {
      header: 'Less %',
      align: 'center',
      cell: (t) =>
        t.lessPercentage !== null ? (
          <span style={{ fontFamily: 'monospace', fontWeight: 600, color: '#fbbf24' }}>
            {t.lessPercentage.toFixed(3)}%
          </span>
        ) : (
          <span style={{ color: '#475569' }}>NA</span>
        ),
    },
    {
      header: 'APP Code',
      accessorKey: 'appCode',
      cell: (t) => <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#94a3b8' }}>{t.appCode || '—'}</span>,
    },
    {
      header: 'Charge',
      align: 'right',
      cell: (t) => <MoneyDisplay amount={t.chargeAmount} size="sm" />,
    },
    {
      header: 'Paid',
      align: 'right',
      cell: (t) => <MoneyDisplay amount={t.totalPaid} type={t.totalPaid > 0 ? 'advance' : 'neutral'} size="sm" />,
    },
    {
      header: 'Due',
      align: 'right',
      cell: (t) => <MoneyDisplay amount={t.dueAmount} type={t.dueAmount > 0 ? 'due' : 'neutral'} size="sm" />,
    },
    {
      header: 'Actions',
      align: 'right',
      cell: (t) => (
        <Button
          size="sm"
          variant={t.dueAmount > 0 ? 'emerald' : 'secondary'}
          icon={<CreditCard size={14} />}
          onClick={() => setPaymentTender(t)}
        >
          {t.dueAmount > 0 ? 'Pay Due' : 'Add Payment'}
        </Button>
      ),
    },
  ];

  return (
    <>
      {/* Financial Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div style={{ padding: '1.25rem', backgroundColor: 'rgba(15, 23, 42, 0.7)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 500 }}>Total Tenders</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f8fafc', marginTop: '0.25rem' }}>
            {optimisticTenders.length}
          </div>
        </div>

        <div style={{ padding: '1.25rem', backgroundColor: 'rgba(15, 23, 42, 0.7)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 500 }}>Total Charge</span>
          <div style={{ marginTop: '0.25rem' }}>
            <MoneyDisplay amount={totalCharge} size="lg" />
          </div>
        </div>

        <div style={{ padding: '1.25rem', backgroundColor: 'rgba(15, 23, 42, 0.7)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 500 }}>Total Collected (Paid)</span>
          <div style={{ marginTop: '0.25rem' }}>
            <MoneyDisplay amount={totalPaid} type="advance" size="lg" />
          </div>
        </div>

        <div style={{ padding: '1.25rem', backgroundColor: 'rgba(15, 23, 42, 0.7)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 500 }}>Total Outstanding Due</span>
          <div style={{ marginTop: '0.25rem' }}>
            <MoneyDisplay amount={totalDue} type="due" size="lg" />
          </div>
        </div>
      </div>

      {/* DataTable */}
      <DataTable
        data={filtered}
        columns={columns}
        searchPlaceholder="Search tenders by ID, Client, Department, APP..."
        searchValue={search}
        onSearchChange={setSearch}
        headerActions={
          <Button variant="primary" icon={<Plus size={16} />} onClick={() => setIsCreateOpen(true)}>
            New Tender
          </Button>
        }
        emptyTitle="No tenders found"
        emptySubtitle="Create a new tender entry to match your procurement spreadsheet records."
      />

      {/* Modals */}
      <CreateTenderModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        clients={clients}
        tenderers={tenderers}
      />

      {paymentTender && (
        <RecordPaymentModal
          isOpen={true}
          onClose={() => setPaymentTender(null)}
          tenderId={paymentTender.id}
          tenderRef={paymentTender.tenderId}
          dueAmount={paymentTender.dueAmount}
          onOptimisticPayment={(tenderId, amountPaid) => {
            setOptimisticTenders({ tenderId, amountPaid });
          }}
        />
      )}
    </>
  );
}
