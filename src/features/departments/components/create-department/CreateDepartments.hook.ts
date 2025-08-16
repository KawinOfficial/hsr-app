import { useContextSelector } from "use-context-selector";
import { DepartmentContext } from "../department-provider/DepartmentProvider";

export const useCreateDepartment = () => {
  const options = useContextSelector(
    DepartmentContext,
    (state) => state?.options
  );

  return {
    options,
  };
};
