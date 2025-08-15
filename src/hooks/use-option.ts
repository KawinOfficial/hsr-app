import {
  Options,
  OptionsSchema,
} from "@/features/profile/schemas/Option.schema";
import { api } from "@/lib/api";
import { validatedPromise } from "@/lib/promise";
import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "@/routers/api";

export const useOptions = () => {
  return useQuery({
    queryKey: ["options"],
    queryFn: async () => {
      const data = await api.get(API_ROUTES.options).json();
      return validatedPromise<Options>(data, OptionsSchema, "options");
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};
