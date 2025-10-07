import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Search, Edit } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { MILESTONE_LIST_OPTIONS } from "@/features/milestones/constants/options";
import { useTrackingList } from "./TrackingList.hook";
import { getStatusColor } from "@/features/milestones/utils/milestonesColor";
import { formatCurrency, formatDate, formatPercent } from "@/lib/format";
import { Pagination } from "@/components/pagination";
import { DeleteDialog } from "@/features/milestones/components/delete-dialog";
import { TableEmpty, TableLoading } from "@/components/table";

const TrackingList = ({
  canDeleteMilestone,
}: {
  canDeleteMilestone?: boolean;
}) => {
  const {
    list,
    pagination,
    isLoading,
    handleViewMilestone,
    handlePageChange,
    handleSearch,
    handleStatusChange,
    getProjectName,
  } = useTrackingList();

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-2 lg:space-y-0 lg:justify-between">
          <div>
            <CardTitle>Milestone Tracking</CardTitle>
            <CardDescription>
              Detailed tracking and management of all milestones
            </CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search milestones..."
                className="pl-10 w-full sm:w-64"
                onChange={handleSearch}
              />
            </div>
            <Select onValueChange={handleStatusChange} defaultValue="all">
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[
                  { label: "All Status", value: "all" },
                  ...MILESTONE_LIST_OPTIONS,
                ].map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="min-h-[60vh] flex flex-col max-w-[calc(94vw-1rem)] lg:max-w-none">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted">
              <TableRow>
                <TableHead className="min-w-[200px]">Milestone</TableHead>
                <TableHead className="min-w-[200px]">Project</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Target Date</TableHead>
                <TableHead className="text-right"> Budget</TableHead>
                <TableHead className="text-right">Actual Cost</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableLoading colSpan={10} className="py-[20vh]" />
              ) : !list.length ? (
                <TableEmpty colSpan={10} className="py-[20vh]" />
              ) : (
                list?.map((milestone) => (
                  <TableRow key={milestone.id}>
                    <TableCell>
                      <p className="font-medium">{milestone.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {milestone.milestoneId}
                      </p>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">
                          {getProjectName(milestone?.projectId ?? "")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {milestone.phase}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-center truncate">
                      <Badge className={getStatusColor(milestone.status)}>
                        {milestone.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Progress
                          value={milestone.progress}
                          className="w-16 h-2"
                        />
                        <span className="text-sm">
                          {formatPercent(milestone.progress)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="truncate">
                      {formatDate(milestone.startDate)}
                    </TableCell>
                    <TableCell className="truncate">
                      {formatDate(milestone.targetDate)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(milestone.budget)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(milestone.actualCost ?? 0)}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewMilestone?.(milestone)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        {canDeleteMilestone && (
                          <DeleteDialog id={milestone.id} />
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <div className="mt-auto">
          <Pagination
            totalPages={pagination?.totalPages ?? 0}
            currentPage={pagination?.currentPage ?? 1}
            onPageChange={handlePageChange}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TrackingList;
