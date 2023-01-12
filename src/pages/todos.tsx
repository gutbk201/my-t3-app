import { FormEvent, ChangeEvent, useState } from "react";
import { trpc } from "../utils/trpc";
import { useTodoTrpc } from "hooks/useTodoTrpc";
import type { GetServerSideProps, NextPage } from "next";
import { unAuthRedirection } from "pages/api/auth/[...nextauth]";
import { getServerAuthSession } from "server/common/get-server-auth-session";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // const session = await unstable_getServerSession(
  //   ctx.req,
  //   ctx.res,
  //   authOptions
  // );
  const session = await getServerAuthSession({ req: ctx.req, res: ctx.res });
  if (!session) return unAuthRedirection;
  return { props: {} };
};

const Todos: NextPage = () => {
  const [userText, setUserText] = useState("");
  const todos = trpc.todo.getAll.useQuery();
  const { addTodo, removeTodo } = useTodoTrpc();
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo({ text: userText });
    setUserText("");
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserText(e.target.value);
  };
  const onDelete = (id: string) => {
    removeTodo({ id });
  };
  return (
    <main className="">
      <h2>Todos</h2>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={userText} />
        <input type="submit" value="send" />
      </form>
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
