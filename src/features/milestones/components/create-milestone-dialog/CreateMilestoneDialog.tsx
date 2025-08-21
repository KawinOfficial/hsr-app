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
import { useCreateMilestoneDialog } from "./CreateMilestoneDialog.hook";
import { MilestoneForm } from "../milestone-form";

const CreateMilestoneDialog = () => {
  const { open, setOpen, onClose } = useCreateMilestoneDialog();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          New Milestone
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl ">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle>Create New Milestone</DialogTitle>
          <DialogDescription>
            Add a new milestone to track project progress and deliverables
          </DialogDescription>
        </DialogHeader>

        <MilestoneForm onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateMilestoneDialog;
