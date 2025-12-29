import {appRouter} from "../../../server/src/trpc/router";
import {createServerContext} from "./serverContext";

export async function serverClient(params: {userId: string | null}){
  const ctx = await createServerContext(params);
  return appRouter.createCaller(ctx);
}