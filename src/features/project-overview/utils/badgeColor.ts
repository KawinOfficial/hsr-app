export function getStatusColor(status: string) {
  const formatStatus = status.toLowerCase();
  switch (formatStatus) {
    case "on track":
      return "bg-success-green text-white";
    case "not started":
      return "bg-muted text-muted-foreground";
    case "in progress":
      return "bg-rail-blue text-white";
    case "delayed":
      return "bg-warning-amber text-white";
    case "at risk":
      return "bg-destructive text-white";
    case "planning":
      return "bg-rail-blue text-white";
    case "completed":
      return "bg-rail-gold text-white";
    default:
      return "bg-muted text-muted-foreground";
  }
}

export function getRiskColor(level: string) {
  const formatLevel = level.toLowerCase();
  switch (formatLevel) {
    case "low":
      return "text-success-green";
    case "medium":
      return "text-warning-amber";
    case "high":
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
