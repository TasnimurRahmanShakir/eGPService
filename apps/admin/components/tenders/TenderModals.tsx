'use client';

import React, { useState, useTransition, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button, Modal, Input, Select, Combobox, MoneyDisplay } from '@egp/ui';
import {
  TenderCreateSchema,
  TenderUpdateSchema,
  TenderClientAddSchema,
  TendererAddToTenderSchema,
  TendererMappingUpdateSchema,
  TenderPaymentCreateSchema,
  type TenderCreateInput,
  type TenderUpdateInput,
  type TenderClientAddInput,
  type TendererAddToTenderInput,
  type TendererMappingUpdateInput,
  type TenderPaymentCreateInput,
} from '@egp/schema';
import type { ClientDto, TendererDto, TenderDto, TendererMappingDto } from '@egp/api-client';
import {
  createTenderAction,
  updateTenderAction,
  addClientToTenderAction,
  addTendererToTenderAction,
  updateTendererAction,
  recordPaymentAction,
  fetchTendererOptionsAction,
} from '../../app/actions/tenderActions';
import { fetchClientOptionsAction } from '../../app/actions/clientActions';
import { toLocalDatetimeInput, localInputToUtcIso } from '@/lib/date-utils';

// -------------------------------------------------------------
// 1. CREATE TENDER MODAL
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
  const closingDefault = toLocalDatetimeInput(new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000));

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
      liquidAssetAmount: null,
      appCode: '',
    },
  });

  const clientId = watch('clientId');

  const onSubmit = (data: TenderCreateInput) => {
    setServerError(null);

    startTransition(async () => {
      const payload = {
        ...data,
        closingDateTimeUtc: localInputToUtcIso(data.closingDateTimeUtc),
      };
      const res = await createTenderAction(payload);
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
      subtitle="Enter tender schedule, department, and optional initial client assignment"
      maxWidth="680px"
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {serverError && (
          <div
            style={{
              padding: '0.65rem 0.85rem',
              backgroundColor: 'var(--danger-bg, #FFF1F2)',
              border: '1px solid var(--danger-border, #FECDD3)',
              borderRadius: '8px',
              color: 'var(--danger, #BE123C)',
              fontSize: '0.825rem',
            }}
          >
            {serverError}
          </div>
        )}

        <div className="modal-form-grid-2">
          <Input
            label="Tender ID / Ref Number (Mandatory & Unique)"
            placeholder="e.g. 1325138"
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

        <div className="modal-form-grid-2">
          <Input
            label="Department"
            placeholder="e.g. EED, Jessore"
            {...register('department')}
            error={errors.department?.message}
          />
          <Combobox
            label="Initial Client (Optional - Can add multiple later)"
            placeholder="Search or select client..."
            searchPlaceholder="Type client name or phone..."
            value={clientId}
            onChange={(val) => setValue('clientId', val ? Number(val) : null)}
            onOpenFetch={fetchClientOptionsAction}
            error={errors.clientId?.message}
          />
        </div>

        <div className="modal-form-grid-2">
          <Input
            label="Liquid Assets (৳) (Optional)"
            type="number"
            step="any"
            placeholder="e.g. 20000000"
            {...register('liquidAssetAmount', {
              setValueAs: (v) => (!v || v === '' || isNaN(Number(v)) ? null : Number(v)),
            })}
            error={errors.liquidAssetAmount?.message}
          />
          <Input
            label="APP Code (Optional)"
            placeholder="e.g. 127023000"
            {...register('appCode', {
              setValueAs: (v) => (!v ? '' : v),
            })}
            error={errors.appCode?.message}
          />
        </div>

        <div className="modal-form-actions">
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
// 2. EDIT TENDER MODAL (Tender general details)
// -------------------------------------------------------------
interface EditTenderModalProps {
  isOpen: boolean;
  onClose: () => void;
  tender: TenderDto | null;
  clients?: ClientDto[];
}

export function EditTenderModal({ isOpen, onClose, tender }: EditTenderModalProps) {
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TenderUpdateInput>({
    resolver: zodResolver(TenderUpdateSchema),
    defaultValues: {
      id: tender?.id || 0,
      tenderId: tender?.tenderId || '',
      closingDateTimeUtc: toLocalDatetimeInput(tender?.closingDateTimeUtc),
      department: tender?.department || '',
      clientId: tender?.clientId || null,
      liquidAssetAmount: tender?.liquidAssetAmount ?? null,
      appCode: tender?.appCode || '',
    },
  });

  useEffect(() => {
    if (tender && isOpen) {
      reset({
        id: tender.id,
        tenderId: tender.tenderId,
        closingDateTimeUtc: toLocalDatetimeInput(tender.closingDateTimeUtc),
        department: tender.department,
        clientId: tender.clientId || null,
        liquidAssetAmount: tender.liquidAssetAmount ?? null,
        appCode: tender.appCode || '',
      });
      setServerError(null);
    }
  }, [tender, isOpen, reset]);

  const onSubmit = (data: TenderUpdateInput) => {
    setServerError(null);

    startTransition(async () => {
      const payload = {
        ...data,
        closingDateTimeUtc: localInputToUtcIso(data.closingDateTimeUtc),
      };
      const res = await updateTenderAction(payload);
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
      subtitle="Modify tender schedule, department, liquid asset, or APP code"
      maxWidth="680px"
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {serverError && (
          <div
            style={{
              padding: '0.65rem 0.85rem',
              backgroundColor: 'var(--danger-bg, #FFF1F2)',
              border: '1px solid var(--danger-border, #FECDD3)',
              borderRadius: '8px',
              color: 'var(--danger, #BE123C)',
              fontSize: '0.825rem',
            }}
          >
            {serverError}
          </div>
        )}

        <div className="modal-form-grid-2">
          <Input
            label="Tender ID / Ref Number"
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

        <div className="modal-form-grid-2">
          <Input
            label="Department"
            {...register('department')}
            error={errors.department?.message}
          />
          <Input
            label="APP Code (Optional)"
            placeholder="e.g. 127023000"
            {...register('appCode', {
              setValueAs: (v) => (!v ? '' : v),
            })}
            error={errors.appCode?.message}
          />
        </div>

        <div className="modal-form-grid-2">
          <Input
            label="Liquid Assets (৳) (Optional)"
            type="number"
            step="any"
            placeholder="e.g. 20000000"
            {...register('liquidAssetAmount', {
              setValueAs: (v) => (!v || v === '' || isNaN(Number(v)) ? null : Number(v)),
            })}
            error={errors.liquidAssetAmount?.message}
          />
        </div>

        <div className="modal-form-actions">
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
// 3. ADD CLIENT TO TENDER MODAL (Multiple Clients per Tender)
// -------------------------------------------------------------
interface AddClientToTenderModalProps {
  isOpen: boolean;
  onClose: () => void;
  tender: TenderDto | null;
}

export function AddClientToTenderModal({ isOpen, onClose, tender }: AddClientToTenderModalProps) {
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TenderClientAddInput>({
    resolver: zodResolver(TenderClientAddSchema),
    defaultValues: {
      tenderId: tender?.id || 0,
      clientId: 0,
    },
  });

  const clientId = watch('clientId');

  useEffect(() => {
    if (tender && isOpen) {
      reset({
        tenderId: tender.id,
        clientId: 0,
      });
      setServerError(null);
    }
  }, [tender, isOpen, reset]);

  const fetchAvailableClients = async () => {
    const all = await fetchClientOptionsAction();
    const assignedIds = (tender?.clients || []).map((c) => c.clientId);
    return all.filter((c) => !assignedIds.includes(Number(c.value)));
  };

  const onSubmit = (data: TenderClientAddInput) => {
    setServerError(null);

    startTransition(async () => {
      const res = await addClientToTenderAction(data);
      if (res.success) {
        toast.success(res.message || 'Client added to tender successfully.');
        onClose();
      } else {
        toast.error(res.message || 'Failed to add client.');
        setServerError(res.message);
      }
    });
  };

  if (!tender) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Add Client to Tender #${tender.tenderId}`}
      subtitle="Select a client to participate in this tender"
      maxWidth="540px"
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {serverError && (
          <div
            style={{
              padding: '0.65rem 0.85rem',
              backgroundColor: 'var(--danger-bg, #FFF1F2)',
              border: '1px solid var(--danger-border, #FECDD3)',
              borderRadius: '8px',
              color: 'var(--danger, #BE123C)',
              fontSize: '0.825rem',
            }}
          >
            {serverError}
          </div>
        )}

        <Combobox
          label="Select Client *"
          placeholder="Search and select client..."
          searchPlaceholder="Type client name or phone..."
          value={clientId || null}
          onChange={(val) => setValue('clientId', Number(val))}
          onOpenFetch={fetchAvailableClients}
          error={errors.clientId?.message}
        />

        <div className="modal-form-actions">
          <Button type="button" variant="secondary" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isPending} disabled={!clientId}>
            Assign Client
          </Button>
        </div>
      </form>
    </Modal>
  );
}

// -------------------------------------------------------------
// TRI-STATE SEGMENTED TOGGLE (OK / NO / N/A)
// -------------------------------------------------------------
interface TriStateToggleProps {
  label: string;
  value: boolean | null | undefined;
  onChange: (val: boolean | null) => void;
}

function TriStateToggle({ label, value, onChange }: TriStateToggleProps) {
  const isOk = value === true;
  const isNo = value === false;
  const isNa = value === null || value === undefined;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--foreground, #1F2937)' }}>
        {label}
      </span>
      <div
        style={{
          display: 'inline-flex',
          backgroundColor: '#E2E8F0',
          padding: '3px',
          borderRadius: '8px',
          border: '1px solid #CBD5E1',
          width: 'fit-content',
          boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.05)',
        }}
      >
        <button
          type="button"
          onClick={() => onChange(true)}
          style={{
            padding: '4px 11px',
            fontSize: '0.75rem',
            fontWeight: 800,
            borderRadius: '6px',
            border: 'none',
            backgroundColor: isOk ? '#059669' : 'transparent',
            color: isOk ? '#FFFFFF' : '#64748B',
            boxShadow: isOk ? '0 2px 4px rgba(5, 150, 105, 0.35)' : 'none',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '3px',
          }}
        >
          {isOk && <span style={{ fontSize: '0.8rem' }}>✓</span>} OK
        </button>
        <button
          type="button"
          onClick={() => onChange(false)}
          style={{
            padding: '4px 11px',
            fontSize: '0.75rem',
            fontWeight: 800,
            borderRadius: '6px',
            border: 'none',
            backgroundColor: isNo ? '#DC2626' : 'transparent',
            color: isNo ? '#FFFFFF' : '#64748B',
            boxShadow: isNo ? '0 2px 4px rgba(220, 38, 38, 0.35)' : 'none',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '3px',
          }}
        >
          {isNo && <span style={{ fontSize: '0.8rem' }}>✕</span>} NO
        </button>
        <button
          type="button"
          onClick={() => onChange(null)}
          style={{
            padding: '4px 11px',
            fontSize: '0.75rem',
            fontWeight: 800,
            borderRadius: '6px',
            border: 'none',
            backgroundColor: isNa ? '#475569' : 'transparent',
            color: isNa ? '#FFFFFF' : '#64748B',
            boxShadow: isNa ? '0 2px 4px rgba(71, 85, 105, 0.35)' : 'none',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '3px',
          }}
        >
          {isNa && <span style={{ fontSize: '0.8rem' }}>—</span>} N/A
        </button>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 4. ADD TENDERER MODAL (Multiple Licenses per Client)
// -------------------------------------------------------------
interface AddTendererModalProps {
  isOpen: boolean;
  onClose: () => void;
  tender: TenderDto | null;
  defaultClientId?: number | null;
  tenderers?: TendererDto[];
}

export function AddTendererModal({ isOpen, onClose, tender, defaultClientId }: AddTendererModalProps) {
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const initialClientId = defaultClientId || tender?.clients?.[0]?.clientId || (tender?.clientId ?? 0);

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
      clientId: initialClientId,
      tendererId: 0,
      mailId: '',
      chargeAmount: 3000,
      lessPercentage: null,
      liquid1Status: null,
      liquid2Status: null,
      liquid3Status: null,
      jvcaStatus: null,
      submitStatus: null,
      fillStatus: null,
      mapStatus: null,
      rateStatus: null,
    },
  });

  const clientId = watch('clientId');
  const tendererId = watch('tendererId');

  const fetchAvailableTenderers = async () => {
    const all = await fetchTendererOptionsAction();
    const assignedIds = (tender?.tenderers || []).map((m) => m.tendererId);
    return all.filter((t) => !assignedIds.includes(Number(t.value)));
  };

  useEffect(() => {
    if (tender && isOpen) {
      const cId = defaultClientId || tender.clients?.[0]?.clientId || (tender.clientId ?? 0);
      reset({
        tenderId: tender.id,
        clientId: cId,
        tendererId: 0,
        mailId: '',
        chargeAmount: 3000,
        lessPercentage: null,
        liquid1Status: null,
        liquid2Status: null,
        liquid3Status: null,
        jvcaStatus: null,
        submitStatus: null,
        fillStatus: null,
        mapStatus: null,
        rateStatus: null,
      });
      setServerError(null);
    }
  }, [tender, defaultClientId, isOpen, reset]);

  const onSubmit = (data: TendererAddToTenderInput) => {
    setServerError(null);

    startTransition(async () => {
      const res = await addTendererToTenderAction(data);
      if (res.success) {
        toast.success(res.message || 'License added to client successfully.');
        onClose();
      } else {
        toast.error(res.message || 'Failed to add license.');
        setServerError(res.message);
      }
    });
  };

  if (!tender) return null;

  const clientOptions = (tender.clients || []).map((c) => ({
    value: c.clientId,
    label: c.clientName,
    subLabel: c.phone ? `Phone: ${c.phone}` : undefined,
  }));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnBackdropClick={false}
      title={`Add eGP License | Tender #${tender.tenderId}`}
      subtitle="Select the participating client and assign an eGP license"
      maxWidth="680px"
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {serverError && (
          <div
            style={{
              padding: '0.65rem 0.85rem',
              backgroundColor: 'var(--danger-bg, #FFF1F2)',
              border: '1px solid var(--danger-border, #FECDD3)',
              borderRadius: '8px',
              color: 'var(--danger, #BE123C)',
              fontSize: '0.825rem',
            }}
          >
            {serverError}
          </div>
        )}

        <div className="modal-form-grid-2">
          {clientOptions.length > 1 ? (
            <Select
              label="Assigned Client *"
              value={clientId ? String(clientId) : ''}
              onChange={(e) => setValue('clientId', Number(e.target.value))}
              error={errors.clientId?.message}
              placeholder="-- Choose Client --"
              options={clientOptions.map((c) => ({ value: c.value, label: c.label }))}
            />
          ) : (
            <Input
              label="Assigned Client"
              disabled
              value={tender.clients?.[0]?.clientName || tender.clientName || 'Assigned Client'}
            />
          )}

          <Combobox
            label="eGP License / Tenderer *"
            placeholder="Search license..."
            searchPlaceholder="Type name or username..."
            value={tendererId || null}
            onChange={(val) => setValue('tendererId', Number(val))}
            onOpenFetch={fetchAvailableTenderers}
            error={errors.tendererId?.message}
          />
        </div>

        <div className="modal-form-grid-2">
          <Input
            label="Service Charge (৳) *"
            type="number"
            step="any"
            placeholder="2000"
            {...register('chargeAmount', { valueAsNumber: true })}
            error={errors.chargeAmount?.message}
          />
          <Input
            label="e-GP Mail ID (Optional)"
            placeholder="e.g. tender@company.com"
            {...register('mailId')}
            error={errors.mailId?.message}
          />
        </div>

        {/* 3 Fixed Liquid Columns */}
        <div>
          <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--foreground, #1F2937)', marginBottom: '0.5rem', display: 'block' }}>
            Liquid Verification Status
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.85rem', backgroundColor: 'var(--surface-subtle, #F8FAFC)', padding: '0.85rem', borderRadius: '8px', border: '1px solid var(--border, #E2E8F0)' }}>
            <TriStateToggle
              label="Liquid 1"
              value={watch('liquid1Status')}
              onChange={(val) => setValue('liquid1Status', val, { shouldDirty: true })}
            />
            <TriStateToggle
              label="Liquid 2"
              value={watch('liquid2Status')}
              onChange={(val) => setValue('liquid2Status', val, { shouldDirty: true })}
            />
            <TriStateToggle
              label="Liquid 3"
              value={watch('liquid3Status')}
              onChange={(val) => setValue('liquid3Status', val, { shouldDirty: true })}
            />
          </div>
        </div>

        {/* Task Checklist */}
        <div>
          <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--foreground, #1F2937)', marginBottom: '0.5rem', display: 'block' }}>
            Checklist Status
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.85rem', backgroundColor: 'var(--surface-subtle, #F8FAFC)', padding: '0.85rem', borderRadius: '8px', border: '1px solid var(--border, #E2E8F0)' }}>
            <TriStateToggle
              label="JVCA"
              value={watch('jvcaStatus')}
              onChange={(val) => setValue('jvcaStatus', val, { shouldDirty: true })}
            />
            <TriStateToggle
              label="Fill"
              value={watch('fillStatus')}
              onChange={(val) => setValue('fillStatus', val, { shouldDirty: true })}
            />
            <TriStateToggle
              label="Map"
              value={watch('mapStatus')}
              onChange={(val) => setValue('mapStatus', val, { shouldDirty: true })}
            />
            <TriStateToggle
              label="Rate"
              value={watch('rateStatus')}
              onChange={(val) => setValue('rateStatus', val, { shouldDirty: true })}
            />
            <TriStateToggle
              label="Submit"
              value={watch('submitStatus')}
              onChange={(val) => setValue('submitStatus', val, { shouldDirty: true })}
            />
          </div>
        </div>

        <Input
          label="Less Percentage (%) (Optional)"
          type="number"
          step="any"
          placeholder="e.g. 10.5"
          {...register('lessPercentage', {
            setValueAs: (v) => (!v || v === '' || isNaN(Number(v)) ? null : Number(v)),
          })}
          error={errors.lessPercentage?.message}
        />

        <div className="modal-form-actions">
          <Button type="button" variant="secondary" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isPending} disabled={!tendererId}>
            Add License
          </Button>
        </div>
      </form>
    </Modal>
  );
}

// -------------------------------------------------------------
// 5. EDIT TENDERER MODAL
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
    watch,
    setValue,
    formState: { errors },
  } = useForm<TendererMappingUpdateInput>({
    resolver: zodResolver(TendererMappingUpdateSchema),
    defaultValues: {
      tenderId,
      tendererId: mapping?.tendererId || 0,
      clientId: mapping?.clientId,
      mailId: mapping?.mailId || '',
      passwordStatus: mapping?.passwordStatus || 'OK',
      chargeAmount: mapping?.chargeAmount || 3000,
      lessPercentage: mapping?.lessPercentage ?? null,
      liquid1Status: mapping?.liquid1Status ?? null,
      liquid2Status: mapping?.liquid2Status ?? null,
      liquid3Status: mapping?.liquid3Status ?? null,
      jvcaStatus: mapping?.jvcaStatus ?? null,
      submitStatus: mapping?.submitStatus ?? null,
      fillStatus: mapping?.fillStatus ?? null,
      mapStatus: mapping?.mapStatus ?? null,
      rateStatus: mapping?.rateStatus ?? null,
    },
  });

  useEffect(() => {
    if (mapping && isOpen) {
      reset({
        tenderId,
        tendererId: mapping.tendererId,
        clientId: mapping.clientId,
        mailId: mapping.mailId || '',
        passwordStatus: mapping.passwordStatus || 'OK',
        chargeAmount: mapping.chargeAmount ?? 3000,
        lessPercentage: mapping.lessPercentage,
        liquid1Status: mapping.liquid1Status ?? null,
        liquid2Status: mapping.liquid2Status ?? null,
        liquid3Status: mapping.liquid3Status ?? null,
        jvcaStatus: mapping.jvcaStatus ?? null,
        submitStatus: mapping.submitStatus ?? null,
        fillStatus: mapping.fillStatus ?? null,
        mapStatus: mapping.mapStatus ?? null,
        rateStatus: mapping.rateStatus ?? null,
      });
      setServerError(null);
    }
  }, [mapping, tenderId, isOpen, reset]);

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
      closeOnBackdropClick={false}
      title={`Edit License: ${mapping.tendererName}`}
      subtitle={`Username: ${mapping.username}${mapping.clientName ? ` | Client: ${mapping.clientName}` : ''}`}
      maxWidth="680px"
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {serverError && (
          <div
            style={{
              padding: '0.65rem 0.85rem',
              backgroundColor: 'var(--danger-bg, #FFF1F2)',
              border: '1px solid var(--danger-border, #FECDD3)',
              borderRadius: '8px',
              color: 'var(--danger, #BE123C)',
              fontSize: '0.825rem',
            }}
          >
            {serverError}
          </div>
        )}

        <div className="modal-form-grid-2">
          <Input
            label="Service Charge (৳) *"
            type="number"
            step="any"
            {...register('chargeAmount', { valueAsNumber: true })}
            error={errors.chargeAmount?.message}
          />
          <Input
            label="Password Status Override"
            placeholder="OK / NA / Custom note"
            {...register('passwordStatus')}
            error={errors.passwordStatus?.message}
          />
        </div>

        <div className="modal-form-grid-2">
          <Input
            label="e-GP Mail ID"
            placeholder="e.g. tender@company.com"
            {...register('mailId')}
            error={errors.mailId?.message}
          />
          <Input
            label="Less Percentage (%)"
            type="number"
            step="any"
            placeholder="e.g. 10.5"
            {...register('lessPercentage', {
              setValueAs: (v) => (!v || v === '' || isNaN(Number(v)) ? null : Number(v)),
            })}
            error={errors.lessPercentage?.message}
          />
        </div>

        {/* 3 Fixed Liquid Columns */}
        <div>
          <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--foreground, #1F2937)', marginBottom: '0.5rem', display: 'block' }}>
            Liquid Verification Status
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.85rem', backgroundColor: 'var(--surface-subtle, #F8FAFC)', padding: '0.85rem', borderRadius: '8px', border: '1px solid var(--border, #E2E8F0)' }}>
            <TriStateToggle
              label="Liquid 1"
              value={watch('liquid1Status')}
              onChange={(val) => setValue('liquid1Status', val, { shouldDirty: true })}
            />
            <TriStateToggle
              label="Liquid 2"
              value={watch('liquid2Status')}
              onChange={(val) => setValue('liquid2Status', val, { shouldDirty: true })}
            />
            <TriStateToggle
              label="Liquid 3"
              value={watch('liquid3Status')}
              onChange={(val) => setValue('liquid3Status', val, { shouldDirty: true })}
            />
          </div>
        </div>

        {/* Task Checklist */}
        <div>
          <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--foreground, #1F2937)', marginBottom: '0.5rem', display: 'block' }}>
            Checklist Status
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.85rem', backgroundColor: 'var(--surface-subtle, #F8FAFC)', padding: '0.85rem', borderRadius: '8px', border: '1px solid var(--border, #E2E8F0)' }}>
            <TriStateToggle
              label="JVCA"
              value={watch('jvcaStatus')}
              onChange={(val) => setValue('jvcaStatus', val, { shouldDirty: true })}
            />
            <TriStateToggle
              label="Fill"
              value={watch('fillStatus')}
              onChange={(val) => setValue('fillStatus', val, { shouldDirty: true })}
            />
            <TriStateToggle
              label="Map"
              value={watch('mapStatus')}
              onChange={(val) => setValue('mapStatus', val, { shouldDirty: true })}
            />
            <TriStateToggle
              label="Rate"
              value={watch('rateStatus')}
              onChange={(val) => setValue('rateStatus', val, { shouldDirty: true })}
            />
            <TriStateToggle
              label="Submit"
              value={watch('submitStatus')}
              onChange={(val) => setValue('submitStatus', val, { shouldDirty: true })}
            />
          </div>
        </div>

        <div className="modal-form-actions">
          <Button type="button" variant="secondary" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isPending}>
            Update License
          </Button>
        </div>
      </form>
    </Modal>
  );
}

