import type { connectToDatabase } from "../db/mongoose";

export interface BaseContext {
  db: Awaited<ReturnType<typeof connectToDatabase>>;
  userId: string | null;
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
