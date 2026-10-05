 import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const adminEmail = process.env.ADMIN_EMAIL
  ?.trim()
  .toLowerCase();

export const authOptions = {
  debug: true,

  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],

  secret: process.env.AUTH_SECRET,

  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60,
  },

  callbacks: {
    async signIn({ user, profile }) {
      const email = user.email?.trim().toLowerCase();

      const verified =
        profile?.email_verified === true ||
        profile?.email_verified === "true";

      return Boolean(
        email &&
        adminEmail &&
        email === adminEmail &&
        verified
      );
    },
  },
};

export const getAuthHandler = () => NextAuth(authOptions);
 