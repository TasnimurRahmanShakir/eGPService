'use client';

import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Modal, Input } from '@egp/ui';
import { AlertCircle, Sparkles } from 'lucide-react';
import type { TenderSaleDto } from '@egp/api-client';
import { TenderSaleCreateSchema, type TenderSaleCreateInput } from '@egp/schema';
import { createTenderSaleAction, updateTenderSaleAction } from '@/app/actions/tenderSaleActions';
import { parseUtcDate } from '@/lib/date-utils';
import { toast } from 'sonner';

interface TenderSaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  saleToEdit?: TenderSaleDto | null;
  onSuccess?: () => void;
}

export function TenderSaleModal({
  isOpen,
  onClose,
  saleToEdit,
  onSuccess,
}: TenderSaleModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={saleToEdit ? 'Edit Tender Sale' : 'New Tender Sale Entry'}
      maxWidth="860px"
    >
      {isOpen && (
        <TenderSaleForm
          key={saleToEdit?.id ?? 'create'}
          saleToEdit={saleToEdit}
          onClose={onClose}
          onSuccess={onSuccess}
        />
      )}
    </Modal>
  );
}

interface TenderSaleFormProps {
  saleToEdit?: TenderSaleDto | null;
  onClose: () => void;
  onSuccess?: () => void;
}

