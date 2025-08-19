import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useMilestoneDialog } from "./MilestoneDialog.hook";
import { MilestoneForm } from "../milestone-form";

const MilestoneDialog = () => {
  const { selectedMilestone, detailViewOpen, setDetailViewOpen } =
    useMilestoneDialog();

  if (!selectedMilestone) return null;

  return (
    <Dialog open={detailViewOpen} onOpenChange={setDetailViewOpen}>
      <DialogContent className="max-w-2xl ">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle>Milestone Details</DialogTitle>
          <DialogDescription>
            View and manage milestone details
          </DialogDescription>
        </DialogHeader>

        <MilestoneForm />
      </DialogContent>
    </Dialog>
  );
};

export default MilestoneDialog;
