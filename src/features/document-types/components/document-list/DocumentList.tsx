"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, Plus, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useDocumentList } from "./DocumentList.hook";
import { getStatusColor } from "@/features/document-types/utils/colorStatus";
import { TableEmpty, TableLoading } from "@/components/table";
import { calculateTotalTimeLimit } from "@/lib/format";
import { Pagination } from "@/components/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DocumentList = () => {
  const {
    list,
    pagination,
    isLoading,
    onOpenCreate,
    handleDetailView,
    onChangePage,
    handleSearch,
    onChangeCategory,
    categoriesOptions,
    canCreate,
    canDelete,
  } = useDocumentList();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Document Types</CardTitle>
            <CardDescription>
              Manage document types and their configurations
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search document types..."
                className="pl-10 w-64"
                onChange={handleSearch}
              />
            </div>

            <Select
              defaultValue="all"
              onValueChange={(value) => onChangeCategory?.(value)}
            >
              <SelectTrigger className="w-32">
                <SelectValue className="line-clamp-1 truncate" />
              </SelectTrigger>
              <SelectContent>
                {categoriesOptions?.map((option) => (
                  <SelectItem key={option.value} value={option.value ?? ""}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {canCreate && (
              <Button size="sm" onClick={onOpenCreate}>
                <Plus className="h-4 w-4 mr-2" />
                New Document Type
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="min-h-[60vh] flex flex-col">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Document Type</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Workflow</TableHead>
              <TableHead className="text-center">Approval Levels</TableHead>
              <TableHead className="text-center">Processing Time</TableHead>
              <TableHead className="text-center">Total Docs</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableLoading colSpan={8} className="py-[20vh]" />
            ) : !list?.length ? (
              <TableEmpty colSpan={8} className="py-[20vh]" />
            ) : (
              list?.map((docType, index) => (
                <TableRow key={`${docType.id}-${index}`}>
                  <TableCell>
                    <div>
                      <p>{docType.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {docType.documentId}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="capitalize font-semibold">
                      {docType.category?.name ?? "-"}
                    </p>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm ">
                        {docType.workflow?.name ?? "-"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {docType.workflow?.workflowId ?? "-"}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {docType.workflow?.steps.length ?? 0}
                  </TableCell>
                  <TableCell className="text-center">
                    {calculateTotalTimeLimit(docType.workflow?.steps ?? [])}
                  </TableCell>
                  <TableCell className="text-center">
                    <p className="font-medium">
                      {docType.totalDocuments?.totalCount ?? 0}
                    </p>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      className={getStatusColor(
                        docType.isActive ? "Active" : "Inactive"
                      )}
                    >
                      {docType.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex justify-center">
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDetailView?.(docType.id ?? "")}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {canDelete && (
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <div className="mt-auto">
          <Pagination
            totalPages={pagination?.totalPages ?? 0}
            currentPage={pagination?.currentPage ?? 1}
            onPageChange={onChangePage}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentList;
