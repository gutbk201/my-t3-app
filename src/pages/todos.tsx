import { type NextPage } from "next";
import { useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";

const Todos: NextPage = () => {
  return (
    <main className="">
      <h2>Todos</h2>
      <button className="rounded-md bg-main-b p-2 text-center">Test</button>
    </main>
  );
};

export default Todos;
