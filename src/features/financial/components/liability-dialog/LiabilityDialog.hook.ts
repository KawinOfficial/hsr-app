import { useContextSelector } from "use-context-selector";
import { LiabilityContext } from "../liability-provider";

export const useLiabilityDialog = () => {
  const liabilityOpen = useContextSelector(
    LiabilityContext,
    (state) => state?.liabilityOpen
  );
  const setLiabilityOpen = useContextSelector(
    LiabilityContext,
    (state) => state?.setLiabilityOpen
  );
  const handleCloseLiability = useContextSelector(
    LiabilityContext,
    (state) => state?.handleCloseLiability
  );
  const selectedId = useContextSelector(
    LiabilityContext,
    (state) => state?.selectedId
  );

  return {
    liabilityOpen,
    setLiabilityOpen,
    handleCloseLiability,
    selectedId,
  };
};
