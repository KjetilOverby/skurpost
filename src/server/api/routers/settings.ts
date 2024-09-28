import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";

export const settingsRouter = createTRPCRouter({

    getByUser: publicProcedure.input(z.object({
        userId: z.string()
    }))
        .query(({ input, ctx }) => {
            console.log("Input received:", input); // Log the input object
            return ctx.db.settings.findUnique({
                where: {
                 
                    userId: input.userId,
                },
            });
        }),

    createPost: protectedProcedure
        .input(z.object({ theme: z.string(), sawType: z.string(), fonts: z.string(), visPakking: z.boolean(), visMiniListe: z.boolean() }))
        .mutation(async ({ ctx, input }) => {
            // simulate a slow db call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const creatorName: string = ctx.session.user.name ?? "DefaultCreator";
            const creatorImg: string = ctx.session.user.image ?? "DefaultCreator";
            const creatorId: string = ctx.session.user.id;
            return ctx.db.settings.create({
                data: {
                    theme: input.theme,
                    sawType: input.sawType,
                    fonts: input.fonts,
                    visPakking: input.visPakking,
                    visMiniListe: input.visMiniListe,
                    creator: creatorName,
                    userId: creatorId,

                },
            });
        }),


    updateTheme: protectedProcedure
        .input(
            z.object({
                theme: z.string(),
                userId: z.string(),

            })
        )
        .mutation(({ ctx, input }) => {
            const creatorName: string = ctx.session.user.name ?? "DefaultCreator";
            const creatorImg: string = ctx.session.user.image ?? "DefaultCreator";

            return ctx.db.settings.update({
                where: {
                    userId: input.userId,
                },
                data: {
                    theme: input.theme,
                },
            });



        }),

    updateSawType: protectedProcedure
        .input(
            z.object({
                sawType: z.string(),
                userId: z.string(),

            })
        )
        .mutation(({ ctx, input }) => {
            const creatorName: string = ctx.session.user.name ?? "DefaultCreator";
            const creatorImg: string = ctx.session.user.image ?? "DefaultCreator";

            return ctx.db.settings.update({
                where: {
                    userId: input.userId,
                },
                data: {
                    sawType: input.sawType,
                },
            });



        }),

});
