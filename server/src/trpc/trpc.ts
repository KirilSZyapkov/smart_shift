import {initTRPC} from '@trpc/server';
import type {Context} from "./context";
import {AppError} from "../errors/AppError";
import {ErrorCode} from "../errors/errorCodes";

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
        throw new AppError(
          "UNAUTHORIZED",
          401,
          ErrorCode.UNAUTHORIZED
        )
    };

    return next();
})

