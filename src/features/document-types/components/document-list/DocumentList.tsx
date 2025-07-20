"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, Filter, Plus, Eye, Copy, Trash2 } from "lucide-react";
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
import {
  getCategoryColor,
  getStatusColor,
} from "@/features/document-types/utils/colorStatus";

const DocumentList = () => {
  const { documentTypes, setCreateOpen, handleDetailView } = useDocumentList();

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
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" />
            </Button>
            <Button size="sm" onClick={() => setCreateOpen?.(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Document Type
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document Type</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Workflow</TableHead>
              <TableHead>Approval Levels</TableHead>
              <TableHead>Processing Time</TableHead>
              <TableHead>Total Docs</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documentTypes?.map((docType) => (
              <TableRow key={docType.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{docType.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {docType.id}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getCategoryColor(docType.category)}>
                    {docType.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="text-sm font-medium">
                      {docType.workflowName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {docType.workflowId}
                    </p>
                  </div>
                </TableCell>
                <TableCell>{docType.approvalLevels}</TableCell>
                <TableCell>{docType.averageProcessingTime}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{docType.totalDocuments}</p>
                    <p className="text-xs text-muted-foreground">
                      {docType.pendingDocuments} pending
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Badge
                    className={getStatusColor(
                      docType.active ? "Active" : "Inactive"
                    )}
                  >
                    {docType.active ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="flex justify-center">
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDetailView?.(docType)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4 text-destructive" />
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

export default DocumentList;
