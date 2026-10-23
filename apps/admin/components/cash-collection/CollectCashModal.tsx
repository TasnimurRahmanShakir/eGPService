'use client';

import React, { useState, useTransition, useMemo } from 'react';
import { Button, Modal, Input, Select } from '@egp/ui';
import { AlertCircle, CheckCircle2, Receipt, ShieldAlert, UserCheck } from 'lucide-react';
import type { ClientDto } from '@egp/api-client';
import { createCashCollectionAction } from '@/app/actions/cashCollectionActions';
import { toast } from 'sonner';

interface CollectCashModalProps {
  isOpen: boolean;
  onClose: () => void;
  clients: ClientDto[];
  defaultClientId?: number;
  onSuccess?: () => void;
}

export function CollectCashModal({
  isOpen,
  onClose,
  clients,
  defaultClientId,
  onSuccess,
}: CollectCashModalProps) {
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);

  // Form State
  const [selectedClientId, setSelectedClientId] = useState<number | ''>(defaultClientId ?? '');
  const [amount, setAmount] = useState<number | ''>('');
  const [discountAmount, setDiscountAmount] = useState<number | ''>(0);
  const [paymentMethod, setPaymentMethod] = useState<string>('Cash');
  const [collectionDate, setCollectionDate] = useState<string>(todayStr);
  const [remarks, setRemarks] = useState<string>('');

  // Conditional Method Fields
  const [trxId, setTrxId] = useState<string>('');
  const [senderPhone, setSenderPhone] = useState<string>('');
  const [bankName, setBankName] = useState<string>('');
  const [branchName, setBranchName] = useState<string>('');
  const [bankAccountNo, setBankAccountNo] = useState<string>('');
  const [chequeNo, setChequeNo] = useState<string>('');
  const [chequeDate, setChequeDate] = useState<string>('');
  const [referenceNo, setReferenceNo] = useState<string>('');

  // Selected Client Details
  const selectedClient = useMemo(() => {
    if (!selectedClientId) return null;
    return clients.find((c) => c.id === Number(selectedClientId)) ?? null;
  }, [clients, selectedClientId]);

  const currentDue = selectedClient ? selectedClient.currentDue : 0;
  const currentAdvance = selectedClient ? (selectedClient.currentAdvance || 0) : 0;
  const numAmount = typeof amount === 'number' ? amount : 0;
  const numDiscount = typeof discountAmount === 'number' ? discountAmount : 0;
  const totalRelief = numAmount + numDiscount;

  const discountExceedsDue = selectedClient ? numDiscount > currentDue : false;
  const remainingDue = selectedClient ? Math.max(0, currentDue - totalRelief) : 0;
  const excessAdvance = selectedClient && numAmount > currentDue ? numAmount - currentDue : 0;

  const handleClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value ? Number(e.target.value) : '';
    setSelectedClientId(val);
    setServerError(null);
  };

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const method = e.target.value;
    setPaymentMethod(method);
    // Reset specific fields when method changes
    setTrxId('');
    setSenderPhone('');
    setBankName('');
    setBranchName('');
    setBankAccountNo('');
    setChequeNo('');
    setChequeDate('');
    setReferenceNo('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!selectedClientId) {
      setServerError('Please select a client.');
      return;
    }

    if (numAmount + numDiscount <= 0) {
      setServerError('Please enter a collection amount or discount greater than zero.');
      return;
    }

    if (discountExceedsDue) {
      setServerError(`Discount amount (৳${numDiscount.toLocaleString()}) cannot exceed current outstanding due (৳${currentDue.toLocaleString()}).`);
      return;
    }

    const payload = {
      clientId: Number(selectedClientId),
      amount: numAmount,
      discountAmount: numDiscount,
      paymentMethod,
      trxId: trxId || undefined,
      senderPhone: senderPhone || undefined,
      bankName: bankName || undefined,
      branchName: branchName || undefined,
      bankAccountNo: bankAccountNo || undefined,
      chequeNo: chequeNo || undefined,
      chequeDate: chequeDate || undefined,
      referenceNo: referenceNo || undefined,
      remarks: remarks || undefined,
      collectionDateUtc: collectionDate ? new Date(collectionDate).toISOString() : undefined,
    };

    startTransition(async () => {
      const res = await createCashCollectionAction(payload);
      if (res.success) {
        toast.success(res.message || 'Cash collection recorded successfully.');
        onSuccess?.();
        onClose();
      } else {
        setServerError(res.message);
      }
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnBackdropClick={false}
      title="Receive Cash Collection"
      subtitle="Collect client dues with automated ledger adjustment and full audit logging"
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {serverError && (
          <div
            style={{
              padding: '0.75rem',
              backgroundColor: '#FEF2F2',
              border: '1px solid #FECDD3',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#991B1B',
              fontSize: '0.875rem',
            }}
          >
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{serverError}</span>
          </div>
        )}

        {/* 1. Voucher ID Notice */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.625rem 0.875rem',
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Receipt size={16} style={{ color: '#4F46E5' }} />
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#334155' }}>
              Voucher ID / রসিদ নম্বর
            </span>
          </div>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#4F46E5',
              backgroundColor: '#EEF2FF',
              padding: '3px 8px',
              borderRadius: '4px',
            }}
          >
            ⚡ Auto Generated on Save by Backend
          </span>
        </div>

        {/* 2. Client Selection (Combo Box) */}
        <div>
          <Select
            label="Client / ক্লায়েন্ট নির্বাচন *"
            value={selectedClientId}
            onChange={handleClientChange}
            options={[
              { value: '', label: '-- Select Client --' },
              ...clients.map((c) => ({
                value: c.id,
                label: `${c.name} ${c.phone ? `(${c.phone})` : ''} — Due: ৳${c.currentDue.toLocaleString()}`,
              })),
            ]}
          />
        </div>

        {/* 3. Current Due (Uneditable / Highlighted) */}
        {selectedClient && (
          <div
            style={{
              padding: '0.75rem 1rem',
              backgroundColor: currentDue > 0 ? '#FFF1F2' : '#F0FDF4',
              border: currentDue > 0 ? '1px solid #FECDD3' : '1px solid #BBF7D0',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: currentDue > 0 ? '#9F1239' : '#166534' }}>
                CURRENT OUTSTANDING DUE
              </span>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: currentDue > 0 ? '#BE123C' : '#15803D' }}>
                ৳ {currentDue.toLocaleString()}
              </div>
            </div>

            {currentDue <= 0 && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8125rem', color: '#15803D', fontWeight: 600 }}>
                <CheckCircle2 size={16} /> No Due {currentAdvance > 0 ? `(Avail Advance: ৳${currentAdvance.toLocaleString()})` : ''}
              </span>
            )}
          </div>
        )}

        {/* 4. Payment Amount & Discount */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div>
            <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.25rem' }}>
              Collection Amount (৳) *
            </label>
            <input
              type="number"
              min="0"
              step="any"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value === '' ? '' : Number(e.target.value))}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                fontSize: '0.875rem',
                color: '#0F172A',
                fontWeight: 600,
                outline: 'none',
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.25rem' }}>
              Discount / ছাড় (৳)
            </label>
            <input
              type="number"
              min="0"
              step="any"
              placeholder="0.00"
              value={discountAmount}
              onChange={(e) => setDiscountAmount(e.target.value === '' ? '' : Number(e.target.value))}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                borderRadius: '6px',
                border: discountExceedsDue ? '1.5px solid #E11D48' : '1px solid #CBD5E1',
                fontSize: '0.875rem',
                color: '#0F172A',
                fontWeight: 600,
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* Discount Excess Warning */}
        {discountExceedsDue && (
          <div
            style={{
              padding: '0.5rem 0.75rem',
              backgroundColor: '#FFF1F2',
              borderRadius: '6px',
              border: '1px solid #FDA4AF',
              color: '#BE123C',
              fontSize: '0.8125rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <ShieldAlert size={16} />
            <span>
              Discount (৳{numDiscount.toLocaleString()}) cannot exceed current outstanding due (৳{currentDue.toLocaleString()}).
            </span>
          </div>
        )}

        {/* Advance Credit Notice */}
        {excessAdvance > 0 && (
          <div
            style={{
              padding: '0.5rem 0.75rem',
              backgroundColor: '#ECFDF5',
              borderRadius: '6px',
              border: '1px solid #A7F3D0',
              color: '#065F46',
              fontSize: '0.8125rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <CheckCircle2 size={16} />
            <span>
              Advance Deposit: ৳{excessAdvance.toLocaleString()} will be credited to Available Advance (Total Avail: ৳{(currentAdvance + excessAdvance).toLocaleString()}).
            </span>
          </div>
        )}

        {/* Remaining Due Preview */}
        {selectedClient && currentDue > 0 && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.5rem 0.75rem',
              backgroundColor: '#F8FAFC',
              borderRadius: '6px',
              border: '1px dashed #CBD5E1',
              fontSize: '0.8125rem',
            }}
          >
            <span style={{ color: '#64748B', fontWeight: 500 }}>Remaining Due After Collection:</span>
            <span style={{ fontWeight: 700, color: remainingDue > 0 ? '#D97706' : '#059669' }}>
              ৳ {remainingDue.toLocaleString()}
            </span>
          </div>
        )}

        {/* 5. Payment Method Selection */}
        <div>
          <Select
            label="Payment Method / মাধ্যম *"
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
            options={[
              { value: 'Cash', label: 'Cash (নগদ)' },
              { value: 'bKash', label: 'bKash (বিকাশ)' },
              { value: 'Nagad', label: 'Nagad (নগদ MFS)' },
              { value: 'Rocket', label: 'Rocket (রকেট)' },
              { value: 'Bank Transfer', label: 'Bank Transfer / Deposit (ব্যাংক ট্রান্সফার)' },
              { value: 'Cheque', label: 'Cheque (চেক)' },
              { value: 'Others', label: 'Others (অন্যান্য)' },
            ]}
          />
        </div>

        {/* 6. Dynamic Conditional Fields based on Payment Method */}
        {(paymentMethod === 'bKash' || paymentMethod === 'Nagad' || paymentMethod === 'Rocket') && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', padding: '0.75rem', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <Input
              label="Sender Mobile No / প্রেরক নম্বর"
              placeholder="e.g. 017xxxxxxxx"
              value={senderPhone}
              onChange={(e) => setSenderPhone(e.target.value)}
            />
            <Input
              label="Transaction ID (TrxID) *"
              placeholder="e.g. 9X82LKPQ"
              value={trxId}
              onChange={(e) => setTrxId(e.target.value)}
            />
          </div>
        )}

        {paymentMethod === 'Bank Transfer' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', padding: '0.75rem', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <Input
              label="Bank Name *"
              placeholder="e.g. Islami Bank, DBBL"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
            />
            <Input
              label="Branch Name"
              placeholder="e.g. Motijheel Branch"
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
            />
            <Input
              label="Bank Account No / Slip No"
              placeholder="e.g. A/C 2050..."
              value={bankAccountNo}
              onChange={(e) => setBankAccountNo(e.target.value)}
            />
            <Input
              label="Reference / Trx No"
              placeholder="Deposit reference"
              value={referenceNo}
              onChange={(e) => setReferenceNo(e.target.value)}
            />
          </div>
        )}

        {paymentMethod === 'Cheque' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', padding: '0.75rem', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <Input
              label="Cheque Bank Name *"
              placeholder="e.g. City Bank"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
            />
            <Input
              label="Cheque Number *"
              placeholder="e.g. CHQ-928192"
              value={chequeNo}
              onChange={(e) => setChequeNo(e.target.value)}
            />
            <div>
              <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.25rem' }}>
                Cheque Date
              </label>
              <input
                type="date"
                value={chequeDate}
                onChange={(e) => setChequeDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.875rem',
                }}
              />
            </div>
          </div>
        )}

        {paymentMethod === 'Others' && (
          <div style={{ padding: '0.75rem', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <Input
              label="Reference / Details"
              placeholder="Reference details"
              value={referenceNo}
              onChange={(e) => setReferenceNo(e.target.value)}
            />
          </div>
        )}

        {/* 7. Date & Officer Info */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div>
            <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.25rem' }}>
              Collection Date *
            </label>
            <input
              type="date"
              value={collectionDate}
              onChange={(e) => setCollectionDate(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                fontSize: '0.875rem',
                color: '#0F172A',
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.25rem' }}>
              Officer / আদায়কারী কর্মকর্তা
            </label>
            <div
              style={{
                padding: '0.5rem 0.75rem',
                borderRadius: '6px',
                border: '1px solid #E2E8F0',
                backgroundColor: '#F8FAFC',
                fontSize: '0.8125rem',
                color: '#475569',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                height: '38px',
              }}
            >
              <UserCheck size={14} style={{ color: '#059669' }} />
              <span>Auto-assigned from active session</span>
            </div>
          </div>
        </div>

        {/* 8. Remarks */}
        <Input
          label="Remarks / মন্তব্য"
          placeholder="Optional notes or settlement details..."
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        />

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
          <Button variant="secondary" onClick={onClose} disabled={isPending} type="button">
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={isPending || discountExceedsDue || numAmount + numDiscount <= 0}>
            {isPending ? 'Recording Collection...' : 'Confirm Cash Collection'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
