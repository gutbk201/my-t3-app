import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { todoRouter } from "./todo";

export const appRouter = router({
  example: exampleRouter,
  todo: todoRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
