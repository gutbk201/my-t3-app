import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Navbar } from "components";
import { trpc } from "../utils/trpc";
import { ThemeProvider } from "next-themes";

import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <div className="dark">
      <SessionProvider session={session}>
        <ThemeProvider>
          <Navbar />
          <Component {...pageProps} />
        </ThemeProvider>
      </SessionProvider>
    </div>
  );
};

export default trpc.withTRPC(MyApp);
