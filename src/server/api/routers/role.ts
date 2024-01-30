import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { roles } from "~/server/db/schema";

export const roleRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string().min(1), users: z.array(z.number()) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.insert(roles).values(input);
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.query.roles.findMany();
  }),
});
