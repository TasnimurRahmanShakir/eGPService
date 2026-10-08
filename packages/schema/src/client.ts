import { z } from 'zod';

export const ClientCreateSchema = z.object({
  name: z.string().min(1, 'Client name is required').max(150, 'Name is too long'),
  phone: z.string().max(50).optional().default(''),
  email: z.string().email('Invalid email address').or(z.literal('')).optional().default(''),
  openingBalance: z.number().min(0, 'Opening balance must be 0 or greater').default(0),
  openingBalanceType: z.number().int().min(0).max(1).default(0) // 0 = Advance, 1 = Due
});

export const ClientUpdateSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1, 'Client name is required').max(150),
  phone: z.string().max(50).optional().default(''),
  email: z.string().email('Invalid email address').or(z.literal('')).optional().default('')
});

export const ClientSubscriptionCreateSchema = z.object({
  clientId: z.number().int().positive(),
  solutionName: z.string().min(1, 'Solution name is required').max(150),
  startDateUtc: z.string().min(1, 'Start date is required'),
  validUptoUtc: z.string().min(1, 'Validity date is required'),
  invoiceAmount: z.number().min(0, 'Invoice amount must be 0 or positive'),
  isPaid: z.boolean().default(true)
});

export type ClientCreateInput = z.infer<typeof ClientCreateSchema>;
export type ClientUpdateInput = z.infer<typeof ClientUpdateSchema>;
export type ClientSubscriptionCreateInput = z.infer<typeof ClientSubscriptionCreateSchema>;
