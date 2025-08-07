import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "./supabase";

export const credentialsProvider = CredentialsProvider({
  name: "credentials",
  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    if (!credentials?.email || !credentials?.password) {
      return null;
    }

    try {
      const { data: user, error } = await supabase
        .from("User")
        .select("*")
        .eq("email", credentials.email)
        .single();

      if (!user || error) {
        return null;
      }

      // TODO: Use bcrypt or similar
      if (user.passwordHash !== credentials.password) {
        return null;
      }

      return {
        ...user,
      };
    } catch (error) {
      console.error("Auth error:", error);
      return null;
    }
  },
});
