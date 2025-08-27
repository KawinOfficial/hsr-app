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

const Assets = () => {
  const {
    list,
    pagination,
    handleViewAssets,
    handleOpenAssets,
    handleChangeKeyword,
    handleChangePage,
    isLoading,
    getProjectName,
    getDocumentTypeName,
  } = useAssets();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Asset Management</CardTitle>
            <CardDescription className="mt-1">
              Register and manage project assets, equipment, and infrastructure
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search payments..."
                className="pl-10 w-64"
                onChange={(e) => handleChangeKeyword?.(e.target.value)}
              />
            </div>
            <Button size="sm" onClick={handleOpenAssets}>
              <Plus className="h-4 w-4 mr-2" />
              Register Asset
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Document Type</TableHead>
              <TableHead className="text-right">Original Value</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Purchase Date</TableHead>
              <TableHead>Warranty Until</TableHead>
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
                    <TableCell className="font-medium">
                      {asset.assetId}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{asset.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {getProjectName(asset.projectId ?? "")}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getDocumentTypeName(asset.documentTypesId ?? "")}
                    </TableCell>
                    <TableCell className="font-semibold text-right">
                      {formatCurrency(asset.amount)}
                    </TableCell>
                    <TableCell>{asset.location}</TableCell>
                    <TableCell>{formatDate(asset.purchaseDate)}</TableCell>
                    <TableCell>
                      {asset.warrantyDate
                        ? formatDate(asset.warrantyDate)
                        : "-"}
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
                        <DeletePaymentDialog
                          id={asset?.id ?? ""}
                          type="asset"
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        <Pagination
          totalPages={pagination?.totalPages ?? 0}
          currentPage={pagination?.currentPage ?? 1}
          onPageChange={handleChangePage}
        />
      </CardContent>
    </Card>
  );
};

export default Assets;
