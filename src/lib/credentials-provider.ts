import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "./supabase";
import bcrypt from "bcryptjs";

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

      if (error || !user) {
        return null;
      }

      const isPasswordValid = bcrypt.compareSync(
        credentials.password as string,
        user.passwordHash as string
      );

      if (!isPasswordValid) {
        return null;
      }

      // Remove sensitive info before returning
      const { passwordHash, ...safeUser } = user;
      return safeUser;
    } catch (err) {
      console.error("Auth error:", err);
      return null;
    }
  },
});
