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
