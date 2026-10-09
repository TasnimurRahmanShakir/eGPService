'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { apiClient } from '@egp/api-client';
import {
  TenderCreateSchema,
  TenderUpdateSchema,
  TendererAddToTenderSchema,
  TendererMappingUpdateSchema,
  TenderPaymentCreateSchema,
  type TenderPaymentCreateInput
} from '@egp/schema';
import type { ActionResult } from './clientActions';

export type PaymentSchemaType = TenderPaymentCreateInput;

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
    revalidateTag('clients');
    revalidatePath('/tenders');
    revalidatePath('/clients');
    revalidatePath('/');
    return { success: true, message: 'Tender created successfully', data: { id } };
  } catch (error: any) {
    return {
      success: false,
      message: error.problemDetails?.detail || error.problemDetails?.title || error.message || 'Failed to create tender',
      errors: error.problemDetails?.errors
    };
  }
}

export async function updateTenderAction(formData: unknown): Promise<ActionResult> {
  const result = TenderUpdateSchema.safeParse(formData);
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
    await apiClient.tenders.update(result.data.id, result.data);
    revalidateTag('tenders');
    revalidateTag('clients');
    revalidatePath('/tenders');
    revalidatePath('/clients');
    revalidatePath('/');
    return { success: true, message: 'Tender updated successfully' };
  } catch (error: any) {
    return {
      success: false,
      message: error.problemDetails?.detail || error.problemDetails?.title || error.message || 'Failed to update tender',
      errors: error.problemDetails?.errors
    };
  }
}

export async function addTendererToTenderAction(formData: unknown): Promise<ActionResult> {
  const result = TendererAddToTenderSchema.safeParse(formData);
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
    const res = await apiClient.tenders.addTenderer(result.data.tenderId, result.data);
    revalidateTag('tenders');
    revalidateTag('clients');
    revalidatePath('/tenders');
    revalidatePath('/clients');
    revalidatePath('/');
    return { success: true, message: res.message || 'Tenderer added to tender successfully' };
  } catch (error: any) {
    return {
      success: false,
      message: error.problemDetails?.detail || error.problemDetails?.title || error.message || 'Failed to add tenderer',
      errors: error.problemDetails?.errors
    };
  }
}

export async function updateTendererAction(formData: unknown): Promise<ActionResult> {
  const result = TendererMappingUpdateSchema.safeParse(formData);
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
    const res = await apiClient.tenders.updateTenderer(result.data.tenderId, result.data.tendererId, result.data);
    revalidateTag('tenders');
    revalidateTag('clients');
    revalidatePath('/tenders');
    revalidatePath('/clients');
    revalidatePath('/');
    return { success: true, message: res.message || 'Tenderer updated successfully' };
  } catch (error: any) {
    return {
      success: false,
      message: error.problemDetails?.detail || error.problemDetails?.title || error.message || 'Failed to update tenderer',
      errors: error.problemDetails?.errors
    };
  }
}

export async function removeTendererAction(tenderId: number, tendererId: number): Promise<ActionResult> {
  try {
    const res = await apiClient.tenders.removeTenderer(tenderId, tendererId);
    revalidateTag('tenders');
    revalidateTag('clients');
    revalidatePath('/tenders');
    revalidatePath('/clients');
    revalidatePath('/');
    return { success: true, message: res.message || 'Tenderer removed successfully' };
  } catch (error: any) {
    return {
      success: false,
      message: error.problemDetails?.detail || error.problemDetails?.title || error.message || 'Failed to remove tenderer',
      errors: error.problemDetails?.errors
    };
  }
}

export async function recordPaymentAction(formData: PaymentSchemaType | unknown): Promise<ActionResult> {
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
    const response = await apiClient.tenders.addPayment(result.data);

    if (response?.ok || (response && 'paymentId' in response)) {
      revalidateTag('tenders');
      revalidateTag('clients');
      revalidatePath('/tenders');
      revalidatePath('/clients');
      revalidatePath('/');
      return {
        success: true,
        message: response.message || 'Payment recorded securely.',
        data: response
      };
    }

    return {
      success: false,
      message: (response as any)?.problemDetails?.title || 'Payment transaction failed'
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.problemDetails?.detail || error.problemDetails?.title || error.message || 'Network error occurred.',
      errors: error.problemDetails?.errors
    };
  }
}

export async function fetchTendererOptionsAction() {
  try {
    const tenderers = await apiClient.tenderers.getAll();
    return tenderers.map((t) => ({
      value: t.id,
      label: t.name,
      subLabel: `User: ${t.username}`,
    }));
  } catch (error) {
    console.error('Failed to fetch tenderers:', error);
    return [];
  }
}
