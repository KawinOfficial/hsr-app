"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useDeleteDialog } from "./DeleteDialog.hook";

const DeleteDialog = ({ id }: { id: string }) => {
  const { open, setOpen, onDelete, isLoading } = useDeleteDialog({ id });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-red-500">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md p-6 space-y-4">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            Delete Milestone
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this milestone? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              disabled={isLoading}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button variant="destructive" onClick={onDelete} disabled={isLoading}>
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
