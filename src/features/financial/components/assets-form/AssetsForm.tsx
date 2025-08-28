"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { UseAssetsForm, useAssetsForm } from "./AssetsForm.hook";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Save, Trash } from "lucide-react";
import { FileUpload } from "@/components/ui/file-upload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PaymentHistory } from "@/features/financial/components/payment-history";
import { locations } from "@/constants/options";
import { Progress } from "@/components/ui/progress";
import { formatCurrency, formatPercent } from "@/lib/format";

const AssetsForm = ({ onClose }: UseAssetsForm) => {
  const {
    methods,
    onSubmit,
    onReset,
    projectOptions,
    documentTypes,
    selectedId,
    onAddMaintenance,
    onRemoveMaintenance,
    fields,
    getCurrentValue,
    getDepreciation,
  } = useAssetsForm({ onClose });

  return (
    <Form {...methods}>
      <form onSubmit={onSubmit} onReset={onReset}>
        <div className="max-h-[70vh] overflow-y-auto px-6 py-3 grid grid-cols-3 gap-4">
          <Card className="col-span-2 m-0">
            <CardHeader>
              <CardTitle>Asset Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
              <FormField
                control={methods.control}
                name="projectId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Project</FormLabel>
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
                          <SelectValue placeholder="Select project" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {projectOptions?.map((option) => (
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
                name="documentTypesId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Document Type</FormLabel>
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
                          <SelectValue placeholder="Select document type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {documentTypes?.map((option) => (
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

              <div className="col-span-2">
                <FormField
                  control={methods.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Asset Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter asset name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-2">
                <FormField
                  control={methods.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={methods.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">
                      Amount/Value (THB)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter amount"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Location</FormLabel>
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
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {locations?.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card className="m-0">
            <CardHeader>
              <CardTitle>Asset Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 flex flex-col">
              <div className="space-y-5">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Current Value</p>
                  <p className="text-xl font-bold text-success-green">
                    {formatCurrency(getCurrentValue)}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Depreciation</span>
                    <span>{formatPercent(getDepreciation)}</span>
                  </div>
                  <Progress value={getDepreciation} className="h-2" />
                </div>
              </div>

              <div className="space-y-2">
                <FormField
                  control={methods.control}
                  name="purchaseDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Purchase Date</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter purchase date"
                          {...field}
                          type="date"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={methods.control}
                  name="warrantyDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Warranty Until</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter warranty"
                          {...field}
                          value={field.value ?? ""}
                          type="date"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="maintances" className="w-full col-span-3">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="maintances">Maintances</TabsTrigger>
              <TabsTrigger value="attachments">Attachments</TabsTrigger>
              <TabsTrigger value="history" disabled={!selectedId}>
                History
              </TabsTrigger>
            </TabsList>
            <TabsContent value="maintances">
              <Card>
                <CardHeader className="px-4">
                  <CardTitle>Maintances History</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 px-4">
                  {fields.map((field, index) => (
                    <div
                      key={`${field.id}-${index}`}
                      className="border border-dashed p-3 rounded-md grid grid-cols-3 gap-x-3 gap-y-1 relative"
                    >
                      <div className="col-span-2">
                        <FormField
                          control={methods.control}
                          name={`maintances.${index}.name`}
                          render={({ field }) => (
                            <FormItem className="flex gap-2 items-center">
                              <FormLabel className="truncate w-[140px]">
                                Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter name"
                                  className="h-auto py-1"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={methods.control}
                        name={`maintances.${index}.date`}
                        render={({ field }) => (
                          <FormItem className="flex gap-2 items-center">
                            <FormLabel className="truncate w-[140px] text-right">
                              Date
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="date"
                                className="h-auto py-1"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="col-span-2">
                        <FormField
                          control={methods.control}
                          name={`maintances.${index}.description`}
                          render={({ field }) => (
                            <FormItem className="flex gap-2 items-center">
                              <FormLabel className="truncate w-[140px]">
                                Description
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter description"
                                  className="h-auto py-1"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={methods.control}
                        name={`maintances.${index}.cost`}
                        render={({ field }) => (
                          <FormItem className="flex gap-2 items-center">
                            <FormLabel className="truncate w-[140px] text-right">
                              Cost (THB)
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                placeholder="Enter cost"
                                className="h-auto py-1"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="col-span-2">
                        <FormField
                          control={methods.control}
                          name={`maintances.${index}.maintenanceBy`}
                          render={({ field }) => (
                            <FormItem className="flex gap-2 items-center">
                              <FormLabel className="truncate w-[140px]">
                                Maintenance By
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter maintenance by"
                                  className="h-auto py-1"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onRemoveMaintenance(index)}
                        className="max-w-[100px] absolute bottom-2 right-3 text-xs text-destructive"
                      >
                        <Trash className="h-2 w-2" />
                        Remove
                      </Button>
                    </div>
                  ))}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onAddMaintenance}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Maintenance
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="attachments">
              {/* TODO: Attachments */}{" "}
              <FileUpload
                files={[]}
                onFilesChange={() => {}}
                maxFiles={10}
                accept={{
                  "image/*": [".png", ".jpg", ".jpeg", ".pdf"],
                }}
              />
            </TabsContent>
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Activity History</CardTitle>
                </CardHeader>
                <CardContent>
                  <PaymentHistory assetId={selectedId} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex gap-2 justify-end px-6 py-4 sticky bottom-0 bg-background border-t">
          <Button variant="outline" type="reset" onClick={onReset}>
            Cancel
          </Button>
          <Button type="submit">
            <Save className="h-4 w-4 mr-2" />
            {selectedId ? "Update Asset" : "Create Asset"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AssetsForm;
