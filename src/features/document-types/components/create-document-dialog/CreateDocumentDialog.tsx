"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Save } from "lucide-react";
import { useCreateDocumentDialog } from "./CreateDocumentDialog.hook";
import { CATEGORIES, REQUIRED_FIELDS } from "../../constants/options";

const CreateDocumentDialog = () => {
  const { createOpen, setCreateOpen, workflowTemplates } =
    useCreateDocumentDialog();

  return (
    <Dialog open={createOpen} onOpenChange={setCreateOpen}>
      <DialogContent className="max-w-2xl p-6">
        <DialogHeader>
          <DialogTitle>Create New Document Type</DialogTitle>
          <DialogDescription>
            Define a new document type and assign an approval workflow
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="doc-name">Document Type Name</Label>
              <Input id="doc-name" placeholder="e.g., Purchase Request" />
            </div>
            <div>
              <Label htmlFor="doc-category">Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map(({ label, value }, index) => (
                    <SelectItem key={`${value}-${index}`} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="doc-description">Description</Label>
            <Textarea
              id="doc-description"
              placeholder="Describe the purpose and use of this document type"
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="workflow-assignment">Assign Workflow</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select workflow template" />
              </SelectTrigger>
              <SelectContent>
                {workflowTemplates?.map((workflow) => (
                  <SelectItem key={workflow.id} value={workflow.id}>
                    {workflow.name} ({workflow.steps.length} steps)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Required Fields</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {REQUIRED_FIELDS.map(({ label, value }, index) => (
                <div
                  key={`${value}-${index}`}
                  className="flex items-center space-x-2"
                >
                  <input type="checkbox" id={value} className="rounded" />
                  <Label htmlFor={value} className="text-sm">
                    {label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="active" defaultChecked />
            <Label htmlFor="active">Active (available for use)</Label>
          </div>
        </div>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setCreateOpen?.(false)}>
            Cancel
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Create Document Type
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDocumentDialog;
