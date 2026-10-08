import { z } from 'zod';

export const TenderCreateSchema = z.object({
  clientId: z.number().int().positive('Please select a valid client'),
  tenderId: z.string().min(1, 'Tender ID is required').max(100),
  openingDateTimeUtc: z.string().min(1, 'Opening date is required'),
  closingDateTimeUtc: z.string().min(1, 'Closing date is required'),
  department: z.string().min(1, 'Department is required').max(200),
  liquidAssetAmount: z.number().min(0).default(0),
  appCode: z.string().max(100).optional().default(''),
  chargeAmount: z.number().min(0, 'Charge must be 0 or positive').default(0),
  lessPercentage: z.number().nullable().optional(),
  
  // Status flags matching Excel sheet
  liquid1Status: z.boolean().nullable().optional(),
  liquid2Status: z.boolean().nullable().optional(),
  liquid3Status: z.boolean().nullable().optional(),
  jvcaStatus: z.boolean().nullable().optional(),
  submitStatus: z.boolean().nullable().optional(),
  fillStatus: z.boolean().nullable().optional(),
  mapStatus: z.boolean().nullable().optional(),
  rateStatus: z.boolean().nullable().optional(),
  
  tendererIds: z.array(z.number().int().positive()).optional().default([])
});

export const TenderUpdateSchema = TenderCreateSchema.extend({
  id: z.number().int().positive()
});

export const TenderPaymentCreateSchema = z.object({
  tenderId: z.number().int().positive(),
  amountPaid: z.number().positive('Payment amount must be greater than 0'),
  paymentDateUtc: z.string().min(1, 'Payment date is required'),
  paymentMethod: z.string().min(1, 'Payment method is required').max(100),
  remarks: z.string().max(500).optional().default('')
});

export const TendererAssignSchema = z.object({
  tenderId: z.number().int().positive(),
  tendererIds: z.array(z.number().int().positive()).min(1, 'Select at least one tenderer')
});

export type TenderCreateInput = z.infer<typeof TenderCreateSchema>;
export type TenderUpdateInput = z.infer<typeof TenderUpdateSchema>;
export type TenderPaymentCreateInput = z.infer<typeof TenderPaymentCreateSchema>;
export type TendererAssignInput = z.infer<typeof TendererAssignSchema>;
