export type Method = "all" | "get" | "post" | "delete" | "put";
export type CustomResponse = { status: number; body: any; default: boolean };

export interface CustomRequestHandler {
  id: number;
  method: Method;
  endpoint: string;
  baseURL: string;
  description: string;
  responses: CustomResponse[];
}