// -------------------------------------------------------------
// 6. RECORD PAYMENT MODAL (Client & License Specific Payment)
// -------------------------------------------------------------
interface RecordPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  tenderId: number;
  tenderRef: string;
  clientId?: number | null;
  clientName?: string;
  tendererId?: number | null;
  tendererName?: string;
  dueAmount: number;
  clients?: { clientId: number; clientName: string }[];
}

export function RecordPaymentModal({
  isOpen,
  onClose,
  tenderId,
  tenderRef,
  clientId,
  clientName,
  tendererId,
  tendererName,
  dueAmount,
  clients,
}: RecordPaymentModalProps) {
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const pad = (n: number) => String(n).padStart(2, '0');
  const now = new Date();
  const today = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;

  const defaultClient = clientId || clients?.[0]?.clientId || 0;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TenderPaymentCreateInput>({
    resolver: zodResolver(TenderPaymentCreateSchema),
    defaultValues: {
      tenderId,
      clientId: defaultClient,
      tendererId: tendererId || null,
      amountPaid: dueAmount > 0 ? dueAmount : 2000,
      paymentDateUtc: today,
      paymentMethod: 'Cash',
      remarks: 'Payment cleared',
    },
  });

  const selectedClientId = watch('clientId');

  useEffect(() => {
    if (isOpen) {
      const cId = clientId || clients?.[0]?.clientId || 0;
      reset({
        tenderId,
        clientId: cId,
        tendererId: tendererId || null,
        amountPaid: dueAmount > 0 ? dueAmount : 2000,
        paymentDateUtc: today,
        paymentMethod: 'Cash',
        remarks: 'Payment cleared',
      });
      setServerError(null);
    }
  }, [isOpen, tenderId, clientId, tendererId, dueAmount, reset, today, clients]);

  const onSubmit = (data: TenderPaymentCreateInput) => {
    setServerError(null);

    startTransition(async () => {
      const payload = {
        ...data,
        paymentDateUtc: localInputToUtcIso(data.paymentDateUtc),
      };
      const res = await recordPaymentAction(payload);
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
      title="Record Payment"
      subtitle={`Tender #${tenderRef}${clientName ? ` | Client: ${clientName}` : ''}${tendererName ? ` (${tendererName})` : ''}`}
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {serverError && (
          <div
            style={{
              padding: '0.65rem 0.85rem',
              backgroundColor: 'var(--danger-bg, #FFF1F2)',
              border: '1px solid var(--danger-border, #FECDD3)',
              borderRadius: '8px',
              color: 'var(--danger, #BE123C)',
              fontSize: '0.825rem',
            }}
          >
            {serverError}
          </div>
        )}

        {clients && clients.length > 1 && !clientId && (
          <Select
            label="Select Client *"
            value={selectedClientId ? String(selectedClientId) : ''}
            onChange={(e) => setValue('clientId', Number(e.target.value))}
            error={errors.clientId?.message}
            placeholder="-- Choose Client --"
            options={clients.map((c) => ({ value: c.clientId, label: c.clientName }))}
          />
        )}

        <div
          style={{
            padding: '0.85rem 1rem',
            backgroundColor: 'var(--surface-subtle, #F1F5F9)',
            borderRadius: 'var(--radius-control, 8px)',
            border: '1px solid var(--border, #E2E8F0)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: '0.875rem', color: 'var(--muted-foreground, #64748B)', fontWeight: 500 }}>
            Outstanding Due:
          </span>
          <MoneyDisplay amount={dueAmount} type="due" size="lg" />
        </div>

        <div className="modal-form-grid-2">
          <Input
            label="Payment Amount (৳) *"
            type="number"
            step="any"
            {...register('amountPaid', { valueAsNumber: true })}
            error={errors.amountPaid?.message}
          />
          <Input
            label="Payment Date *"
            type="date"
            {...register('paymentDateUtc')}
            error={errors.paymentDateUtc?.message}
          />
        </div>

        <div className="modal-form-grid-2">
          <Select
            label="Payment Method *"
            {...register('paymentMethod')}
            error={errors.paymentMethod?.message}
            options={[
              { value: 'Cash', label: 'Cash' },
              { value: 'bKash', label: 'bKash' },
              { value: 'Nagad', label: 'Nagad' },
              { value: 'Rocket', label: 'Rocket' },
              { value: 'Bank Transfer', label: 'Bank Transfer' },
              { value: 'Cheque', label: 'Cheque' },
            ]}
          />
          <Input
            label="Remarks / Reference Note"
            placeholder="e.g. TrxID / Chq # / Cash received"
            {...register('remarks')}
            error={errors.remarks?.message}
          />
        </div>

        <div className="modal-form-actions">
          <Button type="button" variant="secondary" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isPending}>
            Confirm Payment
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export const TenderPaymentModal = RecordPaymentModal;
