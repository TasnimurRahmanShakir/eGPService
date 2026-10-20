'use client';

import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Modal, Input, Select } from '@egp/ui';
import { Lock, AlertCircle } from 'lucide-react';
import {
  ClientCreateSchema,
  ClientUpdateSchema,
  ClientSubscriptionCreateSchema,
  type ClientCreateInput,
  type ClientUpdateInput,
  type ClientSubscriptionCreateInput
} from '@egp/schema';
import type { ClientDto } from '@egp/api-client';
import { createClientAction, updateClientAction, addSubscriptionAction } from '../../app/actions/clientActions';
import { localInputToUtcIso } from '@/lib/date-utils';

interface CreateClientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateClientModal({ isOpen, onClose }: CreateClientModalProps) {
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClientCreateInput>({
    resolver: zodResolver(ClientCreateSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      openingBalance: 0,
      openingBalanceType: 0,
    },
  });

  const onSubmit = (data: ClientCreateInput) => {
    setServerError(null);
    startTransition(async () => {
      const res = await createClientAction(data);
      if (res.success) {
        reset();
        onClose();
      } else {
        setServerError(res.message);
      }
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Client" subtitle="Register a new procurement client with opening balance">
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {serverError && (
          <div style={{ padding: '0.65rem 0.85rem', backgroundColor: 'var(--danger-bg, #FFF1F2)', border: '1px solid var(--danger-border, #FECDD3)', borderRadius: '8px', color: 'var(--danger, #BE123C)', fontSize: '0.825rem' }}>
            {serverError}
          </div>
        )}

        <Input
          label="Client / Firm Name"
          placeholder="e.g. Sun, Mijan"
          {...register('name')}
          error={errors.name?.message}
        />

        <div className="modal-form-grid-even">
          <Input
            label="Phone Number"
            placeholder="e.g. +8801700000000"
            {...register('phone')}
            error={errors.phone?.message}
          />
          <Input
            label="Email Address"
            placeholder="e.g. client@example.com"
            {...register('email')}
            error={errors.email?.message}
          />
        </div>

        <div className="modal-form-grid-2">
          <Input
            label="Opening Balance (Amount)"
            type="number"
            step="any"
            placeholder="0.00"
            {...register('openingBalance', { valueAsNumber: true })}
            error={errors.openingBalance?.message}
          />
          <Select
            label="Balance Type"
            options={[
              { value: 0, label: 'Advance (জমা)' },
              { value: 1, label: 'Due (বকেয়া)' },
            ]}
            {...register('openingBalanceType', { valueAsNumber: true })}
            error={errors.openingBalanceType?.message}
          />
        </div>

        <div className="modal-form-actions">
          <Button type="button" variant="secondary" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isPending}>
            Create Client
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export interface EditClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: ClientDto | null;
}

export function EditClientModal({ isOpen, onClose, client }: EditClientModalProps) {
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const canEditOpeningBalance = client ? client.canEditOpeningBalance !== false : true;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClientUpdateInput>({
    resolver: zodResolver(ClientUpdateSchema),
    defaultValues: {
      id: client?.id || 0,
      name: client?.name || '',
      phone: client?.phone || '',
      email: client?.email || '',
      openingBalance: client?.openingBalance ?? 0,
      openingBalanceType: client?.openingBalanceType ?? 0,
    },
  });

  React.useEffect(() => {
    if (client) {
      reset({
        id: client.id,
        name: client.name,
        phone: client.phone || '',
        email: client.email || '',
        openingBalance: client.openingBalance ?? 0,
        openingBalanceType: client.openingBalanceType ?? 0,
      });
      setServerError(null);
    }
  }, [client, reset]);

  if (!client) return null;

  const onSubmit = (data: ClientUpdateInput) => {
    setServerError(null);
    startTransition(async () => {
      const payload: ClientUpdateInput = {
        id: client.id,
        name: data.name,
        phone: data.phone || '',
        email: data.email || '',
        ...(canEditOpeningBalance
          ? {
              openingBalance: data.openingBalance,
              openingBalanceType: data.openingBalanceType,
            }
          : {}),
      };
      const res = await updateClientAction(payload);
      if (res.success) {
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
      title="Edit Client"
      subtitle={`Update profile and opening account details for #${client.id} - ${client.name}`}
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

        <Input
          label="Client / Firm Name"
          placeholder="e.g. Sun, Mijan"
          {...register('name')}
          error={errors.name?.message}
        />

        <div className="modal-form-grid-even">
          <Input
            label="Phone Number"
            placeholder="e.g. +8801700000000"
            {...register('phone')}
            error={errors.phone?.message}
          />
          <Input
            label="Email Address"
            placeholder="e.g. client@example.com"
            {...register('email')}
            error={errors.email?.message}
          />
        </div>

        {/* Opening Balance Section with Status Indicator */}
        <div
          style={{
            padding: '0.75rem',
            borderRadius: '8px',
            backgroundColor: canEditOpeningBalance ? '#F8FAFC' : '#FFFBEB',
            border: `1px solid ${canEditOpeningBalance ? '#E2E8F0' : '#FDE68A'}`,
          }}
        >
          {!canEditOpeningBalance && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginBottom: '0.65rem',
                color: '#B45309',
                fontSize: '0.75rem',
                fontWeight: 600,
              }}
            >
              <Lock size={14} />
              <span>Opening balance is locked because this client has participated in tenders or has recorded transactions.</span>
            </div>
          )}

          <div className="modal-form-grid-2">
            <Input
              label="Opening Balance (Amount)"
              type="number"
              step="any"
              placeholder="0.00"
              disabled={!canEditOpeningBalance}
              {...register('openingBalance', { valueAsNumber: true })}
              error={errors.openingBalance?.message}
            />
            <Select
              label="Balance Type"
              disabled={!canEditOpeningBalance}
              options={[
                { value: 0, label: 'Advance (জমা)' },
                { value: 1, label: 'Due (বকেয়া)' },
              ]}
              {...register('openingBalanceType', { valueAsNumber: true })}
              error={errors.openingBalanceType?.message}
            />
          </div>
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

interface AddSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientId: number;
  clientName: string;
}

export function AddSubscriptionModal({ isOpen, onClose, clientId, clientName }: AddSubscriptionModalProps) {
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const pad = (n: number) => String(n).padStart(2, '0');
  const now = new Date();
  const today = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const nextYearDate = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
  const nextYear = `${nextYearDate.getFullYear()}-${pad(nextYearDate.getMonth() + 1)}-${pad(nextYearDate.getDate())}`;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClientSubscriptionCreateInput>({
    resolver: zodResolver(ClientSubscriptionCreateSchema),
    defaultValues: {
      clientId,
      solutionName: 'eGP Auto Bidding Solution (Pro)',
      startDateUtc: today,
      validUptoUtc: nextYear,
      invoiceAmount: 15000,
      isPaid: true,
    },
  });

  const onSubmit = (data: ClientSubscriptionCreateInput) => {
    setServerError(null);
    startTransition(async () => {
      const payload = {
        ...data,
        clientId,
        startDateUtc: localInputToUtcIso(data.startDateUtc),
        validUptoUtc: localInputToUtcIso(data.validUptoUtc),
      };
      const res = await addSubscriptionAction(payload);
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
      title="Add Solution Subscription"
      subtitle={`Configure software purchase and validity cycle for ${clientName}`}
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {serverError && (
          <div style={{ padding: '0.65rem 0.85rem', backgroundColor: 'var(--danger-bg, #FFF1F2)', border: '1px solid var(--danger-border, #FECDD3)', borderRadius: '8px', color: 'var(--danger, #BE123C)', fontSize: '0.825rem' }}>
            {serverError}
          </div>
        )}

        <Input
          label="Solution / Package Name"
          placeholder="e.g. eGP Bidding Solution"
          {...register('solutionName')}
          error={errors.solutionName?.message}
        />

        <div className="modal-form-grid-even">
          <Input
            label="Start Date"
            type="date"
            {...register('startDateUtc')}
            error={errors.startDateUtc?.message}
          />
          <Input
            label="Valid Upto Date"
            type="date"
            {...register('validUptoUtc')}
            error={errors.validUptoUtc?.message}
          />
        </div>

        <div className="modal-form-grid-2">
          <Input
            label="Invoice Amount (৳)"
            type="number"
            step="any"
            {...register('invoiceAmount', { valueAsNumber: true })}
            error={errors.invoiceAmount?.message}
          />
          <Select
            label="Invoice Status"
            options={[
              { value: 'true', label: 'Paid (পরিশোধিত)' },
              { value: 'false', label: 'Unpaid (বকেয়া)' },
            ]}
            {...register('isPaid', {
              setValueAs: (v) => v === 'true' || v === true,
            })}
          />
        </div>

        <div className="modal-form-actions">
          <Button type="button" variant="secondary" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" variant="emerald" isLoading={isPending}>
            Activate Solution
          </Button>
        </div>
      </form>
    </Modal>
  );
}
