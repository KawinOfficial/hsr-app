import { useState } from "react";

export const useDeleteDialog = () => {
  const [open, setOpen] = useState(false);

  const isLoading = false;

  function onDelete() {
    setOpen(false);
  }

  return { open, setOpen, onDelete, isLoading };
};
