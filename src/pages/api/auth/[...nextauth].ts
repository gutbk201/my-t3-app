import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "env/server.mjs";
import { prisma } from "server/db/client";

export const authOptions: NextAuthOptions = {
  // session: {
  //   strategy: "jwt",
  // },
  // Include user.id on session
  callbacks: {
    session({ session, user, token }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return { ...session, token, abc: 123 };
    },
  },
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
      profile(profile) {
        console.log({ profile });
        return {
          id: profile.id,
          name: profile.username,
          email: profile.email,
          image: profile.image_url,
          abcdef: "12345",
          // Return all the profile information you need.
          // The only truly required field is `id`
          // to be able identify the account when added to a database
        };
      },
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);

/**
discord profile
{
  id: '192563168537477120',
  username: 'minicrap',
  avatar: '1dbad9890ded9625bc6bb65cf28ef330',
  avatar_decoration: null,
  discriminator: '1562',
  public_flags: 0,
  flags: 0,
  banner: null,
  banner_color: null,
  accent_color: null,
  locale: 'en-GB',
  mfa_enabled: false,
  premium_type: 3,
  email: 'siuym4mym4@gmail.com',
  verified: true
}
 */
