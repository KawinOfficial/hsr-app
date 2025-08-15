import { useContextSelector } from "use-context-selector";
import { DepartmentContext } from "../department-provider/DepartmentProvider";

export const useDepartmentList = () => {
  const departments = useContextSelector(
    DepartmentContext,
    (state) => state?.departments
  );
  const handleEditDepartment = useContextSelector(
    DepartmentContext,
    (state) => state?.handleEditDepartment
  );
  const handleViewMembers = useContextSelector(
    DepartmentContext,
    (state) => state?.handleViewMembers
  );

  return {
    departments,
    handleEditDepartment,
    handleViewMembers,
  };
};
