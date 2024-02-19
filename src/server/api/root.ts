import { postRouter } from "~/server/api/routers/post";
import { postoppsettRouter } from "~/server/api/routers/postoppsett";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  postoppsett: postoppsettRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
