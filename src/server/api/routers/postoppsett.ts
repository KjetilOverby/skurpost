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
         return ctx.db.postningsoppsett.findMany({
       
       
            include: {
            
              startrings: {
             
              },
              rawinput: {},
              endrings: {}
            },
         })
      }),


   
    




})


 

 

