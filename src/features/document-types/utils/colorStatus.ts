export function getStatusColor(status: string) {
  switch (status) {
    case "Active":
    case "Completed":
      return "bg-success-green text-white";
    case "Pending":
      return "bg-warning-amber text-white";
    case "Inactive":
      return "bg-muted text-muted-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
}

export function getCategoryColor(category: string) {
  switch (category) {
    case "Procurement":
      return "bg-rail-blue text-white";
    case "Finance":
      return "bg-construction-orange text-white";
    case "Legal":
      return "bg-rail-gold text-white";
    case "Engineering":
      return "bg-success-green text-white";
    default:
      return "bg-muted text-muted-foreground";
  }
}
