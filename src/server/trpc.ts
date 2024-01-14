import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { v4 as uuidv4 } from "uuid";

import type { Context } from "./context";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const router = t.router;

export const publicProcedure = t.procedure.use(addCorrIdToLogger);

function addCorrIdToLogger(opts: any) {
  const corrIdLogger = opts.ctx.logger.child({ correlationId: uuidv4() });

  return opts.next({
    ctx: {
      ...opts.ctx,
      logger: corrIdLogger,
    },
  });
}

export const mergeRouters = t.mergeRouters;

export const authedProcedure = t.procedure
  .use(async (opts) => {
    const user = opts.ctx.user;

    if (!user?.email) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return opts.next({
      ctx: {
        ...opts.ctx,
      },
    });
  })
  .use(addCorrIdToLogger);
