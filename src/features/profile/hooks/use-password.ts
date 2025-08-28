import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { Password } from "../schemas/Password.schema";
import { API_ROUTES } from "@/routers/api";

export const usePassword = () => {
  return useMutation({
    mutationKey: ["change-password"],
    mutationFn: async (data: Password) =>
      await api
        .post(API_ROUTES.changePassword, {
          json: data,
        })
        .json(),
  });
};
