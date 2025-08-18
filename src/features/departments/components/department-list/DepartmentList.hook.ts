import { useContextSelector } from "use-context-selector";
import { DepartmentContext } from "../department-provider/DepartmentProvider";

export const useDepartmentList = () => {
  const departmentList = useContextSelector(
    DepartmentContext,
    (state) => state?.departmentList
  );
  const handleEditDepartment = useContextSelector(
    DepartmentContext,
    (state) => state?.handleEditDepartment
  );
  const handleViewMembers = useContextSelector(
    DepartmentContext,
    (state) => state?.handleViewMembers
  );
  const options = useContextSelector(
    DepartmentContext,
    (state) => state?.options
  );

  function findHeadName(headId: string) {
    return options?.users.find((user) => user.value === headId)?.label;
  }

  return {
    departmentList,
    handleEditDepartment,
    handleViewMembers,
    findHeadName,
  };
};
