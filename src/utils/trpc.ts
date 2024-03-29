import type { NextPageContext } from "next";
import getConfig from "next/config";
import superjson from "superjson";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { createWSClient, wsLink } from "@trpc/client/links/wsLink";
import { createTRPCNext } from "@trpc/next";
import type { inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "@/server/routers/_app";

const { publicRuntimeConfig } = getConfig();
const { APP_URL, WS_URL } = publicRuntimeConfig;

export const client = createWSClient({
  url: WS_URL,
});

function getEndingLink(ctx: NextPageContext | undefined) {
  if (typeof window === "undefined") {
    return httpBatchLink({
      url: `${APP_URL}/api/trpc`,
      headers() {
        if (!ctx?.req?.headers) {
          return {};
        }
        // on ssr, forward client's headers to the server
        return {
          ...ctx.req.headers,
          "x-ssr": "1",
        };
      },
    });
  }
  return wsLink<AppRouter>({
    client,
  });
}

export const trpc = createTRPCNext<AppRouter>({
  config({ ctx }) {
    return {
      links: [
        loggerLink({
          enabled: (opts) =>
            (process.env.NODE_ENV === "development" &&
              typeof window !== "undefined") ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        getEndingLink(ctx),
      ],
      transformer: superjson,
      queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  ssr: true,
});

export type RouterOutputs = inferRouterOutputs<AppRouter>;
