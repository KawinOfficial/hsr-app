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
import { getStatusColor } from "@/features/document-types/utils/colorStatus";
import { useDocumentDialog } from "./DocumentDialog.hook";
import { calculateTotalTimeLimit, formatDateWithTime } from "@/lib/format";

const DocumentDialog = () => {
  const {
    detailViewOpen,
    setDetailViewOpen,
    selectedDocumentType,
    onOpenEdit,
  } = useDocumentDialog();

  if (!selectedDocumentType) return null;

  return (
    <Dialog open={detailViewOpen} onOpenChange={setDetailViewOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle>{selectedDocumentType.name}</DialogTitle>
          <DialogDescription>
            Document Type ID: {selectedDocumentType.documentId} • Created:{" "}
            {formatDateWithTime(selectedDocumentType.createdAt ?? "")}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 mt-4">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label className="font-medium text-muted-foreground">
                Category
              </Label>
              <div className="mt-1">
                {selectedDocumentType.category?.name ?? "-"}
              </div>
            </div>
            <div>
              <Label className="font-medium text-muted-foreground">
                Status
              </Label>
              <div className="mt-1">
                <Badge
                  className={getStatusColor(
                    selectedDocumentType.isActive ? "Active" : "Inactive"
                  )}
                >
                  {selectedDocumentType.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
          </div>

          <div>
            <Label className="font-medium text-muted-foreground">
              Description
            </Label>
            <p className="text-sm mt-1">{selectedDocumentType.description}</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label className="font-medium text-muted-foreground">
                Total Documents
              </Label>
              <p className="text-2xl font-bold text-rail-blue">0</p>
            </div>
            <div>
              <Label className="font-medium text-muted-foreground">
                Pending
              </Label>
              <p className="text-2xl font-bold text-warning-amber">0</p>
            </div>
            <div>
              <Label className="font-medium text-muted-foreground">
                Processing Time
              </Label>
              <p className="text-2xl font-bold text-success-green">
                {calculateTotalTimeLimit(
                  selectedDocumentType.workflow?.steps ?? []
                )}
              </p>
            </div>
          </div>

          <Separator />

          <div>
            <Label className="font-medium text-muted-foreground">
              Assigned Workflow
            </Label>
            <div className="mt-2 p-4 border rounded-lg">
              <h4 className="font-medium">
                {selectedDocumentType.workflow?.name ?? "-"}
              </h4>
              <p className="text-sm text-muted-foreground">
                {selectedDocumentType.workflow?.workflowId ?? "-"} •{" "}
                {selectedDocumentType.workflow?.steps.length ?? 0} steps
              </p>
            </div>
          </div>
        </div>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setDetailViewOpen?.(false)}>
            Close
          </Button>
          <Button onClick={onOpenEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Document Type
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentDialog;
