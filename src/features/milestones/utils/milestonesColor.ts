export function getStatusColor(status: string) {
  switch (status) {
    case "Completed":
      return "bg-success-green text-white";
    case "In Progress":
      return "bg-rail-blue text-white";
    case "Delayed":
      return "bg-construction-orange text-white";
    case "At Risk":
      return "bg-destructive text-white";
    case "Not Started":
      return "bg-muted text-muted-foreground";
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

export function getVarianceColor(variance: number) {
  if (variance > 5) return "text-destructive";
  if (variance > 0) return "text-warning-amber";
  return "text-success-green";
}

export function getMilestoneStatusColor(status: string) {
  switch (status) {
    case "Completed":
      return "bg-success-green border-success-green";
    case "In Progress":
      return "bg-rail-blue border-rail-blue";
    case "Delayed":
      return "bg-construction-orange border-construction-orange";
    default:
      return "bg-background border-gray-200";
  }
}
