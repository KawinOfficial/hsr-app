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
import { Progress } from "@/components/ui/progress";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import { useCategoryList } from "./CategoryList.hook";
import { Category } from "@/features/category/schemas/Category.schema";

const getCategoryUtilization = (category: Category) => {
  return (0 / category.budget) * 100;
};

const getUtilizationColor = (percentage: number) => {
  if (percentage >= 90) return "text-destructive";
  if (percentage >= 75) return "text-warning-amber";
  return "text-success-green";
};

const CategoryList = () => {
  const { categories, onOpenCreate, onEditCategory } = useCategoryList();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Cost Category</CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search categories..."
                className="pl-10 w-64"
              />
            </div>
            <Button size="sm" onClick={onOpenCreate}>
              <Plus className="h-4 w-4 mr-2" />
              New Category
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Budget Limit</TableHead>
              <TableHead>Spent / Committed</TableHead>
              <TableHead>Utilization</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories?.map((category, index) => (
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
                  <div className="text-sm truncate">{category.description}</div>
                </TableCell>
                <TableCell className="font-semibold text-right">
                  {formatCurrency(category.budget)}
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-construction-orange">
                      {formatCurrency(0)}
                      {/* {formatCurrency(category.spent)} */}
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
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant={category.isActive ? "default" : "secondary"}>
                    {category.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditCategory?.(index)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      // onClick={() => handleDeleteCategory(category.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CategoryList;
