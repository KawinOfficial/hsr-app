export function getStatusColor(status: string) {
  switch (status) {
    case "Active":
      return "bg-success-green text-white";
    case "Inactive":
      return "bg-muted text-muted-foreground";
    case "Suspended":
      return "bg-destructive text-white";
    case "Pending":
      return "bg-warning-amber text-white";
    default:
      return "bg-muted text-muted-foreground";
  }
}
