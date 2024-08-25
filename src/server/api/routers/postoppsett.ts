// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure
} from "~/server/api/trpc";
export const postoppsettRouter = createTRPCRouter({
 
  getById: publicProcedure.input(z.object({
    postId: z.string(),
  }))
  .query(({ input, ctx }) => {
    return ctx.db.postningsoppsett.findUnique({
      where: {
        id: input.postId,
      },
    })
  }),


    getByHeader: publicProcedure
    .input(z.object({
      header: z.string(),
    }))
    .query(async ({ input, ctx }) => {
      return ctx.db.postningsoppsett.findMany({
        where: {
          header: {
            contains: input.header,
          },
        },
      });
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
      sawType: z.string(),
      startRings: z.array(z.object({
        id: z.string(),
        value: z.number(),
      })),
      endRings: z.array(z.object({
        id: z.string(),
        value: z.number(),
      })),
      rawInput: z.array(z.object({
        id: z.string(),
        value: z.number(),
        ring: z.number().optional(),
        shimsVal: z.number().optional(),
        shimsVal2: z.number().optional(),
      })),
      blade: z.number(),
      prosent: z.string(),
      spes: z.string(),
      xlog: z.string(),
    })) // define your data schema here
    .mutation(async ({ input, ctx }) => {
      return ctx.db.postningsoppsett.update({
        where: {
          id: input.id, // use input.id instead of the hardcoded id
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
          sawType: input.sawType,
        }
      });
    }),

    createPost: protectedProcedure
  .input(z.object({ 
    // same input schema as updatePost, but without the id
    header: z.string(), 
    plankeTy: z.string(),
    sawType: z.string(),
    startRings: z.array(z.object({
      id: z.string(),
      value: z.number(),
    })),
    endRings: z.array(z.object({
      id: z.string(),
      value: z.number(),
    })),
    rawInput: z.array(z.object({
      id: z.string(),
      value: z.number(),
      ring: z.number().optional(),
      shimsVal: z.number().optional(),
      shimsVal2: z.number().optional(),
    })),
    blade: z.number(),
    prosent: z.string(),
    spes: z.string(),
    xlog: z.string(),
  }))
  .mutation(async ({ input, ctx }) => {
    return ctx.db.postningsoppsett.create({
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
        updater: '',
        updaterImg: '',
        creator: '',
        creatorImg: '',
        deleted: false,
        note: '',
        deleter: '',
        kunde: '',
        rawDivide: '',
        sawType: input.sawType,
        createdBy: { connect: { id: ctx.session.user.id} },
       
      }
    });
  }),

    


})



 

 

