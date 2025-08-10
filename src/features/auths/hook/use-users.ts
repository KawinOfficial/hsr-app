import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "@/routers/api";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => await api.get(API_ROUTES.users).json(),
    retry: false,
  });
};
