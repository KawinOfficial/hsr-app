"use client";

import { useState } from "react";
import {
  Category,
  CategoryList,
} from "@/features/category/schemas/Category.schema";

const categories: CategoryList = [
  {
    id: "CAT-001",
    name: "Construction & Infrastructure",
    categoryId: "CONST",
    description: "Main construction and infrastructure costs",
    isActive: false,
    budget: 1500000000,
  },
  {
    id: "CAT-002",
    name: "Rolling Stock & Equipment",
    categoryId: "ROLL",
    description: "Trains, maintenance equipment, and rolling stock",
    isActive: true,
    budget: 700000000,
  },
  {
    id: "CAT-003",
    name: "Technology & Systems",
    categoryId: "TECH",
    description: "Signaling, communication, and control systems",
    isActive: true,
    budget: 480000000,
  },
  {
    id: "CAT-004",
    name: "Operations & Maintenance",
    categoryId: "OPS",
    description: "Operational costs and maintenance activities",
    isActive: true,
    budget: 150000000,
  },
  {
    id: "CAT-005",
    name: "Professional Services",
    categoryId: "PROF",
    description: "Consulting, legal, and professional services",
    isActive: true,
    budget: 85000000,
  },
];

export const useCategoryProvider = () => {
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  function onOpenCreate() {
    setCreateOpen(true);
    setSelectedCategory(null);
  }

  function onEditCategory(index: number) {
    const category = categories?.[index];
    if (!category) return;
    setSelectedCategory(category);
    setEditOpen(true);
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
  };
};
