import { useMemo, useState } from "react";
import { DocumentType } from "@/features/document-types/schemas/DocumentTypes.schema";
import {
  useCategoryOptions,
  useDocumentTypeOptions,
  useWorkflowOptions,
} from "@/hooks/use-option";
import { useDocumentType } from "@/features/document-types/hooks/use-document-type";
import { useDebouncedValue } from "@/hooks/use-debouce";
import { Workflow } from "@/features/document-types/schemas/Workflow.schema";
import { Category } from "@/features/category/schemas/Category.schema";
import { usePermissions } from "@/hooks/use-permissions";

type SelectedDocumentType = DocumentType & {
  category: Category;
  workflow: Workflow;
};

export const useDocumentProvider = () => {
  const [createOpen, setCreateOpen] = useState(false);
  const [detailViewOpen, setDetailViewOpen] = useState(false);
  const [selectedDocumentType, setSelectedDocumentType] =
    useState<SelectedDocumentType | null>(null);

  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const debouncedKeyword = useDebouncedValue(keyword, 500);

  const {
    data: documentTypesData,
    refetch,
    isLoading: documentTypesLoading,
  } = useDocumentType({
    page,
    limit: 10,
    keyword: debouncedKeyword,
    categoryId: categoryId === "all" ? "" : categoryId,
  });
  const { data: categories, isLoading: categoriesLoading } =
    useCategoryOptions();
  const { data: workflows, isLoading: workflowsLoading } = useWorkflowOptions();
  const { data: documentTypes, refetch: refetchDocumentTypes } =
    useDocumentTypeOptions();

  const { checkPermission } = usePermissions();
  const canCreate = checkPermission("financial", "create");
  const canUpdate = checkPermission("financial", "update");
  const canDelete = checkPermission("financial", "delete");

  const formatDocumentType = useMemo(() => {
    if (!documentTypesData?.data) return [];
    return documentTypesData?.data?.map((documentType) => ({
      ...documentType,
      category: categories?.find(
        (category) => category.id === documentType.categoryId
      ),
      workflow: workflows?.find(
        (workflow) => workflow.id === documentType.workflowId
      ),
    })) as SelectedDocumentType[];
  }, [documentTypesData?.data, categories, workflows]);
  const isLoading = useMemo(() => {
    return documentTypesLoading || categoriesLoading || workflowsLoading;
  }, [documentTypesLoading, categoriesLoading, workflowsLoading]);

  function handleDetailView(id: string) {
    const findDocumentType = formatDocumentType?.find(
      (documentType) => documentType.id === id
    );
    if (!findDocumentType) return;

    setSelectedDocumentType(findDocumentType);
    setDetailViewOpen(true);
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setKeyword(e.target.value);
  }

  function onChangePage(page: number) {
    setPage(page);
  }

  function onChangeCategory(categoryId: string) {
    setCategoryId(categoryId);
  }

  function onOpenCreate() {
    setCreateOpen(true);
    setDetailViewOpen(false);
    setSelectedDocumentType(null);
  }

  function onOpenEdit() {
    setCreateOpen(true);
    setDetailViewOpen(false);
  }

  function handleRefetch() {
    refetch();
    refetchDocumentTypes();
  }

  return {
    documentTypes,

    createOpen,
    setCreateOpen,
    detailViewOpen,
    setDetailViewOpen,
    selectedDocumentType,
    setSelectedDocumentType,
    handleDetailView,
    categories,
    workflows,
    refetch: handleRefetch,
    documentTypesData: {
      data: formatDocumentType,
      pagination: documentTypesData?.pagination,
    },
    handleSearch,
    onChangePage,
    onChangeCategory,
    isLoading,
    onOpenCreate,
    onOpenEdit,
    canCreate,
    canUpdate,
    canDelete,
  };
};
