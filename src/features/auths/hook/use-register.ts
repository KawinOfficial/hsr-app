import { useMutation } from "@tanstack/react-query";
import { RegisterFormData } from "../schemas/Register.schema";
import { api } from "@/lib/api";
import { API_ROUTES } from "@/routers/api";

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: RegisterFormData) => {
      console.log("data", data);
      return await api.post(API_ROUTES.register, { json: data }).json();
    },
  });
};
