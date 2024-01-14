import { router } from "../trpc";

import { authRouter } from "./auth";
import { userRouter } from "./user";

export const appRouter = router({
  authRouter,
  userRouter,
});

export type AppRouter = typeof appRouter;
