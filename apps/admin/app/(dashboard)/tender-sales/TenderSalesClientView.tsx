'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Search,
  FileSpreadsheet,
  Edit2,
  Trash2,
  X,
  Download,
  AlertTriangle,
} from 'lucide-react';
import { Button, Input } from '@egp/ui';
import type { TenderSaleDto, TenderSaleSummaryDto } from '@egp/api-client';
import { TenderSaleModal } from '@/components/tender-sales/TenderSaleModal';
import {
  fetchTenderSalesAction,
  fetchTenderSaleSummaryAction,
  deleteTenderSaleAction,
} from '@/app/actions/tenderSaleActions';
import { formatLocalDate } from '@/lib/date-utils';
import { toast } from 'sonner';

interface TenderSalesClientViewProps {
  initialSales: TenderSaleDto[];
  initialSummary: TenderSaleSummaryDto;
}

export function TenderSalesClientView({
  initialSales,
  initialSummary,
}: TenderSalesClientViewProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [sales, setSales] = useState<TenderSaleDto[]>(initialSales);
  const [summary, setSummary] = useState<TenderSaleSummaryDto>(initialSummary);

  const [search, setSearch] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSale, setEditingSale] = useState<TenderSaleDto | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const refreshData = async () => {
    startTransition(async () => {
      // If user inputs local filter dates, convert to UTC ISO
      const fromUtc = fromDate ? new Date(`${fromDate}T00:00:00`).toISOString() : undefined;
      const toUtc = toDate ? new Date(`${toDate}T23:59:59.999`).toISOString() : undefined;

      const [newSales, newSummary] = await Promise.all([
        fetchTenderSalesAction({
          search: search.trim() || undefined,
          fromDate: fromUtc,
          toDate: toUtc,
        }),
        fetchTenderSaleSummaryAction(),
      ]);
      setSales(newSales);
      setSummary(newSummary);
      router.refresh();
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    refreshData();
  };

  const handleClearFilters = () => {
    setSearch('');
    setFromDate('');
    setToDate('');
    startTransition(async () => {
      const [newSales, newSummary] = await Promise.all([
        fetchTenderSalesAction(),
        fetchTenderSaleSummaryAction(),
      ]);
      setSales(newSales);
      setSummary(newSummary);
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deletingId) return;
    startTransition(async () => {
      const res = await deleteTenderSaleAction(deletingId);
      if (res.success) {
        toast.success(res.message);
        setDeletingId(null);
        refreshData();
      } else {
        toast.error(res.message);
      }
    });
  };

  const formatTk = (val: number | null | undefined) => {
    if (val === null || val === undefined || isNaN(val)) return '0';
    return Number(val).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  };

  const exportToCsv = () => {
    if (sales.length === 0) {
      toast.warning('No data available to export');
      return;
    }

    const headers = [
      'SL',
      'DATE',
      'Organization',
      'Tender ID',
      'LICENSE',
      'DOCUMENT FEE',
      'Payment By',
      'TS',
      'MERGIN',
      'COMMSSION',
      'CS',
      'PG',
      'TENDER WINNER',
      'NOA',
      'SELL (Tk)',
      'Total Invest',
      'Profit',
      'Paid',
      'Due',
      'SOLD CLIENT',
      'Remarks',
    ];

    const rows = sales.map((s, idx) => [
      idx + 1,
      formatLocalDate(s.date),
      `"${(s.organization || '').replace(/"/g, '""')}"`,
      `"${(s.tenderId || '').replace(/"/g, '""')}"`,
      `"${(s.license || '').replace(/"/g, '""')}"`,
      s.documentFee,
      `"${(s.paymentBy || '').replace(/"/g, '""')}"`,
      s.ts,
      s.margin,
      s.commission,
      s.cs,
      s.pg,
      `"${(s.tenderWinner || '').replace(/"/g, '""')}"`,
      `"${(s.noa || '').replace(/"/g, '""')}"`,
      s.sell,
      s.totalInvest,
      s.profit,
      s.paid,
      s.due,
      `"${(s.soldClient || '').replace(/"/g, '""')}"`,
      `"${(s.remarks || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Tender_Sales_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="tender-sales-wrapper">
      {/* KPI Summary Cards */}
      <div className="tender-sales-kpi-grid">
        <div className="tender-sales-kpi-card">
          <span className="tender-sales-kpi-title">Total Deals</span>
          <div className="tender-sales-kpi-value text-default">
            {summary.totalCount}
          </div>
        </div>

        <div className="tender-sales-kpi-card">
          <span className="tender-sales-kpi-title">Total Sell</span>
          <div className="tender-sales-kpi-value text-teal">
            ৳ {formatTk(summary.totalSell)}
          </div>
        </div>

        <div className="tender-sales-kpi-card">
          <span className="tender-sales-kpi-title">Total Invest</span>
          <div className="tender-sales-kpi-value text-indigo">
            ৳ {formatTk(summary.totalInvest)}
          </div>
        </div>

        <div className="tender-sales-kpi-card">
          <span className="tender-sales-kpi-title">Total Profit</span>
          <div className={`tender-sales-kpi-value ${summary.totalProfit >= 0 ? 'text-green' : 'text-red'}`}>
            ৳ {formatTk(summary.totalProfit)}
          </div>
        </div>

        <div className="tender-sales-kpi-card">
          <span className="tender-sales-kpi-title">Total Paid</span>
          <div className="tender-sales-kpi-value text-sky">
            ৳ {formatTk(summary.totalPaid)}
          </div>
        </div>

        <div className="tender-sales-kpi-card">
          <span className="tender-sales-kpi-title">Total Due</span>
          <div className="tender-sales-kpi-value text-red">
            ৳ {formatTk(summary.totalDue)}
          </div>
        </div>
      </div>

      {/* Action / Filter Bar */}
      <div className="tender-sales-filter-card">
        <form onSubmit={handleSearchSubmit} className="tender-sales-filter-form">
          <div className="tender-sales-search-wrapper">
            <Search size={16} className="tender-sales-search-icon" />
            <Input
              className="tender-sales-search-input"
              placeholder="Search Tender ID, NOA, Client, Remarks, Org..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="tender-sales-date-group">
            <Input
              type="date"
              className="tender-sales-date-input"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              title="From Date"
            />
            <span className="tender-sales-date-separator">to</span>
            <Input
              type="date"
              className="tender-sales-date-input"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              title="To Date"
            />
          </div>

          <Button type="submit" variant="secondary" isLoading={isPending}>
            Filter
          </Button>

          {(search || fromDate || toDate) && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="tender-sales-btn-clear"
            >
              <X size={14} /> Clear
            </button>
          )}
        </form>

        <div className="tender-sales-action-group">
          <Button
            type="button"
            variant="secondary"
            onClick={exportToCsv}
            disabled={sales.length === 0}
            title="Export all rows to CSV"
          >
            <Download size={15} style={{ marginRight: '6px' }} />
            Export CSV
          </Button>

          <Button
            type="button"
            variant="primary"
            onClick={() => {
              setEditingSale(null);
              setIsModalOpen(true);
            }}
          >
            <Plus size={16} style={{ marginRight: '6px' }} />
            New Tender Sale
          </Button>
        </div>
      </div>

      {/* Spreadsheet-like Table Container */}
      <div className="tender-sales-table-wrapper">
        <div className="tender-sales-table-scroll">
          <table className="tender-sales-sheet-table">
            <thead>
              <tr>
                <th className="tender-sales-cell-center">SL</th>
                <th>DATE</th>
                <th>Organization</th>
                <th className="col-primary">Tender ID</th>
                <th>LICENSE</th>
                <th className="tender-sales-cell-num">DOCUMENT FEE</th>
                <th>Payment By</th>
                <th className="tender-sales-cell-num">TS</th>
                <th className="tender-sales-cell-num">MERGIN</th>
                <th className="tender-sales-cell-num">COMMSSION</th>
                <th className="tender-sales-cell-num">CS</th>
                <th className="tender-sales-cell-num">PG</th>
                <th>TENDER WINNER</th>
                <th className="col-primary">NOA</th>
                <th className="col-sell tender-sales-cell-num">SELL (Tk)</th>
                <th className="col-invest tender-sales-cell-num">Total Invest</th>
                <th className="col-profit tender-sales-cell-num">Profit</th>
                <th className="col-paid tender-sales-cell-num">Paid</th>
                <th className="col-due tender-sales-cell-num">Due</th>
                <th>SOLD CLIENT</th>
                <th>Remarks</th>
                <th className="tender-sales-cell-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sales.length === 0 ? (
                <tr>
                  <td colSpan={22} style={{ padding: '3rem', textAlign: 'center', color: 'var(--muted-foreground)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                      <FileSpreadsheet size={36} strokeWidth={1.5} />
                      <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>No tender sale records found</span>
                      <span style={{ fontSize: '0.8rem' }}>Click &quot;New Tender Sale&quot; above to create the first record</span>
                    </div>
                  </td>
                </tr>
              ) : (
                sales.map((item, idx) => (
                  <tr key={item.id}>
                    <td className="tender-sales-cell-center tender-sales-cell-bold" style={{ color: 'var(--muted-foreground)' }}>
                      {idx + 1}
                    </td>
                    <td>{formatLocalDate(item.date)}</td>
                    <td className="tender-sales-cell-bold">{item.organization || '-'}</td>
                    <td className="tender-sales-cell-bold" style={{ color: 'var(--primary)' }}>
                      {item.tenderId || '-'}
                    </td>
                    <td className="tender-sales-cell-truncate" title={item.license}>
                      {item.license || '-'}
                    </td>
                    <td className="tender-sales-cell-num">{formatTk(item.documentFee)}</td>
                    <td>{item.paymentBy || '-'}</td>
                    <td className="tender-sales-cell-num">{formatTk(item.ts)}</td>
                    <td className="tender-sales-cell-num">{formatTk(item.margin)}</td>
                    <td className="tender-sales-cell-num">{formatTk(item.commission)}</td>
                    <td className="tender-sales-cell-num">{formatTk(item.cs)}</td>
                    <td className="tender-sales-cell-num">{formatTk(item.pg)}</td>
                    <td>{item.tenderWinner || '-'}</td>
                    <td className="tender-sales-cell-bold" style={{ color: 'var(--primary)' }}>
                      {item.noa || '-'}
                    </td>
                    <td className="tender-sales-cell-num tender-sales-cell-sell">
                      {formatTk(item.sell)}
                    </td>
                    <td className="tender-sales-cell-num tender-sales-cell-invest">
                      {formatTk(item.totalInvest)}
                    </td>
                    <td className={`tender-sales-cell-num ${item.profit >= 0 ? 'tender-sales-cell-profit-pos' : 'tender-sales-cell-profit-neg'}`}>
                      {formatTk(item.profit)}
                    </td>
                    <td className="tender-sales-cell-num tender-sales-cell-paid">
                      {formatTk(item.paid)}
                    </td>
                    <td className={`tender-sales-cell-num ${item.due > 0 ? 'tender-sales-cell-due-pos' : 'tender-sales-cell-due-zero'}`}>
                      {formatTk(item.due)}
                    </td>
                    <td className="tender-sales-cell-bold">{item.soldClient || '-'}</td>
                    <td className="tender-sales-cell-truncate" title={item.remarks}>
                      {item.remarks || '-'}
                    </td>
                    <td className="tender-sales-cell-center">
                      <div className="tender-sales-actions-wrapper">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingSale(item);
                            setIsModalOpen(true);
                          }}
                          className="tender-sales-btn-action"
                          title="Edit Tender Sale"
                        >
                          <Edit2 size={13} />
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeletingId(item.id)}
                          className="tender-sales-btn-action action-danger"
                          title="Delete Tender Sale"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tender Sale Form Modal */}
      <TenderSaleModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingSale(null);
        }}
        saleToEdit={editingSale}
        onSuccess={refreshData}
      />

      {/* Delete Confirmation Dialog */}
      {deletingId && (
        <div className="tender-sales-dialog-backdrop">
          <div className="tender-sales-dialog-box">
            <div className="tender-sales-dialog-header">
              <AlertTriangle size={24} />
              <h3 className="tender-sales-dialog-title">Delete Tender Sale</h3>
            </div>
            <p className="tender-sales-dialog-text">
              Are you sure you want to delete this tender sale record? This action cannot be undone.
            </p>
            <div className="tender-sales-dialog-actions">
              <Button type="button" variant="secondary" onClick={() => setDeletingId(null)} disabled={isPending}>
                Cancel
              </Button>
              <Button type="button" variant="danger" onClick={handleDeleteConfirm} isLoading={isPending}>
                Yes, Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
