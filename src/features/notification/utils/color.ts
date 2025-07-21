export function getPriorityColor(priority: string) {
  switch (priority) {
    case "High":
      return "text-destructive";
    case "Medium":
      return "text-warning-amber";
    case "Low":
      return "text-success-green";
    default:
      return "text-muted-foreground";
  }
}

export function getActionColor(action: string) {
  switch (action) {
    case "approval_required":
      return "bg-warning-amber text-white";
    case "revision_required":
      return "bg-construction-orange text-white";
    case "status_update":
      return "bg-success-green text-white";
    case "deadline_reminder":
      return "bg-destructive text-white";
    default:
      return "bg-rail-blue text-white";
  }
}
