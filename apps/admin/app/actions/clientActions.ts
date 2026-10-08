'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { apiClient } from '@egp/api-client';
import { ClientCreateSchema, ClientSubscriptionCreateSchema } from '@egp/schema';

export interface ActionResult {
  success: boolean;
  message: string;
  data?: any;
  errors?: Record<string, string[]>;
}

export async function createClientAction(formData: unknown): Promise<ActionResult> {
  const result = ClientCreateSchema.safeParse(formData);
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
    const id = await apiClient.clients.create(result.data);
    revalidateTag('clients');
    revalidatePath('/clients');
    revalidatePath('/');
    return { success: true, message: 'Client created successfully', data: { id } };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to create client',
      errors: error.problemDetails?.errors
    };
  }
}

export async function addSubscriptionAction(formData: unknown): Promise<ActionResult> {
  const result = ClientSubscriptionCreateSchema.safeParse(formData);
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
    const { clientId, ...rest } = result.data;
    const res = await apiClient.clients.addSubscription(clientId, rest);
    revalidateTag('clients');
    revalidatePath('/clients');
    return { success: true, message: res.message || 'Subscription added successfully', data: res };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to add subscription',
      errors: error.problemDetails?.errors
    };
  }
}
