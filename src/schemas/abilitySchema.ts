import { z } from "zod";

export const abilitySchema = z.object({
  ability: z.object({
    name: z.string(),
    url: z.string(),
  }),
  is_hidden: z.boolean(),
  slot: z.number(),
});
