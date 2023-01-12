import { trpc } from "../utils/trpc";

export const useTodoTrpc = () => {
  const utils = trpc.useContext();
  const trpcAdd = trpc.todo.postOne.useMutation({
    onSettled: () => {
      utils.todo.getAll.invalidate();
    },
  });
  const trpcRemove = trpc.todo.removeOne.useMutation({
    onSettled() {
      utils.todo.getAll.invalidate();
    },
  });
  // const addTodo = ({ text }: { text: string }) => trpcAdd.mutate({ text });
  // const removeTodo = ({ id }: { id: string }) => trpcRemove.mutate({ id });
  return { addTodo: trpcAdd.mutate, removeTodo: trpcRemove.mutate };
};
