import { eq, sql } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { roles, users } from "~/server/db/schema";

export const roleRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string().min(1), users: z.array(z.number()) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.insert(roles).values(input);
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const result = await ctx.db
      .select({ role: roles, countUserId: sql<number>`COUNT(${users.id})` })
      .from(roles)
      .leftJoin(users, eq(roles.id, users.roleId))
      .groupBy(roles.id);

    console.log(result);
    return result;
  }),
});
