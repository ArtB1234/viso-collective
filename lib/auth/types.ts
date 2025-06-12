import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's unique identifier */
      id: string;
    } & DefaultSession["user"];
  }

  interface User {
    /** The user's unique identifier */
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}
