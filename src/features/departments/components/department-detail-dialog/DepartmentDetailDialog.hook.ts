import { useContextSelector } from "use-context-selector";
import { DepartmentContext } from "../department-provider/DepartmentProvider";

export const useDepartmentDetailDialog = () => {
  const departmentEditOpen = useContextSelector(
    DepartmentContext,
    (state) => state?.departmentEditOpen
  );
  const setDepartmentEditOpen = useContextSelector(
    DepartmentContext,
    (state) => state?.setDepartmentEditOpen
  );
  const selectedDepartment = useContextSelector(
    DepartmentContext,
    (state) => state?.selectedDepartment
  );
  const options = useContextSelector(
    DepartmentContext,
    (state) => state?.options
  );

  return {
    departmentEditOpen,
    setDepartmentEditOpen,
    selectedDepartment,
    options,
  };
};
