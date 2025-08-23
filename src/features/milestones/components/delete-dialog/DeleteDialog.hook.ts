import { useState } from "react";
import { useDeleteMilestone } from "@/features/milestones/hooks/use-delete-milestone";
import { useToast } from "@/hooks/use-toast";
import { useContextSelector } from "use-context-selector";
import { MilestonesContext } from "../milestones-provider/MilestonesProvider";

export interface UseDeleteDialog {
  id: string;
}

export const useDeleteDialog = ({ id }: UseDeleteDialog) => {
  const { toast } = useToast();

  const refetch = useContextSelector(
    MilestonesContext,
    (state) => state?.refetch
  );
  const [open, setOpen] = useState(false);
  const { mutate: deleteMilestone, isPending } = useDeleteMilestone();

  function onDelete() {
    deleteMilestone(id, {
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Milestone Deleted",
          description: "Your milestone has been deleted successfully.",
        });
        setOpen(false);
        refetch?.();
      },
      onError: (error) => {
        const errorMessage =
          error instanceof Error ? error.message : "Registration failed";
        toast({
          variant: "destructive",
          title: "Milestone Deletion Failed",
          description: errorMessage,
        });
      },
    });
  }

  return { open, setOpen, onDelete, isLoading: isPending };
};
