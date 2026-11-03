'use client';

import React, { useState, useTransition, useMemo } from 'react';
import {
  FileText,
  Search,
  Filter,
  RefreshCw,
  Printer,
  Receipt,
  Building2,
  DollarSign,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Button, Badge, DataTable, MoneyDisplay, type Column } from '@egp/ui';
import { type InvoiceDto, type ClientDto, InvoiceStatus, InvoiceType } from '@egp/api-client';
import { formatLocalDate } from '@/lib/date-utils';
import { syncInvoicesAction } from '@/app/actions/invoiceActions';
import { InvoiceViewModal } from '@/components/invoices/InvoiceViewModal';
import { toast } from 'sonner';

interface InvoicesClientViewProps {
  initialInvoices: InvoiceDto[];
  clients: ClientDto[];
}

export function InvoicesClientView({ initialInvoices, clients }: InvoicesClientViewProps) {
  const [invoices, setInvoices] = useState<InvoiceDto[]>(initialInvoices);
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedClientId, setSelectedClientId] = useState<string>('ALL');
  const [activeInvoice, setActiveInvoice] = useState<InvoiceDto | null>(null);
  const [isSyncing, startSync] = useTransition();

  const handleSync = () => {
    startSync(async () => {
      const res = await syncInvoicesAction();
      if (res.success) {
        toast.success(res.message);
        window.location.reload();
      } else {
        toast.error(res.message);
      }
    });
  };

  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      // Type filter
      if (selectedType !== 'ALL' && inv.invoiceType !== selectedType) {
        return false;
      }
      // Status filter
      if (selectedStatus !== 'ALL' && inv.status !== selectedStatus) {
        return false;
      }
      // Client filter
      if (selectedClientId !== 'ALL' && inv.clientId.toString() !== selectedClientId) {
        return false;
      }
      // Search
      if (search.trim()) {
        const s = search.toLowerCase();
        const matchesNo = inv.invoiceNumber.toLowerCase().includes(s);
        const matchesClient = inv.clientName.toLowerCase().includes(s);
        const matchesTender = inv.tenderRefId ? inv.tenderRefId.toLowerCase().includes(s) : false;
        const matchesItem = inv.items.some((i) => i.description.toLowerCase().includes(s));
        return matchesNo || matchesClient || matchesTender || matchesItem;
      }
      return true;
    });
  }, [invoices, selectedType, selectedStatus, selectedClientId, search]);

  // Aggregate Metrics
  const totalInvoicedAmount = useMemo(() => {
    return filteredInvoices.reduce((sum, inv) => sum + (inv.totalAmount || 0), 0);
  }, [filteredInvoices]);

  const totalPaidAmount = useMemo(() => {
    return filteredInvoices.reduce((sum, inv) => sum + (inv.totalPaid || 0), 0);
  }, [filteredInvoices]);

  const totalDueAmount = useMemo(() => {
    return filteredInvoices.reduce((sum, inv) => sum + (inv.dueAmount || 0), 0);
  }, [filteredInvoices]);

  const getStatusBadge = (status: InvoiceStatus) => {
    switch (status) {
      case InvoiceStatus.Paid:
        return <Badge variant="emerald" size="sm">PAID</Badge>;
      case InvoiceStatus.PartiallyPaid:
        return <Badge variant="amber" size="sm">PARTIALLY PAID</Badge>;
      case InvoiceStatus.Cancelled:
        return <Badge variant="slate" size="sm">CANCELLED</Badge>;
      case InvoiceStatus.Unpaid:
      default:
        return <Badge variant="rose" size="sm">UNPAID</Badge>;
    }
  };

  const getTypeBadge = (type: InvoiceType) => {
    if (type === InvoiceType.OpeningBalance) {
      return (
        <span style={{ fontSize: '0.725rem', fontWeight: 600, padding: '2px 8px', borderRadius: '4px', backgroundColor: '#FEF3C7', color: '#92400E' }}>
          Opening Balance
        </span>
      );
    }
    return (
      <span style={{ fontSize: '0.725rem', fontWeight: 600, padding: '2px 8px', borderRadius: '4px', backgroundColor: '#EEF2FF', color: '#4338CA' }}>
        Tender
      </span>
    );
  };

  const columns: Column<InvoiceDto>[] = [
    {
      header: 'Invoice #',
      accessorKey: 'invoiceNumber',
      width: '180px',
      cell: (inv) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <button
            onClick={() => setActiveInvoice(inv)}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              fontFamily: 'monospace',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: '#0F766E',
              cursor: 'pointer',
              textAlign: 'left',
              textDecoration: 'underline',
              textUnderlineOffset: '2px'
            }}
          >
            {inv.invoiceNumber}
          </button>
          <span style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '2px' }}>
            {formatLocalDate(inv.invoiceDateUtc)}
          </span>
        </div>
      ),
    },
    {
      header: 'Client / Firm',
      accessorKey: 'clientName',
      cell: (inv) => (
        <div>
          <div style={{ fontWeight: 600, color: '#1F2937' }}>{inv.clientName}</div>
          <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
            {inv.clientPhone || `ID #${inv.clientId}`}
          </div>
        </div>
      ),
    },
    {
      header: 'Type',
      accessorKey: 'invoiceType',
      width: '140px',
      cell: (inv) => (
        <div>
          {getTypeBadge(inv.invoiceType)}
          {inv.tenderRefId && (
            <div style={{ fontSize: '0.75rem', color: '#0F766E', fontWeight: 600, marginTop: '2px' }}>
              Ref #{inv.tenderRefId}
            </div>
          )}
        </div>
      ),
    },
    {
      header: 'Items',
      width: '80px',
      cell: (inv) => (
        <span style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 600 }}>
          {inv.itemCount || inv.items.length} item{inv.items.length > 1 ? 's' : ''}
        </span>
      ),
    },
    {
      header: 'Total (৳)',
      accessorKey: 'totalAmount',
      width: '120px',
      cell: (inv) => (
        <span style={{ fontWeight: 700, color: '#0F172A' }}>
          ৳{inv.totalAmount.toLocaleString()}
        </span>
      ),
    },
    {
      header: 'Paid (৳)',
      accessorKey: 'totalPaid',
      width: '110px',
      cell: (inv) => (
        <span style={{ fontWeight: 600, color: '#059669' }}>
          ৳{inv.totalPaid.toLocaleString()}
        </span>
      ),
    },
    {
      header: 'Due (৳)',
      accessorKey: 'dueAmount',
      width: '120px',
      cell: (inv) => (
        <span style={{ fontWeight: 700, color: inv.dueAmount > 0 ? '#E11D48' : '#64748B' }}>
          ৳{inv.dueAmount.toLocaleString()}
        </span>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      width: '120px',
      cell: (inv) => getStatusBadge(inv.status),
    },
    {
      header: 'Action',
      width: '100px',
      cell: (inv) => (
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setActiveInvoice(inv)}
          title="View & Print Invoice"
        >
          <Printer size={14} style={{ marginRight: '4px' }} />
          Print
        </Button>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1.25rem' }}>
      {/* Metric KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        {/* Card 1 */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '10px', backgroundColor: '#F0FDFA', color: '#0F766E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Receipt size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748B' }}>Total Invoices</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>{filteredInvoices.length}</div>
          </div>
        </div>

        {/* Card 2 */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '10px', backgroundColor: '#EEF2FF', color: '#4338CA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DollarSign size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748B' }}>Total Invoiced</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#4338CA' }}>৳{totalInvoicedAmount.toLocaleString()}</div>
          </div>
        </div>

        {/* Card 3 */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '10px', backgroundColor: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle2 size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748B' }}>Total Collected</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#059669' }}>৳{totalPaidAmount.toLocaleString()}</div>
          </div>
        </div>

        {/* Card 4 */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '10px', backgroundColor: '#FFF1F2', color: '#E11D48', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AlertCircle size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748B' }}>Total Outstanding Due</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#E11D48' }}>৳{totalDueAmount.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Control Bar: Search & Filters */}
      <div style={{ backgroundColor: '#ffffff', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', flex: 1 }}>
          {/* Search */}
          <div style={{ position: 'relative', minWidth: '240px', flex: '1 1 240px' }}>
            <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            <input
              type="text"
              placeholder="Search by invoice #, client, tender, license..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 34px',
                fontSize: '0.875rem',
                border: '1px solid #CBD5E1',
                borderRadius: '6px',
                outline: 'none'
              }}
            />
          </div>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            style={{
              padding: '8px 12px',
              fontSize: '0.875rem',
              border: '1px solid #CBD5E1',
              borderRadius: '6px',
              backgroundColor: '#ffffff',
              color: '#334155'
            }}
          >
            <option value="ALL">All Types</option>
            <option value={InvoiceType.Tender}>Tender Invoices</option>
            <option value={InvoiceType.OpeningBalance}>Opening Balance</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{
              padding: '8px 12px',
              fontSize: '0.875rem',
              border: '1px solid #CBD5E1',
              borderRadius: '6px',
              backgroundColor: '#ffffff',
              color: '#334155'
            }}
          >
            <option value="ALL">All Statuses</option>
            <option value={InvoiceStatus.Unpaid}>Unpaid</option>
            <option value={InvoiceStatus.PartiallyPaid}>Partially Paid</option>
            <option value={InvoiceStatus.Paid}>Paid</option>
            <option value={InvoiceStatus.Cancelled}>Cancelled</option>
          </select>

          {/* Client Filter */}
          <select
            value={selectedClientId}
            onChange={(e) => setSelectedClientId(e.target.value)}
            style={{
              padding: '8px 12px',
              fontSize: '0.875rem',
              border: '1px solid #CBD5E1',
              borderRadius: '6px',
              backgroundColor: '#ffffff',
              color: '#334155',
              maxWidth: '220px'
            }}
          >
            <option value="ALL">All Clients ({clients.length})</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id.toString()}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sync Button */}
        <div>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleSync}
            disabled={isSyncing}
            title="Scan database & sync all tenders, licenses and opening balances into invoices"
          >
            <RefreshCw size={14} style={{ marginRight: '6px', animation: isSyncing ? 'spin 1s linear infinite' : 'none' }} />
            {isSyncing ? 'Syncing...' : 'Sync Invoices'}
          </Button>
        </div>
      </div>

      {/* Main Table */}
      <div style={{ backgroundColor: '#ffffff', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <DataTable
          columns={columns}
          data={filteredInvoices}
          keyExtractor={(inv) => inv.id}
          emptyTitle="No invoices found"
          emptySubtitle="No invoices match your selected filters."
        />
      </div>

      {/* Invoice Printable View Modal */}
      <InvoiceViewModal
        invoice={activeInvoice}
        isOpen={!!activeInvoice}
        onClose={() => setActiveInvoice(null)}
      />
    </div>
  );
}
