import { z } from "zod";

export const SpeciesSchema = z.object({
  base_happiness: z.number(),
  capture_rate: z.number(),
  color: z.object({ name: z.string(), url: z.string() }),
  egg_groups: z.array(z.object({ name: z.string(), url: z.string() })),
  evolution_chain: z.object({ url: z.string() }),
  evolves_from_species: z.any().optional(),
  flavor_text_entries: z.array(
    z.object({
      flavor_text: z.string(),
      language: z.object({ name: z.string(), url: z.string() }),
      version: z.object({ name: z.string(), url: z.string() }),
    })
  ),
  form_descriptions: z.array(z.unknown()),
  forms_switchable: z.boolean(),
  gender_rate: z.number(),
  genera: z.array(
    z.object({
      genus: z.string(),
      language: z.object({ name: z.string(), url: z.string() }),
    })
  ),
  generation: z.object({ name: z.string(), url: z.string() }),
  growth_rate: z.object({ name: z.string(), url: z.string() }),
  habitat: z.object({ name: z.string(), url: z.string() }),
  has_gender_differences: z.boolean(),
  hatch_counter: z.number(),
  id: z.number(),
  is_baby: z.boolean(),
  is_legendary: z.boolean(),
  is_mythical: z.boolean(),
  name: z.string(),
  names: z.array(
    z.object({
      language: z.object({ name: z.string(), url: z.string() }),
      name: z.string(),
    })
  ),
  order: z.number(),
  pal_park_encounters: z.array(
    z.object({
      area: z.object({ name: z.string(), url: z.string() }),
      base_score: z.number(),
      rate: z.number(),
    })
  ),
  pokedex_numbers: z.array(
    z.object({
      entry_number: z.number(),
      pokedex: z.object({ name: z.string(), url: z.string() }),
    })
  ),
  shape: z.object({ name: z.string(), url: z.string() }),
  varieties: z.array(
    z.object({
      is_default: z.boolean(),
      pokemon: z.object({ name: z.string(), url: z.string() }),
    })
  ),
});
