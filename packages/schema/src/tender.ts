import { z } from 'zod';

export const TenderCreateSchema = z.object({
  tenderId: z.string().min(1, 'Tender ID is required').max(100),
  closingDateTimeUtc: z.string().min(1, 'Closing date & time is required'),
  department: z.string().min(1, 'Department is required').max(200),
  clientId: z.number().int().positive().nullable().optional(),
  liquidAssetAmount: z
    .preprocess(
      (val) => (val === '' || val === null || val === undefined ? null : Number(val)),
      z.number().min(0, 'Liquid assets must be 0 or positive').nullable().optional()
    )
    .nullable()
    .optional(),
  appCode: z
    .preprocess(
      (val) => (val === null || val === undefined ? '' : String(val)),
      z.string().max(100).nullable().optional()
    )
    .nullable()
    .optional(),
});

export const TenderUpdateSchema = z.object({
  id: z.number().int().positive(),
  tenderId: z.string().min(1, 'Tender ID is required').max(100),
  closingDateTimeUtc: z.string().min(1, 'Closing date & time is required'),
  department: z.string().min(1, 'Department is required').max(200),
  clientId: z.number().int().positive().nullable().optional(),
  liquidAssetAmount: z
    .preprocess(
      (val) => (val === '' || val === null || val === undefined ? null : Number(val)),
      z.number().min(0, 'Liquid assets must be 0 or positive').nullable().optional()
    )
    .nullable()
    .optional(),
  appCode: z
    .preprocess(
      (val) => (val === null || val === undefined ? '' : String(val)),
      z.string().max(100).nullable().optional()
    )
    .nullable()
    .optional(),
});

export const TenderClientAddSchema = z.object({
  tenderId: z.number().int().positive(),
  clientId: z.number().int().positive('Please select a client'),
});

export const TendererAddToTenderSchema = z.object({
  tenderId: z.number().int().positive(),
  clientId: z.number().int().positive('Please select a client'),
  tendererId: z.number().int().positive('Please select an eGP tenderer'),
  mailId: z.string().optional().default(''),
  chargeAmount: z.number().min(0, 'Charge must be 0 or positive').default(3000),
  lessPercentage: z.number().nullable().optional(),
  liquid1Status: z.boolean().nullable().optional().default(null),
  liquid2Status: z.boolean().nullable().optional().default(null),
  liquid3Status: z.boolean().nullable().optional().default(null),
  jvcaStatus: z.boolean().nullable().optional().default(null),
  submitStatus: z.boolean().nullable().optional().default(null),
  fillStatus: z.boolean().nullable().optional().default(null),
  mapStatus: z.boolean().nullable().optional().default(null),
  rateStatus: z.boolean().nullable().optional().default(null),
});

export const TendererMappingUpdateSchema = z.object({
  tenderId: z.number().int().positive(),
  tendererId: z.number().int().positive(),
  clientId: z.number().int().positive().optional().nullable(),
  mailId: z.string().optional().default(''),
  passwordStatus: z.string().optional().default('OK'),
  chargeAmount: z.number().min(0, 'Charge must be 0 or positive').default(3000),
  lessPercentage: z.number().nullable().optional(),
  liquid1Status: z.boolean().nullable().optional(),
  liquid2Status: z.boolean().nullable().optional(),
  liquid3Status: z.boolean().nullable().optional(),
  jvcaStatus: z.boolean().nullable().optional(),
  submitStatus: z.boolean().nullable().optional(),
  fillStatus: z.boolean().nullable().optional(),
  mapStatus: z.boolean().nullable().optional(),
  rateStatus: z.boolean().nullable().optional(),
});

export const TenderPaymentCreateSchema = z.object({
  tenderId: z.number().int().positive(),
  clientId: z.number().int().positive('Please select a client'),
  tendererId: z.number().int().positive().optional().nullable(),
  amountPaid: z.number().positive('Payment amount must be greater than 0'),
  paymentDateUtc: z.string().min(1, 'Payment date is required'),
  paymentMethod: z.string().min(1, 'Payment method is required').max(100),
  remarks: z.string().max(500).optional().default(''),
});

export type TenderCreateInput = z.infer<typeof TenderCreateSchema>;
export type TenderUpdateInput = z.infer<typeof TenderUpdateSchema>;
export type TenderClientAddInput = z.infer<typeof TenderClientAddSchema>;
export type TendererAddToTenderInput = z.infer<typeof TendererAddToTenderSchema>;
export type TendererAssignInput = TendererAddToTenderInput;
export type TendererMappingUpdateInput = z.infer<typeof TendererMappingUpdateSchema>;
export type TenderPaymentCreateInput = z.infer<typeof TenderPaymentCreateSchema>;
