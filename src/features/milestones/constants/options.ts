export const MILESTONE_STATUS = {
  NOT_STARTED: "Not Started",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  DELAYED: "Delayed",
  AT_RISK: "At Risk",
};

export const MILESTONE_LIST_OPTIONS = [
  { label: MILESTONE_STATUS.NOT_STARTED, value: MILESTONE_STATUS.NOT_STARTED },
  { label: MILESTONE_STATUS.IN_PROGRESS, value: MILESTONE_STATUS.IN_PROGRESS },
  { label: MILESTONE_STATUS.COMPLETED, value: MILESTONE_STATUS.COMPLETED },
  { label: MILESTONE_STATUS.DELAYED, value: MILESTONE_STATUS.DELAYED },
  { label: MILESTONE_STATUS.AT_RISK, value: MILESTONE_STATUS.AT_RISK },
];

export const PHASE_OPTIONS = [
  { label: "Planning & Design", value: "Planning" },
  { label: "Construction", value: "Construction" },
  { label: "Track Installation", value: "Track Installation" },
  { label: "Testing", value: "Testing" },
  { label: "Manufacturing", value: "Manufacturing" },
];

export const MILESTONE_PRIORITY = {
  CRITICAL: "Critical",
  HIGH: "High",
  MEDIUM: "Medium",
  LOW: "Low",
};

export const PRIORITY_OPTIONS = [
  { label: MILESTONE_PRIORITY.CRITICAL, value: MILESTONE_PRIORITY.CRITICAL },
  { label: MILESTONE_PRIORITY.HIGH, value: MILESTONE_PRIORITY.HIGH },
  { label: MILESTONE_PRIORITY.MEDIUM, value: MILESTONE_PRIORITY.MEDIUM },
  { label: MILESTONE_PRIORITY.LOW, value: MILESTONE_PRIORITY.LOW },
];
