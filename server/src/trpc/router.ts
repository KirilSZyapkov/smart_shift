import {router} from './trpc';
import {userRouter} from './routes/userRouter';
import {employeeRouter} from "./routes/employeeRouter";
import {shiftRouter} from "./routes/shiftRouter";

export const appRouter = router({
  user: userRouter,
  employee: employeeRouter,
  shift: shiftRouter
});

// Export only the type of a router!
// This prevents us from importing server code on the client.
export type AppRouter = typeof appRouter;