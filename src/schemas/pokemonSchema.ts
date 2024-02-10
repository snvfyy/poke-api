import { z } from "zod";
import { abilitySchema } from "./abilitySchema";

const formSchema = z.object({
  name: z.string(),
  url: z.string(),
});

const gameIndexSchema = z.object({
  game_index: z.number(),
  version: z.object({
    name: z.string(),
    url: z.string(),
  }),
});

const itemVersionDetailSchema = z.object({
  rarity: z.number(),
  version: z.object({
    name: z.string(),
    url: z.string(),
  }),
});

const heldItemSchema = z.object({
  item: z.object({
    name: z.string(),
    url: z.string(),
  }),
  version_details: z.array(itemVersionDetailSchema),
});

const moveVersionGroupDetailSchema = z.object({
  level_learned_at: z.number(),
  move_learn_method: z.object({
    name: z.string(),
    url: z.string(),
  }),
  version_group: z.object({
    name: z.string(),
    url: z.string(),
  }),
});

const moveSchema = z.object({
  move: z.object({
    name: z.string(),
    url: z.string(),
  }),
  version_group_details: z.array(moveVersionGroupDetailSchema),
});

const speciesSchema = z.object({
  name: z.string(),
  url: z.string(),
});

const spriteSchema = z.object({
  // Add other fields as necessary
  front_default: z.string(),
  // Define other sprite fields here, similar to front_default
  // For deeply nested objects, you may define additional schemas
});

const statSchema = z.object({
  base_stat: z.number(),
  effort: z.number(),
  stat: z.object({
    name: z.string(),
    url: z.string(),
  }),
});

const typeSchema = z.object({
  slot: z.number(),
  type: z.object({
    name: z.string(),
    url: z.string(),
  }),
});

export const PokemonSchema = z.object({
  abilities: z.array(abilitySchema),
  base_experience: z.number(),
  cries: z.object({
    latest: z.string(),
    legacy: z.string(),
  }),
  forms: z.array(formSchema),
  game_indices: z.array(gameIndexSchema),
  height: z.number(),
  held_items: z.array(heldItemSchema),
  id: z.number(),
  is_default: z.boolean(),
  location_area_encounters: z.string(),
  moves: z.array(moveSchema),
  name: z.string(),
  order: z.number(),
  past_abilities: z.array(z.any()), // Use z.any() for 'any' type, or define a more specific schema if possible
  past_types: z.array(z.any()), // Same as above
  species: speciesSchema,
  sprites: spriteSchema, // Adjust according to the structure you need
  stats: z.array(statSchema),
  types: z.array(typeSchema),
  weight: z.number(),
});
