"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useWorkflowForm, UseWorkflowForm } from "./WorkflowForm.hook";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Save, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TIME_LIMITS,
  WORKFLOW_STEPS,
} from "@/features/document-types/constants/options";

const WorkflowForm = ({ id, onClose }: UseWorkflowForm) => {
  const {
    methods,
    onSubmit,
    onReset,
    fields,
    onAddStep,
    onRemoveStep,
    usersOptions,
  } = useWorkflowForm({ id, onClose });

  return (
    <>
      <Form {...methods}>
        <form onSubmit={onSubmit} onReset={onReset}>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={methods.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workflow Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter workflow name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={methods.control}
              name="workflowId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workflow ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter workflow id" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="col-span-2">
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

            <div className="col-span-2 space-y-3">
              <p className="text-base font-medium">Workflow Steps</p>

              {fields.map((step, index) => (
                <Card key={`${index}-${step.id}`} className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Step {index + 1}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveStep(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <FormField
                        control={methods.control}
                        name={`steps.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Step Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter step name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={methods.control}
                        name={`steps.${index}.type`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Type</FormLabel>
                            <Select {...field} onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {WORKFLOW_STEPS.map((option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
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
                        name={`steps.${index}.userId`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Assigned Role</FormLabel>
                            <Select {...field} onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {usersOptions?.map((option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
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
                        name={`steps.${index}.timeLimit`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Time Limit</FormLabel>
                            <Select
                              {...field}
                              onValueChange={field.onChange}
                              disabled={
                                methods.watch(`steps.${index}.type`) ===
                                "notification"
                              }
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select time limit" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {TIME_LIMITS.map((option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
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
                  </div>
                </Card>
              ))}

              <Button variant="outline" className="w-full" onClick={onAddStep}>
                <Plus className="h-4 w-4 mr-2" />
                Add Step
              </Button>
            </div>

            <div className="col-span-2 flex gap-2 justify-end">
              <Button variant="outline" type="reset">
                Cancel
              </Button>
              <Button type="submit">
                <Save className="h-4 w-4 mr-2" />
                {id ? "Update Workflow" : "Create Workflow"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default WorkflowForm;
