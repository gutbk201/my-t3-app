import { ChangeEvent, useState } from "react";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";

const Todos: NextPage = () => {
  // const hello = trpc.example.hello.useQuery({ text: "from tRPC" });
  const [userText, setUserText] = useState("");
  const todos = trpc.todo.getAll.useQuery();
  const postOne = trpc.todo.postOne.useMutation();
  const removeOne = trpc.todo.removeOne.useMutation();
  const onTest = async () => {
    // const onSuccess = (data) => todos.refetch();
    postOne.mutate(
      { text: userText },
      {
        onSuccess: (data) => {
          console.log(data);
          todos.refetch();
        },
      }
    );
    setUserText("");
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserText(e.target.value);
  };
  const onDelete = (id: string) => {
    removeOne.mutate({ id }, { onSuccess: () => todos.refetch() });
  };
  return (
    <main className="">
      <h2>Todos</h2>
      <input onChange={onChange} value={userText} />
      <button className="rounded-md bg-main-b p-2 text-center" onClick={onTest}>
        Test
      </button>
      <hr />
      {todos.data
        ?.filter((todo) => todo.hidden === "FALSE")
        .map(({ id, text, user }) => (
          <div key={id}>
            <button onClick={() => onDelete(id)}>X</button> {user.name} : {text}
          </div>
        ))}
    </main>
  );
};

export default Todos;
