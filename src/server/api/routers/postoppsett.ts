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
          id: 'clziaceze0000q22myexd454e',
        },
        include: {
          startrings: {},
          rawinput: {},
          endrings: {}
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
    .input(z.object({ id: z.string(), data: z.any() })) // define your data schema here
    .mutation(async ({ input, ctx }) => {
      const updatedData = await ctx.db.postningsoppsett.update({
        where: {
          id: 'clziaceze0000q22myexd454e',
        },
        data: {header: 'test'},
      });
      console.log('works');
      return updatedData;
      
    }),


})


 

 

