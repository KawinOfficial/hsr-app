import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { API_ROUTES } from "@/routers/api";
import { validatedPromise } from "@/lib/promise";
import {
  PaymentListSchema,
  PaymentList,
  Payment,
  PaymentSchema,
} from "../schemas/Payment.schema";
import { pathToUrl } from "@/lib/router";

export const usePaymentList = ({
  page,
  limit,
  keyword,
  projectId,
}: {
  page: number;
  limit: number;
  keyword: string;
  projectId: string;
}) => {
  return useQuery({
    queryKey: ["payments", page, limit, keyword, projectId],
    queryFn: async () => {
      const response = await api
        .get<PaymentList>(API_ROUTES.payment, {
          searchParams: { page, limit, keyword, projectId },
        })
        .json();
      return validatedPromise<PaymentList>(
        response,
        PaymentListSchema,
        "payments"
      );
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export function usePaymentDetail(id: string) {
  return useQuery({
    queryKey: ["payment", id],
    queryFn: async () => {
      const response = await api
        .get<{ data: Payment }>(pathToUrl(API_ROUTES.paymentDetail, { id }))
        .json();
      return validatedPromise<Payment>(response.data, PaymentSchema, "payment");
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
}

export function useCreatePayment() {
  return useMutation({
    mutationKey: ["create-payment"],
    mutationFn: async (payment: Payment) => {
      return await api.post(API_ROUTES.payment, { json: payment }).json();
    },
  });
}

export function useUpdatePayment(id: string) {
  return useMutation({
    mutationKey: ["update-payment"],
    mutationFn: async (payment: Payment) => {
      return await api
        .put(pathToUrl(API_ROUTES.paymentDetail, { id }), {
          json: payment,
        })
        .json();
    },
  });
}

export function useDeletePayment(id: string) {
  return useMutation({
    mutationKey: ["delete-payment"],
    mutationFn: async () => {
      return await api
        .delete(pathToUrl(API_ROUTES.paymentDetail, { id }))
        .json();
    },
  });
}
