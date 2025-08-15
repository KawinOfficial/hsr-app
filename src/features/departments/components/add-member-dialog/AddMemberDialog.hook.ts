import { useContextSelector } from "use-context-selector";
import { DepartmentContext } from "../department-provider/DepartmentProvider";
import { useState } from "react";

export const useAddMemberDialog = () => {
  const [open, setOpen] = useState(false);
  const teamMembers = useContextSelector(
    DepartmentContext,
    (state) => state?.teamMembers
  );

  return {
    teamMembers,
    open,
    setOpen,
  };
};
