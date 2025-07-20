"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { PRIORITY_OPTIONS } from "@/features/financial/constants/options";
import { useCreateDocumentDialog } from "./CreateDocmentDialog.hook";

const CreateDocmentDialog = () => {
  const {
    documentTypes,
    projectOptions,
    createDocumentOpen,
    setCreateDocumentOpen,
  } = useCreateDocumentDialog();

  return (
    <Dialog open={createDocumentOpen} onOpenChange={setCreateDocumentOpen}>
      <DialogContent className="max-w-2xl p-6">
        <DialogHeader>
          <DialogTitle>Create New Document</DialogTitle>
          <DialogDescription>
            Fill in the document details to start the approval workflow
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="doc-type">Document Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(documentTypes).map(([key, docType]) => (
                    <SelectItem key={key} value={key}>
                      {docType.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(PRIORITY_OPTIONS).map((priority) => (
                    <SelectItem key={priority} value={priority}>
                      {priority}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="title">Document Title</Label>
            <Input id="title" placeholder="Enter document title" />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter document description"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="amount">Amount (THB)</Label>
              <Input id="amount" type="number" placeholder="0.00" />
            </div>
            <div>
              <Label htmlFor="project">Project</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  {projectOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="due-date">Due Date</Label>
            <Input id="due-date" type="date" />
          </div>
          <div>
            <Label>Attachments</Label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
              <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Drag & drop files here, or click to select files
              </p>
              <Button variant="outline" size="sm" className="mt-2">
                Select Files
              </Button>
            </div>
          </div>
        </form>

        <DialogFooter className="mt-4">
          <Button
            variant="outline"
            onClick={() => setCreateDocumentOpen?.(false)}
          >
            Cancel
          </Button>
          <Button>Create & Submit for Approval</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDocmentDialog;
