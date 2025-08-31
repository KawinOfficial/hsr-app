import { api } from "@/lib/api";
import { validatedPromise } from "@/lib/promise";
import { useQuery } from "@tanstack/react-query";
import {
  NotificationList,
  NotificationListSchema,
} from "../schemas/Notification.schema";
import { API_ROUTES } from "@/routers/api";

export const useNotification = () => {
  return useQuery({
    queryKey: ["notification"],
    queryFn: async () => {
      const response = await api
        .get<{ data: NotificationList }>(API_ROUTES.notifications)
        .json();
      return validatedPromise<NotificationList>(
        response.data,
        NotificationListSchema,
        "notification"
      );
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};
