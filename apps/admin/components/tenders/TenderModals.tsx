'use client';

import React, { useState, useTransition, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button, Modal, Input, Select, Combobox, MoneyDisplay } from '@egp/ui';
import {
  TenderCreateSchema,
  TenderUpdateSchema,
  TendererAddToTenderSchema,
  TendererMappingUpdateSchema,
  TenderPaymentCreateSchema,
  type TenderCreateInput,
  type TenderUpdateInput,
  type TendererAddToTenderInput,
  type TendererMappingUpdateInput,
  type TenderPaymentCreateInput,
} from '@egp/schema';
import type { ClientDto, TendererDto, TenderDto, TendererMappingDto } from '@egp/api-client';
import {
  createTenderAction,
  updateTenderAction,
  addTendererToTenderAction,
  updateTendererAction,
  recordPaymentAction,
  fetchTendererOptionsAction,
} from '../../app/actions/tenderActions';
import { fetchClientOptionsAction } from '../../app/actions/clientActions';

// -------------------------------------------------------------
// 1. CREATE TENDER MODAL (Lightweight, Step-1 Creation)
// -------------------------------------------------------------
interface CreateTenderModalProps {
  isOpen: boolean;
  onClose: () => void;
  clients?: ClientDto[];
}

export function CreateTenderModal({ isOpen, onClose, clients }: CreateTenderModalProps) {
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const now = new Date();
  const closingDefault = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TenderCreateInput>({
    resolver: zodResolver(TenderCreateSchema),
    defaultValues: {
      tenderId: '',
      closingDateTimeUtc: closingDefault,
      department: '',
      clientId: null,
      liquidAssetAmount: 20000000,
      appCode: '',
    },
  });

  const clientId = watch('clientId');

  const onSubmit = (data: TenderCreateInput) => {
    setServerError(null);

    startTransition(async () => {
      const res = await createTenderAction(data);
      if (res.success) {
        toast.success(res.message || 'Tender created successfully.');
        reset();
        onClose();
      } else {
        toast.error(res.message || 'Failed to create tender.');
        setServerError(res.message);
      }
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Tender"
      subtitle="Enter tender schedule, department, and optional client assignment"
      maxWidth="680px"
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {serverError && (
          <div
            style={{
              padding: '0.65rem 0.85rem',
              backgroundColor: 'rgba(244, 63, 94, 0.15)',
              border: '1px solid rgba(244, 63, 94, 0.3)',
              borderRadius: '8px',
              color: '#fb7185',
              fontSize: '0.825rem',
            }}
          >
            {serverError}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem' }}>
          <Input
            label="Tender ID / Ref Number (Mandatory & Unique)"
            placeholder="e.g. 1325138"
            {...register('tenderId')}
            error={errors.tenderId?.message}
          />
          <Input
            label="Closing Date & Time (Manual Input)"
            type="datetime-local"
            {...register('closingDateTimeUtc')}
            error={errors.closingDateTimeUtc?.message}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem' }}>
          <Input
            label="Department"
            placeholder="e.g. EED, Jessore"
            {...register('department')}
            error={errors.department?.message}
          />
          <Combobox
            label="Client (Optional - Can assign later)"
            placeholder="Search or select client..."
            searchPlaceholder="Type client name or phone..."
            value={clientId}
            onChange={(val) => setValue('clientId', val ? Number(val) : null)}
            onOpenFetch={fetchClientOptionsAction}
            error={errors.clientId?.message}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem' }}>
          <Input
            label="Liquid Assets (৳)"
            type="number"
            step="any"
            placeholder="20000000"
            {...register('liquidAssetAmount', { valueAsNumber: true })}
            error={errors.liquidAssetAmount?.message}
          />
          <Input
            label="APP Code (Optional)"
            placeholder="e.g. 127023000"
            {...register('appCode')}
            error={errors.appCode?.message}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
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

// -------------------------------------------------------------
// 2. EDIT TENDER MODAL (Tender-level details + Client Transfer)
// -------------------------------------------------------------
interface EditTenderModalProps {
  isOpen: boolean;
  onClose: () => void;
  tender: TenderDto | null;
  clients?: ClientDto[];
}

export function EditTenderModal({ isOpen, onClose, tender, clients }: EditTenderModalProps) {
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TenderUpdateInput>({
    resolver: zodResolver(TenderUpdateSchema),
    defaultValues: {
      id: tender?.id || 0,
      tenderId: tender?.tenderId || '',
      closingDateTimeUtc: tender?.closingDateTimeUtc ? tender.closingDateTimeUtc.slice(0, 16) : '',
      department: tender?.department || '',
      clientId: tender?.clientId || null,
      liquidAssetAmount: tender?.liquidAssetAmount || 20000000,
      appCode: tender?.appCode || '',
    },
  });

  const clientId = watch('clientId');

  useEffect(() => {
    if (tender && isOpen) {
      reset({
        id: tender.id,
        tenderId: tender.tenderId,
        closingDateTimeUtc: tender.closingDateTimeUtc ? tender.closingDateTimeUtc.slice(0, 16) : '',
        department: tender.department,
        clientId: tender.clientId || null,
        liquidAssetAmount: tender.liquidAssetAmount,
        appCode: tender.appCode || '',
      });
      setServerError(null);
    }
  }, [tender, isOpen, reset]);

  const hasRecordedPayments = !!tender && ((tender.totalPaid || tender.totalPaidAmount || 0) > 0);

  const onSubmit = (data: TenderUpdateInput) => {
    setServerError(null);

    if (hasRecordedPayments && data.clientId !== tender?.clientId) {
      toast.error('Client cannot be changed because payments have already been recorded.');
      setServerError('Client cannot be changed because payments have already been recorded.');
      return;
    }

    startTransition(async () => {
      const res = await updateTenderAction(data);
      if (res.success) {
        toast.success(res.message || 'Tender updated successfully.');
        onClose();
      } else {
        toast.error(res.message || 'Failed to update tender.');
        setServerError(res.message);
      }
    });
  };

  if (!tender) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Edit Tender #${tender.tenderId}`}
      subtitle="Modify tender details. Changing client automatically adjusts ledger balances."
      maxWidth="680px"
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {serverError && (
          <div
            style={{
              padding: '0.65rem 0.85rem',
              backgroundColor: 'rgba(244, 63, 94, 0.15)',
              border: '1px solid rgba(244, 63, 94, 0.3)',
              borderRadius: '8px',
              color: '#fb7185',
              fontSize: '0.825rem',
            }}
          >
            {serverError}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem' }}>
          <Input
            label="Tender ID (Unique)"
            {...register('tenderId')}
            error={errors.tenderId?.message}
          />
          <Input
            label="Closing Date & Time"
            type="datetime-local"
            {...register('closingDateTimeUtc')}
            error={errors.closingDateTimeUtc?.message}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem' }}>
          <Input
            label="Department"
            {...register('department')}
            error={errors.department?.message}
          />
          <div>
            <Combobox
              label={hasRecordedPayments ? "Assigned Client (Locked)" : "Assigned Client"}
              disabled={hasRecordedPayments}
              placeholder="Search or select client..."
              searchPlaceholder="Type client name or phone..."
              value={clientId}
              onChange={(val) => setValue('clientId', val ? Number(val) : null)}
              onOpenFetch={fetchClientOptionsAction}
              error={errors.clientId?.message}
              helperText={hasRecordedPayments ? `Client locked: Payments (৳${(tender.totalPaid || tender.totalPaidAmount || 0).toLocaleString()}) recorded.` : undefined}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem' }}>
          <Input
            label="Liquid Assets (৳)"
            type="number"
            step="any"
            {...register('liquidAssetAmount', { valueAsNumber: true })}
            error={errors.liquidAssetAmount?.message}
          />
          <Input
            label="APP Code"
            {...register('appCode')}
            error={errors.appCode?.message}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
          <Button type="button" variant="secondary" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isPending}>
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
}

// -------------------------------------------------------------
// 3. ADD TENDERER MODAL (Step 2: Add tenderer with unchecked defaults)
// -------------------------------------------------------------
interface AddTendererModalProps {
  isOpen: boolean;
  onClose: () => void;
  tender: TenderDto | null;
  tenderers?: TendererDto[];
}

export function AddTendererModal({ isOpen, onClose, tender }: AddTendererModalProps) {
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TendererAddToTenderInput>({
    resolver: zodResolver(TendererAddToTenderSchema),
    defaultValues: {
      tenderId: tender?.id || 0,
      tendererId: 0,
      mailId: '',
      chargeAmount: 2000,
      lessPercentage: null,
      liquid1Status: false,
      liquid2Status: false,
      liquid3Status: false,
      jvcaStatus: false,
      submitStatus: false,
      fillStatus: false,
      mapStatus: false,
      rateStatus: false,
    },
  });

  const tendererId = watch('tendererId');

  const fetchAvailableTenderers = async () => {
    const all = await fetchTendererOptionsAction();
    const assignedIds = (tender?.tenderers || []).map((m) => m.tendererId);
    return all.filter((t) => !assignedIds.includes(Number(t.value)));
  };

  useEffect(() => {
    if (tender && isOpen) {
      reset({
        tenderId: tender.id,
        tendererId: 0,
        mailId: '',
        chargeAmount: 2000,
        lessPercentage: null,
        liquid1Status: false,
        liquid2Status: false,
        liquid3Status: false,
        jvcaStatus: false,
        submitStatus: false,
        fillStatus: false,
        mapStatus: false,
        rateStatus: false,
      });
      setServerError(null);
    }
  }, [tender, isOpen, reset]);

  const onSubmit = (data: TendererAddToTenderInput) => {
    setServerError(null);

    startTransition(async () => {
      const res = await addTendererToTenderAction(data);
      if (res.success) {
        toast.success(res.message || 'License added to tender successfully.');
        onClose();
      } else {
        toast.error(res.message || 'Failed to add license.');
        setServerError(res.message);
      }
    });
  };

  if (!tender) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Add eGP License to Tender #${tender.tenderId}`}
      subtitle="Search and select a license. All checklist checkboxes start unchecked by default."
      maxWidth="680px"
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {serverError && (
          <div
            style={{
              padding: '0.65rem 0.85rem',
              backgroundColor: 'rgba(244, 63, 94, 0.15)',
              border: '1px solid rgba(244, 63, 94, 0.3)',
              borderRadius: '8px',
              color: '#fb7185',
              fontSize: '0.825rem',
            }}
          >
            {serverError}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '1rem' }}>
          <Combobox
            label="Select eGP License (Searchable)"
            placeholder="Search or select license..."
            searchPlaceholder="Type license name or email..."
            value={tendererId}
            onChange={(val) => setValue('tendererId', val ? Number(val) : 0)}
            onOpenFetch={fetchAvailableTenderers}
            error={errors.tendererId?.message}
          />
          <Input
            label="License Charge (৳)"
            type="number"
            step="any"
            {...register('chargeAmount', { valueAsNumber: true })}
            error={errors.chargeAmount?.message}
          />
        </div>

        <div>
          <Input
            label="Less % (Optional)"
            type="number"
            step="0.001"
            placeholder="e.g. 9.272"
            {...register('lessPercentage', {
              setValueAs: (v) => (!v || v === '' ? null : Number(v)),
            })}
            error={errors.lessPercentage?.message}
          />
        </div>

        {/* Status Checkboxes - ALL UNCHECKED by default */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '0.75rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8' }}>
            Checklist Flags (Unchecked by default):
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {[
              { id: 'liquid1Status', label: 'Liquid 1' },
              { id: 'liquid2Status', label: 'Liquid 2' },
              { id: 'liquid3Status', label: 'Liquid 3' },
              { id: 'jvcaStatus', label: 'JVCA' },
              { id: 'fillStatus', label: 'Fill' },
              { id: 'mapStatus', label: 'Map' },
              { id: 'rateStatus', label: 'Rate' },
              { id: 'submitStatus', label: 'Submit' },
            ].map((f) => (
              <label
                key={f.id}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.8rem',
                  color: '#cbd5e1',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="checkbox"
                  {...register(f.id as any)}
                  style={{ accentColor: '#38bdf8' }}
                />
                {f.label}
              </label>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
          <Button type="button" variant="secondary" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isPending}>
            Add License
          </Button>
        </div>
      </form>
    </Modal>
  );
}

// -------------------------------------------------------------
// 4. EDIT TENDERER MODAL (Modify checkboxes, rate %, charge)
// -------------------------------------------------------------
interface EditTendererModalProps {
  isOpen: boolean;
  onClose: () => void;
  tenderId: number;
  mapping: TendererMappingDto | null;
}

export function EditTendererModal({ isOpen, onClose, tenderId, mapping }: EditTendererModalProps) {
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TendererMappingUpdateInput>({
    resolver: zodResolver(TendererMappingUpdateSchema),
    defaultValues: {
      tenderId,
      tendererId: mapping?.tendererId || 0,
      mailId: '',
      passwordStatus: mapping?.passwordStatus || 'OK',
      chargeAmount: mapping?.chargeAmount || 2000,
      lessPercentage: mapping?.lessPercentage ?? null,
      liquid1Status: mapping?.liquid1Status ?? false,
      liquid2Status: mapping?.liquid2Status ?? false,
      liquid3Status: mapping?.liquid3Status ?? false,
      jvcaStatus: mapping?.jvcaStatus ?? false,
      submitStatus: mapping?.submitStatus ?? false,
      fillStatus: mapping?.fillStatus ?? false,
      mapStatus: mapping?.mapStatus ?? false,
      rateStatus: mapping?.rateStatus ?? false,
    },
  });

  useEffect(() => {
    if (mapping && isOpen) {
      reset({
        tenderId,
        tendererId: mapping.tendererId,
        mailId: '',
        passwordStatus: mapping.passwordStatus || 'OK',
        chargeAmount: mapping.chargeAmount || 2000,
        lessPercentage: mapping.lessPercentage ?? null,
        liquid1Status: mapping.liquid1Status ?? false,
        liquid2Status: mapping.liquid2Status ?? false,
        liquid3Status: mapping.liquid3Status ?? false,
        jvcaStatus: mapping.jvcaStatus ?? false,
        submitStatus: mapping.submitStatus ?? false,
        fillStatus: mapping.fillStatus ?? false,
        mapStatus: mapping.mapStatus ?? false,
        rateStatus: mapping.rateStatus ?? false,
      });
      setServerError(null);
    }
  }, [mapping, isOpen, tenderId, reset]);

  const onSubmit = (data: TendererMappingUpdateInput) => {
    setServerError(null);

    startTransition(async () => {
      const res = await updateTendererAction(data);
      if (res.success) {
        toast.success(res.message || 'License updated successfully.');
        onClose();
      } else {
        toast.error(res.message || 'Failed to update license.');
        setServerError(res.message);
      }
    });
  };

  if (!mapping) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Edit License Settings for ${mapping.tendererName}`}
      subtitle={`Username: ${mapping.username} | Password: ${mapping.password || '—'}`}
      maxWidth="680px"
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {serverError && (
          <div
            style={{
              padding: '0.65rem 0.85rem',
              backgroundColor: 'rgba(244, 63, 94, 0.15)',
              border: '1px solid rgba(244, 63, 94, 0.3)',
              borderRadius: '8px',
              color: '#fb7185',
              fontSize: '0.825rem',
            }}
          >
            {serverError}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem' }}>
          <Input
            label="Charge (৳) - Adjusts client balance automatically"
            type="number"
            step="any"
            {...register('chargeAmount', { valueAsNumber: true })}
            error={errors.chargeAmount?.message}
          />
          <Input
            label="Less %"
            type="number"
            step="0.001"
            placeholder="e.g. 9.272"
            {...register('lessPercentage', {
              setValueAs: (v) => (!v || v === '' ? null : Number(v)),
            })}
            error={errors.lessPercentage?.message}
          />
        </div>

        <Input
          label="Password Status (or Custom Text)"
          placeholder="OK"
          {...register('passwordStatus')}
          error={errors.passwordStatus?.message}
        />

        {/* Checkbox toggles */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '0.75rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8' }}>
            Checklist Flags (Tick or Untick):
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {[
              { id: 'liquid1Status', label: 'Liquid 1' },
              { id: 'liquid2Status', label: 'Liquid 2' },
              { id: 'liquid3Status', label: 'Liquid 3' },
              { id: 'jvcaStatus', label: 'JVCA' },
              { id: 'fillStatus', label: 'Fill' },
              { id: 'mapStatus', label: 'Map' },
              { id: 'rateStatus', label: 'Rate' },
              { id: 'submitStatus', label: 'Submit' },
            ].map((f) => (
              <label
                key={f.id}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.8rem',
                  color: '#cbd5e1',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="checkbox"
                  {...register(f.id as any)}
                  style={{ accentColor: '#38bdf8' }}
                />
                {f.label}
              </label>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
          <Button type="button" variant="secondary" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isPending}>
            Save License Settings
          </Button>
        </div>
      </form>
    </Modal>
  );
}

// -------------------------------------------------------------
// 5. RECORD PAYMENT MODAL (Per Tenderer Payment)
// -------------------------------------------------------------
interface RecordPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  tenderId: number;
  tenderRef: string;
  tendererId?: number | null;
  tendererName?: string;
  dueAmount: number;
}

export function RecordPaymentModal({
  isOpen,
  onClose,
  tenderId,
  tenderRef,
  tendererId,
  tendererName,
  dueAmount,
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
      tendererId: tendererId || null,
      amountPaid: dueAmount > 0 ? dueAmount : 2000,
      paymentDateUtc: today,
      paymentMethod: 'Cash',
      remarks: 'Payment cleared',
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        tenderId,
        tendererId: tendererId || null,
        amountPaid: dueAmount > 0 ? dueAmount : 2000,
        paymentDateUtc: today,
        paymentMethod: 'Cash',
        remarks: 'Payment cleared',
      });
      setServerError(null);
    }
  }, [isOpen, tenderId, tendererId, dueAmount, reset, today]);

  const onSubmit = (data: TenderPaymentCreateInput) => {
    setServerError(null);

    startTransition(async () => {
      const res = await recordPaymentAction(data);
      if (!res.success) {
        toast.error(res.message || 'Payment failed.');
        setServerError(res.message);
      } else {
        toast.success(res.message || 'Payment recorded securely.');
        onClose();
      }
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Record License Payment"
      subtitle={`Tender #${tenderRef}${tendererName ? ` | License: ${tendererName}` : ''}`}
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {serverError && (
          <div
            style={{
              padding: '0.65rem 0.85rem',
              backgroundColor: 'rgba(244, 63, 94, 0.15)',
              border: '1px solid rgba(244, 63, 94, 0.3)',
              borderRadius: '8px',
              color: '#fb7185',
              fontSize: '0.825rem',
            }}
          >
            {serverError}
          </div>
        )}

        <div
          style={{
            padding: '0.85rem',
            backgroundColor: 'rgba(15, 23, 42, 0.7)',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Outstanding Due for License:</span>
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
          placeholder="e.g. Paid in full"
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

export { RecordPaymentModal as TenderPaymentModal };
