'use client';

import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Modal, Input, Select } from '@egp/ui';
import {
  ClientCreateSchema,
  ClientSubscriptionCreateSchema,
  type ClientCreateInput,
  type ClientSubscriptionCreateInput
} from '@egp/schema';
import { createClientAction, addSubscriptionAction } from '../../app/actions/clientActions';

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

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem' }}>
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

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.75rem' }}>
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

interface AddSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientId: number;
  clientName: string;
}

export function AddSubscriptionModal({ isOpen, onClose, clientId, clientName }: AddSubscriptionModalProps) {
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const today = new Date().toISOString().split('T')[0];
  const nextYear = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

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
      const res = await addSubscriptionAction({ ...data, clientId });
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

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem' }}>
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

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.75rem' }}>
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
