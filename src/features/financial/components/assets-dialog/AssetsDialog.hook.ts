import { useContextSelector } from "use-context-selector";
import { AssetsContext } from "../assets-provider";

export const useAssetsDialog = () => {
  const assetsOpen = useContextSelector(
    AssetsContext,
    (state) => state?.assetsOpen
  );
  const setAssetsOpen = useContextSelector(
    AssetsContext,
    (state) => state?.setAssetsOpen
  );
  const handleCloseAssets = useContextSelector(
    AssetsContext,
    (state) => state?.handleCloseAssets
  );
  const selectedId = useContextSelector(
    AssetsContext,
    (state) => state?.selectedId
  );

  return {
    assetsOpen,
    setAssetsOpen,
    handleCloseAssets,
    selectedId,
  };
};
