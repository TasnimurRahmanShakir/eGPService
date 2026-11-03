'use server';

import { revalidatePath } from 'next/cache';
import { apiClient } from '@egp/api-client';
import type { InvoiceDto } from '@egp/api-client';
import { formatErrorMessage } from '@/lib/format-error';

export interface ActionResult<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}

export async function fetchInvoicesAction(params?: {
  clientId?: number;
  tenderId?: number;
  invoiceType?: string;
  status?: string;
  search?: string;
  fromDate?: string;
  toDate?: string;
  page?: number;
  pageSize?: number;
}): Promise<InvoiceDto[]> {
  try {
    return await apiClient.invoices.getAll(params, { cache: 'no-store' });
  } catch (error) {
    console.error('Failed to fetch invoices:', error);
    return [];
  }
}

export async function fetchInvoiceByIdAction(id: number): Promise<InvoiceDto | null> {
  try {
    return await apiClient.invoices.getById(id, { cache: 'no-store' });
  } catch (error) {
    console.error(`Failed to fetch invoice #${id}:`, error);
    return null;
  }
}

export async function syncInvoicesAction(): Promise<ActionResult> {
  try {
    const res = await apiClient.invoices.sync();
    revalidatePath('/invoices');
    revalidatePath('/clients');
    revalidatePath('/tenders');
    return {
      success: true,
      message: res.message || 'Invoices synchronized successfully.'
    };
  } catch (error: any) {
    return {
      success: false,
      message: formatErrorMessage(error, 'Failed to synchronize invoices')
    };
  }
}
