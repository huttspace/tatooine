import { z } from "zod";

// Plans
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

export const singlePlansInput = z.object({
  projectId: z.string().cuid(),
  envKey: z.string(),
  planId: z.string().cuid(),
});

// Features
export const listFeatureInput = z.object({
  projectId: z.string().cuid(),
  envKey: z.string(),
});
export type ListFeatureInput = z.infer<typeof listFeatureInput>;

export const createFeatureInput = z.object({
  projectId: z.string().cuid(),
  name: z.string().min(1),
  key: z.string().min(1),
  description: z.string(),
  featureType: z.enum(["bool", "dailyLimit", "monthlyLimit"]),
});

export type CreateFeatureInput = z.infer<typeof createFeatureInput>;
