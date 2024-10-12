
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
      kunde: z.string(),
    })
  )
  .query(({ ctx, input }) => {
    return ctx.db.skurliste.findMany({
      where: {
        buffer: input.buffer,
        kunde: input.kunde, 
      },
      orderBy: {
        order: 'asc',
      },
    });
  }),

  countBuffer: publicProcedure
  .input(
    z.object({
      kunde: z.string(),
    })
  )
  .query(async ({ ctx, input }) => {
    const bufferCounts = await ctx.db.skurliste.groupBy({
      by: ['buffer'],
      where: {
        kunde: input.kunde,
      },
      _count: {
        buffer: true,
      },
    });

    // Bruk eksplisitt type for true/false
    const count: { true: number; false: number } = { true: 0, false: 0 };

    // Gå gjennom resultatene og sett riktig verdi for hver buffer status
    bufferCounts.forEach((entry) => {
      count[entry.buffer as unknown as 'true' | 'false'] = entry._count.buffer;
    });

    return count;
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
          kunde: z.string(),
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
            buffer : input.buffer,
            order: input.order,
            progress: '',
            kunde: input.kunde,
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
    progress: z.string(),
  })
)
.mutation(async ({ ctx, input }) => {
  const creatorName: string = ctx.session.user.name ?? "DefaultCreator";
  const creatorImg: string = ctx.session.user.image ?? "DefaultCreator";

  // Hent den nåværende posten for å få den nåværende order-verdien
  const currentItem = await ctx.db.skurliste.findUnique({
    where: { id: input.id },
  });

  if (!currentItem) {
    throw new Error("Post not found");
  }

  return ctx.db.skurliste.update({
    where: {
      id: input.id,
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
      bredde: input.bredde,
      xLog: input.xLog,
      prosent: input.prosent,
      anm: input.anm,
      anm2: input.anm2,
      VS66Blad: input.VS66Blad,
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
      buffer: input.buffer,
      order: currentItem.order, // Behold den nåværende order-verdien
      progress: input.progress,
    },
  });
}),

updateOrders: protectedProcedure
  .input(z.array(z.object({
    id: z.string(),
    order: z.number(),
  })))
  .mutation(({ ctx, input }) => {
    return Promise.all(input.map(({ id, order }) => 
      ctx.db.skurliste.update({
        where: { id },
        data: { order },
      })
    ));
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

/* updateOrders: protectedProcedure
  .input(
    z.array(
      z.object({
        id: z.string(),
        order: z.number(),
      })
    )
  )
  .mutation(async ({ ctx, input }) => {
    console.log("Input for updateOrders:", input); // Legg til logging her

    const updatePromises = input.map((item) => {
      return ctx.db.skurliste.update({
        where: { id: item.id },
        data: { order: item.order },
      });
    });

    try {
      await Promise.all(updatePromises);
      return { success: true };
    } catch (error) {
      console.error("Error updating orders in database:", error); // Logg eventuelle feil
      return { success: false };
    }
  }), */





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


 

 

