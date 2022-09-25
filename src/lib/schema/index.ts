import { z } from "zod";

export const createPlanInput = z.object({
  name: z.string().min(1),
  key: z.string().min(1),
});

export type CreatePlanInput = z.infer<typeof createPlanInput>;
