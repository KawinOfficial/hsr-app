import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Edit, FileText, Download } from "lucide-react";
import { useMilestoneDialog } from "./MilestoneDialog.hook";
import { formatCurrency } from "@/lib/format";
import { getStatusColor } from "@/features/milestones/utils/milestonesColor";

const MilestoneDialog = () => {
  const { selectedMilestone, detailViewOpen, setDetailViewOpen } =
    useMilestoneDialog();

  if (!selectedMilestone) return null;

  return (
    <Dialog open={detailViewOpen} onOpenChange={setDetailViewOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle>{selectedMilestone.title}</DialogTitle>
          <DialogDescription>
            Milestone ID: {selectedMilestone.id} • Project:{" "}
            {selectedMilestone.project}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          {/* Milestone details content would go here */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Label className="font-medium">Status</Label>
              <Badge className={getStatusColor(selectedMilestone.status)}>
                {selectedMilestone.status}
              </Badge>
            </div>
            <div>
              <Label className="font-medium">Progress</Label>
              <div className="flex items-center space-x-2">
                <Progress
                  value={selectedMilestone.progress}
                  className="flex-1"
                />
                <span>{selectedMilestone.progress}%</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="font-medium">Target Date</Label>
              <p>{selectedMilestone.targetDate}</p>
            </div>
            <div>
              <Label className="font-medium">Assigned To</Label>
              <p>{selectedMilestone.assignedTo}</p>
            </div>
          </div>

          <div>
            <Label className="font-medium">Description</Label>
            <p className="text-sm text-muted-foreground">
              {selectedMilestone.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="font-medium">Budget</Label>
              <p>{formatCurrency(selectedMilestone.budget)}</p>
            </div>
            <div>
              <Label className="font-medium">Actual Cost</Label>
              <p>{formatCurrency(selectedMilestone.actualCost)}</p>
            </div>
          </div>

          <div>
            <Label className="font-medium">Deliverables</Label>
            <ul className="list-disc list-inside text-sm text-muted-foreground mt-1">
              {selectedMilestone.deliverables.map(
                (deliverable: string, index: number) => (
                  <li key={index}>{deliverable}</li>
                )
              )}
            </ul>
          </div>

          <div className="flex space-x-2 border-t pt-4 justify-end">
            <Button>
              <Edit className="h-4 w-4 mr-2" />
              Edit Milestone
            </Button>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Update Progress
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MilestoneDialog;
