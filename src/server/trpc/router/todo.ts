import { z } from "zod";

import { router, protectedProcedure } from "../trpc";

export const todoRouter = router({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.todo.findMany({
      select: {
        id: true,
        text: true,
        hidden: true,
        createdAt: true,
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: [{ createdAt: "desc" }],
    });
  }),
  postOne: protectedProcedure
    .input(z.object({ text: z.string().min(1) }))
    .mutation(({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const createdPost = ctx.prisma.todo.create({
        data: {
          text: input.text,
          user: { connect: { id: userId } },
        },
      });
      return createdPost;
    }),
  removeOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      const updatedTodo = ctx.prisma.todo.update({
        where: { id: input.id },
        data: { hidden: "TRUE" },
      });
      return updatedTodo;
    }),
});
