'use client';

import React from 'react';
import { Modal, Button } from '@egp/ui';
import { Printer, ShieldCheck, CheckCircle2, Download } from 'lucide-react';
import type { CashCollectionDto } from '@egp/api-client';

interface CashReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  collection: CashCollectionDto | null;
}

export function CashReceiptModal({ isOpen, onClose, collection }: CashReceiptModalProps) {
  if (!collection) return null;

  const fileName = `e-GP Tender BD Money Receipt ${collection.voucherNo}`;

  const dateFormatted = new Date(collection.collectionDateUtc).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = fileName;
    window.print();
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  };

  const handleDownload = () => {
    const receiptElement = document.getElementById('printable-receipt');
    if (!receiptElement) return;

    // Build standalone HTML receipt for clean offline viewing and printing
    const htmlContent = `<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${fileName}</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 30px 15px;
      background: #F8FAFC;
      color: #0F172A;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      min-height: 100vh;
    }
    .receipt-container {
      width: 100%;
      max-width: 580px;
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    }
    .no-print-bar {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-bottom: 16px;
    }
    .btn-action {
      background: #047857;
      color: #FFFFFF;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;
    }
    @media print {
      body { background: #FFFFFF; padding: 0; }
      .receipt-container { border: none; box-shadow: none; padding: 0; }
      .no-print-bar { display: none !important; }
    }
  </style>
</head>
<body>
  <div class="receipt-container">
    <div class="no-print-bar">
      <button class="btn-action" onclick="window.print()">Print / Save as PDF</button>
    </div>
    ${receiptElement.innerHTML}
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnBackdropClick={false}
      maxWidth="620px"
      title="Money Receipt"
    >
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #printable-receipt, #printable-receipt * {
            visibility: visible !important;
          }
          #printable-receipt {
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            padding: 24px !important;
            background: #ffffff !important;
            box-shadow: none !important;
            border: none !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

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
                  Amount Received
                </td>
                <td style={{ padding: '0.625rem 0.875rem', textAlign: 'right', fontWeight: 800, color: '#15803D', fontSize: '1rem' }}>
                  ৳ {collection.amountCollected.toLocaleString()}
                </td>
              </tr>
              {collection.discountAmount > 0 && (
                <tr style={{ borderBottom: '1px solid #F1F5F9', backgroundColor: '#FFFBEB' }}>
                  <td style={{ padding: '0.625rem 0.875rem', color: '#B45309' }}>Special Discount</td>
                  <td style={{ padding: '0.625rem 0.875rem', textAlign: 'right', fontWeight: 600, color: '#D97706' }}>
                    ৳ {collection.discountAmount.toLocaleString()}
                  </td>
                </tr>
              )}
              <tr style={{ backgroundColor: '#F8FAFC' }}>
                <td style={{ padding: '0.625rem 0.875rem', fontWeight: 700, color: '#0F172A' }}>Remaining Balance</td>
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

        {/* Action Buttons */}
        <div 
          className="no-print" 
          style={{ 
            display: 'flex', 
            justifyContent: 'flex-end', 
            alignItems: 'center',
            gap: '0.625rem', 
            marginTop: '0.75rem',
            paddingTop: '0.75rem',
            borderTop: '1px solid #F1F5F9'
          }}
        >
          <Button variant="secondary" onClick={onClose} type="button">
            Close
          </Button>
          <Button variant="secondary" icon={<Download size={15} />} onClick={handleDownload} type="button">
            Download Receipt
          </Button>
          <Button variant="primary" icon={<Printer size={15} />} onClick={handlePrint} type="button">
            Print Money Receipt
          </Button>
        </div>
      </div>
    </Modal>
  );
}
