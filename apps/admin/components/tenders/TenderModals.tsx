'use client';

import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Modal, Input, Select, MoneyDisplay } from '@egp/ui';
import {
  TenderCreateSchema,
  TenderPaymentCreateSchema,
  type TenderCreateInput,
  type TenderPaymentCreateInput
} from '@egp/schema';
import type { ClientDto, TendererDto } from '@egp/api-client';
import { createTenderAction, recordPaymentAction } from '../../app/actions/tenderActions';

interface CreateTenderModalProps {
  isOpen: boolean;
  onClose: () => void;
  clients: ClientDto[];
  tenderers: TendererDto[];
}

export function CreateTenderModal({ isOpen, onClose, clients, tenderers }: CreateTenderModalProps) {
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);
  const [selectedTendererIds, setSelectedTendererIds] = useState<number[]>([]);

  const now = new Date();
  const closingDefault = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16);
  const openingDefault = now.toISOString().slice(0, 16);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TenderCreateInput>({
    resolver: zodResolver(TenderCreateSchema),
    defaultValues: {
      clientId: clients[0]?.id || 0,
      tenderId: '',
      openingDateTimeUtc: openingDefault,
      closingDateTimeUtc: closingDefault,
      department: '',
      liquidAssetAmount: 20000000,
      appCode: '',
      chargeAmount: 2000,
      lessPercentage: null,
      submitStatus: true,
      fillStatus: true,
      mapStatus: true,
      rateStatus: true,
      liquid1Status: true,
      tendererIds: [],
    },
  });

  const toggleTenderer = (id: number) => {
    setSelectedTendererIds((prev) =>
      prev.includes(id) ? prev.filter((tId) => tId !== id) : [...prev, id]
    );
  };

  const onSubmit = (data: TenderCreateInput) => {
    setServerError(null);
    startTransition(async () => {
      const payload: TenderCreateInput = {
        ...data,
        tendererIds: selectedTendererIds,
      };
      const res = await createTenderAction(payload);
      if (res.success) {
        reset();
        setSelectedTendererIds([]);
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
      title="Create New Tender Entry"
      subtitle="Register tender according to eGP procurement excel sheet parameters"
      maxWidth="680px"
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {serverError && (
          <div style={{ padding: '0.65rem 0.85rem', backgroundColor: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.3)', borderRadius: '8px', color: '#fb7185', fontSize: '0.825rem' }}>
            {serverError}
          </div>
        )}

        {/* Client & Tender ID */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem' }}>
          <Select
            label="Client"
            options={clients.map((c) => ({ value: c.id, label: `${c.name} (ID: ${c.id})` }))}
            {...register('clientId', { valueAsNumber: true })}
            error={errors.clientId?.message}
          />
          <Input
            label="Tender ID / Ref Number"
            placeholder="e.g. 1325138"
            {...register('tenderId')}
            error={errors.tenderId?.message}
          />
        </div>

        {/* Department & APP */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem' }}>
          <Input
            label="Department"
            placeholder="e.g. EED, Jessore"
            {...register('department')}
            error={errors.department?.message}
          />
          <Input
            label="APP Code"
            placeholder="e.g. 127023000"
            {...register('appCode')}
            error={errors.appCode?.message}
          />
        </div>

        {/* Dates */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Input
            label="Opening Date & Time"
            type="datetime-local"
            {...register('openingDateTimeUtc')}
            error={errors.openingDateTimeUtc?.message}
          />
          <Input
            label="Closing Date & Time"
            type="datetime-local"
            {...register('closingDateTimeUtc')}
            error={errors.closingDateTimeUtc?.message}
          />
        </div>

        {/* Financials */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
          <Input
            label="Liquid Assets (৳)"
            type="number"
            step="any"
            placeholder="20000000"
            {...register('liquidAssetAmount', { valueAsNumber: true })}
            error={errors.liquidAssetAmount?.message}
          />
          <Input
            label="Charge (৳)"
            type="number"
            step="any"
            placeholder="2000"
            {...register('chargeAmount', { valueAsNumber: true })}
            error={errors.chargeAmount?.message}
          />
          <Input
            label="Less %"
            type="number"
            step="0.001"
            placeholder="e.g. 9.272"
            {...register('lessPercentage', {
              setValueAs: (v) => (v === '' ? null : Number(v)),
            })}
            error={errors.lessPercentage?.message}
          />
        </div>

        {/* Checkbox Matrix for Excel Statuses */}
        <div>
          <label style={{ fontSize: '0.815rem', fontWeight: 600, color: '#94a3b8', marginBottom: '0.4rem', display: 'block' }}>
            Process Status Flags (Excel Task Columns)
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', backgroundColor: 'rgba(15, 23, 42, 0.5)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            {[
              { id: 'submitStatus', label: 'Submit (ok)' },
              { id: 'fillStatus', label: 'Fill (ok)' },
              { id: 'mapStatus', label: 'Map (ok)' },
              { id: 'rateStatus', label: 'Rate (ok)' },
              { id: 'liquid1Status', label: 'Liquid 1' },
              { id: 'liquid2Status', label: 'Liquid 2' },
              { id: 'liquid3Status', label: 'Liquid 3' },
              { id: 'jvcaStatus', label: 'JVCA' },
            ].map((flag) => (
              <label key={flag.id} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#f8fafc', cursor: 'pointer' }}>
                <input type="checkbox" {...register(flag.id as any)} style={{ accentColor: '#38bdf8' }} />
                {flag.label}
              </label>
            ))}
          </div>
        </div>

        {/* Tenderer Bidders Checklist */}
        {tenderers.length > 0 && (
          <div>
            <label style={{ fontSize: '0.815rem', fontWeight: 600, color: '#94a3b8', marginBottom: '0.4rem', display: 'block' }}>
              Assign Bidders / Tenderers (Name of Tenderer in Excel: KB, BA, AMIR etc.)
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', maxHeight: '120px', overflowY: 'auto', padding: '0.5rem', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px' }}>
              {tenderers.map((t) => {
                const isSelected = selectedTendererIds.includes(t.id);
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => toggleTenderer(t.id)}
                    style={{
                      padding: '0.35rem 0.75rem',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: isSelected ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.1)',
                      backgroundColor: isSelected ? 'rgba(56, 189, 248, 0.2)' : 'rgba(15, 23, 42, 0.6)',
                      color: isSelected ? '#38bdf8' : '#94a3b8',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {t.name} ({t.username})
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.75rem' }}>
          <Button type="button" variant="secondary" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isPending}>
            Create Tender
          </Button>
        </div>
      </form>
    </Modal>
  );
}

interface RecordPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  tenderId: number;
  tenderRef: string;
  dueAmount: number;
  onOptimisticPayment?: (tenderId: number, paidAmount: number) => void;
}

export function RecordPaymentModal({
  isOpen,
  onClose,
  tenderId,
  tenderRef,
  dueAmount,
  onOptimisticPayment,
}: RecordPaymentModalProps) {
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const today = new Date().toISOString().split('T')[0];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TenderPaymentCreateInput>({
    resolver: zodResolver(TenderPaymentCreateSchema),
    defaultValues: {
      tenderId,
      amountPaid: dueAmount > 0 ? dueAmount : 2000,
      paymentDateUtc: today,
      paymentMethod: 'Cash',
      remarks: 'Payment cleared',
    },
  });

  const onSubmit = (data: TenderPaymentCreateInput) => {
    setServerError(null);

    // Instant Optimistic Update
    if (onOptimisticPayment) {
      onOptimisticPayment(tenderId, data.amountPaid);
    }

    startTransition(async () => {
      const res = await recordPaymentAction({ ...data, tenderId });
      if (res.success) {
        reset();
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
      title="Record Tender Payment"
      subtitle={`Add paid amount for Tender #${tenderRef}`}
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {serverError && (
          <div style={{ padding: '0.65rem 0.85rem', backgroundColor: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.3)', borderRadius: '8px', color: '#fb7185', fontSize: '0.825rem' }}>
            {serverError}
          </div>
        )}

        <div style={{ padding: '0.85rem', backgroundColor: 'rgba(15, 23, 42, 0.7)', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Current Due Amount:</span>
          <MoneyDisplay amount={dueAmount} type="due" size="lg" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem' }}>
          <Input
            label="Payment Amount (৳)"
            type="number"
            step="any"
            {...register('amountPaid', { valueAsNumber: true })}
            error={errors.amountPaid?.message}
          />
          <Select
            label="Payment Method"
            options={[
              { value: 'Cash', label: 'Cash (নগদ)' },
              { value: 'Bank Transfer', label: 'Bank Transfer' },
              { value: 'bKash/Nagad', label: 'bKash / Nagad' },
              { value: 'Cheque', label: 'Cheque' },
            ]}
            {...register('paymentMethod')}
            error={errors.paymentMethod?.message}
          />
        </div>

        <Input
          label="Payment Date"
          type="date"
          {...register('paymentDateUtc')}
          error={errors.paymentDateUtc?.message}
        />

        <Input
          label="Remarks"
          placeholder="e.g. Paid in full / Part payment"
          {...register('remarks')}
          error={errors.remarks?.message}
        />

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.75rem' }}>
          <Button type="button" variant="secondary" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" variant="emerald" isLoading={isPending}>
            Confirm Payment
          </Button>
        </div>
      </form>
    </Modal>
  );
}
