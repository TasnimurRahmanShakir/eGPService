'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { apiClient } from '@egp/api-client';
import { CashCollectionCreateSchema } from '@egp/schema';
import type { ActionResult } from './clientActions';
import { formatErrorMessage } from '@/lib/format-error';

export async function createCashCollectionAction(formData: unknown): Promise<ActionResult> {
  const result = CashCollectionCreateSchema.safeParse(formData);
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
    const res = await apiClient.cashCollections.create(result.data);
    revalidateTag('clients');
    revalidateTag('tenders');
    revalidatePath('/cash-collection');
    revalidatePath('/clients');
    revalidatePath('/tenders');
    revalidatePath('/');
    return {
      success: true,
      message: res.message || 'Cash collection recorded successfully.',
      data: res
    };
  } catch (error: any) {
    return {
      success: false,
      message: formatErrorMessage(error, 'Failed to record cash collection'),
      errors: error.problemDetails?.errors
    };
  }
}

export async function fetchCashCollectionsAction(params?: {
  clientId?: number;
  fromDate?: string;
  toDate?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}) {
  try {
    return await apiClient.cashCollections.getAll(params, { cache: 'no-store' });
  } catch (error) {
    console.error('Failed to fetch cash collections:', error);
    return [];
  }
}

export async function fetchCashCollectionSummaryAction() {
  try {
    return await apiClient.cashCollections.getSummary({ cache: 'no-store' });
  } catch (error) {
    console.error('Failed to fetch cash collection summary:', error);
    return {
      totalCollectedToday: 0,
      totalCollectedThisMonth: 0,
      totalCollectedAllTime: 0,
      totalMarketDue: 0,
      totalVouchersCount: 0
    };
  }
}
