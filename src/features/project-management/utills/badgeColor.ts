export function getStatusColor(status: string) {
  switch (status) {
    case "Open":
      return "bg-rail-blue text-white";
    case "Evaluation":
      return "bg-warning-amber text-white";
    case "Awarded":
      return "bg-success-green text-white";
    case "Active":
      return "bg-success-green text-white";
    case "Planning":
      return "bg-rail-gold text-white";
    case "Closed":
      return "bg-muted text-muted-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
}

export function getRiskColor(level: string) {
  switch (level) {
    case "Low":
      return "text-success-green";
    case "Medium":
      return "text-warning-amber";
    case "High":
      return "text-destructive";
    default:
      return "text-muted-foreground";
  }
}
