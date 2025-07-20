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
import { Plus, Edit, Eye, Search, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/format";
import {
  getStatusColor,
  getPriorityColor,
} from "@/features/financial/utils/color";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

const Liability = () => {
  const { liabilitiesData, handleViewItem } = useLiability();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Liability Management</CardTitle>
            <CardDescription className="mt-1">
              Track and manage project liabilities, obligations, and outstanding
              debts
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search liabilities..."
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" />
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Liability
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Liability ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Creditor</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {liabilitiesData.map((liability) => (
              <TableRow key={liability.id}>
                <TableCell className="font-medium">{liability.id}</TableCell>
                <TableCell>{liability.type}</TableCell>
                <TableCell>{liability.creditor}</TableCell>
                <TableCell className="font-semibold">
                  {formatCurrency(liability.amount)}
                </TableCell>
                <TableCell>{liability.dueDate}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(liability.status)}>
                    {liability.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span
                    className={`font-medium ${getPriorityColor(
                      liability.priority
                    )}`}
                  >
                    {liability.priority}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewItem?.(liability, "liability")}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      //   onClick={() =>
                      //     handleEditItem(liability, "liability")
                      //   }
                    >
                      <Edit className="h-4 w-4" />
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

export default Liability;
