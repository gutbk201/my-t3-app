import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import { Navbar } from "components";
import { trpc } from "../utils/trpc";
import { ThemeProvider } from "next-themes";

import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const qu = trpc.auth.getSession.useQuery();
  const isAuth = !!qu?.data?.user;

  return (
    <div className="dark">
      <SessionProvider session={session}>
        <ThemeProvider>
          {isAuth && <Navbar />}
          <Component {...pageProps} />
        </ThemeProvider>
      </SessionProvider>
    </div>
  );
};

export default trpc.withTRPC(MyApp);
