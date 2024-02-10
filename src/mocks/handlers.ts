import { HttpResponse, RequestHandler, RequestHandlerOptions, http } from "msw";
import { UserSchema } from "../schemas/userSchema";
import { User } from "../types/user.type";

const environment = "https://pokeapi.co/api/v2/";

const getPokemonHandler: RequestHandler<any, any, any, RequestHandlerOptions> =
  http.get(`${environment}pokemon/ditto`, async () => {
    const mockUser: User = {
      name: "John Doe",
      email: "john.doe@example.com",
      age: 0,
    };

    const validatedUser = UserSchema.parse(mockUser);

    return HttpResponse.json(validatedUser);
  });

export const handlers = [];
