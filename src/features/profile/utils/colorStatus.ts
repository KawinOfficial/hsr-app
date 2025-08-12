export function getStatusColor(status: string) {
  const formatStatus = status.toLowerCase();
  switch (formatStatus) {
    case "active":
    case "completed":
      return "bg-success-green text-white";
    case "pending":
      return "bg-warning-amber text-white";
    case "expired":
      return "bg-destructive text-white";
    default:
      return "bg-muted text-muted-foreground";
  }
}
