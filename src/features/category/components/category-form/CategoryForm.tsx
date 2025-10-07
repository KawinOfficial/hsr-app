"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCategoryForm, UseCategoryForm } from "./CategoryForm.hook";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

const CategoryForm = ({ id, onClose }: UseCategoryForm) => {
  const { methods, onSubmit, onReset } = useCategoryForm({ id, onClose });
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
                  <FormLabel>Category Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category name" {...field} />
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
                  <FormLabel>Category ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category id" {...field} />
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

            <FormField
              control={methods.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget Limit (THB)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter budget" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={methods.control}
              name="isActive"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Active</FormLabel>
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

            <div className="md:col-span-2 col-span-1 flex gap-2 justify-end">
              <Button variant="outline" type="reset">
                Cancel
              </Button>
              <Button type="submit">
                <Save className="h-4 w-4 mr-2" />
                {id ? "Update Category" : "Create Category"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default CategoryForm;
