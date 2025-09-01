import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useCreateProjectMilestoneDialog } from "./CreateProjectMilestoneDialog.hook";
import { MilestoneForm } from "@/features/milestones/components/milestone-form";

const CreateProjectMilestoneDialog = () => {
  const { open, setOpen, onClose } = useCreateProjectMilestoneDialog();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Milestone
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl ">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle>Create New Project Milestone</DialogTitle>
          <DialogDescription>
            Add a new project milestone to track project progress and
            deliverables
          </DialogDescription>
        </DialogHeader>

        <MilestoneForm onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectMilestoneDialog;
