'use client';

import React from 'react';
import { Button, Modal, Badge } from '@egp/ui';
import { Printer, Download, Receipt, Building2, User, Calendar, Hash, FileText } from 'lucide-react';
import { type InvoiceDto, InvoiceStatus, InvoiceType } from '@egp/api-client';
import { formatLocalDate } from '@/lib/date-utils';

interface InvoiceViewModalProps {
  invoice: InvoiceDto | null;
  isOpen: boolean;
  onClose: () => void;
}

export function InvoiceViewModal({ invoice, isOpen, onClose }: InvoiceViewModalProps) {
  if (!invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  const getStatusBadge = (status: InvoiceStatus) => {
    switch (status) {
      case InvoiceStatus.Paid:
        return <Badge variant="emerald">PAID</Badge>;
      case InvoiceStatus.PartiallyPaid:
        return <Badge variant="amber">PARTIALLY PAID</Badge>;
      case InvoiceStatus.Cancelled:
        return <Badge variant="slate">CANCELLED</Badge>;
      case InvoiceStatus.Unpaid:
      default:
        return <Badge variant="rose">UNPAID</Badge>;
    }
  };

  const getTypeBadge = (type: InvoiceType) => {
    if (type === InvoiceType.OpeningBalance) {
      return (
        <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '2px 8px', borderRadius: '4px', backgroundColor: '#FEF3C7', color: '#92400E' }}>
          Opening Balance
        </span>
      );
    }
    return (
      <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '2px 8px', borderRadius: '4px', backgroundColor: '#EEF2FF', color: '#4338CA' }}>
        Tender Invoice
      </span>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Invoice #${invoice.invoiceNumber}`}
      subtitle={`Generated on ${formatLocalDate(invoice.invoiceDateUtc)}`}
      maxWidth="800px"
    >
      <div className="printable-invoice-wrapper" style={{ padding: '0.5rem 0' }}>
        {/* Actions bar (hidden on print) */}
        <div
          className="no-print"
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '0.5rem',
            marginBottom: '1.25rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid #E2E8F0'
          }}
        >
          <Button variant="secondary" size="sm" onClick={handlePrint}>
            <Printer size={15} style={{ marginRight: '6px' }} />
            Print / Save PDF
          </Button>
        </div>

        {/* Invoice Printable Document */}
        <div
          id="invoice-print-area"
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            border: '1px solid #E2E8F0',
            padding: '2rem',
            color: '#1E293B'
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #0F766E', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0F766E' }}>
                <Building2 size={28} />
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: '#0F766E' }}>eGP Tender BD</h2>
              </div>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#64748B' }}>
                Automated e-GP Management &amp; Bidding Solutions
              </p>
              <p style={{ margin: '2px 0 0 0', fontSize: '0.8rem', color: '#94A3B8' }}>
                Email: billing@egptenderbd.com | Web: egptenderbd.com
              </p>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0F766E', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                INVOICE
              </span>
              <div style={{ marginTop: '4px', fontSize: '1rem', fontWeight: 700, color: '#1E293B' }}>
                #{invoice.invoiceNumber}
              </div>
              <div style={{ marginTop: '6px', display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                {getTypeBadge(invoice.invoiceType)}
                {getStatusBadge(invoice.status)}
              </div>
            </div>
          </div>

          {/* Meta & Client Details */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
            <div style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Billed To:
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A' }}>
                {invoice.clientName}
              </div>
              <div style={{ fontSize: '0.875rem', color: '#475569', marginTop: '2px' }}>
                Phone: {invoice.clientPhone || 'N/A'}
              </div>
              {invoice.clientEmail && (
                <div style={{ fontSize: '0.875rem', color: '#475569', marginTop: '2px' }}>
                  Email: {invoice.clientEmail}
                </div>
              )}
              <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '6px' }}>
                Client ID: #{invoice.clientId}
              </div>
            </div>

            <div style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Invoice Details:
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', padding: '2px 0' }}>
                <span style={{ color: '#64748B' }}>Invoice Date:</span>
                <span style={{ fontWeight: 600 }}>{formatLocalDate(invoice.invoiceDateUtc)}</span>
              </div>
              {invoice.tenderRefId && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', padding: '2px 0' }}>
                  <span style={{ color: '#64748B' }}>Tender ID:</span>
                  <span style={{ fontWeight: 700, color: '#0F766E' }}>#{invoice.tenderRefId}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', padding: '2px 0' }}>
                <span style={{ color: '#64748B' }}>Type:</span>
                <span style={{ fontWeight: 600 }}>{invoice.invoiceType === InvoiceType.Tender ? 'Per-Tender License Billing' : 'Client Opening Balance'}</span>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div style={{ marginBottom: '2rem', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#0F766E', color: '#ffffff' }}>
                  <th style={{ padding: '10px 12px', textAlign: 'left', borderRadius: '4px 0 0 0', width: '40px' }}>#</th>
                  <th style={{ padding: '10px 12px', textAlign: 'left' }}>Item / License Description</th>
                  <th style={{ padding: '10px 12px', textAlign: 'center', width: '70px' }}>Qty</th>
                  <th style={{ padding: '10px 12px', textAlign: 'right', width: '120px' }}>Unit Price (৳)</th>
                  <th style={{ padding: '10px 12px', textAlign: 'right', borderRadius: '0 4px 0 0', width: '130px' }}>Total (৳)</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ padding: '1.5rem', textAlign: 'center', color: '#94A3B8' }}>
                      No items in this invoice.
                    </td>
                  </tr>
                ) : (
                  invoice.items.map((item, idx) => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #E2E8F0', backgroundColor: idx % 2 === 1 ? '#F8FAFC' : '#ffffff' }}>
                      <td style={{ padding: '10px 12px', color: '#64748B' }}>{idx + 1}</td>
                      <td style={{ padding: '10px 12px', fontWeight: 600, color: '#1E293B' }}>{item.description}</td>
                      <td style={{ padding: '10px 12px', textAlign: 'center', color: '#64748B' }}>{item.quantity}</td>
                      <td style={{ padding: '10px 12px', textAlign: 'right', color: '#475569' }}>৳{item.unitPrice.toLocaleString()}</td>
                      <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 700, color: '#0F172A' }}>৳{item.amount.toLocaleString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Payment & Settlement History */}
          {invoice.payments && invoice.payments.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
                <Receipt size={18} style={{ color: '#0F766E' }} />
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F766E', margin: 0 }}>
                  Payment &amp; Settlement History (পরিশোধ ও সমন্বয়ের ইতিহাস)
                </h3>
              </div>
              <div style={{ overflowX: 'auto', border: '1px solid #CBD5E1', borderRadius: '6px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#F8FAFC', color: '#475569', borderBottom: '1px solid #CBD5E1' }}>
                      <th style={{ padding: '8px 10px', textAlign: 'left', width: '35px' }}>#</th>
                      <th style={{ padding: '8px 10px', textAlign: 'left', width: '110px' }}>Date</th>
                      <th style={{ padding: '8px 10px', textAlign: 'left' }}>Voucher / Ref</th>
                      <th style={{ padding: '8px 10px', textAlign: 'center', width: '90px' }}>Method</th>
                      <th style={{ padding: '8px 10px', textAlign: 'right', width: '110px' }}>Paid (৳)</th>
                      <th style={{ padding: '8px 10px', textAlign: 'right', width: '100px' }}>Discount (৳)</th>
                      <th style={{ padding: '8px 10px', textAlign: 'right', width: '120px' }}>Balance After</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.payments.map((pmt, idx) => (
                      <tr key={pmt.id} style={{ borderBottom: idx === invoice.payments!.length - 1 ? 'none' : '1px solid #E2E8F0', backgroundColor: idx % 2 === 1 ? '#F8FAFC' : '#ffffff' }}>
                        <td style={{ padding: '8px 10px', color: '#64748B' }}>{idx + 1}</td>
                        <td style={{ padding: '8px 10px', color: '#334155', fontWeight: 500 }}>{formatLocalDate(pmt.paymentDateUtc)}</td>
                        <td style={{ padding: '8px 10px', fontWeight: 600, color: '#0F766E' }}>
                          {pmt.voucherNo}
                          {pmt.remarks && pmt.remarks !== 'Auto-allocated via Cash Collection' && (
                            <span style={{ display: 'block', fontSize: '0.725rem', color: '#64748B', fontWeight: 400 }}>{pmt.remarks}</span>
                          )}
                        </td>
                        <td style={{ padding: '8px 10px', textAlign: 'center' }}>
                          <span style={{ fontSize: '0.725rem', padding: '2px 8px', borderRadius: '4px', backgroundColor: '#EEF2FF', color: '#4338CA', fontWeight: 600 }}>
                            {pmt.paymentMethod}
                          </span>
                        </td>
                        <td style={{ padding: '8px 10px', textAlign: 'right', fontWeight: 700, color: '#059669' }}>
                          ৳{pmt.amount.toLocaleString()}
                        </td>
                        <td style={{ padding: '8px 10px', textAlign: 'right', fontWeight: 600, color: pmt.discountAmount > 0 ? '#D97706' : '#94A3B8' }}>
                          {pmt.discountAmount > 0 ? `৳${pmt.discountAmount.toLocaleString()}` : '-'}
                        </td>
                        <td style={{ padding: '8px 10px', textAlign: 'right', fontWeight: 700, color: '#1E293B' }}>
                          ৳{pmt.balanceAfter.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Financial Summary */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
            <div style={{ width: '340px', backgroundColor: '#F8FAFC', padding: '1.1rem', borderRadius: '8px', border: '1px solid #CBD5E1' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: '0.875rem' }}>
                <span style={{ color: '#64748B' }}>Subtotal:</span>
                <span style={{ fontWeight: 600, color: '#1E293B' }}>৳{invoice.subTotalAmount.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', margin: '4px 0', fontSize: '0.95rem', fontWeight: 700, color: '#0F172A' }}>
                <span>Total Invoiced:</span>
                <span>৳{invoice.totalAmount.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: '0.875rem', color: '#059669' }}>
                <span>Less: Total Paid:</span>
                <span style={{ fontWeight: 700 }}>-৳{invoice.totalPaid.toLocaleString()}</span>
              </div>
              {invoice.discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: '0.875rem', color: '#D97706' }}>
                  <span>Less: Total Discount:</span>
                  <span style={{ fontWeight: 700 }}>-৳{invoice.discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: '2px solid #CBD5E1', marginTop: '6px', fontSize: '1.1rem', fontWeight: 800, color: invoice.dueAmount > 0 ? '#E11D48' : '#059669' }}>
                <span>Net Balance Due:</span>
                <span>৳{invoice.dueAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Remarks & Signatures */}
          <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
            {invoice.remarks && (
              <div style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '2rem' }}>
                <strong>Remarks / Notes:</strong> {invoice.remarks}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '2.5rem' }}>
              <div style={{ textAlign: 'center', width: '180px' }}>
                <div style={{ borderTop: '1px dashed #94A3B8', paddingTop: '6px', fontSize: '0.75rem', color: '#64748B' }}>
                  Client Signature
                </div>
              </div>

              <div style={{ textAlign: 'center', width: '180px' }}>
                <div style={{ borderTop: '1px dashed #94A3B8', paddingTop: '6px', fontSize: '0.75rem', color: '#64748B' }}>
                  Authorized Signatory
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
