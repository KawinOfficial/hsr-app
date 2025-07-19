import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Save } from "lucide-react";
import { useCreateMilestoneDialog } from "./CreateMilestoneDialog.hook";
import {
  PHASE_OPTIONS,
  PRIORITY_OPTIONS,
} from "@/features/milestones/constants/options";

const CreateMilestoneDialog = () => {
  const { projectOptions, open, setOpen } = useCreateMilestoneDialog();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          New Milestone
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl p-6">
        <DialogHeader>
          <DialogTitle>Create New Milestone</DialogTitle>
          <DialogDescription>
            Add a new milestone to track project progress and deliverables
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="milestone-title">Milestone Title</Label>
              <Input id="milestone-title" placeholder="Enter milestone title" />
            </div>
            <div>
              <Label htmlFor="milestone-project">Project</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  {projectOptions?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="milestone-description">Description</Label>
            <Textarea
              id="milestone-description"
              placeholder="Enter milestone description"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="milestone-phase">Phase</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select phase" />
                </SelectTrigger>
                <SelectContent>
                  {PHASE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="milestone-priority">Priority</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  {PRIORITY_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="milestone-budget">Budget (THB)</Label>
              <Input id="milestone-budget" type="number" placeholder="0" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="milestone-start">Start Date</Label>
              <Input id="milestone-start" type="date" />
            </div>
            <div>
              <Label htmlFor="milestone-target">Target Date</Label>
              <Input id="milestone-target" type="date" />
            </div>
          </div>
          <div>
            <Label htmlFor="milestone-assignee">Assigned To</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select assignee" />
              </SelectTrigger>
              <SelectContent></SelectContent>
            </Select>
          </div>
        </form>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Create Milestone
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMilestoneDialog;
