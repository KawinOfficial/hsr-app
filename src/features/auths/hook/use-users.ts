import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => await api.get("users").json(),
    retry: false,
  });
};
