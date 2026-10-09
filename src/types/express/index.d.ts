import { User }  from "../user.types.ts"

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export {};