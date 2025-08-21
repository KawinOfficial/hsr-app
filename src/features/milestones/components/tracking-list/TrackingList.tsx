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

const TrackingList = () => {
  const {
    list,
    pagination,
    isLoading,
    handleViewMilestone,
    handlePageChange,
    handleSearch,
    handleStatusChange,
  } = useTrackingList();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Milestone Tracking</CardTitle>
            <CardDescription>
              Detailed tracking and management of all milestones
            </CardDescription>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search milestones..."
                className="pl-10 w-64"
                onChange={handleSearch}
              />
            </div>
            <Select onValueChange={handleStatusChange} defaultValue="all">
              <SelectTrigger className="w-40">
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

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Milestone</TableHead>
              <TableHead>Project</TableHead>
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
                    <div>
                      <p className="font-medium">{milestone.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {milestone.milestoneId}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">
                        {milestone.projectId ?? "No project"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {milestone.phase}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
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
                  <TableCell>{formatDate(milestone.startDate)}</TableCell>
                  <TableCell>{formatDate(milestone.targetDate)}</TableCell>
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
                      <DeleteDialog />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <Pagination
          totalPages={pagination?.totalPages ?? 0}
          currentPage={pagination?.currentPage ?? 1}
          onPageChange={handlePageChange}
        />
      </CardContent>
    </Card>
  );
};

export default TrackingList;
