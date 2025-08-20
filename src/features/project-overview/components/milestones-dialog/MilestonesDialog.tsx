import {
  DialogHeader,
  DialogDescription,
  DialogTitle,
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { useMilestonesDialog } from "./MilestonesDialog.hook";
import { MILESTONE_STATUS_OPTIONS } from "@/features/project-overview/constants/options";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const MilestonesDialog = () => {
  const {
    selectedMilestone,
    updateDialogOpen,
    setUpdateDialogOpen,
    handleSaveUpdate,
    handleCancelUpdate,
  } = useMilestonesDialog();

  return (
    <Dialog open={updateDialogOpen} onOpenChange={setUpdateDialogOpen}>
      <DialogContent className="p-6">
        <DialogHeader>
          <DialogTitle>Update Milestone Progress</DialogTitle>
          <DialogDescription>
            {selectedMilestone?.name} - Update progress and status
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <Label htmlFor="progress">Progress (%)</Label>
            <Input id="progress" type="number" min="0" max="100" />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MILESTONE_STATUS_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="notes">Progress Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add notes about progress update..."
              rows={3}
            />
          </div>
        </div>
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={handleCancelUpdate}>
            Cancel
          </Button>
          <Button onClick={handleSaveUpdate}>Save Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MilestonesDialog;
