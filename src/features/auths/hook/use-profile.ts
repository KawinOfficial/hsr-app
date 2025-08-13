import { api } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "@/routers/api";
import {
  Profile,
  ProfileSchema,
} from "@/features/auths/schemas/Profile.schema";
import { validatedPromise } from "@/lib/promise";
import { useSession } from "next-auth/react";

export const useProfile = () => {
  const session = useSession();
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const data = await api.get(API_ROUTES.profile).json();
      return validatedPromise<Profile>(data, ProfileSchema, "profile");
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!session.data?.user?.id,
  });
};

export const useUpdateProfile = () => {
  return useMutation({
    mutationKey: ["update-profile"],
    mutationFn: async (data: Profile) => {
      const response = await api
        .put(API_ROUTES.profile, {
          body: JSON.stringify(data),
        })
        .json();

      return validatedPromise<Profile>(response, ProfileSchema, "profile");
    },
  });
};
