import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "@/routers/api";
import {
  Profile,
  ProfileSchema,
} from "@/features/auths/schemas/Profile.schema";
import { validatedPromise } from "@/lib/promise";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const data = await api.get(API_ROUTES.profile).json();
      return validatedPromise<Profile>(data, ProfileSchema, "profile");
    },
    retry: false,
  });
};
