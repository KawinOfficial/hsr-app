import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, AlertTriangle, TrendingUp, Eye, Edit } from "lucide-react";
import { Download } from "lucide-react";
import { CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  getStatusColor,
  getRiskColor,
} from "@/features/project-management/utills/badgeColor";
import { formatCurrency } from "@/lib/format";

const budgetProjects = [
  {
    id: "PRJ-2024-001",
    title: "Bangkok-Nakhon Ratchasima Mainline",
    totalBudget: 2400000000,
    allocatedBudget: 2280000000,
    spentAmount: 1368000000,
    remainingBudget: 912000000,
    status: "Active",
    progress: 60,
    manager: "Sompong Rattanakul",
    startDate: "2023-03-01",
    endDate: "2025-12-31",
    riskLevel: "Medium",
    costVariance: -2.5,
  },
  {
    id: "PRJ-2024-002",
    title: "Rolling Stock Manufacturing",
    totalBudget: 1800000000,
    allocatedBudget: 1620000000,
    spentAmount: 729000000,
    remainingBudget: 891000000,
    status: "Active",
    progress: 45,
    manager: "Liu Wei Chen",
    startDate: "2023-06-01",
    endDate: "2026-03-31",
    riskLevel: "Low",
    costVariance: 1.2,
  },
  {
    id: "PRJ-2024-003",
    title: "Maintenance Facility Construction",
    totalBudget: 900000000,
    allocatedBudget: 810000000,
    spentAmount: 243000000,
    remainingBudget: 567000000,
    status: "Planning",
    progress: 30,
    manager: "Narong Sirisak",
    startDate: "2024-01-01",
    endDate: "2025-06-30",
    riskLevel: "High",
    costVariance: 0.0,
  },
];

const BudgetPlaning = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Budget Planning & Management</CardTitle>
            <CardDescription>
              Define and manage project budgets and financial allocations
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Import Budget
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Budget
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {budgetProjects.map((project) => (
            <Card
              key={project.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                  <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          ID: {project.id} • Manager: {project.manager}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                        <div className="flex items-center">
                          <AlertTriangle
                            className={`h-4 w-4 mr-1 ${getRiskColor(
                              project.riskLevel
                            )}`}
                          />
                          <span
                            className={`text-sm ${getRiskColor(
                              project.riskLevel
                            )}`}
                          >
                            {project.riskLevel} Risk
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">
                            Project Progress
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {project.progress}%
                          </span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Start Date
                          </p>
                          <p className="text-sm font-medium">
                            {project.startDate}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            End Date
                          </p>
                          <p className="text-sm font-medium">
                            {project.endDate}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground">
                          Total Budget
                        </p>
                        <p className="text-sm font-bold text-rail-blue">
                          {formatCurrency(project.totalBudget)}
                        </p>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground">
                          Allocated
                        </p>
                        <p className="text-sm font-bold text-rail-gold">
                          {formatCurrency(project.allocatedBudget)}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Spent</p>
                        <p className="text-sm font-bold text-construction-orange">
                          {formatCurrency(project.spentAmount)}
                        </p>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground">
                          Remaining
                        </p>
                        <p className="text-sm font-bold text-success-green">
                          {formatCurrency(project.remainingBudget)}
                        </p>
                      </div>
                    </div>

                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">
                        Cost Variance
                      </p>
                      <div className="flex items-center justify-center">
                        {project.costVariance >= 0 ? (
                          <TrendingUp className="h-4 w-4 mr-1 text-success-green" />
                        ) : (
                          <TrendingUp className="h-4 w-4 mr-1 text-destructive rotate-180" />
                        )}
                        <p
                          className={`text-sm font-bold ${
                            project.costVariance >= 0
                              ? "text-success-green"
                              : "text-destructive"
                          }`}
                        >
                          {project.costVariance > 0 ? "+" : ""}
                          {project.costVariance}%
                        </p>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        // onClick={() => handleViewProject(project)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        // onClick={() => handleEditProject(project)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetPlaning;
