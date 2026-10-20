'use client';

import React from 'react';
import { Modal, Button } from '@egp/ui';
import { Printer, ShieldCheck, CheckCircle2 } from 'lucide-react';
import type { CashCollectionDto } from '@egp/api-client';

interface CashReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  collection: CashCollectionDto | null;
}

export function CashReceiptModal({ isOpen, onClose, collection }: CashReceiptModalProps) {
  if (!collection) return null;

  const handlePrint = () => {
    window.print();
  };

  const dateFormatted = new Date(collection.collectionDateUtc).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Money Receipt / অর্থ আদায়ের রসিদ">
      <div id="printable-receipt" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '0.5rem' }}>
        {/* Header Branding */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #E2E8F0', paddingBottom: '0.75rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={22} style={{ color: '#047857' }} />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                eGP Tender BD
              </h2>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#64748B', margin: '2px 0 0 0' }}>
              Official Cash &amp; Due Collection Money Receipt
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#4F46E5', backgroundColor: '#EEF2FF', padding: '3px 8px', borderRadius: '4px' }}>
              {collection.voucherNo}
            </span>
            <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '4px' }}>
              Date: {dateFormatted}
            </div>
          </div>
        </div>

        {/* Client & Collection Info Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', backgroundColor: '#F8FAFC', padding: '0.875rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 500 }}>Client Name:</span>
            <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0F172A' }}>{collection.clientName}</div>
            {collection.clientPhone && (
              <div style={{ fontSize: '0.8125rem', color: '#64748B' }}>Phone: {collection.clientPhone}</div>
            )}
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 500 }}>Payment Method:</span>
            <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0F172A' }}>{collection.paymentMethod}</div>
            {collection.trxId && (
              <div style={{ fontSize: '0.8125rem', color: '#047857' }}>TrxID: {collection.trxId}</div>
            )}
            {collection.bankName && (
              <div style={{ fontSize: '0.8125rem', color: '#64748B' }}>Bank: {collection.bankName} {collection.branchName ? `(${collection.branchName})` : ''}</div>
            )}
            {collection.chequeNo && (
              <div style={{ fontSize: '0.8125rem', color: '#64748B' }}>Cheque: {collection.chequeNo}</div>
            )}
          </div>
        </div>

        {/* Financial Calculation Breakdown Table */}
        <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <tbody>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '0.625rem 0.875rem', color: '#64748B' }}>Previous Outstanding Due</td>
                <td style={{ padding: '0.625rem 0.875rem', textAlign: 'right', fontWeight: 600, color: '#0F172A' }}>
                  ৳ {collection.totalDueBefore.toLocaleString()}
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9', backgroundColor: '#F0FDF4' }}>
                <td style={{ padding: '0.625rem 0.875rem', fontWeight: 700, color: '#166534' }}>
                  Amount Received (আদায়কৃত টাকা)
                </td>
                <td style={{ padding: '0.625rem 0.875rem', textAlign: 'right', fontWeight: 800, color: '#15803D', fontSize: '1rem' }}>
                  ৳ {collection.amountCollected.toLocaleString()}
                </td>
              </tr>
              {collection.discountAmount > 0 && (
                <tr style={{ borderBottom: '1px solid #F1F5F9', backgroundColor: '#FFFBEB' }}>
                  <td style={{ padding: '0.625rem 0.875rem', color: '#B45309' }}>Special Discount / ছাড়</td>
                  <td style={{ padding: '0.625rem 0.875rem', textAlign: 'right', fontWeight: 600, color: '#D97706' }}>
                    ৳ {collection.discountAmount.toLocaleString()}
                  </td>
                </tr>
              )}
              <tr style={{ backgroundColor: '#F8FAFC' }}>
                <td style={{ padding: '0.625rem 0.875rem', fontWeight: 700, color: '#0F172A' }}>Remaining Balance / বর্তমান বকেয়া</td>
                <td style={{ padding: '0.625rem 0.875rem', textAlign: 'right', fontWeight: 700, color: collection.totalDueAfter > 0 ? '#BE123C' : '#15803D' }}>
                  ৳ {collection.totalDueAfter.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Remarks & Officer Stamp */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '1rem', borderTop: '1px dashed #E2E8F0' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
              <strong>Remarks:</strong> {collection.remarks || 'None'}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '2px' }}>
              <strong>Received By:</strong> {collection.collectedByName || collection.collectedById}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#059669', fontSize: '0.75rem', fontWeight: 600 }}>
            <CheckCircle2 size={14} /> Verified &amp; Recorded
          </div>
        </div>

        {/* Print & Close Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
          <Button variant="secondary" onClick={onClose} type="button">
            Close
          </Button>
          <Button variant="primary" icon={<Printer size={15} />} onClick={handlePrint} type="button">
            Print Money Receipt
          </Button>
        </div>
      </div>
    </Modal>
  );
}
