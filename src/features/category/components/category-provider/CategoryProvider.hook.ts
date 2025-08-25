"use client";

import { useState } from "react";
import { Category } from "@/features/category/schemas/Category.schema";
import { useCategory } from "@/features/category/hooks/use-category";
import { useDebouncedValue } from "@/hooks/use-debouce";

export const useCategoryProvider = () => {
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const debouncedKeyword = useDebouncedValue(keyword, 500);

  const {
    data: categories,
    isLoading,
    refetch,
  } = useCategory({
    page,
    limit: 10,
    keyword: debouncedKeyword,
  });

  function onOpenCreate() {
    setCreateOpen(true);
    setSelectedCategory(null);
  }

  function onEditCategory(index: number) {
    const category = categories?.data?.[index];
    if (!category) return;
    setSelectedCategory(category);
    setEditOpen(true);
  }

  function onChangePage(page: number) {
    setPage(page);
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setKeyword(e.target.value);
  }

  return {
    categories,
    createOpen,
    setCreateOpen,
    onOpenCreate,
    editOpen,
    setEditOpen,
    selectedCategory,
    setSelectedCategory,
    onEditCategory,
    isLoading,
    onChangePage,
    handleSearch,
    refetch,
  };
};
