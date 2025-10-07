"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Search } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import { useCategoryList } from "./CategoryList.hook";
import { Pagination } from "@/components/pagination";
import { TableEmpty, TableLoading } from "@/components/table";
import DeleteDialog from "../delete-dialog/DeleteDialog";

// const getCategoryUtilization = (category: Category) => {
//   return (0 / category.budget) * 100;
// };

// const getUtilizationColor = (percentage: number) => {
//   if (percentage >= 90) return "text-destructive";
//   if (percentage >= 75) return "text-warning-amber";
//   return "text-success-green";
// };

const CategoryList = () => {
  const {
    list,
    pagination,
    onOpenCreate,
    onEditCategory,
    isLoading,
    onChangePage,
    canCreate,
    canDelete,
    canUpdate,
  } = useCategoryList();

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:justify-between">
          <div>
            <CardTitle>Cost Category</CardTitle>
          </div>
          <div className="flex flex-col md:flex-row items-stretch md:items-center space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search categories..."
                className="pl-10 w-full md:w-64"
              />
            </div>
            {canCreate && (
              <Button size="sm" onClick={onOpenCreate}>
                <Plus className="h-4 w-4 mr-2" />
                New Category
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="min-h-[60vh] flex flex-col max-w-[calc(94vw-1rem)] lg:max-w-none overflow-auto">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead className="min-w-[200px]">Category</TableHead>
              <TableHead className="min-w-[200px]">Description</TableHead>
              <TableHead className="text-right">Budget Limit</TableHead>
              {/* <TableHead>Spent / Committed</TableHead>
              <TableHead>Utilization</TableHead> */}
              <TableHead className="text-center">Status</TableHead>
              {(canUpdate || canDelete) && (
                <TableHead className="text-center">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableLoading colSpan={7} className="py-[30vh]" />
            ) : !list.length ? (
              <TableEmpty colSpan={7} className="py-[30vh]" />
            ) : (
              list?.map((category, index) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <div>
                        <div className="font-medium">{category.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {category.categoryId}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="text-sm truncate">
                      {category.description}
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-right">
                    {formatCurrency(category.budget)}
                  </TableCell>
                  {/* <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-construction-orange">
                        {formatCurrency(0)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Committed: {formatCurrency(0)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span
                          className={getUtilizationColor(
                            getCategoryUtilization(category)
                          )}
                        >
                          {getCategoryUtilization(category).toFixed(1)}%
                        </span>
                        <span className="text-muted-foreground">
                          {formatCurrency(category.budget - 0 - 0)} left
                        </span>
                      </div>
                      <Progress
                        value={getCategoryUtilization(category)}
                        className="h-2"
                      />
                    </div>
                  </TableCell> */}
                  <TableCell className="text-center">
                    <Badge
                      variant={category.isActive ? "default" : "secondary"}
                    >
                      {category.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  {(canUpdate || canDelete) && (
                    <TableCell>
                      <div className="flex justify-center">
                        {canUpdate && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEditCategory?.(index)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                        {canDelete && <DeleteDialog id={category.id ?? ""} />}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <Pagination
          totalPages={pagination?.totalPages ?? 0}
          currentPage={pagination?.currentPage ?? 1}
          onPageChange={onChangePage}
        />
      </CardContent>
    </Card>
  );
};

export default CategoryList;
