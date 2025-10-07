"use client";

import {
  Form,
  FormControl,
  FormMessage,
  FormItem,
  FormLabel,
  FormField,
} from "@/components/ui/form";
import { useDocumentForm, UseDocumentForm } from "./DocumentForm.hook";
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
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

const DocumentForm = ({ onClose }: UseDocumentForm) => {
  const {
    methods,
    onSubmit,
    onReset,
    categories,
    workflows,
    selectedDocumentType,
  } = useDocumentForm({ onClose });
  return (
    <>
      <Form {...methods}>
        <form onSubmit={onSubmit} onReset={onReset}>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <FormField
              control={methods.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Document Type Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter document type name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={methods.control}
              name="documentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Document ID *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter document id" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={methods.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    {...field}
                    onValueChange={(value) => {
                      if (!value) return;
                      field.onChange(value);
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories?.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value ?? ""}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={methods.control}
              name="isActive"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Active (available for use)</FormLabel>
                  <FormControl>
                    <div className="pt-1">
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="md:col-span-2 col-span-1">
              <FormField
                control={methods.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter workflow name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="md:col-span-2 col-span-1">
              <FormField
                control={methods.control}
                name="workflowId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assign Workflow</FormLabel>
                    <Select
                      {...field}
                      onValueChange={(value) => {
                        if (!value) return;
                        field.onChange(value);
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select workflow" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {workflows?.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value ?? ""}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="md:col-span-2 col-span-1 flex gap-2 justify-end">
              <Button variant="outline" type="reset">
                Cancel
              </Button>
              <Button type="submit">
                <Save className="h-4 w-4 mr-2" />
                {selectedDocumentType?.id
                  ? "Update Document Type"
                  : "Create Document Type"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default DocumentForm;
