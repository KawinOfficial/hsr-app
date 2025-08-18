export function getStatusColor(status: string) {
  const formattedStatus = status.toLowerCase();
  switch (formattedStatus) {
    case "active":
      return "bg-success-green text-white";
    case "inactive":
      return "bg-muted text-muted-foreground";
    case "suspended":
      return "bg-destructive text-white";
    case "pending":
      return "bg-warning-amber text-white";
    default:
      return "bg-muted text-muted-foreground";
  }
}
