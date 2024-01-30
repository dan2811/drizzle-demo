import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { roles, users } from "~/server/db/schema";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        age: z.number().min(18).max(120),
        roleId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.insert(users).values(input);
    }),

  getUsers: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.query.users.findMany({
      with: {
        role: true,
      },
    });
  }),
});
