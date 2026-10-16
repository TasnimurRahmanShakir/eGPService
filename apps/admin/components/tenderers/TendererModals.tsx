'use client';

import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Modal, Input } from '@egp/ui';
import { TendererCreateSchema, type TendererCreateInput } from '@egp/schema';
import { createTendererAction } from '../../app/actions/tendererActions';

interface CreateTendererModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateTendererModal({ isOpen, onClose }: CreateTendererModalProps) {
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TendererCreateInput>({
    resolver: zodResolver(TendererCreateSchema),
    defaultValues: {
      name: '',
      username: '',
      password: '',
    },
  });

  const onSubmit = (data: TendererCreateInput) => {
    setServerError(null);
    startTransition(async () => {
      const res = await createTendererAction(data);
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
      title="Create e-GP License Account"
      subtitle="Credentials will be securely encrypted with AES-256 on the server"
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {serverError && (
          <div style={{ padding: '0.65rem 0.85rem', backgroundColor: 'var(--danger-bg, #FFF1F2)', border: '1px solid var(--danger-border, #FECDD3)', borderRadius: '8px', color: 'var(--danger, #BE123C)', fontSize: '0.825rem' }}>
            {serverError}
          </div>
        )}

        <Input
          label="License / Firm Name"
          placeholder="e.g. KB, BA, AMIR, GALAXY"
          {...register('name')}
          error={errors.name?.message}
        />

        <Input
          label="e-GP Username"
          placeholder="e.g. license_kb"
          {...register('username')}
          error={errors.username?.message}
        />

        <Input
          label="Account Password"
          type="password"
          placeholder="••••••••"
          helperText="Will be encrypted with AES-GCM before saving into database"
          {...register('password')}
          error={errors.password?.message}
        />

        <div className="modal-form-actions">
          <Button type="button" variant="secondary" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isPending}>
            Save License
          </Button>
        </div>
      </form>
    </Modal>
  );
}
