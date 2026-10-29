'use server';

import { revalidatePath } from 'next/cache';
import { apiClient } from '@egp/api-client';
import { TenderSaleCreateSchema, TenderSaleUpdateSchema } from '@egp/schema';
import type { ActionResult } from './clientActions';
import { formatErrorMessage } from '@/lib/format-error';

export async function createTenderSaleAction(formData: unknown): Promise<ActionResult> {
  const result = TenderSaleCreateSchema.safeParse(formData);
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
    const res = await apiClient.tenderSales.create(result.data);
    revalidatePath('/tender-sales');
    return {
      success: true,
      message: res.message || 'Tender sale record created successfully.',
      data: res
    };
  } catch (error: any) {
    return {
      success: false,
      message: formatErrorMessage(error, 'Failed to create tender sale record'),
      errors: error.problemDetails?.errors
    };
  }
}

export async function updateTenderSaleAction(formData: unknown): Promise<ActionResult> {
  const result = TenderSaleUpdateSchema.safeParse(formData);
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
    await apiClient.tenderSales.update(result.data.id, result.data);
    revalidatePath('/tender-sales');
    return {
      success: true,
      message: 'Tender sale record updated successfully.'
    };
  } catch (error: any) {
    return {
      success: false,
      message: formatErrorMessage(error, 'Failed to update tender sale record'),
      errors: error.problemDetails?.errors
    };
  }
}

export async function deleteTenderSaleAction(id: number): Promise<ActionResult> {
  try {
    await apiClient.tenderSales.delete(id);
    revalidatePath('/tender-sales');
    return {
      success: true,
      message: 'Tender sale record deleted successfully.'
    };
  } catch (error: any) {
    return {
      success: false,
      message: formatErrorMessage(error, 'Failed to delete tender sale record'),
      errors: error.problemDetails?.errors
    };
  }
}

export async function fetchTenderSalesAction(params?: {
  search?: string;
  fromDate?: string;
  toDate?: string;
  page?: number;
  pageSize?: number;
}) {
  try {
    return await apiClient.tenderSales.getAll(params, { cache: 'no-store' });
  } catch (error) {
    console.error('Failed to fetch tender sales:', error);
    return [];
  }
}

export async function fetchTenderSaleSummaryAction() {
  try {
    return await apiClient.tenderSales.getSummary({ cache: 'no-store' });
  } catch (error) {
    console.error('Failed to fetch tender sale summary:', error);
    return {
      totalCount: 0,
      totalSell: 0,
      totalInvest: 0,
      totalProfit: 0,
      totalPaid: 0,
      totalDue: 0
    };
  }
}

