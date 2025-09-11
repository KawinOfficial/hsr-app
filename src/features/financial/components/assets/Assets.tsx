"use client";

import { useAssets } from "./Assets.hook";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Plus, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/format";
import { Input } from "@/components/ui/input";
import DeletePaymentDialog from "../delete-payment-dialog/DeletePaymentDialog";
import { TableEmpty, TableLoading } from "@/components/table";
import { Pagination } from "@/components/pagination";
import { getActionColor } from "@/features/notification/utils/color";
import { Badge } from "@/components/ui/badge";

const Assets = () => {
  const {
    list,
    pagination,
    handleViewAssets,
    handleOpenAssets,
    handleChangeKeyword,
    handleChangePage,
    isLoading,
    getDocumentTypeName,
    keyword,
    canCreate,
    canDelete,
  } = useAssets();

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-2 lg:space-y-0 lg:justify-between">
          <div>
            <CardTitle>Asset Management</CardTitle>
            <CardDescription className="mt-1">
              Register and manage project assets, equipment, and infrastructure
            </CardDescription>
          </div>
          <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-2 lg:space-y-0 lg:space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search assets..."
                value={keyword}
                className="pl-10 w-64"
                onChange={(e) => handleChangeKeyword?.(e.target.value)}
              />
            </div>
            {canCreate && (
              <Button size="sm" onClick={handleOpenAssets}>
                <Plus className="h-4 w-4 mr-2" />
                Register Asset
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="min-h-[60vh] flex flex-col max-w-[calc(94vw-1rem)] lg:max-w-none overflow-auto">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead className="min-w-[150px]">Asset ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Document Type</TableHead>
              <TableHead className="text-right">Value</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Purchase Date</TableHead>
              <TableHead className="text-center min-w-[160px]">
                Status
              </TableHead>
              <TableHead>Created By</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableLoading colSpan={8} className="py-[20vh]" />
            ) : !list?.length ? (
              <TableEmpty colSpan={8} className="py-[20vh]" />
            ) : (
              list.map((asset) => {
                return (
                  <TableRow key={asset.id}>
                    <TableCell className="font-semibold">
                      {asset.assetId}
                    </TableCell>
                    <TableCell className="truncate max-w-[150px]">
                      {asset.name}
                    </TableCell>
                    <TableCell className="truncate max-w-[150px]">
                      {getDocumentTypeName(asset.documentTypesId ?? "")}
                    </TableCell>
                    <TableCell className="font-semibold text-right">
                      {formatCurrency(asset.amount)}
                    </TableCell>
                    <TableCell className="truncate max-w-[150px]">
                      {asset.location}
                    </TableCell>
                    <TableCell>{formatDate(asset.purchaseDate)}</TableCell>
                    <TableCell className="text-center">
                      <Badge className={getActionColor(asset.status ?? "")}>
                        {asset.status?.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="truncate max-w-[150px]">
                      {[
                        asset.userCreatedBy?.firstName,
                        asset.userCreatedBy?.lastName,
                      ].join(" ")}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewAssets?.(asset?.id ?? "")}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {canDelete && asset.canDelete && (
                          <DeletePaymentDialog
                            id={asset?.id ?? ""}
                            type="asset"
                          />
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
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

export default Assets;
