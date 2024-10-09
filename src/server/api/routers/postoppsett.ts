
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
  
  numberOfPosts: publicProcedure.query(async ({ ctx }) => {
    const postCount = await ctx.db.postningsoppsett.count();
    return { postCount };
  }),


  getByHeader: publicProcedure
  .input(z.object({
    header: z.string(),
    kundeID: z.string(),
    sawType: z.string(),
  }))
  .query(async ({ input, ctx }) => {
    return ctx.db.postningsoppsett.findMany({
      where: {
        AND: [
          {
            header: {
              contains: input.header,
            },
          },
          {
            sawType: input.sawType,
            kunde: input.kundeID,
          },
        ],
      },
      take: 20,
    });
  }),


    savePost: protectedProcedure
    .input(z.object({
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
      startRingsAlt: z.array(z.object({
        id: z.string(),
        value: z.number(),
      })),
      endRingsAlt: z.array(z.object({
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
      kunde: z.string(),
      updater: z.string(),
      updaterImg: z.string(),
      creator: z.string(),
      creatorImg: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      const savedData = await ctx.db.postningsoppsett.create({
      
        data: {
          header: input.header,
          plankeTy: input.plankeTy,
          sawType: input.sawType,
          startRings: {
            create: input.startRings,
          },
          endRings: {
          
            create: input.endRings,
          },
          startRingsAlt: {
            create: input.startRingsAlt,
          },
          endRingsAlt: {
            create: input.endRingsAlt,
          },
          rawInput: {
            create: input.rawInput,
          },
          blade: input.blade,
          prosent: input.prosent,
          spes: input.spes,
          xlog: input.xlog,
          kunde: input.kunde,
          updater: '',
          updaterImg: '',
          creator: '',
          creatorImg: '',
          deleted: false,
          note: '',
          deleter: '',
          rawDivide: '',
          createdBy: { connect: { id: ctx.session.user.id } },
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
      startRingsAlt: z.array(z.object({
        id: z.string(),
        value: z.number(),
      })),
      endRingsAlt: z.array(z.object({
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
          startRingsAlt: input.startRingsAlt,
          endRingsAlt: input.endRingsAlt,
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
    startRingsAlt: z.array(z.object({
      id: z.string(),
      value: z.number(),
    })),
    endRingsAlt: z.array(z.object({
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
    kunde: z.string(),
  }))
  .mutation(async ({ input, ctx }) => {
    const creatorName: string = ctx.session.user.name ?? "DefaultCreator";
    const creatorImg: string = ctx.session.user.image ?? "DefaultCreator";
    return ctx.db.postningsoppsett.create({
      data: {
        header: input.header,
        plankeTy: input.plankeTy,
        startRings: input.startRings,
        endRings: input.endRings,
        startRingsAlt: input.startRingsAlt,
        endRingsAlt: input.endRingsAlt,
        rawInput: input.rawInput,
        blade: input.blade,
        prosent: input.prosent,
        spes: input.spes,
        xlog: input.xlog,
        updater: creatorName,
        updaterImg: creatorImg,
        creator: creatorName,
        creatorImg: creatorImg,
        deleted: false,
        note: '',
        deleter: '',
        rawDivide: '',
        sawType: input.sawType,
        kunde: input.kunde,
        createdBy: { connect: { id: ctx.session.user.id} },
       
      }
    });
  }),

  deletePost: protectedProcedure
  .input(z.object({
    id: z.string(), // input schema for deletePost, only needs the id
  }))
  .mutation(async ({ input, ctx }) => {
    return ctx.db.postningsoppsett.delete({
      where: {
        id: input.id, // delete the post with the specified id
      },
    });
  }),


})



 

 

