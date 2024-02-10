import { z } from "zod";
import { UserSchema } from "../schemas/userSchema";

export type User = z.infer<typeof UserSchema>;
