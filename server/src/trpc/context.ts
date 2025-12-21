import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import type {PrismaClient} from "../../prisma/generated/client";
import {db as database} from "../db/prisma";
import {getAuth} from "@clerk/express";

export const createContext = async (opts: CreateNextContextOptions) => {
  const auth = getAuth(opts.req);
  const db: PrismaClient = database;
  return {
    db,
    req: opts.req,
    res: opts.res,
    userId: auth.userId ?? null
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
