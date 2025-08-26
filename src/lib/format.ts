import { WorkflowStep } from "@/features/document-types/schemas/Workflow.schema";

export const formatCurrency = (amount?: number) => {
  if (!amount) return "0";
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("us-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatDateWithTime = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
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
