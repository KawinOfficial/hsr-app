import { WorkflowStep } from "@/features/document-types/schemas/Workflow.schema";

export const formatCurrency = (amount?: number) => {
  if (!amount) return "0";
  return new Intl.NumberFormat("th-TH", {
    currency: "THB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

import dayjs from "dayjs";

export const formatDate = (date: string) => {
  return dayjs(date).format("DD/MM/YYYY");
};

export const formatDateWithTime = (date: string) => {
  return dayjs(date).format("DD/MM/YYYY HH:mm");
};

export const formatPercent = (percent: number) => {
  return new Intl.NumberFormat("th-TH", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(percent / 100);
};

export const formatDateInput = (dateStr?: string) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";

  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

export const calculateTotalTimeLimit = (steps: WorkflowStep[]) => {
  const totalHours = steps.reduce(
    (acc, step) => acc + Number(step.timeLimit),
    0
  );
  if (totalHours >= 24) {
    const days = totalHours / 24;
    // Show as integer if whole number, else 1 decimal
    const formattedDays = Number.isInteger(days) ? days : days.toFixed(1);
    return `${formattedDays} day${days !== 1 ? "s" : ""}`;
  }
  return `${totalHours} hour${totalHours !== 1 ? "s" : ""}`;
};

export const generatePaymentId = (
  prefix: string,
  lastPaymentId: string | null,
  month: string,
  year: string
): string => {
  let runningNumber = 1;
  if (lastPaymentId) {
    const regex = new RegExp(`^${prefix}-${month}${year}-(\\d{4})$`);
    const match = lastPaymentId.match(regex);
    if (match && match[1]) {
      runningNumber = parseInt(match[1], 10) + 1;
    }
  }
  return `${prefix}-${month}${year}-${runningNumber
    .toString()
    .padStart(4, "0")}`;
};
