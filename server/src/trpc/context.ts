import type {CreateExpressContextOptions} from '@trpc/server/adapters/express';
import type {Request, Response} from 'express';
import {connectToDatabase} from "../db/mongoose";
import {getAuth} from "@clerk/express";
import {resolveCompanyByClerkUserId} from '../services/company.service';
import type {BaseContext} from "./baseContext";

export interface CreateContext extends BaseContext{
  req?: Request,
  res?: Response
}

export const createContext = async (opts: CreateExpressContextOptions): Promise<CreateContext> => {
  const auth = getAuth(opts.req);
  const db = await connectToDatabase();

  let companyContext = null;

  if (auth.userId) {
    companyContext = await resolveCompanyByClerkUserId(auth.userId);
  }

  return {
    db,
    req: opts.req,
    res: opts.res,
    userId: auth.userId ?? null,
    company: companyContext?.company ?? null,
    role: companyContext?.role ?? undefined
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
