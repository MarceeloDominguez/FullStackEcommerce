// to make the file a module and avoid the TypeScript error

type CleanBody = z.infer<typeof createProductSchema>;

export {};

declare global {
  namespace Express {
    export interface Request {
      userId?: Number;
      cleanBody?: CleanBody;
    }
  }
}
