import type {CreateExpressContextOptions} from '@trpc/server/adapters/express';
import type { Request, Response } from 'express';
import {connectToDatabase} from "../db/mongoose";
import {getAuth} from "@clerk/express";
import {resolveCompanyByClerkUserId} from '../services/company.service';

export interface CreateContext {
  db: Awaited<ReturnType<typeof connectToDatabase>>,
  req: Request,
  res: Response,
  userId: string | null,
  company: {
    companyName: string
    ownerClerkId: string
    slug: string
    stripeCustomerId?: string
    plan: "FREE" | "STARTER" | "BUSINESS" | "PRO"
    createdAt: Date
    updatedAt: Date
  } | null,
  role: "OWNER" | "ADMIN" | "MANAGER" | undefined
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
