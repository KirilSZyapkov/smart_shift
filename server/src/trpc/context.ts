import type {CreateExpressContextOptions} from '@trpc/server/adapters/express';
import {connectToDatabase} from "../db/mongoose";
import {getAuth} from "@clerk/express";

export const createContext = async (opts: CreateExpressContextOptions) => {
  const auth = getAuth(opts.req);
  return {
    db: connectToDatabase(),
    req: opts.req,
    res: opts.res,
    userId: auth.userId ?? null
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
