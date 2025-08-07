import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PAGE_ROUTES } from "@/routers/page";

export const useAuth = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const logout = async () => {
    await signOut({ redirect: false });
    router.push(PAGE_ROUTES.LOGIN);
  };

  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";

  return {
    session,
    user: session?.user,
    isAuthenticated,
    isLoading,
    logout,
  };
};
