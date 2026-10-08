import { z } from 'zod';

export const TendererCreateSchema = z.object({
  name: z.string().min(1, 'Name is required').max(150),
  username: z.string().min(1, 'Username is required').max(100),
  password: z.string().min(4, 'Password must be at least 4 characters')
});

export type TendererCreateInput = z.infer<typeof TendererCreateSchema>;
