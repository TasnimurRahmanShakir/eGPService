'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Plus, 
  Receipt, 
  WalletCards, 
  Search, 
  Building2, 
  Smartphone, 
  CreditCard, 
  ArrowRight, 
  Printer, 
  UserCheck, 
  Calendar,
  DollarSign,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { Button, Badge, DataTable, MoneyDisplay, type Column, Select } from '@egp/ui';
import type { CashCollectionDto, CashCollectionSummaryDto, ClientDto } from '@egp/api-client';
import { CollectCashModal } from '@/components/cash-collection/CollectCashModal';
import { CashReceiptModal } from '@/components/cash-collection/CashReceiptModal';
import { fetchCashCollectionsAction, fetchCashCollectionSummaryAction } from '@/app/actions/cashCollectionActions';

interface CashCollectionClientViewProps {
  initialCollections: CashCollectionDto[];
  initialSummary: CashCollectionSummaryDto;
  clients: ClientDto[];
}

const PAYMENT_METHODS = [
  'All',
  'Cash',
  'bKash',
  'Nagad',
  'Rocket',
  'Bank Transfer',
  'Cheque',
  'Others',
];

export function CashCollectionClientView({
  initialCollections,
  initialSummary,
  clients,
}: CashCollectionClientViewProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [collections, setCollections] = useState<CashCollectionDto[]>(initialCollections);
  const [summary, setSummary] = useState<CashCollectionSummaryDto>(initialSummary);

  const [search, setSearch] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('All');
  const [isCollectOpen, setIsCollectOpen] = useState(false);
  const [receiptCollection, setReceiptCollection] = useState<CashCollectionDto | null>(null);

  const refreshData = async () => {
    startTransition(async () => {
      const [newCollections, newSummary] = await Promise.all([
        fetchCashCollectionsAction(),
        fetchCashCollectionSummaryAction(),
      ]);
      setCollections(newCollections);
      setSummary(newSummary);
      router.refresh();
    });
  };

  const filteredCollections = collections.filter((c) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !search ||
      c.voucherNo.toLowerCase().includes(q) ||
      c.clientName.toLowerCase().includes(q) ||
      (c.clientPhone && c.clientPhone.toLowerCase().includes(q)) ||
      (c.trxId && c.trxId.toLowerCase().includes(q)) ||
      (c.bankName && c.bankName.toLowerCase().includes(q)) ||
      (c.chequeNo && c.chequeNo.toLowerCase().includes(q)) ||
      c.collectedByName.toLowerCase().includes(q);

    const matchesMethod =
      selectedMethod === 'All' ||
      c.paymentMethod.toLowerCase() === selectedMethod.toLowerCase();

    return matchesSearch && matchesMethod;
  });

  const getMethodBadgeVariant = (method: string): 'emerald' | 'amber' | 'blue' | 'slate' => {
    switch (method.toLowerCase()) {
      case 'cash':
        return 'emerald';
      case 'bkash':
      case 'nagad':
      case 'rocket':
        return 'amber';
      case 'bank transfer':
      case 'cheque':
        return 'blue';
      default:
        return 'slate';
    }
  };

  const columns: Column<CashCollectionDto>[] = [
    {
      header: 'Voucher No',
      accessorKey: 'voucherNo',
      width: '130px',
      cell: (c) => (
        <button
          onClick={() => setReceiptCollection(c)}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            textAlign: 'left',
          }}
          title="Click to view & print money receipt"
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <Receipt size={14} style={{ color: '#4F46E5' }} />
            <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#4F46E5', fontSize: '0.8125rem', textDecoration: 'underline' }}>
              {c.voucherNo}
            </span>
          </div>
        </button>
      ),
    },
    {
      header: 'Collection Date',
      accessorKey: 'collectionDateUtc',
      width: '120px',
      cell: (c) => {
        const d = new Date(c.collectionDateUtc);
        return (
          <span style={{ fontSize: '0.8125rem', color: '#475569' }}>
            {d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
          </span>
        );
      },
    },
    {
      header: 'Client / Firm Name',
      accessorKey: 'clientName',
      cell: (c) => (
        <div>
          <div style={{ fontWeight: 600, color: '#1F2937', fontSize: '0.875rem' }}>{c.clientName}</div>
          {c.clientPhone && (
            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{c.clientPhone}</div>
          )}
        </div>
      ),
    },
    {
      header: 'Payment Method & Details',
      cell: (c) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Badge variant={getMethodBadgeVariant(c.paymentMethod)} size="sm">
              {c.paymentMethod}
            </Badge>
          </div>
          {c.trxId && (
            <span style={{ fontSize: '0.72rem', color: '#64748B', fontFamily: 'monospace' }}>
              Trx: {c.trxId} {c.senderPhone ? `(${c.senderPhone})` : ''}
            </span>
          )}
          {c.bankName && (
            <span style={{ fontSize: '0.72rem', color: '#64748B' }}>
              {c.bankName} {c.branchName ? `(${c.branchName})` : ''}
            </span>
          )}
          {c.chequeNo && (
            <span style={{ fontSize: '0.72rem', color: '#64748B' }}>
              Cheque #{c.chequeNo}
            </span>
          )}
        </div>
      ),
    },
    {
      header: 'Amount Collected',
      align: 'right',
      cell: (c) => (
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontWeight: 700, color: '#047857', fontSize: '0.9375rem' }}>
            ৳{c.amountCollected.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </span>
        </div>
      ),
    },
    {
      header: 'Discount / ছাড়',
      align: 'right',
      cell: (c) => (
        c.discountAmount > 0 ? (
          <span style={{ fontWeight: 600, color: '#D97706', fontSize: '0.8125rem' }}>
            ৳{c.discountAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </span>
        ) : (
          <span style={{ color: '#94A3B8' }}>—</span>
        )
      ),
    },
    {
      header: 'Due Adjustment',
      align: 'right',
      cell: (c) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px', fontSize: '0.8125rem' }}>
          <span style={{ color: '#BE123C', fontWeight: 500 }}>
            ৳{c.totalDueBefore.toLocaleString('en-IN', { minimumFractionDigits: 0 })}
          </span>
          <ArrowRight size={12} style={{ color: '#94A3B8' }} />
          <span style={{ color: c.totalDueAfter <= 0 ? '#047857' : '#BE123C', fontWeight: 700 }}>
            ৳{c.totalDueAfter.toLocaleString('en-IN', { minimumFractionDigits: 0 })}
          </span>
        </div>
      ),
    },
    {
      header: 'Collected By',
      cell: (c) => (
        <div style={{ fontSize: '0.8125rem' }}>
          <div style={{ fontWeight: 600, color: '#334155' }}>{c.collectedByName || 'System'}</div>
          <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>ID: {c.collectedById}</span>
        </div>
      ),
    },
    {
      header: 'Receipt',
      align: 'right',
      cell: (c) => (
        <Button
          size="sm"
          variant="outline"
          icon={<Receipt size={14} />}
          onClick={() => setReceiptCollection(c)}
          title="Print or view money receipt"
        >
          Receipt
        </Button>
      ),
    },
  ];

  return (
    <>
      {/* Metric / KPI Cards */}
      <div className="kpi-cards-grid" style={{ marginBottom: '1.5rem' }}>
        {/* Today's Collections */}
        <div style={{ padding: '1.25rem', backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.875rem', color: '#64748B', fontWeight: 500 }}>Today&apos;s Collection</span>
            <span style={{ padding: '4px', backgroundColor: '#ECFDF5', borderRadius: '6px', color: '#047857' }}>
              <TrendingUp size={18} />
            </span>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#047857', marginTop: '0.35rem', fontVariantNumeric: 'tabular-nums' }}>
            ৳{summary.totalCollectedToday.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.25rem' }}>
            Cash &amp; bank receipts collected today
          </div>
        </div>

        {/* This Month's Collections */}
        <div style={{ padding: '1.25rem', backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.875rem', color: '#64748B', fontWeight: 500 }}>This Month&apos;s Collection</span>
            <span style={{ padding: '4px', backgroundColor: '#EEF2FF', borderRadius: '6px', color: '#4F46E5' }}>
              <Calendar size={18} />
            </span>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1E293B', marginTop: '0.35rem', fontVariantNumeric: 'tabular-nums' }}>
            ৳{summary.totalCollectedThisMonth.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.25rem' }}>
            Total recovery in current calendar month
          </div>
        </div>

        {/* All-Time Collection */}
        <div style={{ padding: '1.25rem', backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.875rem', color: '#64748B', fontWeight: 500 }}>All-Time Recoveries</span>
            <span style={{ padding: '4px', backgroundColor: '#F0FDF4', borderRadius: '6px', color: '#15803D' }}>
              <WalletCards size={18} />
            </span>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1E293B', marginTop: '0.35rem', fontVariantNumeric: 'tabular-nums' }}>
            ৳{summary.totalCollectedAllTime.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.25rem' }}>
            Across {summary.totalVouchersCount} generated money vouchers
          </div>
        </div>

        {/* Total Outstanding Market Due */}
        <div style={{ padding: '1.25rem', backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.875rem', color: '#64748B', fontWeight: 500 }}>Total Market Due</span>
            <span style={{ padding: '4px', backgroundColor: '#FFF1F2', borderRadius: '6px', color: '#BE123C' }}>
              <AlertTriangle size={18} />
            </span>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#BE123C', marginTop: '0.35rem', fontVariantNumeric: 'tabular-nums' }}>
            ৳{summary.totalMarketDue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#BE123C', marginTop: '0.25rem', fontWeight: 500 }}>
            Remaining uncollected client due
          </div>
        </div>
      </div>

      {/* Filter & Action Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {/* Method Filter Buttons */}
          <div style={{ display: 'flex', gap: '0.35rem', backgroundColor: '#F1F5F9', padding: '4px', borderRadius: '8px' }}>
            {PAYMENT_METHODS.map((method) => (
              <button
                key={method}
                onClick={() => setSelectedMethod(method)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '6px',
                  fontSize: '0.8125rem',
                  fontWeight: selectedMethod === method ? 600 : 500,
                  backgroundColor: selectedMethod === method ? '#FFFFFF' : 'transparent',
                  color: selectedMethod === method ? '#0F172A' : '#64748B',
                  border: 'none',
                  boxShadow: selectedMethod === method ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {method}
              </button>
            ))}
          </div>
        </div>

        <Button
          variant="primary"
          icon={<Plus size={16} />}
          onClick={() => setIsCollectOpen(true)}
          style={{ backgroundColor: '#047857' }}
        >
          Receive Cash Collection / অর্থ আদায়
        </Button>
      </div>

      {/* Main Collections Data Table */}
      <DataTable
        data={filteredCollections}
        columns={columns}
        searchPlaceholder="Search by voucher #, client, phone, TrxID, bank, officer..."
        searchValue={search}
        onSearchChange={setSearch}
        emptyTitle="No cash collection vouchers found"
        emptySubtitle="Click 'Receive Cash Collection' to record client due payments with money receipt generation."
      />

      {/* Receive Cash Modal */}
      <CollectCashModal
        isOpen={isCollectOpen}
        onClose={() => setIsCollectOpen(false)}
        clients={clients}
        onSuccess={() => {
          setIsCollectOpen(false);
          refreshData();
        }}
      />

      {/* Printable Money Receipt Modal */}
      <CashReceiptModal
        isOpen={!!receiptCollection}
        onClose={() => setReceiptCollection(null)}
        collection={receiptCollection}
      />
    </>
  );
}
