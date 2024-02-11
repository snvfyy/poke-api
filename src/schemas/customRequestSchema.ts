import { z } from "zod";

export const methodSchema = z.union([
  z.literal("all"),
  z.literal("get"),
  z.literal("post"),
  z.literal("delete"),
  z.literal("put"),
]);

export const customResponseSchema = z.object({
  status: z.number(),
  body: z.any(),
  default: z.boolean(),
});

export const customRequestHandlerSchema = z.object({
  id: z.number(),
  method: methodSchema,
  endpoint: z.string(),
  baseURL: z.string(),
  description: z.string(),
  responses: z.array(customResponseSchema),
});
