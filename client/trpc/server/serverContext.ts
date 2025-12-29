// apps/web/src/server/trpc/serverContext.ts
import { connectToDatabase } from "../../../server/src/db/mongoose";
import { resolveCompanyByClerkUserId } from "../../../server/src/services/company.service";

export interface ServerContext {
  db: Awaited<ReturnType<typeof connectToDatabase>>;
  userId: string | null;
  req?: undefined,
  res?: undefined,
  company: {
    companyName: string;
    ownerClerkId: string;
    slug: string;
    stripeCustomerId?: string;
    plan: "FREE" | "STARTER" | "BUSINESS" | "PRO";
    createdAt: Date;
    updatedAt: Date;
  } | null;
  role: "OWNER" | "ADMIN" | "MANAGER" | undefined;
}

export const createServerContext = async (params: {
  userId: string | null;
}): Promise<ServerContext> => {
  const db = await connectToDatabase();

  if (!params.userId) {
    return {
      db,
      userId: null,
      company: null,
      role: undefined,
    };
  }

  const companyContext = await resolveCompanyByClerkUserId(params.userId);

  return {
    db,
    userId: params.userId,
    company: companyContext?.company ?? null,
    role: companyContext?.role ?? undefined,
    req: undefined,
    res: undefined,
  };
};
