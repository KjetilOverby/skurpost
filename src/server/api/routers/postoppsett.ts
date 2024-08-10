// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure
} from "~/server/api/trpc";
export const postoppsettRouter = createTRPCRouter({
 

    getAll: publicProcedure
    .query(({ ctx }) => {
      return ctx.db.postningsoppsett.findUnique({
        where: {
          id: 'clzny399g0000s8jym3pzcutr',
        },
      
      })
    }),


    savePost: protectedProcedure
    .mutation(async ({ data, ctx }) => {
      const savedData = await ctx.db.postningsoppsett.create({
        data: {
          ...data,
          startrings: {
            create: data.startrings,
          },
          endrings: {
            create: data.endrings,
          },
          // add other related data as needed
        },
      });
      return savedData;
    }),

    updatePost: protectedProcedure
    .input(z.object({ 
      id: z.string(),  
      header: z.string(), 
      plankeTy: z.string(),
      startRings: z.string(),
      endRings: z.string(),
      rawInput: z.string(),
      blade: z.number(),
      prosent: z.string(),
      spes: z.string(),
      xlog: z.string(),
    })) // define your data schema here
    .mutation(async ({ input, ctx }) => {
      return ctx.db.postningsoppsett.update({
        where: {
          id: 'clzny399g0000s8jym3pzcutr', // use input.id instead of the hardcoded id
        },
        data: {
          header: input.header,
          plankeTy: input.plankeTy,
          startRings: input.startRings,
          endRings: input.endRings,
          rawInput: input.rawInput,
          blade: input.blade,
          prosent: input.prosent,
          spes: input.spes,
          xlog: input.xlog,
        }
      });
    }),


})


 

 

