'use client';

import React from 'react';
import { Modal, Button, Badge, MoneyDisplay } from '@egp/ui';
import { FileText } from 'lucide-react';
import type { ClientDetailDto } from '@egp/api-client';
import { formatLocalDate } from '@/lib/date-utils';

interface ClientLedgerModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: ClientDetailDto | null;
}

export function ClientLedgerModal({ isOpen, onClose, client }: ClientLedgerModalProps) {
  if (!client) return null;

  const getBadgeForType = (type: string) => {
    switch (type) {
      case 'OPENING_BALANCE':
        return <Badge variant="slate" size="sm">Opening</Badge>;
      case 'TENDER_FEE':
      case 'TENDER_CHARGE':
        return <Badge variant="rose" size="sm">Tender Charge</Badge>;
      case 'TENDER_FEE_ADJUSTMENT':
        return <Badge variant="amber" size="sm">Charge Adj</Badge>;
      case 'TENDER_FEE_REDUCTION':
      case 'TENDER_FEE_REVERSAL':
        return <Badge variant="emerald" size="sm">Charge Reversal</Badge>;
      case 'CASH_COLLECTION':
        return <Badge variant="emerald" size="sm">Cash Collection</Badge>;
      case 'DISCOUNT_WAIVER':
      case 'DISCOUNT':
        return <Badge variant="sky" size="sm">Discount</Badge>;
      case 'SUBSCRIPTION':
        return <Badge variant="blue" size="sm">Subscription</Badge>;
      default:
        return <Badge variant="slate" size="sm">{type}</Badge>;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Client Ledger Statement: ${client.name}`}
      subtitle={`Statement and transaction history for client #${client.id} (${client.phone || 'No phone'})`}
      maxWidth="900px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Client Financial Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.75rem' }}>
          <div style={{ padding: '0.75rem 1rem', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '0.725rem', color: '#64748B', fontWeight: 600 }}>OPENING BALANCE</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.25rem' }}>
              <Badge variant={client.openingBalanceType === 0 ? 'emerald' : 'rose'} size="sm">
                {client.openingBalanceType === 0 ? 'Advance' : 'Due'}
              </Badge>
              <MoneyDisplay amount={client.openingBalance} type={client.openingBalanceType === 0 ? 'advance' : 'due'} size="sm" />
            </div>
          </div>

          <div style={{ padding: '0.75rem 1rem', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '0.725rem', color: '#64748B', fontWeight: 600 }}>TOTAL CHARGES</span>
            <div style={{ marginTop: '0.25rem' }}>
              <MoneyDisplay amount={client.totalCharge || 0} type="neutral" size="sm" />
            </div>
          </div>

          <div style={{ padding: '0.75rem 1rem', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '0.725rem', color: '#64748B', fontWeight: 600 }}>CASH COLLECTED</span>
            <div style={{ marginTop: '0.25rem' }}>
              <MoneyDisplay amount={client.totalPayment || 0} type="advance" size="sm" />
            </div>
            {(client.totalDiscount || 0) > 0 && (
              <div style={{ fontSize: '0.7rem', color: '#7C3AED', marginTop: '2px' }}>
                Discount: ৳{(client.totalDiscount).toLocaleString()}
              </div>
            )}
          </div>

          <div style={{ padding: '0.75rem 1rem', backgroundColor: '#ECFDF5', borderRadius: '8px', border: '1px solid #A7F3D0' }}>
            <span style={{ fontSize: '0.725rem', color: '#065F46', fontWeight: 600 }}>AVAILABLE ADVANCE</span>
            <div style={{ marginTop: '0.25rem' }}>
              <MoneyDisplay amount={client.currentAdvance || 0} type="advance" size="sm" />
            </div>
          </div>

          <div style={{ padding: '0.75rem 1rem', backgroundColor: (client.currentDue || 0) > 0 ? '#FFF1F2' : '#F8FAFC', borderRadius: '8px', border: (client.currentDue || 0) > 0 ? '1px solid #FECDD3' : '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '0.725rem', color: (client.currentDue || 0) > 0 ? '#9F1239' : '#64748B', fontWeight: 600 }}>OUTSTANDING DUE</span>
            <div style={{ marginTop: '0.25rem' }}>
              <MoneyDisplay amount={client.currentDue || 0} type="due" size="sm" />
            </div>
          </div>
        </div>

        {/* Ledger Transactions Table */}
        <div style={{ marginTop: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B', display: 'flex', alignItems: 'center', gap: '6px', margin: 0 }}>
              <FileText size={16} style={{ color: '#0F766E' }} />
              Transaction Ledger History (খতিয়ান)
            </h4>
            <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
              Total {client.ledgerTransactions?.length || 0} entries
            </span>
          </div>

          <div style={{ overflowX: 'auto', border: '1px solid #E2E8F0', borderRadius: '8px', maxHeight: '380px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
              <thead style={{ backgroundColor: '#F8FAFC', position: 'sticky', top: 0, zIndex: 1, borderBottom: '1px solid #E2E8F0' }}>
                <tr>
                  <th style={{ padding: '0.625rem 0.75rem', textAlign: 'left', fontWeight: 600, color: '#475569' }}>Date</th>
                  <th style={{ padding: '0.625rem 0.75rem', textAlign: 'left', fontWeight: 600, color: '#475569' }}>Type</th>
                  <th style={{ padding: '0.625rem 0.75rem', textAlign: 'left', fontWeight: 600, color: '#475569' }}>Description</th>
                  <th style={{ padding: '0.625rem 0.75rem', textAlign: 'right', fontWeight: 600, color: '#BE123C' }}>Debit (চার্জ)</th>
                  <th style={{ padding: '0.625rem 0.75rem', textAlign: 'right', fontWeight: 600, color: '#047857' }}>Credit (জমা/ছাড়)</th>
                </tr>
              </thead>
              <tbody>
                {(!client.ledgerTransactions || client.ledgerTransactions.length === 0) ? (
                  <tr>
                    <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: '#94A3B8' }}>
                      No transactions found for this client.
                    </td>
                  </tr>
                ) : (
                  client.ledgerTransactions.map((tx) => {
                    const isCredit = tx.amount > 0;
                    const isDebit = tx.amount < 0;
                    return (
                      <tr key={tx.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                        <td style={{ padding: '0.625rem 0.75rem', whiteSpace: 'nowrap', color: '#64748B' }}>
                          {formatLocalDate(tx.transactionDateUtc)}
                        </td>
                        <td style={{ padding: '0.625rem 0.75rem', whiteSpace: 'nowrap' }}>
                          {getBadgeForType(tx.referenceType)}
                        </td>
                        <td style={{ padding: '0.625rem 0.75rem', color: '#1E293B', fontWeight: 500 }}>
                          {tx.description}
                        </td>
                        <td style={{ padding: '0.625rem 0.75rem', textAlign: 'right', fontWeight: 600, color: isDebit ? '#BE123C' : '#CBD5E1' }}>
                          {isDebit ? `৳${Math.abs(tx.amount).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}` : '—'}
                        </td>
                        <td style={{ padding: '0.625rem 0.75rem', textAlign: 'right', fontWeight: 600, color: isCredit ? '#047857' : '#CBD5E1' }}>
                          {isCredit ? `৳${tx.amount.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}` : '—'}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
          <Button type="button" variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
