'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { apiClient } from '@egp/api-client';
import {
  TenderCreateSchema,
  TenderPaymentCreateSchema,
  TendererAssignSchema
} from '@egp/schema';
import type { ActionResult } from './clientActions';

export async function createTenderAction(formData: unknown): Promise<ActionResult> {
  const result = TenderCreateSchema.safeParse(formData);
  if (!result.success) {
    const errors: Record<string, string[]> = {};
    result.error.errors.forEach((err) => {
      const field = err.path.join('.');
      if (!errors[field]) errors[field] = [];
      errors[field].push(err.message);
    });
    return { success: false, message: 'Validation failed', errors };
  }

  try {
    const id = await apiClient.tenders.create(result.data);
    revalidateTag('tenders');
    revalidatePath('/tenders');
    revalidatePath('/');
    return { success: true, message: 'Tender created successfully', data: { id } };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to create tender',
      errors: error.problemDetails?.errors
    };
  }
}

export async function recordPaymentAction(formData: unknown): Promise<ActionResult> {
  const result = TenderPaymentCreateSchema.safeParse(formData);
  if (!result.success) {
    const errors: Record<string, string[]> = {};
    result.error.errors.forEach((err) => {
      const field = err.path.join('.');
      if (!errors[field]) errors[field] = [];
      errors[field].push(err.message);
    });
    return { success: false, message: 'Validation failed', errors };
  }

  try {
    const { tenderId, ...rest } = result.data;
    const res = await apiClient.tenders.addPayment(tenderId, rest);
    revalidateTag('tenders');
    revalidatePath('/tenders');
    revalidatePath('/');
    return { success: true, message: res.message || 'Payment recorded successfully', data: res };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to record payment',
      errors: error.problemDetails?.errors
    };
  }
}

export async function mapTenderersAction(formData: unknown): Promise<ActionResult> {
  const result = TendererAssignSchema.safeParse(formData);
  if (!result.success) {
    return { success: false, message: 'Validation failed' };
  }

  try {
    const { tenderId } = result.data;
    const res = await apiClient.tenders.mapTenderers(tenderId, result.data);
    revalidateTag('tenders');
    revalidatePath('/tenders');
    return { success: true, message: res.message || 'Tenderers mapped successfully' };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to map tenderers'
    };
  }
}
