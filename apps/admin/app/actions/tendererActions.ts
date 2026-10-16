'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { apiClient } from '@egp/api-client';
import { TendererCreateSchema } from '@egp/schema';
import type { ActionResult } from './clientActions';
import { formatErrorMessage } from '@/lib/format-error';

export async function createTendererAction(formData: unknown): Promise<ActionResult> {
  const result = TendererCreateSchema.safeParse(formData);
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
    const id = await apiClient.tenderers.create(result.data);
    revalidateTag('tenderers');
    revalidatePath('/tenderers');
    return { success: true, message: 'License account created successfully', data: { id } };
  } catch (error: any) {
    return {
      success: false,
      message: formatErrorMessage(error, 'Failed to create license account'),
      errors: error.problemDetails?.errors
    };
  }
}
