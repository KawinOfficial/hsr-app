import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Search, Filter, Edit, Trash } from "lucide-react";
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
import { formatCurrency, formatDate } from "@/lib/format";
import { Milestone } from "@/features/milestones/schemas/Milestones.schema";

const TrackingList = () => {
  const { milestones, handleViewMilestone } = useTrackingList();

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
              />
            </div>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MILESTONE_LIST_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" />
            </Button>
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
              <TableHead>Budget</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {milestones?.map((milestone) => (
              <TableRow key={milestone.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{milestone.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {milestone.id}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="text-sm">{milestone.project}</p>
                    <p className="text-xs text-muted-foreground">
                      {milestone.phase}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(milestone.status)}>
                    {milestone.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Progress value={milestone.progress} className="w-16 h-2" />
                    <span className="text-sm">{milestone.progress}%</span>
                  </div>
                </TableCell>
                <TableCell>{formatDate(milestone.startDate)}</TableCell>
                <TableCell>{formatDate(milestone.targetDate)}</TableCell>
                <TableCell>{formatCurrency(milestone.budget)}</TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleViewMilestone?.(milestone as unknown as Milestone)
                      }
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TrackingList;
