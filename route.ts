[build]
  command = "npm install && npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"
  NPM_FLAGS = "--legacy-peer-deps"

[[plugins]]
  package = "@netlify/plugin-nextjs"


import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// Import types
import "@/lib/auth/types";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "hello@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // This is where you would typically verify against a database
        // For now, we'll use a simple check for demo purposes
        if (credentials?.email && credentials?.password) {
          // Return a mock user for now
          return {
            id: "1",
            name: "Demo User",
            email: credentials.email,
            image: "https://via.placeholder.com/150",
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    // signOut: '/auth/signout',
    // error: '/auth/error',
    // verifyRequest: '/auth/verify-request',
    // newUser: '/auth/new-user'
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub || "";
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "NEXTAUTH_SECRET_PLACEHOLDER",
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
