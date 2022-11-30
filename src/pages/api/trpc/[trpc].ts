import { initTRPC } from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";

const t = initTRPC.create();

const AppRouter = t.router({
  greeting: t.procedure
    .input(z.object({ name: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        text: `Hello ${input?.name ?? "World"}`,
      };
    }),
});

export type AppRouter = typeof AppRouter;

export default trpcNext.createNextApiHandler({
  router: AppRouter,
  createContext: () => ({}),
});
