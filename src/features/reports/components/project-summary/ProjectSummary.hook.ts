import { pathToUrl } from "@/lib/router";
import { PAGE_ROUTES } from "@/routers/page";
import { useRouter } from "next/navigation";

const projectSummaries = [
  {
    id: "TH-CN-001",
    name: "Bangkok-Nakhon Ratchasima",
    progress: 68,
    budget: 1200000000,
    spent: 816000000,
    variance: -2.1,
    status: "On Track",
    completion: "2025-08-15",
    milestones: { completed: 12, total: 18 },
    riskLevel: "Low",
  },
  {
    id: "TH-CN-002",
    name: "Nakhon Ratchasima-Nong Khai",
    progress: 34,
    budget: 950000000,
    spent: 323000000,
    variance: 3.2,
    status: "Delayed",
    completion: "2026-02-28",
    milestones: { completed: 6, total: 16 },
    riskLevel: "Medium",
  },
  {
    id: "TH-CN-003",
    name: "Rolling Stock Procurement",
    progress: 45,
    budget: 700000000,
    spent: 315000000,
    variance: -1.8,
    status: "On Track",
    completion: "2025-12-31",
    milestones: { completed: 8, total: 14 },
    riskLevel: "Low",
  },
];

export const useProjectSummary = () => {
  const router = useRouter();

  function onViewProject(id: string) {
    router.push(pathToUrl(PAGE_ROUTES.PROJECT_DETAIL, { id }));
  }
  return { projectSummaries, onViewProject };
};