function TenderSaleForm({ saleToEdit, onClose, onSuccess }: TenderSaleFormProps) {
  const isEdit = Boolean(saleToEdit);
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  // Helper to format UTC Date to user's local YYYY-MM-DD
  const getInitialLocalDate = (utcDateStr?: string | null): string => {
    if (!utcDateStr) {
      const now = new Date();
      const y = now.getFullYear();
      const m = String(now.getMonth() + 1).padStart(2, '0');
      const d = String(now.getDate()).padStart(2, '0');
      return `${y}-${m}-${d}`;
    }
    const d = parseUtcDate(utcDateStr);
    if (!d) return '';
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<TenderSaleCreateInput>({
    resolver: zodResolver(TenderSaleCreateSchema),
    defaultValues: {
      date: getInitialLocalDate(saleToEdit?.date),
      organization: saleToEdit?.organization ?? '',
      tenderId: saleToEdit?.tenderId ?? '',
      license: saleToEdit?.license ?? '',
      documentFee: saleToEdit?.documentFee ?? 0,
      paymentBy: saleToEdit?.paymentBy ?? '',
      ts: saleToEdit?.ts ?? 0,
      margin: saleToEdit?.margin ?? 0,
      commission: saleToEdit?.commission ?? 0,
      cs: saleToEdit?.cs ?? 0,
      pg: saleToEdit?.pg ?? 0,
      tenderWinner: saleToEdit?.tenderWinner ?? '',
      noa: saleToEdit?.noa ?? '',
      sell: saleToEdit?.sell ?? 0,
      totalInvest: saleToEdit?.totalInvest ?? 0,
      profit: saleToEdit?.profit ?? 0,
      paid: saleToEdit?.paid ?? 0,
      due: saleToEdit?.due ?? 0,
      soldClient: saleToEdit?.soldClient ?? '',
      remarks: saleToEdit?.remarks ?? '',
    },
  });

  const onFeeOrCommissionOrCsChange = () => {
    const values = getValues();
    const fee = Number(values.documentFee) || 0;
    const comm = Number(values.commission) || 0;
    const cs = Number(values.cs) || 0;
    const newInvest = Math.max(0, fee + comm + cs);

    setValue('totalInvest', newInvest);

    const sell = Number(values.sell) || 0;
    if (sell > 0) {
      setValue('profit', sell - newInvest);
    }
  };

  const onSellChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    const sellNum = rawVal === '' ? 0 : Math.max(0, Number(rawVal));

    setValue('sell', sellNum, { shouldValidate: true });

    const values = getValues();
    const currentInvest = Number(values.totalInvest) || 0;
    const currentPaid = Number(values.paid) || 0;

    if (sellNum > 0) {
      setValue('profit', sellNum - currentInvest);
      setValue('due', Math.max(0, sellNum - currentPaid));
    } else {
      setValue('profit', 0);
      setValue('due', 0);
    }
  };

  const onPaidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    const paidNum = rawVal === '' ? 0 : Math.max(0, Number(rawVal));

    setValue('paid', paidNum, { shouldValidate: true });

    const values = getValues();
    const sell = Number(values.sell) || 0;
    if (sell > 0) {
      setValue('due', Math.max(0, sell - paidNum));
    }
  };

  const applyAutoCalculations = () => {
    const values = getValues();
    const fee = Number(values.documentFee) || 0;
    const comm = Number(values.commission) || 0;
    const cs = Number(values.cs) || 0;
    const newInvest = Math.max(0, fee + comm + cs);

    setValue('totalInvest', newInvest);

    const sell = Number(values.sell) || 0;
    if (sell > 0) {
      setValue('profit', sell - newInvest);
      const paid = Number(values.paid) || 0;
      setValue('due', Math.max(0, sell - paid));
    } else {
      setValue('profit', 0);
      setValue('due', 0);
    }
    toast.info('Formulas updated based on current inputs');
  };

  const onSubmit = (data: TenderSaleCreateInput) => {
    setServerError(null);

    // Convert local user date (YYYY-MM-DD) to UTC ISO format for DB storage
    let utcDateIso: string | null = null;
    if (data.date) {
      const localDate = new Date(`${data.date}T00:00:00`);
      utcDateIso = isNaN(localDate.getTime()) ? null : localDate.toISOString();
    }

    const payload = {
      ...data,
      date: utcDateIso,
      organization: (data.organization || '').trim(),
      tenderId: (data.tenderId || '').trim(),
      license: (data.license || '').trim(),
      paymentBy: (data.paymentBy || '').trim(),
      tenderWinner: (data.tenderWinner || '').trim(),
      noa: (data.noa || '').trim(),
      soldClient: (data.soldClient || '').trim(),
      remarks: (data.remarks || '').trim(),
      documentFee: Number(data.documentFee) || 0,
      ts: Number(data.ts) || 0,
      margin: Number(data.margin) || 0,
      commission: Number(data.commission) || 0,
      cs: Number(data.cs) || 0,
      pg: Number(data.pg) || 0,
      sell: Number(data.sell) || 0,
      totalInvest: Number(data.totalInvest) || 0,
      profit: Number(data.profit) || 0,
      paid: Number(data.paid) || 0,
      due: Number(data.due) || 0,
    };

    startTransition(async () => {
      let res;
      if (isEdit && saleToEdit) {
        res = await updateTenderSaleAction({ ...payload, id: saleToEdit.id });
      } else {
        res = await createTenderSaleAction(payload);
      }

      if (res.success) {
        toast.success(res.message);
        onSuccess?.();
        onClose();
      } else {
        setServerError(res.message);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="tender-sales-form-container">
      {/* Error banner */}
      {serverError && (
        <div className="tender-sales-form-error-banner">
          <AlertCircle size={18} style={{ flexShrink: 0 }} />
          <span>{serverError}</span>
        </div>
      )}

      {/* Section 1: Basic & Tender Information */}
      <div className="tender-sales-form-section">
        <div className="tender-sales-form-section-title">
          Basic &amp; Tender Information
        </div>
        <div className="tender-sales-grid-responsive">
          <div>
            <label className="tender-sales-field-label">DATE</label>
            <Input type="date" {...register('date')} />
          </div>

          <div>
            <label className="tender-sales-field-label">TENDER ID</label>
            <Input placeholder="e.g. 1262034" {...register('tenderId')} />
            {errors.tenderId && (
              <span className="tender-sales-field-error">{errors.tenderId.message}</span>
            )}
          </div>

          <div>
            <label className="tender-sales-field-label">NOA</label>
            <Input placeholder="e.g. 28224466" {...register('noa')} />
            {errors.noa && (
              <span className="tender-sales-field-error">{errors.noa.message}</span>
            )}
          </div>

          <div>
            <label className="tender-sales-field-label">ORGANIZATION</label>
            <Input placeholder="e.g. BSL CITY" {...register('organization')} />
          </div>

          <div className="tender-sales-grid-col2">
            <label className="tender-sales-field-label">LICENSE</label>
            <Input placeholder="e.g. SA, Babor, Northan, Sonex, MST" {...register('license')} />
          </div>

          <div>
            <label className="tender-sales-field-label">PAYMENT BY</label>
            <Input placeholder="e.g. me" {...register('paymentBy')} />
          </div>

          <div>
            <label className="tender-sales-field-label">TENDER WINNER</label>
            <Input placeholder="e.g. SONEX INTERNATIONAL" {...register('tenderWinner')} />
          </div>
        </div>
      </div>

      {/* Section 2: Security & Guarantees */}
      <div className="tender-sales-form-section">
        <div className="tender-sales-form-section-title">
          Securities &amp; Guarantees
        </div>
        <div className="tender-sales-grid-responsive">
          <div>
            <label className="tender-sales-field-label">TS (Tender Security)</label>
            <Input
              type="number"
              min={0}
              placeholder="0"
              {...register('ts', { valueAsNumber: true })}
            />
            {errors.ts && (
              <span className="tender-sales-field-error">{errors.ts.message}</span>
            )}
          </div>

          <div>
            <label className="tender-sales-field-label">MERGIN (Margin)</label>
            <Input
              type="number"
              min={0}
              placeholder="0"
              {...register('margin', { valueAsNumber: true })}
            />
            {errors.margin && (
              <span className="tender-sales-field-error">{errors.margin.message}</span>
            )}
          </div>

          <div>
            <label className="tender-sales-field-label">PG (Performance Guarantee)</label>
            <Input
              type="number"
              min={0}
              placeholder="0"
              {...register('pg', { valueAsNumber: true })}
            />
            {errors.pg && (
              <span className="tender-sales-field-error">{errors.pg.message}</span>
            )}
          </div>
        </div>
      </div>

      {/* Section 3: Cost, Deal Financials & Calculations */}
      <div className="tender-sales-form-section financials">
        <div className="tender-sales-form-section-header">
          <span className="tender-sales-form-section-title text-primary">
            Financials
          </span>
          <button
            type="button"
            onClick={applyAutoCalculations}
            className="tender-sales-btn-recalc"
            title="Recalculate formulas based on inputs"
          >
            Click to Re-calculate
          </button>
        </div>

        <div className="tender-sales-grid-responsive">
          <div>
            <label className="tender-sales-field-label">DOCUMENT FEE</label>
            <Input
              type="number"
              min={0}
              placeholder="0"
              {...register('documentFee', {
                valueAsNumber: true,
                onChange: onFeeOrCommissionOrCsChange,
              })}
            />
            {errors.documentFee && (
              <span className="tender-sales-field-error">{errors.documentFee.message}</span>
            )}
          </div>

          <div>
            <label className="tender-sales-field-label">COMMSSION</label>
            <Input
              type="number"
              min={0}
              placeholder="0"
              {...register('commission', {
                valueAsNumber: true,
                onChange: onFeeOrCommissionOrCsChange,
              })}
            />
            {errors.commission && (
              <span className="tender-sales-field-error">{errors.commission.message}</span>
            )}
          </div>

          <div>
            <label className="tender-sales-field-label">CS</label>
            <Input
              type="number"
              min={0}
              placeholder="0"
              {...register('cs', {
                valueAsNumber: true,
                onChange: onFeeOrCommissionOrCsChange,
              })}
            />
            {errors.cs && (
              <span className="tender-sales-field-error">{errors.cs.message}</span>
            )}
          </div>

          <div>
            <label className="tender-sales-field-label text-primary">TOTAL INVEST</label>
            <Input
              type="number"
              min={0}
              placeholder="0"
              {...register('totalInvest', {
                valueAsNumber: true,
                onChange: () => {
                  const values = getValues();
                  const sell = Number(values.sell) || 0;
                  if (sell > 0) {
                    setValue('profit', sell - (Number(values.totalInvest) || 0));
                  }
                },
              })}
            />
            {errors.totalInvest && (
              <span className="tender-sales-field-error">{errors.totalInvest.message}</span>
            )}
          </div>

          <div>
            <label className="tender-sales-field-label">SELL</label>
            <Input
              type="number"
              min={0}
              placeholder="0"
              {...register('sell', {
                valueAsNumber: true,
                onChange: onSellChange,
              })}
            />
            {errors.sell && (
              <span className="tender-sales-field-error">{errors.sell.message}</span>
            )}
          </div>

          <div>
            <label className="tender-sales-field-label text-primary">
              PROFIT <span className="tender-sales-field-hint">(Can be negative)</span>
            </label>
            <Input
              type="number"
              placeholder="0"
              {...register('profit', { valueAsNumber: true })}
            />
            {errors.profit && (
              <span className="tender-sales-field-error">{errors.profit.message}</span>
            )}
          </div>

          <div>
            <label className="tender-sales-field-label">PAID</label>
            <Input
              type="number"
              min={0}
              placeholder="0"
              {...register('paid', {
                valueAsNumber: true,
                onChange: onPaidChange,
              })}
            />
            {errors.paid && (
              <span className="tender-sales-field-error">{errors.paid.message}</span>
            )}
          </div>

          <div>
            <label className="tender-sales-field-label text-danger">DUE</label>
            <Input
              type="number"
              min={0}
              placeholder="0"
              {...register('due', { valueAsNumber: true })}
            />
            {errors.due && (
              <span className="tender-sales-field-error">{errors.due.message}</span>
            )}
          </div>
        </div>
      </div>

      {/* Section 4: Client & Remarks */}
      <div className="tender-sales-form-section">
        <div className="tender-sales-grid-responsive">
          <div>
            <label className="tender-sales-field-label">SOLD CLIENT</label>
            <Input placeholder="e.g. Mahfuj" {...register('soldClient')} />
          </div>

          <div>
            <label className="tender-sales-field-label">REMARKS</label>
            <Input placeholder="e.g. Any notes or remarks" {...register('remarks')} />
          </div>
        </div>
      </div>

      {/* Footer actions */}
      <div className="tender-sales-form-footer">
        <Button type="button" variant="secondary" onClick={onClose} disabled={isPending}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" isLoading={isPending}>
          {isEdit ? 'Save Changes' : 'Create Tender Sale'}
        </Button>
      </div>
    </form>
  );
}
