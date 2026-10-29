import { z } from 'zod';

export const TenderSaleBaseSchema = z.object({
  date: z.string().optional().nullable(),
  organization: z.string().optional().default(''),
  tenderId: z.string().optional().default(''),
  license: z.string().optional().default(''),
  documentFee: z.number().min(0, 'Document Fee cannot be negative').optional().default(0),
  paymentBy: z.string().optional().default(''),
  ts: z.number().min(0, 'TS cannot be negative').optional().default(0),
  margin: z.number().min(0, 'Margin cannot be negative').optional().default(0),
  commission: z.number().min(0, 'Commission cannot be negative').optional().default(0),
  cs: z.number().min(0, 'CS cannot be negative').optional().default(0),
  pg: z.number().min(0, 'PG cannot be negative').optional().default(0),
  tenderWinner: z.string().optional().default(''),
  noa: z.string().optional().default(''),
  sell: z.number().min(0, 'Sell cannot be negative').optional().default(0),
  totalInvest: z.number().min(0, 'Total Invest cannot be negative').optional().default(0),
  // Profit CAN be negative (loss)
  profit: z.number().optional().default(0),
  paid: z.number().min(0, 'Paid cannot be negative').optional().default(0),
  due: z.number().min(0, 'Due cannot be negative').optional().default(0),
  soldClient: z.string().optional().default(''),
  remarks: z.string().optional().default(''),
});

export const TenderSaleCreateSchema = TenderSaleBaseSchema.refine(
  (data) => (Number(data.paid) || 0) <= (Number(data.sell) || 0),
  {
    message: 'Paid amount cannot exceed total Sell (Due) amount',
    path: ['paid'],
  }
);

export const TenderSaleUpdateSchema = TenderSaleBaseSchema.extend({
  id: z.number().int().positive('Valid ID is required'),
}).refine(
  (data) => (Number(data.paid) || 0) <= (Number(data.sell) || 0),
  {
    message: 'Paid amount cannot exceed total Sell (Due) amount',
    path: ['paid'],
  }
);

export type TenderSaleCreateInput = z.infer<typeof TenderSaleCreateSchema>;
export type TenderSaleUpdateInput = z.infer<typeof TenderSaleUpdateSchema>;
