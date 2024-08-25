// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure
} from "~/server/api/trpc";
export const skurlisteRouter = createTRPCRouter({
 

  getAll: publicProcedure
  .input(
    z.object({

      buffer: z.boolean(),
    })
  )
  .query(({ ctx, input }) => {
    return ctx.db.skurliste.findMany({
      where: {
        buffer: input.buffer,
      },
      orderBy: {
       order: 'asc',
      },
    });
  }),

  

 
      create: protectedProcedure
      .input(
        z.object({
          treslag: z.string(),
          klasse: z.string(),
          klGrense: z.string(),
          klType: z.string(),
          postNr: z.string(),
          antall: z.number(),
          m3: z.number(),
          status: z.string(),
          post: z.string(),
          bredde: z.number(),
          xLog: z.string(),
          prosent: z.string(),
          anm: z.string(),
          anm2: z.string(),
          VS66Blad: z.number(),
          vs66: z.string(),
          vs66Br: z.string(),
          mkvBord: z.string(),
          mkvBordBr: z.string(),
          blad: z.number(),
          sortering: z.string(),
          kode: z.string(),
          dimensjon: z.string(),
          torke: z.string(),
          anmerk: z.string(),
          destinasjon: z.string(),
          text: z.string(),
          createdAt: z.date(),
          updatedAt: z.date(),
          buffer: z.boolean(),
          order: z.number(),
          progress: z.string(),
        })
      )
      .mutation(({ ctx, input }) => {
        const creatorName: string = ctx.session.user.name ?? "DefaultCreator";
        const creatorImg: string = ctx.session.user.image ?? "DefaultCreator";
    
        return ctx.db.skurliste.create({
          data: {
            createdAt: new Date(),
            updatedAt: new Date(),
            createdBy: { connect: { id: ctx.session.user.id} },
            creator: creatorName,
            creatorImg: creatorImg,
            updater: creatorName,
            updaterImg: creatorImg,
            treslag: input.treslag,
            klasse: input.klasse,
            klGrense: input.klGrense,
            klType: input.klType,
            postNr: input.postNr,
            post: input.post,
            antall: input.antall,
            m3: input.m3,
            status: input.status,
            post: input.post,
            bredde: input.bredde,
            xLog: input.xLog,
            prosent: input.prosent,
            anm: input.anm,
            anm2: input.anm2,
            VS66Blad: 5,
            vs66: input.vs66,
            vs66Br: input.vs66Br,
            mkvBord: input.mkvBord,
            mkvBordBr: input.mkvBordBr,
            blad: input.blad,
            sortering: input.sortering,
            kode: input.kode,
            dimensjon: input.dimensjon,
            torke: input.torke,
            anmerk: input.anmerk,
            destinasjon: input.destinasjon,
            text: input.text,
            blad: input.blad,
            buffer : input.buffer,
            order: input.order,
            progress: input.progress,
          },
        });
  


}),
      update: protectedProcedure
      .input(
        z.object({
          id: z.string(),
          treslag: z.string(),
          klasse: z.string(),
          klGrense: z.string(),
          klType: z.string(),
          postNr: z.string(),
          antall: z.number(),
          m3: z.number(),
          status: z.string(),
          post: z.string(),
          bredde: z.number(),
          xLog: z.string(),
          prosent: z.string(),
          anm: z.string(),
          anm2: z.string(),
          VS66Blad: z.number(),
          vs66: z.string(),
          vs66Br: z.string(),
          mkvBord: z.string(),
          mkvBordBr: z.string(),
          blad: z.number(),
          sortering: z.string(),
          kode: z.string(),
          dimensjon: z.string(),
          torke: z.string(),
          anmerk: z.string(),
          destinasjon: z.string(),
          text: z.string(),
          buffer: z.boolean(),
          order: z.number().optional(),
        })
      )
      .mutation(({ ctx, input }) => {
        const creatorName: string = ctx.session.user.name ?? "DefaultCreator";
        const creatorImg: string = ctx.session.user.image ?? "DefaultCreator";
    
        return ctx.db.skurliste.update({
          where: {
            id: input.id
        },
          data: {
            updatedAt: new Date(),
            updater: creatorName,
            updaterImg: creatorImg,
            treslag: input.treslag,
            klasse: input.klasse,
            klGrense: input.klGrense,
            klType: input.klType,
            postNr: input.postNr,
            post: input.post,
            antall: input.antall,
            m3: input.m3,
            status: input.status,
            post: input.post,
            bredde: input.bredde,
            xLog: input.xLog,
            prosent: input.prosent,
            anm: input.anm,
            anm2: input.anm2,
            VS66Blad: 5,
            vs66: input.vs66,
            vs66Br: input.vs66Br,
            mkvBord: input.mkvBord,
            mkvBordBr: input.mkvBordBr,
            blad: input.blad,
            sortering: input.sortering,
            kode: input.kode,
            dimensjon: input.dimensjon,
            torke: input.torke,
            anmerk: input.anmerk,
            destinasjon: input.destinasjon,
            text: input.text,
            blad: input.blad,
            buffer : input.buffer,
            order: input.order,
          },
        });
  


}),
      updateOrder: protectedProcedure
      .input(
        z.object({
          id: z.string(),
          order: z.number().optional(),
        })
      )
      .mutation(({ ctx, input }) => {
        return ctx.db.skurliste.update({
          where: {
            id: input.id
        },
          data: {
      
            order: input.order,
          },
        });
  


}),
      updateBuffer: protectedProcedure
      .input(
        z.object({
          id: z.string(),
          buffer: z.boolean(),
        })
      )
      .mutation(({ ctx, input }) => {
        return ctx.db.skurliste.update({
          where: {
            id: input.id
        },
          data: {
      
            buffer: input.buffer,
          },
        });
  


}),


delete: protectedProcedure.input(z.object({id: z.string()}))
.mutation(async ({ctx, input}) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return ctx.db.skurliste.delete({
        where: {
            id: input.id
        },
    });
}),


});


 

 

