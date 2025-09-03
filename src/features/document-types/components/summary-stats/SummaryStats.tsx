"use client";

import { Loading } from "@/components/loading";
import { useSummaryStats } from "./SummaryStats.hook";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Workflow, Activity, Clock } from "lucide-react";

const SummaryStats = () => {
  const { documentTypes, workflows, avgProcessingTime, totalDocument } =
    useSummaryStats();

  if (!documentTypes || !workflows)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Document Types
          </CardTitle>
          <FileText className="h-5 w-5 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{documentTypes.length}</div>
          <p className="text-xs text-muted-foreground">
            {documentTypes.filter((dt) => dt.isActive).length} active
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Active Workflows
          </CardTitle>
          <Workflow className="h-5 w-5 text-rail-blue" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{workflows.length}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Documents
          </CardTitle>
          <Activity className="h-5 w-5 text-construction-orange" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totalDocument?.totalCount ?? 0}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Processing Time
          </CardTitle>
          <Clock className="h-5 w-5 text-success-green" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avgProcessingTime}</div>
          <p className="text-xs text-muted-foreground">average</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryStats;
