import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";

export const settingsRouter = createTRPCRouter({

    getByUser: publicProcedure.input(z.object({
        user: z.string(), userId: z.string()
    }))
        .query(({ input, ctx }) => {
            return ctx.db.settings.findUnique({
                where: {
                    creator: input.user,
                    userId: input.userId,
                },
            })
        }),


    createPost: protectedProcedure
        .input(z.object({ theme: z.string(), sawType: z.string(), fonts: z.string(), visPakking: z.boolean(), visMiniListe: z.boolean() }))
        .mutation(async ({ ctx, input }) => {
            // simulate a slow db call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const creatorName: string = ctx.session.user.name ?? "DefaultCreator";
            const creatorImg: string = ctx.session.user.image ?? "DefaultCreator";
            const creatorId: number = ctx.session.user.id;
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

            })
        )
        .mutation(({ ctx, input }) => {
            const creatorName: string = ctx.session.user.name ?? "DefaultCreator";
            const creatorImg: string = ctx.session.user.image ?? "DefaultCreator";

            return ctx.db.settings.update({
                where: {
                    userId: 'cm0tmerie0000anrhu5k7tz6u',
                },
                data: {
                    theme: input.theme,
                },
            });



        }),

});
