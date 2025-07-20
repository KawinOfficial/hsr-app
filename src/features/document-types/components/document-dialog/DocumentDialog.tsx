"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import {
  getCategoryColor,
  getStatusColor,
} from "@/features/document-types/utils/colorStatus";
import { useDocumentDialog } from "./DocumentDialog.hook";

const DocumentDialog = () => {
  const { detailViewOpen, setDetailViewOpen, selectedDocumentType } =
    useDocumentDialog();

  if (!selectedDocumentType) return null;

  return (
    <Dialog open={detailViewOpen} onOpenChange={setDetailViewOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle>{selectedDocumentType.name}</DialogTitle>
          <DialogDescription>
            Document Type ID: {selectedDocumentType.id} • Created:{" "}
            {selectedDocumentType.createdDate}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 mt-4">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label className="font-medium">Category</Label>
              <div className="mt-1">
                <Badge
                  className={getCategoryColor(selectedDocumentType.category)}
                >
                  {selectedDocumentType.category}
                </Badge>
              </div>
            </div>
            <div>
              <Label className="font-medium">Status</Label>
              <div className="mt-1">
                <Badge
                  className={getStatusColor(
                    selectedDocumentType.active ? "Active" : "Inactive"
                  )}
                >
                  {selectedDocumentType.active ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
          </div>

          <div>
            <Label className="font-medium">Description</Label>
            <p className="text-sm text-muted-foreground mt-1">
              {selectedDocumentType.description}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label className="font-medium">Total Documents</Label>
              <p className="text-2xl font-bold text-rail-blue">
                {selectedDocumentType.totalDocuments}
              </p>
            </div>
            <div>
              <Label className="font-medium">Pending</Label>
              <p className="text-2xl font-bold text-warning-amber">
                {selectedDocumentType.pendingDocuments}
              </p>
            </div>
            <div>
              <Label className="font-medium">Avg Processing</Label>
              <p className="text-2xl font-bold text-success-green">
                {selectedDocumentType.averageProcessingTime}
              </p>
            </div>
          </div>

          <div>
            <Label className="font-medium">Required Fields</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedDocumentType.requiredFields.map((field: string) => (
                <Badge key={field} variant="outline">
                  {field}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label className="font-medium">Permissions</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedDocumentType.permissions.map((permission: string) => (
                <Badge
                  key={permission}
                  className="bg-muted text-muted-foreground"
                >
                  {permission}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <Label className="font-medium">Assigned Workflow</Label>
            <div className="mt-2 p-4 border rounded-lg">
              <h4 className="font-medium">
                {selectedDocumentType.workflowName}
              </h4>
              <p className="text-sm text-muted-foreground">
                {selectedDocumentType.workflowId} •{" "}
                {selectedDocumentType.approvalLevels} approval levels
              </p>
            </div>
          </div>
        </div>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setDetailViewOpen?.(false)}>
            Close
          </Button>
          <Button>
            <Edit className="h-4 w-4 mr-2" />
            Edit Document Type
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentDialog;
