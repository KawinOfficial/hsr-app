import { useState } from "react";

export const useCreateProjectMilestoneDialog = () => {
  const [open, setOpen] = useState(false);

  function onClose() {
    setOpen(false);
  }

  return { open, setOpen, onClose };
};
