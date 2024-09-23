/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { postRouter } from "~/server/api/routers/post";
import { postoppsettRouter } from "~/server/api/routers/postoppsett";
import { skurlisteRouter } from "~/server/api/routers/skurliste";
import { settingsRouter } from "~/server/api/routers/settings";
import { userRouter } from "~/server/api/routers/users";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  postoppsett: postoppsettRouter,
  skurliste: skurlisteRouter,
  settings: settingsRouter,
  users: userRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
