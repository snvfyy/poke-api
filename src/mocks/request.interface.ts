export type Method = "all" | "get" | "post" | "delete" | "put";
export type CustomResponse = {
  status: number;
  body: BodyInit | null;
  default: boolean;
};

export interface CustomRequestHandler {
  id: number;
  method: Method;
  endpoint: string;
  baseURL: URL | string;
  description: string;
  responses: CustomResponse[];
}
