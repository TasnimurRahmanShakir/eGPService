'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { apiClient } from '@egp/api-client';
import {
  TenderCreateSchema,
  TenderUpdateSchema,
  TenderClientAddSchema,
  TendererAddToTenderSchema,
  TendererMappingUpdateSchema,
  TenderPaymentCreateSchema,
  type TenderPaymentCreateInput
} from '@egp/schema';
import type { ActionResult } from './clientActions';
import { formatErrorMessage } from '@/lib/format-error';

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
      message: formatErrorMessage(error, 'Failed to create tender'),
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
      message: formatErrorMessage(error, 'Failed to update tender'),
      errors: error.problemDetails?.errors
    };
  }
}

export async function addClientToTenderAction(formData: unknown): Promise<ActionResult> {
  const result = TenderClientAddSchema.safeParse(formData);
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
    const res = await apiClient.tenders.addClient(result.data.tenderId, result.data.clientId);
    revalidateTag('tenders');
    revalidateTag('clients');
    revalidatePath('/tenders');
    revalidatePath('/clients');
    revalidatePath('/');
    return { success: true, message: res.message || 'Client added to tender successfully' };
  } catch (error: any) {
    return {
      success: false,
      message: formatErrorMessage(error, 'Failed to add client to tender'),
      errors: error.problemDetails?.errors
    };
  }
}

export async function removeClientFromTenderAction(tenderId: number, clientId: number): Promise<ActionResult> {
  try {
    const res = await apiClient.tenders.removeClient(tenderId, clientId);
    revalidateTag('tenders');
    revalidateTag('clients');
    revalidatePath('/tenders');
    revalidatePath('/clients');
    revalidatePath('/');
    return { success: true, message: res.message || 'Client removed from tender successfully' };
  } catch (error: any) {
    return {
      success: false,
      message: formatErrorMessage(error, 'Failed to remove client from tender'),
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
    return { success: true, message: res.message || 'License added to tender successfully' };
  } catch (error: any) {
    return {
      success: false,
      message: formatErrorMessage(error, 'Failed to add license'),
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
    return { success: true, message: res.message || 'License updated successfully' };
  } catch (error: any) {
    return {
      success: false,
      message: formatErrorMessage(error, 'Failed to update license'),
      errors: error.problemDetails?.errors
    };
  }
}

export async function removeTendererAction(tenderId: number, tendererId: number, clientId?: number): Promise<ActionResult> {
  try {
    const res = await apiClient.tenders.removeTenderer(tenderId, tendererId);
    revalidateTag('tenders');
    revalidateTag('clients');
    revalidatePath('/tenders');
    revalidatePath('/clients');
    revalidatePath('/');
    return { success: true, message: res.message || 'License removed successfully' };
  } catch (error: any) {
    return {
      success: false,
      message: formatErrorMessage(error, 'Failed to remove license'),
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
      message: formatErrorMessage(error, 'Network error occurred.'),
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

export async function fetchTenderClosingIndexAction(days: number = 30) {
  try {
    return await apiClient.tenders.getClosingIndex(days, { cache: 'no-store' });
  } catch (error) {
    console.error('Failed to fetch closing index:', error);
    return [];
  }
}

export async function fetchTendersByDateAction(closingDate?: string) {
  try {
    return await apiClient.tenders.getAll(undefined, closingDate, { cache: 'no-store' });
  } catch (error) {
    console.error(`Failed to fetch tenders for date ${closingDate}:`, error);
    return [];
  }
}

