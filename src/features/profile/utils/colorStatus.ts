export function getStatusColor(status: string) {
  switch (status) {
    case "Active":
    case "Completed":
      return "bg-success-green text-white";
    case "Pending":
      return "bg-warning-amber text-white";
    case "Expired":
      return "bg-destructive text-white";
    default:
      return "bg-muted text-muted-foreground";
  }
}
