import { z } from 'zod';

export const TenderCreateSchema = z.object({
  tenderId: z.string().min(1, 'Tender ID is required').max(100),
  closingDateTimeUtc: z.string().min(1, 'Closing date & time is required'),
  department: z.string().min(1, 'Department is required').max(200),
  clientId: z.number().int().positive().nullable().optional(),
  liquidAssetAmount: z.number().min(0).default(20000000),
  appCode: z.string().max(100).optional().default(''),
});

export const TenderUpdateSchema = z.object({
  id: z.number().int().positive(),
  tenderId: z.string().min(1, 'Tender ID is required').max(100),
  closingDateTimeUtc: z.string().min(1, 'Closing date & time is required'),
  department: z.string().min(1, 'Department is required').max(200),
  clientId: z.number().int().positive().nullable().optional(),
  liquidAssetAmount: z.number().min(0).default(20000000),
  appCode: z.string().max(100).optional().default(''),
});

export const TendererAddToTenderSchema = z.object({
  tenderId: z.number().int().positive(),
  tendererId: z.number().int().positive('Please select an eGP tenderer'),
  mailId: z.string().optional().default(''),
  chargeAmount: z.number().min(0, 'Charge must be 0 or positive').default(2000),
  lessPercentage: z.number().nullable().optional(),
  liquid1Status: z.boolean().default(false),
  liquid2Status: z.boolean().default(false),
  liquid3Status: z.boolean().default(false),
  jvcaStatus: z.boolean().default(false),
  submitStatus: z.boolean().default(false),
  fillStatus: z.boolean().default(false),
  mapStatus: z.boolean().default(false),
  rateStatus: z.boolean().default(false),
});

export const TendererMappingUpdateSchema = z.object({
  tenderId: z.number().int().positive(),
  tendererId: z.number().int().positive(),
  mailId: z.string().optional().default(''),
  passwordStatus: z.string().optional().default('OK'),
  chargeAmount: z.number().min(0, 'Charge must be 0 or positive'),
  lessPercentage: z.number().nullable().optional(),
  liquid1Status: z.boolean().default(false),
  liquid2Status: z.boolean().default(false),
  liquid3Status: z.boolean().default(false),
  jvcaStatus: z.boolean().default(false),
  submitStatus: z.boolean().default(false),
  fillStatus: z.boolean().default(false),
  mapStatus: z.boolean().default(false),
  rateStatus: z.boolean().default(false),
});

export const TenderPaymentCreateSchema = z.object({
  tenderId: z.number().int().positive(),
  tendererId: z.number().int().positive().optional().nullable(),
  amountPaid: z.number().positive('Payment amount must be greater than 0'),
  paymentDateUtc: z.string().min(1, 'Payment date is required'),
  paymentMethod: z.string().min(1, 'Payment method is required').max(100),
  remarks: z.string().max(500).optional().default(''),
});

export type TenderCreateInput = z.infer<typeof TenderCreateSchema>;
export type TenderUpdateInput = z.infer<typeof TenderUpdateSchema>;
export type TendererAddToTenderInput = z.infer<typeof TendererAddToTenderSchema>;
export type TendererAssignInput = TendererAddToTenderInput;
export type TendererMappingUpdateInput = z.infer<typeof TendererMappingUpdateSchema>;
export type TenderPaymentCreateInput = z.infer<typeof TenderPaymentCreateSchema>;
