"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, Eye, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/format";
import { usePayments } from "./Payments.hook";
import { getStatusColor } from "@/features/financial/utils/color";
import { TableEmpty, TableLoading } from "@/components/table";
import { Pagination } from "@/components/pagination";
import DeletePaymentDialog from "../delete-payment-dialog/DeletePaymentDialog";

const Payments = () => {
  const {
    list,
    pagination,
    isLoading,
    handleViewPayment,
    handleOpenPayment,
    handleChangePage,
    handleChangeKeyword,
  } = usePayments();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Payment Management</CardTitle>
            <CardDescription className="mt-1">
              Process contractor payments, advances, and miscellaneous expenses
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
            <Button size="sm" onClick={() => handleOpenPayment?.()}>
              <Plus className="h-4 w-4 mr-2" />
              New Payment
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Payment ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead>Payment Date</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableLoading colSpan={7} className="py-[20vh]" />
            ) : !list?.length ? (
              <TableEmpty colSpan={7} className="py-[20vh]" />
            ) : (
              list.map((payment, index) => (
                <TableRow key={`${payment.id}-${index}`}>
                  <TableCell className="font-semibold">
                    {payment.paymentId}
                  </TableCell>
                  <TableCell>{payment.name}</TableCell>
                  <TableCell>{payment.vendor}</TableCell>
                  <TableCell className="font-semibold text-right">
                    {formatCurrency(payment.amount)}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className={getStatusColor(payment.status ?? "")}>
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(payment.paymentDate)}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewPayment?.(payment.id ?? "")}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <DeletePaymentDialog
                        id={payment.id ?? ""}
                        type="payment"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
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

export default Payments;
