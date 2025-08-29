export function getActionColor(action: string) {
  switch (action) {
    case "approval_request":
      return "bg-warning-amber text-white";
    case "rejected":
      return "bg-construction-orange text-white";
    case "completed":
      return "bg-success-green text-white";
    case "deadline_reminder":
      return "bg-destructive text-white";
    default:
      return "bg-rail-blue text-white";
  }
}
