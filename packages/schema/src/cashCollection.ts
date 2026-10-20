import { z } from 'zod';

export const CashCollectionCreateSchema = z.object({
  clientId: z.number().int().positive('Please select a valid client'),
  amount: z.number().min(0, 'Collection amount cannot be negative'),
  discountAmount: z.number().min(0, 'Discount cannot be negative').default(0),
  paymentMethod: z.string().min(1, 'Payment method is required'),
  trxId: z.string().optional(),
  senderPhone: z.string().optional(),
  bankName: z.string().optional(),
  branchName: z.string().optional(),
  bankAccountNo: z.string().optional(),
  chequeNo: z.string().optional(),
  chequeDate: z.string().optional(),
  referenceNo: z.string().optional(),
  remarks: z.string().optional(),
  collectionDateUtc: z.string().optional(),
  officerName: z.string().optional()
}).refine((data) => data.amount + data.discountAmount > 0, {
  message: 'Either collection amount or discount must be greater than zero',
  path: ['amount']
});

export type CashCollectionCreateInput = z.infer<typeof CashCollectionCreateSchema>;
