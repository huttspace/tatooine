import { z } from "zod";

export const listPlansInput = z.object({
  projectId: z.string().cuid(),
  envKey: z.string(),
});
export type ListPlansInput = z.infer<typeof createPlanInput>;

export const createPlanInput = z.object({
  projectId: z.string().cuid(),
  name: z.string().min(1),
  key: z.string().min(1),
  description: z.string(),
});
export type CreatePlanInput = z.infer<typeof createPlanInput>;
