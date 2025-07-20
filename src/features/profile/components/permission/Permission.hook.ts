import { useContextSelector } from "use-context-selector";
import { ProfileContext } from "../profile-provider";

export const usePermission = () => {
  const userPermissions = useContextSelector(
    ProfileContext,
    (state) => state?.userPermissions
  );
  return { userPermissions };
};
