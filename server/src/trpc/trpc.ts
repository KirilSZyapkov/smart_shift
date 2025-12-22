import { initTRPC, TRPCError } from '@trpc/server';
import type {Context} from "./context";

// You can use any variable name you like.
// We use t to keep things simple.
const t = initTRPC.context<Context>().create({
    errorFormatter({shape}:{shape:unknown}){
        return shape;
    }
});

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ctx, next})=>{
    if(!ctx.userId){
        throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "User is not authenticated"
        })
    };

    return next({
        ctx: {
            userId: ctx.userId
        }
    })
})

