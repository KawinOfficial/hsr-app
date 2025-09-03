export function getActionColor(action: string) {
  switch (action) {
    case "approval_request":
      return "bg-warning-amber text-white";
    case "review_request":
      return "bg-construction-orange text-white";
    case "rejected":
      return "bg-red-500 text-white";
    case "completed":
      return "bg-success-green text-white";
    case "in_review":
      return "bg-yellow-500 text-white";
    default:
      return "bg-rail-blue text-white";
  }
}
