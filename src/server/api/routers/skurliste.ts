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
   
        .query(({ ctx }) => {
         return ctx.db.skurliste.findMany({
       
       
         })
      }),


   
    




})


 

 
