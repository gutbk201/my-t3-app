import { type NextPage } from "next";
import { useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";

const Todos: NextPage = () => {
  // const hello = trpc.example.hello.useQuery({ text: "from tRPC" });
  const todos = trpc.todo.getAll.useQuery();
  console.log(todos.data);
  return (
    <main className="">
      <h2>Todos</h2>
      <button className="rounded-md bg-main-b p-2 text-center">Test</button>
    </main>
  );
};

export default Todos;
