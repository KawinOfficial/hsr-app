"use client";

import { useLiability } from "./Liability.hook";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Eye, Search } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/format";
import { getPriorityColor } from "@/features/financial/utils/color";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/pagination";
import { DeletePaymentDialog } from "../delete-payment-dialog";
import { TableEmpty, TableLoading } from "@/components/table";
import { getActionColor } from "@/features/notification/utils/color";
import { Badge } from "@/components/ui/badge";

const Liability = () => {
  const {
    handleViewLiability,
    handleOpenLiability,
    list,
    pagination,
    handleChangeKeyword,
    handleChangePage,
    getDocumentTypeName,
    isLoading,
    keyword,
    canCreate,
    canDelete,
  } = useLiability();

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-2 lg:space-y-0 lg:justify-between">
          <div>
            <CardTitle>Liability Management</CardTitle>
            <CardDescription className="mt-1">
              Track and manage project liabilities, obligations, and outstanding
              debts
            </CardDescription>
          </div>
          <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-2 lg:space-y-0 lg:space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={keyword}
                placeholder="Search liabilities..."
                className="pl-10 w-64"
                onChange={(e) => handleChangeKeyword?.(e.target.value)}
              />
            </div>
            {canCreate && (
              <Button size="sm" onClick={handleOpenLiability}>
                <Plus className="h-4 w-4 mr-2" />
                New Liability
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="min-h-[60vh] flex flex-col max-w-[calc(94vw-1rem)] lg:max-w-none overflow-auto">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead className="min-w-[150px]">Liability ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Creditor</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead className="text-center">Priority</TableHead>
              <TableHead className="text-center min-w-[160px]">
                Status
              </TableHead>
              <TableHead>Created By</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableLoading colSpan={9} className="py-[20vh]" />
            ) : !list?.length ? (
              <TableEmpty colSpan={9} className="py-[20vh]" />
            ) : (
              list.map((liability) => (
                <TableRow key={liability.id}>
                  <TableCell className="font-semibold">
                    {liability.liabilityId}
                  </TableCell>
                  <TableCell className="truncate max-w-[180px]">
                    {liability.name}
                  </TableCell>
                  <TableCell className="truncate max-w-[150px]">
                    {getDocumentTypeName(liability.documentTypesId)}
                  </TableCell>
                  <TableCell className="truncate max-w-[150px]">
                    {liability.creditor}
                  </TableCell>
                  <TableCell className="font-semibold">
                    {formatCurrency(liability.amount)}
                  </TableCell>
                  <TableCell>{formatDate(liability.dueDate)}</TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`font-medium ${getPriorityColor(
                        liability.priority
                      )}`}
                    >
                      {liability.priority}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className={getActionColor(liability.status ?? "")}>
                      {liability.status?.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="truncate max-w-[100px]">
                    {[
                      liability.userCreatedBy?.firstName,
                      liability.userCreatedBy?.lastName,
                    ].join(" ")}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleViewLiability?.(liability.id ?? "")
                        }
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {canDelete && (
                        <DeletePaymentDialog
                          id={liability.id ?? ""}
                          type="liability"
                        />
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
            onPageChange={handleChangePage}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default Liability;
