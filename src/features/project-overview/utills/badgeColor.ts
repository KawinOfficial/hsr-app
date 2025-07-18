export function getStatusColor(status: string) {
  switch (status) {
    case "On Track":
      return "bg-success-green text-white";
    case "Delayed":
      return "bg-warning-amber text-white";
    case "At Risk":
      return "bg-destructive text-white";
    case "Planning":
      return "bg-rail-blue text-white";
    case "Completed":
      return "bg-rail-gold text-white";
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

export function getVarianceColor(variance: number) {
  if (variance > 3) return "text-destructive";
  if (variance >= 0) return "text-warning-amber";
  return "text-success-green";
}
