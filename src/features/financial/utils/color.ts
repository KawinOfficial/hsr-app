export function getStatusColor(status: string) {
  switch (status) {
    case "Processed":
    case "Excellent":
    case "Current":
      return "bg-success-green text-white";
    case "Pending Approval":
    case "Pending":
      return "bg-warning-amber text-white";
    case "Approved":
    case "Good":
      return "bg-rail-blue text-white";
    case "In Progress":
      return "bg-construction-orange text-white";
    case "Overdue":
    case "Critical":
      return "bg-destructive text-white";
    case "Long-term":
      return "bg-muted text-muted-foreground";
    case "New":
      return "bg-rail-gold text-white";
    default:
      return "bg-muted text-muted-foreground";
  }
}

export function getPriorityColor(priority: string) {
  switch (priority) {
    case "Critical":
      return "text-destructive";
    case "High":
      return "text-construction-orange";
    case "Medium":
      return "text-warning-amber";
    case "Low":
      return "text-success-green";
    default:
      return "text-muted-foreground";
  }
}
