'use client';

import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { Button, Modal, Input } from '@egp/ui';
import {
  TendererCreateSchema,
  TendererUpdateSchema,
  type TendererCreateInput,
  type TendererUpdateInput
} from '@egp/schema';
import type { TendererDto } from '@egp/api-client';
import { createTendererAction, updateTendererAction } from '../../app/actions/tendererActions';

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

export interface EditTendererModalProps {
  isOpen: boolean;
  onClose: () => void;
  tenderer: TendererDto | null;
}

export function EditTendererModal({ isOpen, onClose, tenderer }: EditTendererModalProps) {
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TendererUpdateInput>({
    resolver: zodResolver(TendererUpdateSchema),
    defaultValues: {
      id: tenderer?.id || 0,
      name: tenderer?.name || '',
      username: tenderer?.username || '',
      password: tenderer?.password || '',
    },
  });

  React.useEffect(() => {
    if (tenderer) {
      reset({
        id: tenderer.id,
        name: tenderer.name,
        username: tenderer.username,
        password: tenderer.password || '',
      });
      setShowPassword(false);
      setServerError(null);
    }
  }, [tenderer, reset]);

  if (!tenderer) return null;

  const onSubmit = (data: TendererUpdateInput) => {
    setServerError(null);
    startTransition(async () => {
      const res = await updateTendererAction(data);
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
      title="Edit e-GP License Account"
      subtitle={`Update credentials and bidder name for #${tenderer.id} - ${tenderer.name}`}
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

        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
            <label
              style={{
                fontSize: '0.815rem',
                fontWeight: 600,
                color: 'var(--foreground-secondary, #475569)',
              }}
            >
              Account Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                background: 'none',
                border: 'none',
                color: '#0F766E',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '2px 4px',
              }}
            >
              {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              {showPassword ? 'Hide Password' : 'Show Password'}
            </button>
          </div>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter password..."
            helperText="Stored with AES-GCM encryption. Leave unchanged to keep current password."
            {...register('password')}
            error={errors.password?.message}
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
